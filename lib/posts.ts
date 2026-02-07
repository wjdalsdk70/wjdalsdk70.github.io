import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

type PostIndexEntry = {
  slug: string
  fullPath: string
}

function listMarkdownFiles(dir: string, acc: PostIndexEntry[] = []): PostIndexEntry[] {
  if (!fs.existsSync(dir)) return acc
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      listMarkdownFiles(fullPath, acc)
      continue
    }
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    const slug = entry.name.replace(/\.md$/, '')
    acc.push({ slug, fullPath })
  }
  return acc
}

function getPostIndex(): PostIndexEntry[] {
  return listMarkdownFiles(postsDirectory)
}

function getCategoryFromPath(fullPath: string): string | null {
  const relative = path.relative(postsDirectory, fullPath)
  const parts = relative.split(path.sep)
  if (parts.length <= 1) return null
  const folder = parts[0]?.trim()
  return folder ? folder : null
}

function parseFilenameMeta(fullPath: string) {
  const base = path.basename(fullPath, '.md')
  const parts = base.split('-')
  if (parts.length >= 4) {
    const date = `${parts[0]}-${parts[1]}-${parts[2]}`
    const title = parts.slice(3).join('-').trim()
    return {
      slug: base,
      title: title || base,
      date,
    }
  }
  return {
    slug: base,
    title: base.replace(/[-_]+/g, ' ').trim(),
    date: '',
  }
}

export interface Post {
  slug: string
  title: string
  date: string
  description?: string
  content: string
  categories?: string[]
  tags?: string[]
  author?: string
  image?: string
  pathCategory?: string
}

export function getPostSlugs(): string[] {
  return getPostIndex().map((entry) => entry.slug)
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const index = getPostIndex()
    const matches = index.filter((entry) => entry.slug === slug)
    if (matches.length === 0) return null
    if (matches.length > 1) {
      console.warn(
        `Duplicate slug "${slug}" found in multiple folders. Using first match:`,
        matches.map((m) => m.fullPath)
      )
    }
    const fullPath = matches[0].fullPath
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const categoryFromPath = getCategoryFromPath(fullPath)
    const categoriesFromFrontMatter = Array.isArray(data.categories)
      ? data.categories
      : data.categories
        ? [data.categories]
        : []
    const normalizedCategories = categoriesFromFrontMatter
      .filter((cat) => typeof cat === 'string')
      .map((cat) => cat.trim())
      .filter((cat) => cat.length > 0)
    const categories =
      normalizedCategories.length > 0
        ? normalizedCategories
        : categoryFromPath
          ? [categoryFromPath]
          : []
    const meta = parseFilenameMeta(fullPath)
    const tagsFromFrontMatter = Array.isArray(data.tags)
      ? data.tags
      : data.tags
        ? [data.tags]
        : []
    const tags = tagsFromFrontMatter
      .filter((tag) => typeof tag === 'string')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    return {
      slug,
      title: data.title || meta.title,
      date: data.date || meta.date,
      description: data.description,
      content,
      categories,
      tags,
      author: data.author,
      image: data.image?.path || data.image,
      pathCategory: categoryFromPath ?? undefined,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(post => 
    post.categories?.some(cat => 
      typeof cat === 'string' &&
      cat.trim() !== '' &&
      cat.toLowerCase() === category.toLowerCase()
    )
  )
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => 
    post.tags?.some(t => 
      typeof t === 'string' &&
      t.trim() !== '' &&
      t.toLowerCase() === tag.toLowerCase()
    )
  )
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  posts.forEach(post => {
    post.categories?.forEach(cat => {
      if (typeof cat !== 'string') return
      const trimmed = cat.trim()
      if (trimmed === '') return
      categories.add(trimmed)
    })
  })
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      if (typeof tag !== 'string') return
      const trimmed = tag.trim()
      if (trimmed === '') return
      tags.add(trimmed)
    })
  })
  return Array.from(tags).sort()
}

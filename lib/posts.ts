import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

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
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description,
      content,
      categories: data.categories || [],
      tags: data.tags || [],
      author: data.author,
      image: data.image?.path || data.image,
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
      cat.toLowerCase() === category.toLowerCase()
    )
  )
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => 
    post.tags?.some(t => 
      t.toLowerCase() === tag.toLowerCase()
    )
  )
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  posts.forEach(post => {
    post.categories?.forEach(cat => categories.add(cat))
  })
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

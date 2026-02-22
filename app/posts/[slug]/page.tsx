import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { siteConfig } from '@/siteConfig'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: encodeURIComponent(post.slug),
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const post = getPostBySlug(decodedSlug)

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    }
  }

  const canonicalPath = `/posts/${encodeURIComponent(post.slug)}`

  return {
    title: post.title,
    description: post.description || `${siteConfig.title}의 포스트`,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'article',
      url: `${siteConfig.siteUrl}${canonicalPath}`,
      title: post.title,
      description: post.description || `${siteConfig.title}의 포스트`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const post = getPostBySlug(decodedSlug)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none -mt-16">
      <header className="not-prose mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        {post.description && (
          <p className="text-lg text-[var(--text-muted)] mb-6">
            {post.description}
          </p>
        )}

        <div className="text-[var(--text-muted)] mb-6">
          {(() => {
            const d = post.date ? new Date(post.date) : null
            const isValid = d && !Number.isNaN(d.getTime())
            return isValid ? (
              <span className="text-sm">
                {format(d, 'yyyy년 MM월 dd일 HH:mm')}
              </span>
            ) : null
          })()}
        </div>

        {post.image && (
          <div className="my-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-lg"
            />
          </div>
        )}
      </header>

      <div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="not-prose mt-12 pt-6 border-t border-[var(--border)]">
        {post.categories && post.categories.length > 0 && (
          <div className="mb-4 text-[var(--text-muted)]">
            <span className="mr-2">📁</span>
            {post.categories.map((category, index) => (
              <span key={category}>
                <a
                  href={`/categories/${category.toLowerCase()}`}
                  className="hover:underline"
                >
                  {category}
                </a>
                {index < post.categories!.length - 1 && ', '}
              </span>
            ))}
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="mr-2">🏷️</span>
            {post.tags.map((tag) => (
              <a
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

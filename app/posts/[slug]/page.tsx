import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        {post.description && (
          <p className="text-lg text-[var(--text-muted)] mb-6">
            {post.description}
          </p>
        )}

        <div className="text-[var(--text-muted)] mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span>
              <span className="mr-2">작성일:</span>
              <time dateTime={post.date}>
                {format(new Date(post.date), 'yyyy년 MM월 dd일')}
              </time>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>
              작성자: <em>{post.author || '이정민'}</em>
            </span>
          </div>
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

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-12 pt-6 border-t border-[var(--border)]">
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

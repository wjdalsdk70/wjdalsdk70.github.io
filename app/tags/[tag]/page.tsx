import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getPostsByTag, getAllTags } from '@/lib/posts'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage({ params }: { params: Promise<{ tag?: string }> }) {
  const resolvedParams = await params
  if (!resolvedParams?.tag) {
    notFound()
  }
  const tagParam = decodeURIComponent(resolvedParams.tag)

  const tags = getAllTags()
  const tag = tags.find(
    t =>
      typeof t === 'string' &&
      t.trim() !== '' &&
      t.toLowerCase() === tagParam.toLowerCase()
  )

  if (!tag) {
    notFound()
  }

  const posts = getPostsByTag(tag)

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none -mt-16">
      <h1>{tag}</h1>
      <div className="not-prose">
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug} className="flex items-center gap-3">
                <span className="text-[var(--text-muted)]">•</span>
                <a href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.title}
                </a>
                <span
                  className="flex-1 border-b border-dotted border-[var(--border)]"
                  aria-hidden="true"
                />
                {(() => {
                  const d = post.date ? new Date(post.date) : null
                  const isValid = d && !Number.isNaN(d.getTime())
                  return (
                    <time className="text-sm text-[var(--text-muted)]" dateTime={isValid ? d.toISOString() : undefined}>
                      {isValid ? format(d, 'MMM d, yyyy') : ''}
                    </time>
                  )
                })()}
              </li>
            ))}
          </ul>
        ) : (
          <p>이 태그에 작성된 글이 없습니다.</p>
        )}
      </div>
    </div>
  )
}

import { notFound } from 'next/navigation'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import { format } from 'date-fns'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    // keep original casing for folder-based category names
    category: category || 'unknown',
  }))
}

// 1. params를 Promise로 정의 (Next.js 최신 버전 필수 사항)
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  // 2. params를 await로 기다립니다.
  const resolvedParams = await params;
  const targetCategory = resolvedParams?.category;

  if (!targetCategory) {
    notFound()
  }

  const categories = getAllCategories()
  
  // 3. find 로직에서 안전하게 비교
  const category = categories.find(
    c =>
      typeof c === 'string' &&
      c.trim() !== '' &&
      c.toLowerCase() === targetCategory.toLowerCase()
  )

  if (!category) {
    notFound()
  }

  const posts = getPostsByCategory(category)

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none -mt-16">
      <h1>{category}</h1>
      <div className="not-prose">
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug} className="flex items-center gap-3">
                <span className="text-[var(--text-muted)]">•</span>
                <a href={`/posts/${encodeURIComponent(post.slug)}`} className="text-blue-600 hover:underline">
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
          <p>이 카테고리에 작성된 글이 없습니다.</p>
        )}
      </div>
    </div>
  )
}

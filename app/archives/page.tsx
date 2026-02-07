import Link from 'next/link'
import { format } from 'date-fns'
import { getAllPosts } from '@/lib/posts'

export default function ArchivesPage() {
  const posts = getAllPosts()
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof posts>)

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none -mt-16">
      <h1>Archives</h1>
      <div className="not-prose space-y-10">
        {years.map((year) => (
          <div key={year} className="relative">
            <div className="flex items-start gap-10">
              <div className="w-20 text-2xl font-semibold text-[var(--text-muted)]">
                {year}
              </div>
              <div className="relative flex-1 pl-6">
                <div className="absolute left-2 top-1.5 bottom-1.5 w-px bg-[var(--border)]" />
                <ul className="space-y-5">
                  {postsByYear[year].map((post) => {
                    const d = post.date ? new Date(post.date) : null
                    const isValid = d && !Number.isNaN(d.getTime())
                    return (
                      <li key={post.slug} className="relative pl-6">
                        <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-[var(--text-muted)]" />
                        <div className="flex items-center gap-4">
                          <time
                            className="w-16 text-sm text-[var(--text-muted)]"
                            dateTime={isValid ? d.toISOString() : undefined}
                          >
                            {isValid ? format(d, 'dd MMM') : ''}
                          </time>
                          <Link
                            href={`/posts/${encodeURIComponent(post.slug)}`}
                            className="text-blue-600 hover:underline"
                          >
                            {post.title}
                          </Link>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

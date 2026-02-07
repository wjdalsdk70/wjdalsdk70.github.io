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
      <div className="space-y-8">
        {years.map((year) => (
          <div key={year}>
            <h2 className="text-2xl font-semibold mb-4">{year}</h2>
            <ul className="space-y-2">
              {postsByYear[year].map((post) => (
                <li key={post.slug} className="flex items-center gap-4">
                  <time className="text-[var(--text-muted)] text-sm min-w-[100px]">
                    {format(new Date(post.date), 'MM월 dd일')}
                  </time>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

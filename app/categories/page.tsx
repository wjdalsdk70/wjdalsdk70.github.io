import Link from 'next/link'
import { getAllCategories, getPostsByCategory } from '@/lib/posts'

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none -mt-16">
      <h1>Categories</h1>
      <div className="not-prose space-y-4">
        {categories.map((category) => {
          const posts = getPostsByCategory(category)
          return (
            <div
              key={category}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="text-[var(--text-muted)]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <Link
                  href={`/categories/${category}`}
                  className="text-base font-semibold text-blue-600 hover:underline"
                >
                  {category}
                </Link>
                <span className="text-sm text-[var(--text-muted)]">
                  {posts.length} posts
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

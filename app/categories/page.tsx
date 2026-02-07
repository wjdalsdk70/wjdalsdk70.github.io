import Link from 'next/link'
import { getAllCategories, getPostsByCategory } from '@/lib/posts'

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none -mt-16">
      <h1>Categories</h1>
      <div className="space-y-6">
        {categories.map((category) => {
          const posts = getPostsByCategory(category)
          return (
            <div key={category}>
              <h2 className="text-2xl font-semibold mb-3">
                <Link
                  href={`/categories/${category.toLowerCase()}`}
                  className="hover:underline"
                >
                  {category}
                </Link>
                <span className="ml-2 text-lg text-[var(--text-muted)]">
                  ({posts.length})
                </span>
              </h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                {posts.map((post) => (
                  <li key={post.slug}>
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
          )
        })}
      </div>
    </div>
  )
}

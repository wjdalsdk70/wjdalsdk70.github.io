import Link from 'next/link'
import { getAllTags, getPostsByTag } from '@/lib/posts'

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none -mt-16">
      <h1>Tags</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const posts = getPostsByTag(tag)
          return (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {tag} ({posts.length})
            </Link>
          )
        })}
      </div>
    </div>
  )
}

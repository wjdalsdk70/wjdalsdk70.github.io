import { notFound } from 'next/navigation'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categories = getAllCategories()
  const category = categories.find(
    c => c.toLowerCase() === params.category.toLowerCase()
  )

  if (!category) {
    notFound()
  }

  const posts = getPostsByCategory(category)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Category: {category}</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

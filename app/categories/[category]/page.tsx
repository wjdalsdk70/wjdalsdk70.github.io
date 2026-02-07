import { notFound } from 'next/navigation'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    // category가 undefined거나 null일 경우를 대비해 안전하게 처리
    category: category?.toLowerCase() || 'unknown',
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
    <div>
      <h1 className="text-3xl font-bold mb-8 capitalize">Category: {category}</h1>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p>이 카테고리에 작성된 글이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
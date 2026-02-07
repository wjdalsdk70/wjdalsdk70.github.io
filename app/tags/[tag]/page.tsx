import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }))
}

export default function TagPage({ params }: { params: { tag?: string } }) {
  if (!params?.tag) {
    notFound()
  }
  const tagParam = params.tag

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
    <div>
      <h1 className="text-3xl font-bold mb-8">Tag: {tag}</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

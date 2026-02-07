import { getAllPosts } from '@/lib/posts'
import PostSearch from '@/components/PostSearch'

export default function Home() {
  const posts = getAllPosts()

  return (
    <PostSearch posts={posts} />
  )
}

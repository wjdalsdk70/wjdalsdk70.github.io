'use client'

import { useMemo, useState } from 'react'
import PostCard from '@/components/PostCard'
import { Post } from '@/lib/posts'

interface PostSearchProps {
  posts: Post[]
}

function matches(post: Post, query: string) {
  const haystack = [
    post.title,
    post.description,
    post.author,
    post.categories?.join(' '),
    post.tags?.join(' '),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(query)
}

export default function PostSearch({ posts }: PostSearchProps) {
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!normalized) return posts
    return posts.filter((post) => matches(post, normalized))
  }, [posts, normalized])

  return (
    <div className="space-y-6">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-md">
          <label htmlFor="post-search" className="sr-only">
            블로그 글 검색
          </label>
          <input
            id="post-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="블로그 글 검색"
            className="w-full rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-5 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div id="post-list" className="space-y-6">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-[var(--text-muted)]">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

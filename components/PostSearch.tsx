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
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M21 21l-4.35-4.35m1.6-4.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id="post-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="키워드로 검색"
              className="w-full rounded-full border border-[var(--border)] bg-[var(--card-bg)] pl-11 pr-16 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div id="post-list" className="space-y-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[var(--text-muted)]">
          <span className="h-px flex-1 bg-[var(--border)]" />
          <span>Recent Posts</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
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

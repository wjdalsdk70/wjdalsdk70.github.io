'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { Post } from '@/lib/posts'
import { CalendarIcon, FolderIcon } from './icons'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-[var(--border)] py-8">
      <Link href={`/posts/${encodeURIComponent(post.slug)}`} className="block">
        <div className="flex items-start gap-8">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight mb-2 hover:text-blue-600 transition-colors">
              {post.title}
            </h1>
            
            {post.description && (
              <div className="text-[var(--text-muted)] mb-4 line-clamp-2">
                <p>{post.description}</p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              {(() => {
                const d = post.date ? new Date(post.date) : null
                const isValid = d && !Number.isNaN(d.getTime())
                return (
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4 text-[var(--text-muted)]" />
                    <time dateTime={isValid ? d.toISOString() : undefined}>
                      {isValid ? format(d, 'yyyy년 MM월 dd일') : ''}
                    </time>
                  </span>
                )
              })()}
              {post.categories && post.categories.length > 0 && (
                <span className="flex items-center gap-1">
                  <FolderIcon className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="categories">
                    {post.categories.join(', ')}
                  </span>
                </span>
              )}
              {post.tags && post.tags.length > 0 && (
                <span className="text-[var(--text-muted)]">
                  #{post.tags.join(', ')}
                </span>
              )}
            </div>
          </div>
          {post.image && (
            <div className="hidden md:block w-40 shrink-0">
              <img
                src={post.image}
                alt={post.title}
                className="h-28 w-40 rounded-md object-cover"
              />
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}

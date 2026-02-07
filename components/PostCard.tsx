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
    <article className="card bg-[var(--card-bg)] border border-[var(--border)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex flex-col md:flex-row-reverse">
          {post.image && (
            <div className="md:w-2/5">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
          )}
          <div className={`${post.image ? 'md:w-3/5' : 'w-full'} p-6 flex flex-col`}>
            <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
            
            {post.description && (
              <div className="text-[var(--text-muted)] mb-4 line-clamp-2">
                <p>{post.description}</p>
              </div>
            )}

            <div className="mt-auto flex items-center justify-between text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-4">
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
                  <span className="flex items-center gap-1 text-[var(--text-muted)]">
                    <span className="text-xs">#</span>
                    <span>{post.tags.join(', ')}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

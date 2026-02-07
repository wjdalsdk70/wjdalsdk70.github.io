'use client'

import Link from 'next/link'
import { format } from 'date-fns'

export interface RecentPost {
  slug: string
  title: string
  date: string
}

interface RightSidebarProps {
  recentPosts: RecentPost[]
  songUrl: string
}

function toYouTubeEmbed(url: string) {
  try {
    const parsed = new URL(url)
    const id = parsed.searchParams.get('v')
    if (!id) return null
    const list = parsed.searchParams.get('list')
    const startRadio = parsed.searchParams.get('start_radio')
    const params = new URLSearchParams()
    if (list) params.set('list', list)
    if (startRadio) params.set('start_radio', startRadio)
    const qs = params.toString()
    return `https://www.youtube.com/embed/${id}${qs ? `?${qs}` : ''}`
  } catch {
    return null
  }
}

export default function RightSidebar({ recentPosts, songUrl }: RightSidebarProps) {
  const embedUrl = toYouTubeEmbed(songUrl)
  return (
    <aside className="hidden xl:flex w-80 bg-[var(--sidebar-bg)] flex-col px-6 pt-16 pb-4 border-l border-[var(--border)] fixed inset-y-0 right-0 overflow-y-auto">
      <section className="w-full mb-10">
        <h2 className="text-sm font-semibold mb-4">최근 글</h2>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.slug} className="flex flex-col gap-1">
              <Link
                href={`/posts/${post.slug}`}
                className="text-sm font-medium hover:underline"
              >
                {post.title}
              </Link>
              <time className="text-xs text-[var(--text-muted)]" dateTime={post.date || undefined}>
                {post.date ? format(new Date(post.date), 'yyyy.MM.dd') : ''}
              </time>
            </li>
          ))}
          {recentPosts.length === 0 && (
            <li className="text-sm text-[var(--text-muted)]">최근 글이 없습니다.</li>
          )}
        </ul>
      </section>

      <section className="w-full">
        <h2 className="text-sm font-semibold mb-4">노래</h2>
        <div className="p-0">
          {embedUrl ? (
            <div className="aspect-video w-full overflow-hidden rounded-md border border-[var(--border)] bg-black">
              <iframe
                title="YouTube Music"
                src={embedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">
              유효한 YouTube 링크가 필요합니다.
            </p>
          )}
        </div>
      </section>
    </aside>
  )
}

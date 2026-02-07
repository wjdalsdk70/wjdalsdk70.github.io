'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function formatSegment(segment: string) {
  return segment
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatRaw(segment: string) {
  return decodeURIComponent(segment)
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname?.split('/').filter(Boolean) ?? []

  let crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const isCategorySegment = segments[index - 1] === 'categories'
    const isTagSegment = segments[index - 1] === 'tags'
    return {
      href,
      label: isCategorySegment || isTagSegment
        ? formatRaw(segment)
        : formatSegment(decodeURIComponent(segment)),
    }
  })

  // For post detail pages, show: Home / <filename>
  if (segments[0] === 'posts' && segments[1]) {
    const slug = decodeURIComponent(segments[1])
    crumbs = [{ href: `/posts/${slug}`, label: slug }]
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <div className="flex flex-wrap items-center gap-2 text-[var(--text-muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li className="flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--text)] transition-colors">
              Home
            </Link>
          </li>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                <span className="text-[var(--border)]">/</span>
                {isLast ? (
                  <span className="text-[var(--text)]">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-[var(--text)] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

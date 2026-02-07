'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function formatSegment(segment: string) {
  return segment
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname?.split('/').filter(Boolean) ?? []

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    return {
      href,
      label: formatSegment(decodeURIComponent(segment)),
    }
  })

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

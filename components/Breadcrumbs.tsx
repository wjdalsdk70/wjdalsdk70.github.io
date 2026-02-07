'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/siteConfig'

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

  // If we're on a post detail page, show: Home / Categories / <Category> / <Title>
  if (segments[0] === 'posts' && segments[1]) {
    const slug = decodeURIComponent(segments[1])
    const label = siteConfig.postTitleMap?.[slug] ?? formatSegment(slug)
    const category =
      siteConfig.postCategoryMap?.[slug] ??
      siteConfig.postDefaultCategory ??
      null

    const nextCrumbs = [
      { href: '/categories', label: 'Categories' },
    ]
    if (category) {
      nextCrumbs.push({
        href: `/categories/${category.toLowerCase()}`,
        label: category,
      })
    }
    nextCrumbs.push({ href: `/posts/${slug}`, label })
    crumbs = nextCrumbs
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

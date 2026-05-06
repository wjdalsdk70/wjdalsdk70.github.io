'use client'

import Link from 'next/link'
import ThemeProvider from './ThemeProvider'
import { useTheme } from './ThemeProvider'
import { MoonIcon, SunIcon } from './icons'
import { siteConfig } from '@/siteConfig'

function PortfolioShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/#intro" className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-[var(--accent)] text-sm font-black text-white">
              JM
            </span>
            <span className="truncate text-sm font-bold tracking-normal">
              {siteConfig.title}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--nav-hover-bg)] hover:text-[var(--foreground)]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--accent)]"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <PortfolioShell>{children}</PortfolioShell>
    </ThemeProvider>
  )
}

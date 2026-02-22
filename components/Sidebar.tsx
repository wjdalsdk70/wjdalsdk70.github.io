'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import Image from 'next/image'
import { HomeIcon, AboutIcon, ArchivesIcon, CategoriesIcon, TagsIcon, MoonIcon, SunIcon } from './icons'
import { siteConfig } from '@/siteConfig'

const navIconMap = {
  '/': HomeIcon,
  '/about': AboutIcon,
  '/archives': ArchivesIcon,
  '/categories': CategoriesIcon,
  '/tags': TagsIcon,
} as const

export default function Sidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className="hidden md:flex w-[17.5rem] flex-col px-6 pt-16 pb-4 border-r border-[var(--border)] fixed inset-y-0 left-0 overflow-y-auto bg-[linear-gradient(180deg,#fff7d6_0%,#fff3c4_35%,#fffbe6_100%),radial-gradient(70%_40%_at_20%_10%,rgba(250,204,21,0.22),transparent_60%),radial-gradient(60%_30%_at_80%_25%,rgba(253,224,71,0.18),transparent_60%)] dark:bg-[linear-gradient(180deg,#2f2a19_0%,#262214_40%,#312b19_100%),radial-gradient(70%_40%_at_20%_10%,rgba(250,204,21,0.08),transparent_60%),radial-gradient(60%_30%_at_80%_25%,rgba(253,224,71,0.06),transparent_60%)]">
      <header className="w-full mb-8">
        <Link href="/" className="block mb-4">
          <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-600 mb-4 overflow-hidden flex items-center justify-center mx-auto">
            {siteConfig.avatar ? (
              <Image
                src={siteConfig.avatar}
                alt="avatar"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <span className="text-4xl">👤</span>
            )}
          </div>
        </Link>
        <Link href="/" className="block text-center">
          <h1 className="text-xl font-bold mb-1">{siteConfig.title}</h1>
          <p className="text-sm text-[var(--text-muted)] italic">
            {siteConfig.tagline}
          </p>
        </Link>
      </header>

      <nav className="flex-1 w-full">
        <ul className="space-y-2">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname?.startsWith(item.href))
            const Icon = navIconMap[item.href as keyof typeof navIconMap]
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${
                    isActive
                      ? 'bg-[var(--nav-active-bg)] text-[var(--nav-active-text)]'
                      : 'hover:bg-[var(--nav-hover-bg)]'
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="w-full flex items-center justify-center gap-3 pt-4 border-t border-[var(--border)]">
        <div className="flex gap-4">
          <button
            onClick={toggleTheme}
            className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/60 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
          <a
            href={`https://github.com/${siteConfig.social.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/60 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/60 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
            </svg>
          </a>
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/60 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 transition-colors"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}

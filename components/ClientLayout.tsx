'use client'

import Sidebar from './Sidebar'
import Breadcrumbs from './Breadcrumbs'
import ThemeProvider from './ThemeProvider'
import RightSidebar, { RecentPost } from './RightSidebar'

export default function ClientLayout({
  children,
  recentPosts,
  songUrl,
}: {
  children: React.ReactNode
  recentPosts: RecentPost[]
  songUrl: string
}) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="w-full px-2 md:px-8 pt-8">
            <Breadcrumbs />
          </div>
          <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 pt-4 pb-8">
            {children}
          </main>
        </div>
        <RightSidebar recentPosts={recentPosts} songUrl={songUrl} />
      </div>
    </ThemeProvider>
  )
}

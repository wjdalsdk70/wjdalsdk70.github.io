import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/siteConfig'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.tagline,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const recentPosts = getAllPosts()
    .slice(0, 5)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
    }))
  const songUrl = siteConfig.songUrl

  return (
    <html lang="ko-KR" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout recentPosts={recentPosts} songUrl={songUrl}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}

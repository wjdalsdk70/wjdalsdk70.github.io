import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/siteConfig'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.tagline,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.siteUrl,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.tagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
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

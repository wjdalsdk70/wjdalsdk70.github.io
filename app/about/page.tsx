// app/about/page.tsx
import { siteConfig } from '@/siteConfig'
import AboutClient from './about-client'

function toPdfUrl(url?: string) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()
  if (!trimmed) return null
  if (trimmed.includes('drive.google.com') && trimmed.includes('/file/d/')) {
    const match = trimmed.match(/\/file\/d\/([^/]+)/)
    if (match?.[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`
    }
  }
  return trimmed
}

export default function AboutPage() {
  const resumePdfSrc = toPdfUrl(siteConfig.aboutUrl)
  const portfolioPdfSrc = toPdfUrl(siteConfig.portfolioUrl)

  if (!resumePdfSrc && !portfolioPdfSrc) {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none -mt-16">
        <h1>About</h1>
        <p>PDF 경로가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none -mt-16">
      <h1>About</h1>
      <div className="not-prose">
        <AboutClient resumeUrl={resumePdfSrc} portfolioUrl={portfolioPdfSrc} />
      </div>
    </div>
  )
}

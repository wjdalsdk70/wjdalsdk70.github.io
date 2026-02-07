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
  const pdfSrc = toPdfUrl(siteConfig.aboutUrl)

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none -mt-16">
      <h1>About</h1>
      {pdfSrc ? (
        <div className="not-prose">
          {/* 이제 이 컴포넌트는 오직 브라우저에서만 실행됩니다. */}
          <AboutClient fileUrl={pdfSrc} />
        </div>
      ) : (
        <p>PDF 경로가 없습니다.</p>
      )}
    </div>
  )
}

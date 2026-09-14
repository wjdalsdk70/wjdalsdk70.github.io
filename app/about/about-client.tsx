'use client'

import dynamic from 'next/dynamic'

const PDFViewer = dynamic(() => import('@/components/AboutPDF'), {
  ssr: false,
  loading: () => <p>뷰어를 로딩 중입니다...</p>,
})

type AboutClientProps = {
  resumeUrl?: string | null
}

export default function AboutClient({ resumeUrl }: AboutClientProps) {
  return (
    <div>
      {resumeUrl ? (
        <PDFViewer fileUrl={resumeUrl} />
      ) : (
        <p className="text-sm text-gray-500">이력서 PDF 경로가 없습니다.</p>
      )}
    </div>
  )
}

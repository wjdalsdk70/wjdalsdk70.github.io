'use client'

import dynamic from 'next/dynamic'

const PDFViewer = dynamic(() => import('@/components/AboutPDF'), {
  ssr: false,
  loading: () => <p>뷰어를 로딩 중입니다...</p>,
})

type AboutClientProps = {
  fileUrl: string
}

export default function AboutClient({ fileUrl }: AboutClientProps) {
  return <PDFViewer fileUrl={fileUrl} />
}

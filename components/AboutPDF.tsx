'use client'

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// Worker 설정: 버전 호환성을 위해 유동적인 경로 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

type AboutPDFProps = {
  fileUrl: string
}

export default function AboutPDF({ fileUrl }: AboutPDFProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  // 서버 사이드 렌더링과 클라이언트 렌더링의 불일치(Hydration Error) 방지
  useEffect(() => {
    setIsClient(true)
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  if (!isClient) return <div className="p-4 text-center">뷰어를 준비 중입니다...</div>

  return (
    <div className="flex flex-col items-center border rounded-lg overflow-hidden bg-gray-50 p-4 shadow-inner">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="p-10 text-gray-500">PDF 문서를 불러오는 중...</div>}
        error={<div className="p-10 text-red-500">PDF를 불러오지 못했습니다. 경로를 확인해주세요.</div>}
      >
        {numPages ? (
          Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              // 반응형 너비 설정 (모바일 대응)
              width={Math.min(window.innerWidth - 64, 800)}
              className="shadow-lg mb-6"
            />
          ))
        ) : null}
      </Document>
      
      {numPages && (
        <div className="mt-4 px-4 py-1 bg-white rounded-full border text-xs text-gray-600 font-medium shadow-sm">
          총 {numPages} 페이지
        </div>
      )}
    </div>
  )
}

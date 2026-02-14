'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const PDFViewer = dynamic(() => import('@/components/AboutPDF'), {
  ssr: false,
  loading: () => <p>뷰어를 로딩 중입니다...</p>,
})

type TabKey = 'resume' | 'portfolio'

type AboutClientProps = {
  resumeUrl?: string | null
  portfolioUrl?: string | null
}

export default function AboutClient({ resumeUrl, portfolioUrl }: AboutClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('resume')

  const tabs: Array<{ key: TabKey; label: string; fileUrl?: string | null }> = [
    { key: 'resume', label: '이력서', fileUrl: resumeUrl },
    { key: 'portfolio', label: '포트폴리오', fileUrl: portfolioUrl },
  ]

  const activeFileUrl = tabs.find((tab) => tab.key === activeTab)?.fileUrl

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.key
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeFileUrl ? (
        <PDFViewer key={activeTab} fileUrl={activeFileUrl} />
      ) : (
        <p className="text-sm text-gray-500">선택한 탭의 PDF 경로가 없습니다.</p>
      )}
    </div>
  )
}

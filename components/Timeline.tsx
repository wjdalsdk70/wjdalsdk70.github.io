// 개발 여정을 세로 타임라인으로 렌더링하고 프로젝트 상세 모달을 여는 클라이언트 컴포넌트
'use client'

import { useState } from 'react'
import { ProjectModal } from '@/components/ProjectSection'
import type { Project } from '@/lib/projects-data'
import { KIND_LABEL, type TimelineEntry } from '@/lib/timeline-data'

function formatMonth(ym: string) {
  const [y, m] = ym.split('-')
  return `${y}.${m}`
}

function formatRange(entry: TimelineEntry) {
  return `${formatMonth(entry.start)} ~ ${entry.end ? formatMonth(entry.end) : '현재'}`
}

export default function Timeline({ entries, projects }: { entries: TimelineEntry[]; projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null)
  const sorted = [...entries].sort((a, b) => b.start.localeCompare(a.start))

  const open = (slug?: string) => {
    if (!slug) return
    const project = projects.find((p) => p.slug === slug)
    if (project) setSelected(project)
  }

  let lastYear = ''

  return (
    <>
      <ol className="journey">
        {sorted.map((entry) => {
          const year = entry.start.slice(0, 4)
          const showYear = year !== lastYear
          lastYear = year
          const ongoing = !entry.end
          const clickable = Boolean(entry.projectSlug)

          return (
            <li key={entry.id} className={`journey-item journey-${entry.kind}${ongoing ? ' is-ongoing' : ''}`}>
              {showYear && <span className="journey-year">{year}</span>}
              <span className="journey-dot" aria-hidden="true" />
              <article
                className={`journey-card${clickable ? ' is-clickable' : ''}`}
                onClick={() => open(entry.projectSlug)}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (clickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    open(entry.projectSlug)
                  }
                }}
              >
                <p className="journey-meta">
                  <span className="journey-kind">{KIND_LABEL[entry.kind]}</span>
                  <span className="journey-range">{formatRange(entry)}</span>
                </p>
                <h3>{entry.title}</h3>
                <p className="journey-subtitle">{entry.subtitle}</p>
                <p className="journey-summary">{entry.summary}</p>

                {entry.stats && (
                  <div className="journey-stats">
                    {entry.stats.map((s) => (
                      <div key={s.label} className="journey-stat">
                        <strong>{s.value}</strong>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {(entry.stack || entry.link || clickable) && (
                  <div className="journey-tags">
                    {entry.stack?.map((tech) => (
                      <span key={tech} className="project-tag">{tech}</span>
                    ))}
                    {entry.link && (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-tag project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ↗ {entry.kind === 'harness' ? 'GitHub' : '서비스 보기'}
                      </a>
                    )}
                    {clickable && <span className="journey-more">자세히 보기 →</span>}
                  </div>
                )}
              </article>
            </li>
          )
        })}
      </ol>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

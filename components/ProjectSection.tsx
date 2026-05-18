// 프로젝트 카드 그리드와 상세 모달을 관리하는 클라이언트 컴포넌트
'use client'

import { useState, useEffect } from 'react'

export type Project = {
  title: string
  type: string
  description: string
  points: string[]
  stack: string[]
  link?: string
  detail: {
    period: string
    team: string
    features: string[]
    achievements: string[]
  }
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">✕</button>

        <div className="modal-header">
          <span className="modal-type">{project.type}</span>
          <h2>{project.title}</h2>
          <div className="modal-meta">
            <span>{project.detail.period}</span>
            <span className="modal-meta-sep">·</span>
            <span>{project.detail.team}</span>
          </div>
        </div>

        <p className="modal-desc">{project.description}</p>

        <div className="modal-section">
          <h3>주요 구현 기능</h3>
          <ul>
            {project.detail.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>성과 · 트러블슈팅</h3>
          <ul>
            {project.detail.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="modal-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="project-tag">{tech}</span>
          ))}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-tag project-link"
            >
              ↗ 서비스 보기
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectSection({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <>
      <div className="project-grid">
        {projects.map((project, idx) => (
          <article
            key={project.title}
            className="project-card"
            onClick={() => setSelected(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(project) }}
            style={{ cursor: 'pointer' }}
          >
            <div>
              <div className="flex items-start justify-between">
                <span>{project.type}</span>
                <span className="project-number">0{idx + 1}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <div>
              <ul>
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="project-tag">{tech}</span>
                ))}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-tag project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ↗ 서비스 보기
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

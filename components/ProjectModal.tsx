// 프로젝트 상세 정보를 보여주는 인라인 모달 컴포넌트
'use client'

import { useEffect, useCallback } from 'react'
import type { Project } from '@/lib/projects-data'

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => { if (e.target === e.currentTarget) onClose() },
    [onClose]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-panel" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="닫기">✕</button>

        <div className="modal-body">
          <header className="project-detail-header">
            <span className="project-detail-type">{project.type}</span>
            <h1>{project.title}</h1>
            <div className="project-detail-meta">
              <span>{project.detail.period}</span>
              <span>·</span>
              <span>{project.detail.team}</span>
            </div>
            <p className="project-detail-desc">{project.description}</p>
          </header>

          <section className="project-detail-section">
            <h2>주요 구현 기능</h2>
            <ul>
              {project.detail.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section className="project-detail-section">
            <h2>성과</h2>
            <ul>
              {project.detail.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>

          {project.troubleshooting && project.troubleshooting.length > 0 && (
            <section className="project-detail-section">
              <h2>트러블슈팅</h2>
              <div className="ts-list">
                {project.troubleshooting.map((item, idx) => (
                  <article key={idx} className="ts-item">
                    <h3>
                      <span className="ts-number">{idx + 1}</span>
                      {item.title}
                    </h3>
                    <dl>
                      <div><dt>Situation</dt><dd>{item.situation}</dd></div>
                      <div><dt>Task</dt><dd>{item.task}</dd></div>
                      <div><dt>Action</dt><dd>{item.action}</dd></div>
                      <div><dt>Result</dt><dd>{item.result}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          )}

          <div className="project-detail-stack">
            {project.stack.map((tech) => (
              <span key={tech} className="detail-tag">{tech}</span>
            ))}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-tag detail-link"
              >
                ↗ 서비스 보기
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

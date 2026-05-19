// 프로젝트 카드 그리드를 렌더링하는 클라이언트 컴포넌트
'use client'

import { useRouter } from 'next/navigation'
import type { Project } from '@/lib/projects-data'

export type { Project }

export default function ProjectSection({ projects }: { projects: Project[] }) {
  const router = useRouter()

  return (
    <div className="project-grid">
      {projects.map((project, idx) => (
        <article
          key={project.title}
          className="project-card"
          onClick={() => router.push(`/projects/${project.slug}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push(`/projects/${project.slug}`) }}
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
  )
}

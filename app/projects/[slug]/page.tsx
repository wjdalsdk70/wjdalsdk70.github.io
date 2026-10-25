// 프로젝트 상세 페이지 - 구현 기능, 성과, 케이스 스터디형 트러블슈팅 표시
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects-data'
import { CaseStudyList } from '@/components/CaseStudyList'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <div className="project-detail-page">
      <div className="project-detail-inner">
        <Link href="/#projects" className="project-back">← 프로젝트 목록</Link>

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

        {project.cases && project.cases.length > 0 && (
          <section className="project-detail-section">
            <h2>트러블슈팅</h2>
            <CaseStudyList cases={project.cases} />
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
  )
}

// 플립북의 한 쪽을 kind 별로 렌더링하는 컴포넌트 (표지·저자·목차·장 표제·내용·맺음말)
import Image from 'next/image'
import Link from 'next/link'
import { FaJava, FaAws } from 'react-icons/fa'
import { SiSpringboot, SiFastapi, SiApachekafka, SiMysql, SiRedis, SiMongodb, SiDocker, SiGithubactions, SiTerraform, SiNextdotjs } from 'react-icons/si'
import { siteConfig } from '@/siteConfig'
import type { BookPage as BookPageData } from '@/lib/book-data'
import { COMPACT_KINDS, KIND_LABEL, type TimelineEntry } from '@/lib/timeline-data'

const skills = [
  { name: 'Java',           Icon: FaJava,          color: '#E76F00' },
  { name: 'Spring Boot',    Icon: SiSpringboot,    color: '#6DB33F' },
  { name: 'FastAPI',        Icon: SiFastapi,       color: '#009688' },
  { name: 'Kafka',          Icon: SiApachekafka,   color: '#8b8b8b' },
  { name: 'MySQL',          Icon: SiMysql,         color: '#4479A1' },
  { name: 'Redis',          Icon: SiRedis,         color: '#DC382D' },
  { name: 'MongoDB',        Icon: SiMongodb,       color: '#47A248' },
  { name: 'Docker',         Icon: SiDocker,        color: '#2496ED' },
  { name: 'AWS',            Icon: FaAws,           color: '#FF9900' },
  { name: 'GitHub Actions', Icon: SiGithubactions, color: '#2088FF' },
  { name: 'Terraform',      Icon: SiTerraform,     color: '#7B42BC' },
  { name: 'Next.js',        Icon: SiNextdotjs,     color: '#8b8b8b' },
]

const highlights = [
  { value: 'Backend', label: 'MSA 기반 서비스 설계와 안정적인 API 구현에 집중합니다.' },
  { value: 'Infra · DevOps', label: 'CI/CD 파이프라인과 Blue-Green 배포로 운영 안정성을 확보합니다.' },
  { value: 'AI Pipeline', label: 'STT·LLM 기반 파이프라인을 설계하고 데이터 처리를 자동화합니다.' },
]

function formatMonth(ym: string) {
  const [y, m] = ym.split('-')
  return `${y}.${m}`
}

function linkLabel(url: string) {
  if (url.includes('github.com')) return 'GitHub'
  if (url.includes('apps.apple.com')) return 'App Store'
  return '서비스 보기'
}

function formatRange(entry: TimelineEntry) {
  if (entry.end === entry.start) return formatMonth(entry.start)
  return `${formatMonth(entry.start)} ~ ${entry.end ? formatMonth(entry.end) : '현재'}`
}

type Props = {
  page: BookPageData
  pageNumber: number
  onOpenProject: (slug: string) => void
  onGoTo: (pageIndex: number) => void
}

function Entry({ entry, onOpenProject }: { entry: TimelineEntry; onOpenProject: (slug: string) => void }) {
  const compact = COMPACT_KINDS.includes(entry.kind)
  const clickable = Boolean(entry.projectSlug)

  if (compact) {
    return (
      <p className={`book-milestone journey-${entry.kind}`}>
        <span className="journey-kind">{KIND_LABEL[entry.kind]}</span>
        <span className="journey-range">{formatRange(entry)}</span>
        <strong>{entry.title}</strong>
        <span className="journey-milestone-sub">{entry.subtitle}</span>
        {entry.link && (
          <a href={entry.link} target="_blank" rel="noopener noreferrer" className="journey-milestone-link">
            ↗ {linkLabel(entry.link)}
          </a>
        )}
      </p>
    )
  }

  return (
    <article
      className={`book-entry journey-${entry.kind}${clickable ? ' is-clickable' : ''}`}
      onClick={() => entry.projectSlug && onOpenProject(entry.projectSlug)}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onOpenProject(entry.projectSlug!)
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
              ↗ {linkLabel(entry.link)}
            </a>
          )}
          {clickable && <span className="journey-more">자세히 보기 →</span>}
        </div>
      )}
    </article>
  )
}

export default function BookPage({ page, pageNumber, onOpenProject, onGoTo }: Props) {
  switch (page.kind) {
    case 'cover':
      return (
        <div className="book-page book-cover">
          <p className="eyebrow">Backend Developer</p>
          <h1>이정민</h1>
          <p className="book-cover-tagline">{siteConfig.tagline}</p>
          <div className="book-cover-avatar">
            <Image src={siteConfig.avatar} alt="이정민 프로필" priority sizes="220px" />
          </div>
          <p className="book-cover-range">개발 여정 · 2019 — 2026</p>
          <p className="book-cover-hint">쪽을 넘겨 읽어 주세요 →</p>
        </div>
      )

    case 'author':
      return (
        <div className="book-page book-author">
          <p className="eyebrow">About</p>
          <h2>저자 소개</h2>
          <p className="book-body">
            서비스의 안정적인 운영을 위해 장애를 예방하고, 문제 발생 시 빠르게 원인을 파악하고
            대응하는 것을 중요하게 생각합니다. 아키텍처 개선과 부하 테스트를 통해 병목을
            해소하고, 서비스의 안정적인 운영 기반을 구축한 경험이 있습니다.
          </p>
          <ul className="book-highlights">
            {highlights.map((h) => (
              <li key={h.value}>
                <strong>{h.value}</strong>
                <span>{h.label}</span>
              </li>
            ))}
          </ul>
          <div className="book-skills">
            {skills.map((skill) => (
              <span key={skill.name} className="book-skill" style={{ '--brand': skill.color } as React.CSSProperties}>
                <skill.Icon />
                {skill.name}
              </span>
            ))}
          </div>
          <span className="book-folio">{pageNumber}</span>
        </div>
      )

    case 'toc':
      return (
        <div className="book-page book-toc">
          <p className="eyebrow">Contents</p>
          <h2>목차</h2>
          <ol>
            {page.items.map((item) => (
              <li key={item.chapterId}>
                <button type="button" onClick={() => onGoTo(item.page)}>
                  <span className="book-toc-label">{item.label}</span>
                  <span className="book-toc-title">{item.title}</span>
                  <span className="book-toc-dots" aria-hidden="true" />
                  <span className="book-toc-range">{item.range}</span>
                </button>
              </li>
            ))}
          </ol>
          <span className="book-folio">{pageNumber}</span>
        </div>
      )

    case 'chapter':
      return (
        <div className="book-page book-chapter">
          <p className="book-chapter-label">{page.chapter.label}</p>
          <h2>{page.chapter.title}</h2>
          <p className="book-chapter-range">{page.chapter.range}</p>
          <span className="book-folio">{pageNumber}</span>
        </div>
      )

    case 'entries':
      return (
        <div className="book-page book-entries">
          <p className="book-running-head">
            {page.chapter.label} · {page.chapter.title}
          </p>
          <div className="book-entry-list">
            {page.entries.map((entry) => (
              <Entry key={entry.id} entry={entry} onOpenProject={onOpenProject} />
            ))}
          </div>
          <span className="book-folio">{pageNumber}</span>
        </div>
      )

    case 'blank':
      return <div className="book-page book-blank" aria-hidden="true" />

    case 'back':
      return (
        <div className="book-page book-back">
          <span className="book-back-mark">JM</span>
          <p className="book-back-title">이정민 · 개발 여정</p>
          <p className="book-back-sub">Backend Developer</p>
          <p className="book-back-url">wjdalsdk70.github.io</p>
        </div>
      )

    case 'closing':
      return (
        <div className="book-page book-closing">
          <p className="eyebrow">Contact</p>
          <h2>같이 만들 이야기가 있다면 연락 주세요.</h2>
          <div className="book-contact">
            <a href={`mailto:${siteConfig.social.email}`}>{siteConfig.social.email}</a>
            <a href={`https://github.com/${siteConfig.social.github}`} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <Link href="/about">Resume</Link>
          </div>
          <p className="book-closing-end">— 끝 —</p>
          <span className="book-folio">{pageNumber}</span>
        </div>
      )
  }
}

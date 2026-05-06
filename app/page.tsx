import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/siteConfig'

const highlights = [
  { value: 'Frontend', label: '사용자 흐름을 기준으로 화면과 상태를 설계합니다.' },
  { value: 'Backend', label: '도메인과 API 경계를 명확하게 나눠 구현합니다.' },
  { value: 'Cloud', label: '배포, 인증, 운영 환경까지 제품 단위로 연결합니다.' },
]

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'AWS',
  'Cognito',
  'DevOps',
]

const projects = [
  {
    title: '인증 기반 웹 서비스',
    type: 'Full-stack',
    description:
      'AWS Cognito 기반 인증 흐름과 Next.js 화면 구조를 연결해 로그인 이후의 사용자 경험을 정리한 프로젝트입니다.',
    points: ['인증 상태 관리', '권한별 화면 분기', '운영 가능한 배포 구조'],
    stack: ['Next.js', 'TypeScript', 'AWS Cognito'],
  },
  {
    title: '기술 블로그 시스템',
    type: 'Content Platform',
    description:
      'Markdown 콘텐츠, 카테고리, 태그, 아카이브를 갖춘 정적 블로그를 설계하고 GitHub Pages 배포 흐름까지 구성했습니다.',
    points: ['정적 콘텐츠 파이프라인', '검색과 분류 UX', 'SEO 메타데이터'],
    stack: ['Next.js', 'Markdown', 'GitHub Pages'],
  },
  {
    title: '포트폴리오 리뉴얼',
    type: 'Portfolio',
    description:
      '블로그 중심 구조에서 경력, 프로젝트, 연락 동선이 먼저 보이는 포트폴리오형 사이트로 정보 구조를 재편했습니다.',
    points: ['첫 화면 메시지 정리', '프로젝트 카드화', '반응형 레이아웃'],
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
  },
]

const experience = [
  {
    period: 'Now',
    title: '제품 관점 개발',
    body: '기능 구현 전에 사용자가 실제로 지나가는 흐름과 데이터의 책임 범위를 먼저 정리합니다.',
  },
  {
    period: 'Build',
    title: '웹 애플리케이션 구현',
    body: 'React와 Next.js를 중심으로 UI, 라우팅, 콘텐츠 구조, 배포까지 이어지는 작업을 수행합니다.',
  },
  {
    period: 'Operate',
    title: '클라우드와 운영',
    body: 'AWS 서비스와 배포 환경을 활용해 로컬 구현이 실제 서비스 형태로 동작하도록 만듭니다.',
  },
]

export default function Home() {
  return (
    <div className="portfolio-page">
      <section id="intro" className="portfolio-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Developer Portfolio</p>
            <h1>이정민</h1>
            <p className="hero-lead">{siteConfig.tagline}</p>
            <p className="hero-body">
              프론트엔드 화면, 백엔드 API, 클라우드 배포를 하나의 제품 흐름으로
              연결하는 데 집중합니다. 복잡한 요구사항을 작게 나누고, 실제로
              유지보수 가능한 구조로 구현합니다.
            </p>
            <div className="hero-actions">
              <a href={siteConfig.portfolioUrl} className="primary-action">
                Portfolio PDF
              </a>
              <a href={`mailto:${siteConfig.social.email}`} className="secondary-action">
                Contact
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Profile">
            <div className="avatar-frame">
              <Image
                src={siteConfig.avatar}
                alt="이정민 프로필"
                priority
                sizes="(max-width: 768px) 72vw, 360px"
                className="avatar-image"
              />
            </div>
            <div className="status-panel">
              <span className="status-label">
                <span className="status-dot" />
                Available for collaboration
              </span>
              <strong>Web · Product · Cloud</strong>
            </div>
          </div>
        </div>

        <div className="highlight-strip">
          {highlights.map((item) => (
            <article key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Stack</p>
          <h2 id="skills-title">기술 스택</h2>
        </div>
        <div className="skill-grid">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="projects" className="portfolio-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2 id="projects-title">프로젝트</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, idx) => (
            <article key={project.title} className="project-card">
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
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="portfolio-section split-section" aria-labelledby="experience-title">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title">일하는 방식</h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.title}>
              <span>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">같이 만들 이야기가 있다면 연락 주세요.</h2>
        </div>
        <div className="contact-actions">
          <a href={`mailto:${siteConfig.social.email}`}>{siteConfig.social.email}</a>
          <a href={`https://github.com/${siteConfig.social.github}`} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <Link href="/about">Resume</Link>
          <Link href="/archives">Blog</Link>
        </div>
      </section>
    </div>
  )
}

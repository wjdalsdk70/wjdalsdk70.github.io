import Image from 'next/image'
import Link from 'next/link'
import { FaAws, FaJava } from 'react-icons/fa'
import { SiSpringboot, SiFastapi, SiApachekafka, SiMysql, SiRedis, SiDocker, SiTerraform, SiGithubactions } from 'react-icons/si'
import { FiArrowDown, FiArrowUpRight, FiLayers, FiActivity, FiCpu, FiGithub, FiMail } from 'react-icons/fi'
import { siteConfig } from '@/siteConfig'
import { timeline, type TimelineEntry } from '@/lib/timeline-data'
import { projects } from '@/lib/projects-data'
import PortfolioNav from './PortfolioNav'
import HeroSystem from './HeroSystem'

const skills = [
  { name: 'Java', Icon: FaJava }, { name: 'Spring Boot', Icon: SiSpringboot },
  { name: 'FastAPI', Icon: SiFastapi }, { name: 'Kafka', Icon: SiApachekafka },
  { name: 'MySQL', Icon: SiMysql }, { name: 'Redis', Icon: SiRedis },
  { name: 'Docker', Icon: SiDocker }, { name: 'AWS', Icon: FaAws },
  { name: 'Terraform', Icon: SiTerraform }, { name: 'GitHub Actions', Icon: SiGithubactions },
]

const capabilities = [
  { Icon: FiLayers, title: '확장 가능한 백엔드 설계', description: '멀티모듈 아키텍처와 MSA 기반으로 서비스의 경계를 설계합니다. 인증, 실시간 통신, 비동기 처리까지 운영 환경에 맞는 API를 구현합니다.' },
  { Icon: FiActivity, title: '안정적인 운영과 성능 개선', description: '부하 테스트와 모니터링으로 병목을 찾고 개선합니다. CI/CD 자동화와 멀티 클라우드 인프라 구축으로 안정적인 배포와 운영 기반을 만듭니다.' },
  { Icon: FiCpu, title: 'AI를 서비스로 연결하는 개발', description: 'STT·LLM·벡터 DB를 연결해 실제 사용자가 쓰는 AI 서비스를 만듭니다. 의료 전문 용어의 음성 인식 오류율을 18.5%에서 6.8%로 개선했습니다.' },
]

const recentWork = [
  { slug: 'carenote', title: 'CareNote', summary: '음성을 간호 기록으로 연결하는 AI 서비스' },
  { slug: 'careflow', title: 'CareFlow', summary: '음성 기반 통합 AI 스마트 병원 솔루션' },
  { slug: 'dev-pick', title: 'Dev-Pick', summary: '테크 블로그 수집과 큐레이션' },
]

function period(entry: TimelineEntry) {
  const start = entry.start.replace('-', '.')
  if (entry.start === entry.end) return start
  return `${start} — ${entry.end?.replace('-', '.') ?? '현재'}`
}

function SectionTitle({ label, children }: { label: string; children: React.ReactNode }) {
  return <header className="portfolio-section-heading"><p>{label}</p><h2>{children}</h2></header>
}

function Tags({ values }: { values: string[] }) {
  return <div className="portfolio-tags">{values.map(value => <span key={value}>{value}</span>)}</div>
}

function CredentialGroup({ id, title, label, entries }: { id: string; title: string; label: string; entries: TimelineEntry[] }) {
  return (
    <section className="background-group" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="portfolio-list-label">{title}<span>{label}</span></h3>
      <div className="credential-list">
        {entries.map(entry => (
          <article className="credential-row" key={entry.id}>
            <p className="experience-date">{period(entry)}</p>
            <div><h4>{entry.title}</h4><p>{entry.subtitle}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ExperienceRow({ entry }: { entry: TimelineEntry }) {
  const project = projects.find(item => item.slug === entry.projectSlug)
  return (
    <article className="experience-row">
      <p className="experience-date">{period(entry)}</p>
      <div className="experience-content">
        <h3>{entry.title}{!entry.end && <span className="current-badge">재직 중</span>}</h3>
        <p className="experience-role">{entry.subtitle}</p>
        <p className="experience-summary">{entry.summary}</p>
        <details className="experience-details">
          <summary>주요 업무 내용 보기 <span aria-hidden="true">＋</span></summary>
          {project ? <><ul>{project.detail.features.map(feature => <li key={feature}>{feature}</li>)}</ul><Link href={`/projects/${project.slug}/`}>프로젝트 상세 보기 ↗</Link></> :
            <p>{entry.id === 'careminder-fulltime' ? 'CareNote·CareForm의 음성 처리 파이프라인과 인증·결제 API를 개발하고, CareFlow의 병원 업무 API 및 실시간 채팅을 운영합니다. 멀티 클라우드 환경과 모니터링 체계를 구축합니다.' : 'YOLO-World 모델의 텍스트 인코더를 이미지 인코더로 교체하는 개선 작업을 수행하고 FakeKiller MVP를 개발했습니다.'}</p>}
        </details>
      </div>
    </article>
  )
}

export default function Portfolio() {
  const career = timeline.filter(entry => entry.kind === 'career').sort((a, b) => b.start.localeCompare(a.start))
  const sideProjects = timeline.filter(entry => entry.kind === 'project' && !entry.projectSlug).sort((a, b) => b.start.localeCompare(a.start))
  const education = timeline.filter(entry => ['education', 'training'].includes(entry.kind))
  const certificates = timeline.filter(entry => entry.kind === 'cert' && entry.id !== 'cert-opic').sort((a, b) => b.start.localeCompare(a.start))
  const languages = timeline.filter(entry => entry.id === 'cert-opic')
  const awards = timeline.filter(entry => entry.kind === 'award').sort((a, b) => b.start.localeCompare(a.start))

  return (
    <div className="portfolio">
      <a className="portfolio-skip" href="#intro">본문으로 이동</a>
      <PortfolioNav />
      <section className="portfolio-hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-introduction">
            <p className="hero-eyebrow">BEHIND EVERY GOOD SERVICE</p>
            <figure className="hero-portrait"><Image src={siteConfig.avatar} alt="이정민 프로필" priority sizes="64px" /><figcaption><strong>이정민</strong><span>Backend · Cloud · AI</span></figcaption></figure>
            <h1 id="hero-title">서비스의 시작부터,<br /><span>운영의 마지막까지.</span></h1>
            <p className="hero-description">예외를 다루고, 흐름을 연결하고, 더 나은 구조를 찾습니다.<br />끝까지 책임지는 백엔드 개발자 이정민입니다.</p>
            <div className="hero-actions"><a href="#projects">프로젝트 살펴보기 <FiArrowDown /></a><a href={siteConfig.aboutUrl} target="_blank" rel="noopener noreferrer">이력서 <FiArrowUpRight /></a></div>
          </div>
          <HeroSystem />
          <aside className="hero-recent" aria-label="최근 프로젝트">
            <p className="hero-recent-label">RECENT<br />PROJECTS</p>
            {recentWork.map(project => (
              <Link href={`/projects/${project.slug}/`} className="hero-recent-project" key={project.slug}>
                <div><h3>{project.title}</h3><p>{project.summary}</p></div>
                <FiArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </aside>
          <div className="hero-footnote"><span>개발 여정 · 2019 — 현재</span><span>설계하고, 운영하고, 개선합니다.</span></div>
        </div>
      </section>

      <div className="portfolio-container">
        <section id="intro" className="portfolio-section portfolio-intro">
          <SectionTitle label="01 / ABOUT">개발할 때 중요하게 생각하는 것</SectionTitle>
          <p className="portfolio-intro-copy">{siteConfig.tagline}<br />문제의 원인을 깊이 이해하고, 더 나은 구조와 운영 방식을 찾아갑니다.</p>
          <div className="capability-grid">{capabilities.map(({ Icon, title, description }, index) => <article key={title}><div className={`capability-icon capability-icon-${index}`}><Icon /></div><h3>{title}</h3><p>{description}</p></article>)}</div>
          <div className="portfolio-skills" aria-label="기술 스택">{skills.map(({ name, Icon }) => <span key={name}><Icon />{name}</span>)}</div>
        </section>

        <section id="experience" className="portfolio-section">
          <SectionTitle label="02 / EXPERIENCE">일하며 쌓은 경험</SectionTitle>
          <p className="portfolio-list-label">업무 경험 <span>WORK EXPERIENCE</span></p>
          <div>{career.map(entry => <ExperienceRow key={entry.id} entry={entry} />)}</div>
        </section>

        <section id="projects" className="portfolio-section">
          <SectionTitle label="03 / PROJECTS">직접 만들고 개선한 서비스</SectionTitle>
          <div className="project-grid">{projects.map((project, index) => <Link href={`/projects/${project.slug}/`} className="portfolio-project" key={project.slug}><div className="project-card-top"><span>0{index + 1} / {project.type}</span><FiArrowUpRight /></div><h3>{project.title}</h3><p className="project-card-period">{project.detail.period}</p><p className="project-card-description">{project.description}</p><ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul><Tags values={project.stack} /><span className="project-card-more">프로젝트 자세히 보기 <FiArrowUpRight /></span></Link>)}</div>
          <p className="portfolio-list-label side-project-label">사이드 프로젝트 <span>SIDE PROJECTS</span></p>
          {sideProjects.map(entry => <article className="side-project-row" key={entry.id}><div><span className="experience-date">{period(entry)}</span><h3>{entry.title}</h3><p>{entry.summary}</p>{entry.stack && <Tags values={entry.stack} />}</div>{entry.link && <a href={entry.link} target="_blank" rel="noopener noreferrer" aria-label={`${entry.title} ${entry.link.includes('github.com') ? 'GitHub' : '서비스'} 보기`}><FiArrowUpRight /></a>}</article>)}
        </section>

        <section id="education" className="portfolio-section">
          <SectionTitle label="04 / BACKGROUND">배움과 그동안의 기록</SectionTitle>
          <section className="background-group" aria-labelledby="education-title">
            <h3 id="education-title" className="portfolio-list-label">교육·학력<span>EDUCATION</span></h3>
            {education.map(entry => <article className="education-row" key={entry.id}><p className="experience-date">{period(entry)}</p><div><h4>{entry.title}</h4><p>{entry.subtitle}</p>{entry.summary && <p className="education-summary">{entry.summary}</p>}</div></article>)}
          </section>
          <CredentialGroup id="certifications" title="자격증" label="CERTIFICATIONS" entries={certificates} />
          <CredentialGroup id="languages" title="어학" label="LANGUAGES" entries={languages} />
          <CredentialGroup id="awards" title="수상" label="AWARDS" entries={awards} />
        </section>

        <section id="contact" className="portfolio-contact">
          <p className="contact-eyebrow">05 / CONTACT</p><h2>이야기를 나누고 싶다면<span>.</span></h2>
          <a className="contact-email" href={`mailto:${siteConfig.social.email}`}><FiMail />{siteConfig.social.email}<FiArrowUpRight /></a>
          <div className="contact-links"><a href={`https://github.com/${siteConfig.social.github}`} target="_blank" rel="noopener noreferrer"><FiGithub />GitHub <FiArrowUpRight /></a><a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <FiArrowUpRight /></a><a href={siteConfig.aboutUrl} target="_blank" rel="noopener noreferrer">Resume <FiArrowUpRight /></a></div>
        </section>
        <footer className="portfolio-footer"><span>© {new Date().getFullYear()} 이정민</span><span>Built with care, always improving.</span><a href="#">맨 위로 ↑</a></footer>
      </div>
    </div>
  )
}

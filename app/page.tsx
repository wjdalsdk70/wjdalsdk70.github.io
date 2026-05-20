import Image from 'next/image'
import Link from 'next/link'
import { FaJava, FaAws } from 'react-icons/fa'
import { SiSpringboot, SiFastapi, SiApachekafka, SiMysql, SiRedis, SiMongodb, SiDocker, SiGithubactions, SiTerraform, SiNextdotjs } from 'react-icons/si'
import { siteConfig } from '@/siteConfig'
import ProjectSection from '@/components/ProjectSection'
import { projects } from '@/lib/projects-data'

const highlights = [
  { value: 'Backend', label: 'MSA 기반 서비스 설계와 안정적인 API 구현에 집중합니다.' },
  { value: 'Infra · DevOps', label: 'CI/CD 파이프라인과 Blue-Green 배포로 운영 안정성을 확보합니다.' },
  { value: 'AI Pipeline', label: 'STT·LLM 기반 파이프라인을 설계하고 데이터 처리를 자동화합니다.' },
]

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

const experience = [
  {
    company: '(주)케어마인더',
    role: '백엔드 개발팀 · 정규직',
    range: '2025.10 ~ 현재',
    duration: '6개월',
    body: 'CareNote·CareForm 백엔드 개발. 멀티 클라우드(NCP, GCP, AWS) 환경 구축 및 Prometheus·Loki·Grafana 기반 모니터링 환경 구성.',
  },
  {
    company: '(주)케어마인더',
    role: '백엔드 개발팀 · 인턴',
    range: '2024.09 ~ 2024.12',
    duration: '4개월',
    body: 'CareFlow MVP 백엔드 개발. Spring Security + JWT + Redis 인증 구현, STOMP + Redis Pub/Sub 실시간 채팅 기능 구현.',
  },
  {
    company: '(주)플리트소프트',
    role: 'AI 개발팀 · 인턴',
    range: '2024.07 ~ 2024.08',
    duration: '2개월',
    body: 'FakeKiller MVP 개발. YOLO-World 텍스트 인코더를 이미지 인코더로 교체하는 모델 개선 작업 수행.',
  },
]

export default function Home() {
  return (
    <div className="portfolio-page">
      <section id="intro" className="portfolio-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Backend Developer</p>
            <h1>이정민</h1>
            <p className="hero-lead">{siteConfig.tagline}</p>
            <p className="hero-body">
              서비스의 안정적인 운영을 위해 장애를 예방하고, 문제 발생 시 빠르게
              원인을 파악하고 대응하는 것을 중요하게 생각합니다. 아키텍처 개선과
              부하 테스트를 통해 병목을 해소하고, 서비스의 안정적인 운영 기반을
              구축한 경험이 있습니다.
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
              <strong>Backend · Infra · AI</strong>
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
            <div
              key={skill.name}
              className="skill-card"
              style={{ '--brand': skill.color } as React.CSSProperties}
            >
              <skill.Icon />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="portfolio-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2 id="projects-title">프로젝트</h2>
        </div>
        <ProjectSection projects={projects} />
      </section>

      <section id="harness" className="portfolio-section" aria-labelledby="harness-title">
        <div className="section-heading">
          <p className="eyebrow">AI Harness Engineering</p>
          <h2 id="harness-title">하네스 엔지니어링</h2>
        </div>
        <div className="harness-layout">
          <div className="harness-body">
            <p className="harness-desc">
              AI 에이전트와 슬래시 명령어를 직접 설계해 개발 워크플로우를 자동화하는
              Claude Code 하네스를 제작합니다. 역할별 전문 에이전트로 코드 리뷰·보안 검증·TDD를
              파이프라인으로 분리하고, 반복 작업을 명령어 한 줄로 대체합니다.
            </p>
            <ul className="harness-agents">
              <li><strong>java-reviewer</strong> — 아키텍처·JPA 패턴·동시성 CRITICAL/HIGH 4단계 검증</li>
              <li><strong>security-reviewer</strong> — OWASP Top 10 기반 SQL 인젝션·시크릿 노출 자동 차단</li>
              <li><strong>tdd-guide</strong> — RED → GREEN → REFACTOR 워크플로우, JaCoCo 80% 강제</li>
              <li><strong>database-reviewer</strong> — N+1 쿼리·스키마·Flyway 마이그레이션 검토</li>
              <li><strong>performance-optimizer</strong> — 병목 식별 및 JPA Fetch 전략 최적화 제안</li>
            </ul>
            <a
              href="https://github.com/wjdalsdk70/backend-claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-action harness-link"
            >
              ↗ GitHub에서 보기
            </a>
          </div>
          <div className="harness-stats">
            <div className="harness-stat">
              <strong>8</strong>
              <span>전문 에이전트</span>
            </div>
            <div className="harness-stat">
              <strong>13</strong>
              <span>슬래시 명령어</span>
            </div>
            <div className="harness-stat">
              <strong>10</strong>
              <span>재사용 스킬</span>
            </div>
            <div className="harness-stat">
              <strong>3</strong>
              <span>MCP 서버</span>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="portfolio-section split-section" aria-labelledby="experience-title">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title">경력</h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.company + item.range}>
              <h3>{item.company}</h3>
              <p className="exp-meta">
                {item.role}
                <span className="exp-period">{item.range}</span>
                <span className="exp-duration">{item.duration}</span>
              </p>
              <p>{item.body}</p>
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
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link href="/about">Resume</Link>
        </div>
      </section>
    </div>
  )
}

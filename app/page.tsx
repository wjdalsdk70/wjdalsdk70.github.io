import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/siteConfig'

const highlights = [
  { value: 'Backend', label: 'MSA 기반 서비스 설계와 안정적인 API 구현에 집중합니다.' },
  { value: 'Infra · DevOps', label: 'CI/CD 파이프라인과 Blue-Green 배포로 운영 안정성을 확보합니다.' },
  { value: 'AI Pipeline', label: 'STT·LLM 기반 파이프라인을 설계하고 데이터 처리를 자동화합니다.' },
]

const skills = [
  'Java',
  'Spring Boot',
  'Kafka',
  'MySQL',
  'Redis',
  'Docker',
  'AWS',
  'GitHub Actions',
]

const projects = [
  {
    title: 'CareNote',
    type: 'AI · Healthcare',
    description:
      '음성 기반 간호 진술문 요약 서비스. Kafka 비동기 파이프라인과 LangGraph로 STT→LLM 처리 흐름을 구축하고, 의료 전문 용어 WER을 18.5%에서 6.8%로 개선했습니다.',
    points: ['Kafka 기반 비동기 AI 파이프라인', 'Pre-signed URL (업로드 4.8s → 3.1s)', '의료 전문 용어 WER 18.5% → 6.8%'],
    stack: ['Spring Boot', 'FastAPI', 'Kafka', 'LangGraph', 'AWS EKS'],
  },
  {
    title: 'CareFlow',
    type: 'MSA · Healthcare',
    description:
      '음성 기반 통합 AI 스마트 병원 솔루션. MSA 구조로 200+ API를 구현하고, GitHub Actions CI/CD 최적화로 배포 시간을 25% 단축했습니다.',
    points: ['MSA · CQRS 아키텍처 설계', 'CI/CD 파이프라인 4분 → 3분 단축', 'Blue-Green 무중단 배포 구조'],
    stack: ['Spring Boot', 'Kafka', 'MySQL', 'Redis', 'Docker'],
  },
  {
    title: 'Dev-Pick',
    type: 'Side Project',
    description:
      '테크 블로그 큐레이션 서비스. 6개 모듈 멀티모듈 아키텍처와 Kafka 기반 수집 파이프라인으로 당근, 토스, 무신사 등 테크 블로그를 자동 수집합니다.',
    points: ['6개 모듈 멀티모듈 아키텍처', 'Kafka 기반 크롤링 파이프라인', 'Snowflake ID 분산 식별자'],
    stack: ['Spring Boot', 'Spring Batch', 'Kafka', 'MySQL', 'AWS'],
    link: 'https://dev-pick.com',
  },
]

const experience = [
  {
    period: '2025.10',
    title: '케어마인더 · 백엔드 개발팀 (정규직)',
    body: 'CareNote·CareForm 백엔드 개발. 멀티 클라우드(NCP, GCP, AWS) 환경 구축 및 Prometheus·Loki·Grafana 기반 모니터링 환경 구성.',
  },
  {
    period: '2024.09',
    title: '케어마인더 · 백엔드 개발팀 (인턴)',
    body: 'CareFlow MVP 백엔드 개발. Spring Security + JWT + Redis 인증 구현, STOMP + Redis Pub/Sub 실시간 채팅 기능 구현.',
  },
  {
    period: '2024.07',
    title: '플리트소프트 · AI 개발팀 (인턴)',
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
                  {'link' in project && project.link && (
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
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="portfolio-section split-section" aria-labelledby="experience-title">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title">경력</h2>
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
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link href="/about">Resume</Link>
        </div>
      </section>
    </div>
  )
}

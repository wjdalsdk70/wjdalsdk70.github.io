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
      '음성 기반 간호 진술문 요약 서비스. Clova Speech 화자 분리와 LangGraph 기반 STT→LLM 파이프라인을 구축하고, Qdrant 벡터 DB로 의료 용어 정규화 정확도를 60% 이상 향상시켰습니다.',
    points: ['LangGraph + Qdrant 의료 용어 정규화 파이프라인', 'LangSmith 모니터링으로 WER 18.5% → 6.8%', '채널 상태 7단계 세분화 및 재처리 구조'],
    stack: ['Spring Boot', 'FastAPI', 'LangGraph', 'Qdrant', 'NCP'],
  },
  {
    title: 'CareForm',
    type: 'AI · Healthcare',
    description:
      '음성 기반 문진 서비스. 32개 웹 API와 @Async 비동기 채널 처리 파이프라인을 구축하고, 멀티 테넌트 병원 크레딧 결제 모델과 JWT+OAuth 인증 체계를 설계했습니다.',
    points: ['@Async 비동기 채널 처리 파이프라인', 'Pre-signed URL 기반 오디오 업로드', '멀티 테넌트 병원 크레딧 결제 구조'],
    stack: ['Spring Boot', 'FastAPI', 'MySQL', 'Redis', 'NCP'],
  },
  {
    title: 'CareFlow',
    type: 'MSA · Healthcare',
    description:
      '음성 기반 통합 AI 스마트 병원 솔루션. 6개 멀티모듈 아키텍처로 200+ API를 구현하고, GitHub Actions CI/CD 최적화로 배포 시간을 4분에서 3분으로 단축했습니다.',
    points: ['6개 멀티모듈 아키텍처, 200+ API 구현', 'WebSocket(STOMP) + Redis Pub/Sub 실시간 채팅', 'CI/CD 파이프라인 4분 → 3분 단축'],
    stack: ['Spring Boot', 'MySQL', 'Redis', 'MongoDB', 'Docker'],
  },
  {
    title: 'Dev-Pick',
    type: 'Side Project',
    description:
      '테크 블로그 큐레이션 서비스. 6개 모듈 멀티모듈 아키텍처와 Kafka 기반 수집 파이프라인으로 18개 타깃 사이트를 코루틴 병렬 수집하고 자동 적재합니다.',
    points: ['6개 모듈 멀티모듈 아키텍처', 'Kafka 기반 크롤링 → Chunk 50건 배치 적재', 'Snowflake ID 기반 분산 식별자 정책'],
    stack: ['Spring Boot', 'Spring Batch', 'Kafka', 'MySQL', 'Redis'],
    link: 'https://dev-pick.com',
  },
  {
    title: 'YouTIL',
    type: 'Cloud · DevOps',
    description:
      'GitHub 커밋 내역을 분석해 TIL을 자동 생성하고 기술 면접 질문을 제공하는 개발자 학습 지원 서비스. Terraform IaC로 AWS EKS 클러스터를 구축하고 멀티 클라우드 환경을 운영했습니다.',
    points: ['Terraform IaC 기반 AWS EKS 클러스터 구축', 'kubeadm 클러스터 → EKS 전환 운영', 'GitHub Actions CI/CD + CodeDeploy 자동 롤백'],
    stack: ['AWS EKS', 'Terraform', 'GitHub Actions', 'Docker', 'GCP'],
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

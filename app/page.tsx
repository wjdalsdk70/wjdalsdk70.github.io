import Image from 'next/image'
import Link from 'next/link'
import { FaJava, FaAws } from 'react-icons/fa'
import { SiSpringboot, SiFastapi, SiApachekafka, SiMysql, SiRedis, SiMongodb, SiDocker, SiGithubactions, SiTerraform, SiNextdotjs } from 'react-icons/si'
import { siteConfig } from '@/siteConfig'
import ProjectSection, { type Project } from '@/components/ProjectSection'

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

const projects: Project[] = [
  {
    title: 'CareNote',
    type: 'AI · Healthcare',
    description:
      '음성 기반 간호 진술문 요약 서비스. Clova Speech 화자 분리와 LangGraph 기반 STT→LLM 파이프라인을 구축하고, Qdrant 벡터 DB로 의료 용어 정규화 정확도를 60% 이상 향상시켰습니다.',
    points: ['LangGraph + Qdrant 의료 용어 정규화 파이프라인', 'LangSmith 모니터링으로 WER 18.5% → 6.8%', '채널 상태 7단계 세분화 및 재처리 구조'],
    stack: ['Spring Boot', 'FastAPI', 'LangGraph', 'Qdrant', 'NCP'],
    detail: {
      period: '2025.12 - 현재',
      team: 'FE 1 · BE 1',
      features: [
        'Clova Speech 기반 화자 분리 및 Keyword Boosting으로 의료 음성 STT 정확도 개선',
        'LangGraph와 Qdrant를 활용한 STT-LLM-VectorDB 기반 의료 용어 정규화 파이프라인 구축',
        'Spring Boot 3.3 + Java 17 기반 인증/채널/크레딧/병원/계정 관리 API 32개 엔드포인트 설계·구현',
        '채널 처리 파이프라인을 업로드 → 전처리(ffmpeg) → AI 전사 → 결과 반영으로 분리하고 @Async 비동기 처리 적용',
        'NCP Object Storage + Pre-signed URL(3,600초)로 오디오 업로드/조회 서버 부하 감소 및 보안 강화',
        'JWT(Access/Refresh) + OAuth(Kakao/Apple) 인증 체계 및 X-Internal-Token 내부 API 보호 구현',
        '병원 도메인 및 개인/병원 크레딧 지갑 2종 구조로 멀티 테넌트 결제 모델 구현',
      ],
      achievements: [
        'LangSmith 기반 추론 모니터링 및 프롬프트 최적화로 의료 전문 용어 WER 18.5% → 6.8% 개선',
        '채널 상태 7단계(UPLOADED~SUMMARY_FAILED) 세분화 및 실패 상태 재처리(retry) 구조로 복구 가능성 향상',
        '크레딧 차감 로직을 최소 1크레딧 + 1분 단위로 정규화하고 예약 크레딧 선반영으로 과금 불일치 예방',
        'ownerId:channelId 기준 referenceId 중복 체크로 멱등성 있는 과금 처리 구조 구현',
        '계정/채널 삭제 시 DB + S3 정리를 함께 처리하고, 외부 스토리지 삭제 실패는 경고 로그로 격리해 핵심 트랜잭션 보호',
      ],
    },
  },
  {
    title: 'CareForm',
    type: 'AI · Healthcare',
    description:
      '음성 기반 문진 서비스. 32개 웹 API와 @Async 비동기 채널 처리 파이프라인을 구축하고, 멀티 테넌트 병원 크레딧 결제 모델과 JWT+OAuth 인증 체계를 설계했습니다.',
    points: ['@Async 비동기 채널 처리 파이프라인', 'Pre-signed URL 기반 오디오 업로드', '멀티 테넌트 병원 크레딧 결제 구조'],
    stack: ['Spring Boot', 'FastAPI', 'MySQL', 'Redis', 'NCP'],
    detail: {
      period: '2025.12 - 현재',
      team: 'FE 2 · BE 2',
      features: [
        'Clova Speech 기반 화자 분리 및 Keyword Boosting으로 의료 음성 STT 정확도 개선',
        'LangGraph와 Qdrant를 활용한 STT-LLM-VectorDB 기반 의료 용어 정규화 파이프라인 구축',
        'Spring Boot 3.3 + Java 17 기반 웹 API 32개 엔드포인트 설계·구현',
        '채널 처리 파이프라인을 업로드 → 전처리(ffmpeg) → AI 전사 → 결과 반영으로 분리하고 @Async 비동기 처리 적용',
        'NCP Object Storage + Pre-signed URL(3,600초)로 오디오 업로드 서버 부하 감소 및 보안 강화',
        'JWT(Access/Refresh) + OAuth(Kakao/Apple) 인증 체계 구축',
        '병원 생성, 연동 코드 발급, 가입/해지, 개인·병원 프로필 전환 및 크레딧 지갑 2종 구조 구현',
      ],
      achievements: [
        '채널 상태 7단계(UPLOADED~SUMMARY_FAILED) 세분화 및 실패 상태 재처리(retry) 구조로 복구 가능성 향상',
        '크레딧 차감 로직을 최소 1크레딧 + 1분 단위로 정규화하고 예약 크레딧 선반영으로 과금 불일치 예방',
        'ownerId:channelId 기준 referenceId 중복 체크로 멱등성 있는 과금 처리 구조 구현',
        '계정/채널 삭제 시 DB + S3 정리를 함께 처리하고, 외부 스토리지 실패는 경고 로그로 격리해 핵심 트랜잭션 보호',
      ],
    },
  },
  {
    title: 'CareFlow',
    type: 'MSA · Healthcare',
    description:
      '음성 기반 통합 AI 스마트 병원 솔루션. 6개 멀티모듈 아키텍처로 200+ API를 구현하고, GitHub Actions CI/CD 최적화로 배포 시간을 4분에서 3분으로 단축했습니다.',
    points: ['6개 멀티모듈 아키텍처, 200+ API 구현', 'WebSocket(STOMP) + Redis Pub/Sub 실시간 채팅', 'CI/CD 파이프라인 4분 → 3분 단축'],
    stack: ['Spring Boot', 'MySQL', 'Redis', 'MongoDB', 'Docker'],
    detail: {
      period: '2024.09 - 2024.12 · 2025.10 - 현재',
      team: '기획 3 · FE 5 · BE 3 · Design 1',
      features: [
        '6개 멀티모듈(main, main-reader, main-domain, batch, notification, common-core) 아키텍처 설계·운영',
        '36개 컨트롤러, 200+ API 매핑(GET 93 / POST 81 / 기타) 병원 업무 API 구현',
        'WebSocket(STOMP) + Redis Pub/Sub 기반 실시간 채팅 구축, JWT 인증 인터셉터로 병동/태블릿 권한 검증',
        'Mongo 통계 파이프라인(요청 KPI/히스토그램/병동별 분석) 및 비동기 리포트 생성 구현',
        '3분 주기 + mod(0/1/2) 3분할 스케줄링으로 태블릿/데스크/링크 상태 스냅샷 수집 및 변경 시 알림 전파',
        'Microsoft Teams Webhook·Adaptive Card 연동으로 Teams 내 알림 수신~상태 변경 업무 파이프라인 구축',
      ],
      achievements: [
        'mod 3분할 배치 처리로 단일 주기 몰림을 완화, 사이클당 처리군 약 1/3 수준으로 부하 분산',
        'GitHub Actions paths-filter 기반 Incremental Build + Gradle/Docker 캐시 + matrix 병렬 테스트로 CI/CD 4분 → 3분 단축',
        '전략 패턴(BaseAuthManager + 역할별 구현체 + AuthManagerFactory)으로 SRP/OCP 충족하는 확장형 구조 개선',
        '환자 요청 수락 경합에 비관적 락(SELECT ... FOR UPDATE) + 상태 조건 검증으로 중복 처리 방지 및 정합성 강화',
        'Microsoft Teams 연동 기반 실제 병원 도입 성과 달성',
      ],
    },
  },
  {
    title: 'Dev-Pick',
    type: 'Side Project',
    description:
      '테크 블로그 큐레이션 서비스. 6개 모듈 멀티모듈 아키텍처와 Kafka 기반 수집 파이프라인으로 18개 타깃 사이트를 코루틴 병렬 수집하고 자동 적재합니다.',
    points: ['6개 모듈 멀티모듈 아키텍처', 'Kafka 기반 크롤링 → Chunk 50건 배치 적재', 'Snowflake ID 기반 분산 식별자 정책'],
    stack: ['Spring Boot', 'Spring Batch', 'Kafka', 'MySQL', 'Redis'],
    link: 'https://dev-pick.com',
    detail: {
      period: '2025.11 - 현재',
      team: 'FE 1 · BE 1 · Design 1',
      features: [
        'api / authentication / collector / batch / domain / application 6개 모듈로 분리된 멀티모듈 백엔드 아키텍처 구성',
        'Collector 파이프라인을 크롤링 → 추출 → 중복제거 → Kafka 발행 단계로 설계, 18개 타깃 사이트 코루틴 기반 병렬 수집',
        'RSS/Atom 혼합 포맷 대응을 위해 Extractor를 어댑터 구조로 분리, 실패 시 최대 3회 재시도(1s→2s→4s 백오프)',
        'Batch에서 Kafka 메시지를 Chunk 50건 단위로 읽어 Post/Tag/PostTag 배치 저장, Batch size 100 기준 upsert/insert-ignore',
        '키워드·카테고리 slug·소스 사이트·언어 필터 + lastPostId + pubDate 기반 커서 페이지네이션 적용 24개 엔드포인트 구성',
      ],
      achievements: [
        '수집 스케줄과 적재 스케줄을 분리해 파이프라인 장애가 전체 서비스로 전파되지 않는 구조 설계',
        'Kafka Reader 커밋 오프셋 조회 실패 시 0 오프셋 fallback으로 컨슈머 상태 이상에도 배치 잡 중단 방지',
        '태그 배치 저장 중 PessimisticLockingFailureException에 최대 3회 재시도 + 선형 백오프(30ms * 시도횟수) 적용',
        'Snowflake 기반 ID 생성기(41bit epoch, 10bit node, 12bit sequence)로 분산 환경 충돌 방지 및 식별자 정책 일관화',
      ],
    },
  },
  {
    title: 'YouTIL',
    type: 'Cloud · DevOps',
    description:
      'GitHub 커밋 내역을 분석해 TIL을 자동 생성하고 기술 면접 질문을 제공하는 개발자 학습 지원 서비스. Terraform IaC로 AWS EKS 클러스터를 구축하고 멀티 클라우드 환경을 운영했습니다.',
    points: ['Terraform IaC 기반 AWS EKS 클러스터 구축', 'kubeadm 클러스터 → EKS 전환 운영', 'GitHub Actions CI/CD + CodeDeploy 자동 롤백'],
    stack: ['AWS EKS', 'Terraform', 'GitHub Actions', 'Docker', 'GCP'],
    detail: {
      period: '2025.04 - 2025.08',
      team: '카카오테크 부트캠프 2기',
      features: [
        'SCP·PM2 기반 수동 배포 환경으로 MVP 빠르게 구축하고 서비스 초기 검증 수행',
        'GitHub Actions 기반 CI/CD 파이프라인 구축, 단위 테스트 및 코드 품질 검사 자동화',
        'Docker 기반 Web 3-Tier 아키텍처와 Bastion Host 구성으로 보안 강화',
        'Terraform 기반 IaC 적용으로 인프라 프로비저닝 자동화',
        'AWS CodeDeploy 도입으로 배포 이력 관리 및 자동 롤백 체계 구축',
        'kubeadm Kubernetes 클러스터 구축 후 Amazon EKS 전환 및 운영',
      ],
      achievements: [
        'MVP 단계부터 EKS 전환까지 단계적 인프라 고도화 경험',
        'Terraform IaC로 인프라 형상 관리 및 재현 가능한 프로비저닝 체계 확립',
        'AWS + GCP 멀티 클라우드 구축 및 운영 경험',
        'CodeDeploy 자동 롤백으로 배포 장애 시 신속한 복구 체계 마련',
      ],
    },
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

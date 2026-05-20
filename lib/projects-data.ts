// 포트폴리오 프로젝트 데이터 및 타입 정의

export type TroubleshootingItem = {
  title: string
  situation: string
  task: string
  action: string
  result: string
}

export type Project = {
  slug: string
  title: string
  type: string
  description: string
  points: string[]
  stack: string[]
  link?: string
  detail: {
    period: string
    team: string
    features: string[]
    achievements: string[]
  }
  troubleshooting?: TroubleshootingItem[]
}

export const projects: Project[] = [
  {
    slug: 'carenote',
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
    troubleshooting: [],
  },
  {
    slug: 'careform',
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
    troubleshooting: [],
  },
  {
    slug: 'careflow',
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
    troubleshooting: [],
  },
  {
    slug: 'dev-pick',
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
    troubleshooting: [],
  },
  {
    slug: 'youtil',
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
    troubleshooting: [],
  },
  {
    slug: 'claude-code-harness',
    title: '백엔드 Claude Code 하네스',
    type: 'Dev Tools · OSS',
    description:
      'Java/Spring Boot 프로젝트에 Claude Code를 즉시 적용할 수 있는 통합 구성 하네스. 8개 전문 에이전트·13개 슬래시 명령어·10개 재사용 스킬로 보안 검증·TDD·빌드 자동화를 원클릭으로 제공합니다.',
    points: [
      '8개 전문 에이전트 (리뷰·보안·TDD·성능·DB)',
      '13개 슬래시 명령어로 개발 워크플로우 자동화',
      'OWASP 기반 CRITICAL/HIGH 취약점 자동 검증',
    ],
    stack: ['Claude Code', 'Shell Script', 'Spring Boot', 'MCP', 'Java'],
    link: 'https://github.com/wjdalsdk70/backend-claude-code',
    detail: {
      period: '2025 - 현재',
      team: '개인 프로젝트',
      features: [
        '8개 전문 에이전트 구성: java-reviewer, security-reviewer, tdd-guide, database-reviewer, performance-optimizer 등',
        '13개 슬래시 명령어(/dev, /git commit, /git pr, /db-migrate 등)로 계획 → 구현 → 검증 → 배포 워크플로우 자동화',
        '10개 재사용 스킬: Spring Boot Patterns, JPA Optimization, Hexagonal Architecture, Security Implementation 등',
        '3개 MCP 서버 연동: GitHub MCP, Context7(Upstash), Sequential Thinking으로 외부 컨텍스트 자동 주입',
        'install.sh / uninstall.sh로 기존 프로젝트 구성을 보존하며 비파괴 설치·제거',
        'Claude Sonnet 4.6 기반, Haiku 4.5 fallback으로 모델 이중화',
      ],
      achievements: [
        'OWASP Top 10 기반 CRITICAL/HIGH/MEDIUM/LOW 4단계 심각도 분류로 코드 리뷰 시 보안 취약점 자동 차단',
        'JaCoCo 80% 커버리지 강제 + Awaitility 비동기 테스트 패턴으로 프로젝트 품질 기준 표준화',
        '.installed-files 추적으로 재설치 시 기존 커스터마이제이션 보호, 팀 프로젝트 안전 적용',
        'Conventional Commits 자동 생성으로 Git 히스토리 일관성 및 변경 추적성 확보',
      ],
    },
    troubleshooting: [],
  },
]

// 홈 "개발 여정" 타임라인 항목 데이터 및 타입 정의

export type TimelineKind = 'career' | 'project' | 'harness'

export type TimelineEntry = {
  id: string
  kind: TimelineKind
  start: string // 'YYYY-MM' — 정렬 키
  end?: string // 없으면 진행 중
  title: string
  subtitle: string
  summary: string
  stack?: string[]
  projectSlug?: string // 있으면 ProjectModal 로 상세 열기
  link?: string
  stats?: { value: string; label: string }[]
}

export const KIND_LABEL: Record<TimelineKind, string> = {
  career: '경력',
  project: '프로젝트',
  harness: '하네스',
}

export const timeline: TimelineEntry[] = [
  {
    id: 'careminder-fulltime',
    kind: 'career',
    start: '2025-10',
    title: '(주)케어마인더',
    subtitle: '백엔드 개발팀 · 정규직',
    summary:
      'CareNote·CareForm 백엔드 개발. 멀티 클라우드(NCP, GCP, AWS) 환경 구축 및 Prometheus·Loki·Grafana 기반 모니터링 환경 구성.',
  },
  {
    id: 'carenote',
    kind: 'project',
    start: '2025-12',
    title: 'CareNote',
    subtitle: 'AI · Healthcare',
    summary:
      '음성 기반 간호 진술문 요약 서비스. Clova Speech 화자 분리와 LangGraph 기반 STT→LLM 파이프라인을 구축하고, Qdrant 벡터 DB로 의료 용어 정규화 정확도를 높였습니다.',
    stack: ['Spring Boot', 'FastAPI', 'LangGraph', 'Qdrant', 'NCP'],
    projectSlug: 'carenote',
  },
  {
    id: 'careform',
    kind: 'project',
    start: '2025-12',
    title: 'CareForm',
    subtitle: 'AI · Healthcare',
    summary:
      '음성 기반 문진 서비스. 32개 웹 API와 @Async 비동기 채널 처리 파이프라인을 구축하고, 멀티 테넌트 병원 크레딧 결제 모델과 JWT+OAuth 인증 체계를 설계했습니다.',
    stack: ['Spring Boot', 'FastAPI', 'MySQL', 'Redis', 'NCP'],
    projectSlug: 'careform',
  },
  {
    id: 'dev-pick',
    kind: 'project',
    start: '2025-11',
    title: 'Dev-Pick',
    subtitle: 'Side Project',
    summary:
      '테크 블로그 큐레이션 서비스. 멀티모듈 아키텍처와 Kafka 기반 수집 파이프라인으로 타깃 사이트를 코루틴 병렬 수집하고 자동 적재합니다.',
    stack: ['Spring Boot', 'Spring Batch', 'Kafka', 'MySQL', 'Redis'],
    projectSlug: 'dev-pick',
    link: 'https://dev-pick.com',
  },
  {
    id: 'careflow-return',
    kind: 'project',
    start: '2025-10',
    title: 'CareFlow',
    subtitle: 'MSA · Healthcare · 재합류',
    summary:
      '인턴 때 MVP 를 만들었던 서비스에 정규직으로 돌아와 운영·고도화. 6개 멀티모듈 아키텍처로 200+ API 를 운영하고 CI/CD 를 최적화했습니다.',
    stack: ['Spring Boot', 'MySQL', 'Redis', 'MongoDB', 'Docker'],
    projectSlug: 'careflow',
  },
  {
    id: 'harness',
    kind: 'harness',
    start: '2026-05',
    title: 'Claude Code 하네스',
    subtitle: 'AI Harness Engineering',
    summary:
      '역할별 전문 에이전트(java-reviewer, security-reviewer, tdd-guide 등)와 슬래시 명령어를 직접 설계해 코드 리뷰·보안 검증·TDD 를 파이프라인으로 분리했습니다.',
    link: 'https://github.com/wjdalsdk70/backend-claude-code',
    stats: [
      { value: '8', label: '전문 에이전트' },
      { value: '13', label: '슬래시 명령어' },
      { value: '10', label: '재사용 스킬' },
      { value: '3', label: 'MCP 서버' },
    ],
  },
  {
    id: 'youtil',
    kind: 'project',
    start: '2025-04',
    end: '2025-08',
    title: 'YouTIL',
    subtitle: 'Cloud · DevOps · 카카오테크 부트캠프 2기',
    summary:
      'GitHub 커밋 내역으로 TIL 을 자동 생성하는 학습 지원 서비스. Terraform IaC 로 AWS EKS 클러스터를 구축하고 멀티 클라우드 환경을 운영했습니다.',
    stack: ['AWS EKS', 'Terraform', 'GitHub Actions', 'Docker', 'GCP'],
    projectSlug: 'youtil',
  },
  {
    id: 'careminder-intern',
    kind: 'career',
    start: '2024-09',
    end: '2024-12',
    title: '(주)케어마인더',
    subtitle: '백엔드 개발팀 · 인턴',
    summary:
      'CareFlow MVP 백엔드 개발. Spring Security + JWT + Redis 인증 구현, STOMP + Redis Pub/Sub 실시간 채팅 기능 구현.',
    projectSlug: 'careflow',
  },
  {
    id: 'fleetsoft-intern',
    kind: 'career',
    start: '2024-07',
    end: '2024-08',
    title: '(주)플리트소프트',
    subtitle: 'AI 개발팀 · 인턴',
    summary:
      'FakeKiller MVP 개발. YOLO-World 텍스트 인코더를 이미지 인코더로 교체하는 모델 개선 작업 수행.',
  },
]

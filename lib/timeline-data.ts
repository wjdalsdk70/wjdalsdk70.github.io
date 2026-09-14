// 홈 "개발 여정" 타임라인 항목 데이터 및 타입 정의

export type TimelineKind =
  | 'career'
  | 'project'
  | 'harness'
  | 'education'
  | 'training'
  | 'activity'
  | 'club'
  | 'award'
  | 'cert'

// award·cert 는 카드가 아니라 축 위 한 줄 마일스톤으로 그린다
export const COMPACT_KINDS: TimelineKind[] = ['award', 'cert']

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
  education: '학력',
  training: '교육',
  activity: '활동',
  club: '동아리',
  award: '수상',
  cert: '자격증',
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
    id: 'scene-log',
    kind: 'project',
    start: '2026-07',
    title: '씬로그 (Scene-Log)',
    subtitle: 'Side Project · 1인 개발',
    summary:
      '영화·드라마·애니 감상 기록 + 소셜 다이어리 PWA. TMDB 연동 검색, 카카오·Apple 로그인, 팔로우·컬렉션·반응 소셜 루프를 만들고 k3s 에 배포, Capacitor 로 iOS 앱스토어까지 출시했습니다.',
    stack: ['FastAPI', 'Next.js', 'MySQL', 'k3s', 'Capacitor', 'TMDB'],
    link: 'https://scene.zmint.dev',
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
  {
    id: 'goormthon-17',
    kind: 'activity',
    start: '2026-03',
    end: '2026-04',
    title: '구름톤 17기',
    subtitle: '해커톤',
    summary: '구름에서 주최하는 단기 해커톤 참가.',
  },
  {
    id: 'cert-sqld',
    kind: 'cert',
    start: '2026-03',
    end: '2026-03',
    title: 'SQLD',
    subtitle: '한국데이터산업진흥원',
    summary: '',
  },
  {
    id: 'cert-aws-saa',
    kind: 'cert',
    start: '2026-02',
    end: '2026-02',
    title: 'AWS Certified Solutions Architect – Associate',
    subtitle: 'AWS · 774점',
    summary: '',
  },
  {
    id: 'ces-2026',
    kind: 'activity',
    start: '2026-01',
    end: '2026-01',
    title: 'CES 2026 출장',
    subtitle: '라스베가스',
    summary: '케어마인더 전시회 부스 운영.',
  },
  {
    id: 'award-loadtest',
    kind: 'award',
    start: '2025-08',
    end: '2025-08',
    title: '부하테스트 대회 최우수상',
    subtitle: '카카오테크 부트캠프 · 21팀 중 2등',
    summary: '',
  },
  {
    id: 'kakao-bootcamp',
    kind: 'training',
    start: '2025-01',
    end: '2025-08',
    title: '카카오테크 부트캠프 2기',
    subtitle: '클라우드 네이티브 과정 · 1000시간',
    summary:
      'Linux 서버 운영, Docker & Kubernetes, AWS & Terraform 실습. 부하테스트 대회에서 MSA 구조로 개선해 최우수상.',
  },
  {
    id: 'cert-opic',
    kind: 'cert',
    start: '2025-01',
    end: '2025-01',
    title: 'OPIc (English) IL',
    subtitle: 'ACTFL',
    summary: '',
  },
  {
    id: 'ajou',
    kind: 'education',
    start: '2019-03',
    end: '2025-02',
    title: '아주대학교 소프트웨어공학과',
    subtitle: '학사',
    summary: '2020.04 ~ 2021.10 육군 만기전역.',
  },
  {
    id: 'award-jeongjuyoung',
    kind: 'award',
    start: '2024-11',
    end: '2024-11',
    title: '정주영 창업 경진대회 우수상',
    subtitle: '아산나눔재단',
    summary: '',
  },
  {
    id: 'award-startup-track',
    kind: 'award',
    start: '2024-10',
    end: '2024-10',
    title: '학생 창업 유망팀 도약트랙 장려상',
    subtitle: '교육부',
    summary: '',
  },
  {
    id: 'cert-engineer',
    kind: 'cert',
    start: '2024-06',
    end: '2024-06',
    title: '정보처리기사',
    subtitle: '한국산업인력공단',
    summary: '',
  },
  {
    id: 'modulabs',
    kind: 'activity',
    start: '2023-07',
    end: '2023-09',
    title: '모두의연구소 풀잎스쿨 퍼실리테이터',
    subtitle: '"Auto-GPT를 활용한 서비스 제작"',
    summary:
      'LangChain·Auto-GPT 기반 서비스 제작 스터디를 기획·리딩. 커리큘럼 설계, 코드 리뷰, 발표 운영을 주도하고 Tour-GPT 개발.',
  },
  {
    id: 'award-drone',
    kind: 'award',
    start: '2023-07',
    end: '2023-07',
    title: '자율주행 미니드론 경진대회 동상',
    subtitle: '대한전기학회',
    summary: '',
  },
  {
    id: 'club-nuovo',
    kind: 'club',
    start: '2023-01',
    end: '2024-06',
    title: 'Nuovo',
    subtitle: '교내 인공지능 소학회',
    summary:
      '머신러닝 기초 스터디 → GPT-Academy 스터디 운영(MS 해커톤 AI 면접 챗봇 제작) → 공모전 부서 운영진.',
  },
  {
    id: 'club-atom',
    kind: 'club',
    start: '2022-03',
    end: '2023-12',
    title: 'Atom',
    subtitle: '자율주행 동아리',
    summary: '미니드론 자율주행 경진대회 동상, 국민대·대학생 자율주행 경진대회 참가.',
  },
  {
    id: 'club-clear',
    kind: 'club',
    start: '2022-03',
    end: '2022-12',
    title: 'Clear',
    subtitle: '교내 배드민턴 동아리 · 운영진',
    summary: '교내 대회 복식 동상. 대회와 MT 기획·운영.',
  },
]

// 포트폴리오 프로젝트 데이터 및 타입 정의

export type CaseStudy = {
  title: string // 핵심 문제 한 줄
  subtitle: string
  problem: string // 문제 상황
  cause: string // 원인 분석
  steps: { title: string; body: string }[] // 해결 설계
  result: { headline: string; sub: string; bullets: string[] }
  note?: string // 운영 기준·설계 고려사항
  diagrams?: { solution?: string; result?: string } // public/diagrams 경로
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
  cases?: CaseStudy[]
}

export const projects: Project[] = [
  {
    slug: 'carenote',
    title: 'CareNote',
    type: 'AI · Healthcare',
    description:
      '음성 기반 간호 진술문 요약 서비스. 예약 크레딧과 멱등성으로 과금 정합성을 확보하고, 외부 API 호출량과 Kafka 처리·종료 경계를 관리했습니다.',
    points: ['예약 크레딧 + 행 잠금 + 멱등키로 중복 과금 0건', '세마포어·큐로 외부 API 호출량 제어', '처리 완료 기준 Kafka 커밋과 Graceful shutdown'],
    stack: ['Spring Boot', 'FastAPI', 'Kafka', 'LangGraph', 'Clova Speech', 'AWS'],
    detail: {
      period: '2025.12 - 현재',
      team: 'FE 1 · BE 1',
      features: [
        'Spring Boot 3.3 + Java 17 기반 인증·채널·크레딧·병원·구독 관리 REST API 32개 엔드포인트 설계·구현',
        'Clova Speech 전사 → Gemini 정제·요약을 Kafka 토픽(transcription · refinement · summary) 단위로 분리한 비동기 파이프라인 구축',
        '단계별 실패를 DLT(Dead Letter Topic)로 격리하고, 사용자 재처리 요청 시 실패 단계부터 재개해 불필요한 AI 호출 방지',
        '채널 상태를 13단계로 세분화하고, 30분 이상 정체된 채널을 10분 주기 스케줄러가 감지해 Kafka 이벤트 재발행',
        'JWT Access/Refresh/Temp 3종 토큰 + OAuth(Kakao/Apple) 인증 체계, 내부 연동 API는 X-Internal-Token으로 별도 보호',
        '개인·병원 크레딧 지갑 2종과 구독 플랜 월별 리셋(compare-and-set)으로 멀티 테넌트 과금 모델 구현',
      ],
      achievements: [
        'reserved_credit · SELECT FOR UPDATE · referenceId 멱등키로 동시 요청 환경의 중복 차감과 잔액 불일치 방지 (k6 35건 시나리오에서 중복 요청·초과 과금 0건)',
        '세마포어와 큐로 외부 STT API 동시 호출을 상한 안에서 소비하도록 유입량과 실행량을 분리',
        '처리 완료 기준 오프셋 커밋 + commit lock + Graceful shutdown으로 재시작·배포 시 메시지 유실과 중복 처리를 동시에 방지',
        '계정·채널 삭제 시 DB와 S3 정리를 함께 처리하고, 외부 스토리지 실패는 경고 로그로 격리해 핵심 트랜잭션 보호',
      ],
    },
    cases: [
      {
        title: '예약 크레딧으로 동시 요청 과금 정합성 확보',
        subtitle: '잔액 검증과 예약을 원자적으로 처리하고, 멱등키로 중복 차감을 방지',
        problem:
          'AI 작업이 끝난 뒤 크레딧을 차감하는 후차감 정책을 사용했습니다. 동시에 들어온 요청이 같은 잔액으로 사전 검증을 통과하면, 먼저 완료된 요청의 차감으로 나머지 작업이 최종 과금 단계에서 실패했습니다.',
        cause:
          '잔액 확인과 사용 예정 금액의 예약이 하나의 원자적 작업으로 묶이지 않았습니다. 처리 중인 요청의 크레딧을 고려하더라도, 동시 검증 사이의 경쟁 조건을 막지 못했습니다.',
        steps: [
          { title: '예약 크레딧 도입', body: 'reserved_credit에 사용 예정 금액을 반영해 가용 잔액을 계산했습니다.' },
          { title: '지갑 행 잠금', body: 'SELECT … FOR UPDATE로 검증·예약 구간을 직렬화해 동시 갱신 충돌을 방지했습니다.' },
          { title: '멱등성 확보', body: 'referenceId를 확인해 동일 요청의 재처리와 중복 차감을 차단했습니다.' },
        ],
        result: {
          headline: '35건 → 25건 처리',
          sub: '사전 거절과 처리 실패를 구분',
          bullets: [
            'k6: 5건씩 10초 간격으로 7회 요청',
            '25건 처리 완료 · 10건 사전 검증에서 거절',
            '해당 테스트에서 검증 통과 후 AI 처리 실패 0건',
            '해당 테스트에서 중복 요청·초과 과금 0건',
          ],
        },
        note: '검증 단계의 거절과 AI 처리 단계의 실패를 분리해 결과를 평가했습니다.',
        diagrams: { solution: '/diagrams/carenote/case1-solution.svg', result: '/diagrams/carenote/case1-result.svg' },
      },
      {
        title: '외부 API 호출량 제어로 비동기 처리 병목 완화',
        subtitle: '큐와 세마포어로 유입량과 동시 실행량을 분리',
        problem:
          'Clova Speech 전사와 Gemini 정제·요약 요청을 비동기로 처리했습니다. 요청이 몰리면 처리 시간이 길어지고, 대기 작업과 재시도가 함께 누적되는 병목이 발생했습니다.',
        cause:
          '내부 작업 생성량과 외부 API의 처리 용량을 함께 제어하지 않았습니다. 비동기 실행만 늘리는 방식으로는 외부 호출 제한과 네트워크 대기를 해소할 수 없었습니다.',
        steps: [
          { title: '동시 실행 상한', body: '세마포어로 STT 동시 호출을 제한했습니다. 설정값은 API 계약·운영 환경에 맞춰 관리합니다.' },
          { title: '큐 기반 처리', body: '초과 요청을 큐에 대기시키고 워커가 소비하도록 유입량과 실행량을 분리했습니다.' },
          { title: '재시도 간격 조정', body: '제한 응답과 일시적 오류에 지수 백오프를 적용해 재시도 집중을 완화했습니다.' },
        ],
        result: {
          headline: '유입과 실행을 분리',
          sub: '호출 제한을 반영한 처리 구조',
          bullets: [
            '초과 요청은 대기하고, 실행 중인 API 호출 수는 제한',
            '요청 급증을 큐에서 흡수해 외부 API 보호',
            'Kafka 워커 구조로 처리 단계별 확장 경로 확보',
          ],
        },
        note: '운영 기준: 동시성 상한은 외부 API 계약과 전체 워커 수를 고려해 조정해야 합니다.',
        diagrams: { solution: '/diagrams/carenote/case2-solution.svg', result: '/diagrams/carenote/case2-result.svg' },
      },
      {
        title: '처리 완료 기준 커밋과 안전한 워커 종료',
        subtitle: '비동기 완료 순서와 Kafka 재시작 위치를 일치시키는 설계',
        problem:
          'Kafka 기반 비동기 파이프라인에서도 일부 요청이 간헐적으로 누락되거나 중단됐습니다. 병렬 작업의 완료 순서가 뒤바뀌는 상황과, 처리 중 배포·종료되는 상황을 함께 다뤄야 했습니다.',
        cause:
          '같은 파티션에서 앞선 메시지가 미완료인데 더 뒤의 위치를 커밋하면, 재시작 후 미완료 메시지를 건너뛸 수 있습니다. 종료 시 실행 중 작업을 기다리지 않는 흐름도 처리 중단의 원인이었습니다.',
        steps: [
          { title: '처리 완료 추적', body: '완료 오프셋을 추적하고, 파티션별 미완료 작업을 건너뛰지 않는 위치까지 커밋했습니다.' },
          { title: '커밋 구간 직렬화', body: 'commit lock으로 동시 커밋 충돌을 제어했습니다. 잠금과 완료 범위 추적을 함께 적용했습니다.' },
          { title: 'Graceful shutdown', body: '실행 중 task를 추적하고 asyncio.gather로 완료를 기다린 뒤 consumer를 종료했습니다.' },
        ],
        result: {
          headline: '완료 후 커밋',
          sub: '재시작과 종료 시 복구 경계 정리',
          bullets: [
            '미완료 메시지를 건너뛰는 커밋 경로 개선',
            '종료 전에 실행 중 작업을 기다리는 절차 확보',
            '재처리 가능성과 멱등성을 함께 고려한 운영 구조',
          ],
        },
        note: '설계 포인트: 커밋 잠금과 함께 미완료 메시지를 건너뛰지 않는 완료 범위 추적이 필요합니다.',
        diagrams: { solution: '/diagrams/carenote/case3-solution.svg', result: '/diagrams/carenote/case3-result.svg' },
      },
    ],
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
  },
  {
    slug: 'careflow',
    title: 'CareFlow',
    type: 'MSA · Healthcare',
    description:
      '음성 기반 통합 AI 스마트 병원 솔루션. 도메인·조회·배치·알림을 모듈 단위로 분리하고, 상태 점검 배치와 CI/CD의 운영 효율을 개선했습니다.',
    points: ['6개 멀티모듈 아키텍처, 200+ API 운영', 'mod 3분할로 배치 1회 피크 100% → 약 33%', 'CI/CD 4분 → 3분 + Blue-Green 무중단 배포'],
    stack: ['Spring Boot', 'MySQL', 'Redis', 'MongoDB', 'GitHub Actions', 'Docker'],
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
        'Docker Compose·Nginx Blue-Green 배포와 prepare → switch → rollback 절차 표준화로 중단 없는 배포·즉시 복구 구조 확보',
        '전략 패턴(BaseAuthManager + 역할별 구현체 + AuthManagerFactory)으로 SRP/OCP 충족하는 확장형 구조 개선',
        'Microsoft Teams 연동 기반 실제 병원 도입 성과 달성',
      ],
    },
    cases: [
      {
        title: '멀티모듈 책임 분리와 배치 부하 분산',
        subtitle: '병원 업무 API와 상태 점검 작업을 운영 단위로 분리',
        problem:
          '병원 업무 API, 상태 점검 배치, 알림이 함께 운영되는 서비스입니다. 조회·도메인·배치·알림의 책임을 구분하고, 태블릿과 데스크의 상태 점검이 한 주기에 몰리지 않도록 운영 구조를 정리했습니다.',
        cause:
          '책임이 다른 기능을 함께 관리하면 변경 영향 범위와 운영 부담이 커집니다. 상태 점검 대상을 같은 주기에 모두 처리하면 배치가 집중되는 구조적 문제가 생깁니다.',
        steps: [
          { title: '6개 모듈로 책임 분리', body: 'main · main-reader · main-domain · batch · notification · common-core로 구성했습니다.' },
          { title: '점검 대상 3분할', body: '3분 주기 작업을 mod 0/1/2 그룹으로 나눠 cron 0/3 · 1/3 · 2/3에 분산했습니다.' },
          { title: '변경 시 알림 전파', body: '상태가 달라졌을 때 알림을 전달하고, STOMP·Redis Pub/Sub와 Teams 연동으로 업무 흐름을 연결했습니다.' },
        ],
        result: {
          headline: '점검 대상을 3개 그룹으로',
          sub: '단일 주기에 몰리던 배치 대상 분산',
          bullets: [
            '주기별 처리 대상을 전체의 약 1/3로 나눔',
            '조회·도메인·배치·알림의 책임을 명확히 분리',
            '상태 변경을 중심으로 실시간 알림 흐름 구성',
          ],
        },
        note: '1/3은 처리 대상의 분할 비율이며, CPU 사용량이나 응답 시간의 측정값을 의미하지 않습니다.',
        diagrams: { solution: '/diagrams/careflow/case1-solution.svg', result: '/diagrams/careflow/case1-result.svg' },
      },
      {
        title: '변경 모듈만 빌드하는 모노레포 CI/CD',
        subtitle: '빌드 캐시·병렬 처리와 Blue-Green 배포로 운영 효율 개선',
        problem:
          '작은 변경에도 전체 모듈을 빌드하면서 CI/CD 수행 시간이 길어졌습니다. 서비스별 변경 추적과 버전 식별, 배포 실패 시 복구 절차를 함께 정리해야 했습니다.',
        cause:
          '변경 경로와 모듈 의존성을 기준으로 빌드 범위를 선택하는 단계가 부족했습니다. 전체 빌드를 반복하고, 배포 전 검증과 트래픽 전환·롤백 절차도 표준화되지 않았습니다.',
        steps: [
          { title: '선택 빌드와 캐시', body: 'paths-filter로 변경 모듈을 선택하고, Gradle·Docker 캐시와 matrix 병렬 처리를 적용했습니다.' },
          { title: '배포 버전 식별', body: '태그·commit SHA 기반 이미지 버전 관리로 배포 이력을 추적하고 롤백 대상을 식별했습니다.' },
          { title: 'Blue-Green 배포', body: 'Docker Compose·Nginx로 새 버전의 상태를 확인한 뒤 트래픽을 전환하고, 실패 시 이전 버전으로 복구하도록 구성했습니다.' },
        ],
        result: {
          headline: '4분 → 3분',
          sub: 'CI/CD 수행 시간 약 25% 단축',
          bullets: [
            '변경 모듈만 빌드해 불필요한 작업 감소',
            'prepare → switch → rollback으로 배포 절차 표준화',
            '이미지 버전과 복구 경로를 명확히 관리',
          ],
        },
        note: '단축률 = (4분 − 3분) ÷ 4분 × 100 = 25%',
        diagrams: { solution: '/diagrams/careflow/case2-solution.svg', result: '/diagrams/careflow/case2-result.svg' },
      },
    ],
  },
  {
    slug: 'dev-pick',
    title: 'Dev-Pick',
    type: 'Side Project',
    description:
      '테크 블로그 큐레이션 서비스. 수집과 적재의 복구 경로를 구성하고, 태그 저장 재시도와 커서 기반 조회를 설계했습니다.',
    points: ['수집·적재 분리와 오프셋 fallback 복구 경로', '락 경합 재시도 최대 3회 · 30ms × n 백오프', '(pubDate, id) 커서 페이지네이션과 Snowflake ID'],
    stack: ['Spring Boot', 'Spring Batch', 'Kafka', 'MySQL', 'Redis', 'AWS'],
    link: 'https://dev-pick.com',
    detail: {
      period: '2025.11 - 현재',
      team: 'FE 1 · BE 1 · Design 1',
      features: [
        'api / authentication / collector / batch / domain / application 6개 모듈로 분리된 멀티모듈 백엔드 아키텍처 구성',
        'Collector 파이프라인을 크롤링 → 추출 → 중복제거 → Kafka 발행 단계로 설계하고 타깃 사이트를 코루틴 기반으로 병렬 수집',
        'RSS/Atom 혼합 포맷 대응을 위해 Extractor를 어댑터 구조로 분리, 실패 시 최대 3회 재시도(1s→2s→4s 백오프)',
        'Batch에서 Kafka 메시지를 읽어 Post/Tag/PostTag를 배치 저장하고, upsert/insert-ignore로 중복 유입 제어',
        '키워드·카테고리 slug·소스 사이트·언어 필터 + lastPostId + pubDate 기반 커서 페이지네이션 적용 24개 엔드포인트 구성',
      ],
      achievements: [
        '수집 스케줄과 적재 스케줄을 분리해 파이프라인 장애가 전체 서비스로 전파되지 않는 구조 설계',
        'Kafka Reader 커밋 오프셋 조회 실패 시 0 오프셋 fallback으로 컨슈머 상태 이상에도 배치 잡 중단 방지',
        '태그 배치 저장 중 PessimisticLockingFailureException에 최대 3회 재시도 + 선형 백오프(30ms × 시도횟수) 적용',
        'Snowflake 기반 ID 생성기(41bit epoch, 10bit node, 12bit sequence)로 분산 환경 충돌 방지 및 식별자 정책 일관화',
      ],
    },
    cases: [
      {
        title: 'Kafka 오프셋 조회 실패에 배치 복구 경로 추가',
        subtitle: '수집과 적재를 분리하고, 재수집 데이터의 중복 유입을 제어',
        problem:
          'Kafka Reader에서 커밋 오프셋을 조회하지 못하면 배치의 시작 위치 결정 단계에서 적재 작업이 중단됐습니다. 컨슈머 상태 이상이 수집·적재 파이프라인 전체로 전파되지 않도록 복구 경로가 필요했습니다.',
        cause:
          '정상적인 커밋 오프셋 조회를 전제로 Reader를 초기화했습니다. 조회 실패 시 대체 위치가 없었고, 이전 메시지를 다시 읽는 경우의 중복 적재도 함께 고려해야 했습니다.',
        steps: [
          { title: '시작 위치 fallback', body: '커밋 오프셋 조회 실패 시 0 오프셋 fallback을 적용해 Reader 초기화의 복구 경로를 추가했습니다.' },
          { title: '파이프라인 분리', body: '수집 스케줄과 적재 스케줄을 나눠 단계별 장애가 전체 흐름으로 번지는 범위를 줄였습니다.' },
          { title: '재적재 중복 제어', body: 'Post·Tag 저장에 upsert·insert-ignore를 적용해 재유입 데이터의 중복 적재를 제어했습니다.' },
        ],
        result: {
          headline: '중단 대신 복구 경로',
          sub: '컨슈머 상태 이상에 대응하는 Reader',
          bullets: [
            '오프셋 조회 실패 시 대체 시작 위치 확보',
            '재읽기 데이터는 중복 방지 저장 전략으로 처리',
            '수집·적재를 독립적으로 운영할 수 있는 구조',
          ],
        },
        note: '0 fallback은 저장된 메시지 범위 안에서 재읽기를 시도하는 경로입니다. 보존 만료 데이터의 복원이나 무손실을 보장하지 않습니다.',
        diagrams: { solution: '/diagrams/dev-pick/case1-solution.svg', result: '/diagrams/dev-pick/case1-result.svg' },
      },
      {
        title: '태그 저장 락 경합에 제한된 재시도 적용',
        subtitle: 'PessimisticLockingFailureException을 복구 가능한 실패로 처리',
        problem:
          '여러 배치 작업이 같은 태그를 저장할 때 락 경합으로 PessimisticLockingFailureException이 발생했습니다. 일시적인 경쟁 상태로 인해 태그 적재가 실패하는 흐름을 개선했습니다.',
        cause:
          '동일한 태그 데이터에 대한 동시 저장이 겹치면서 데이터베이스 잠금 경쟁이 발생했습니다. 즉시 재시도만 반복하면 같은 시점에 다시 충돌할 수 있어, 횟수와 대기 시간을 제한해야 했습니다.',
        steps: [
          { title: '대상 예외에 재시도', body: 'PessimisticLockingFailureException 발생 시 최대 3회 재시도하도록 제한했습니다.' },
          { title: '선형 백오프', body: '30ms × 시도 횟수의 대기 시간을 적용해 재시도 요청이 같은 시점에 집중되는 현상을 완화했습니다.' },
          { title: '중복 유입 제어', body: 'upsert·insert-ignore와 함께 적용해 재시도로 들어온 태그의 중복 저장을 제어했습니다.' },
        ],
        result: {
          headline: '최대 3회 재시도',
          sub: '30ms × n 선형 백오프',
          bullets: [
            '일시적인 락 경합에 대한 복구 기회 확보',
            '재시도 횟수 제한으로 무한 반복 방지',
            '재시도와 중복 방지 저장을 함께 고려한 배치',
          ],
        },
        note: '설계 고려사항: 재시도 소진 시 실패를 식별할 수 있어야 하며, 재시도는 중복 저장 제어와 함께 설계합니다.',
        diagrams: { solution: '/diagrams/dev-pick/case2-solution.svg', result: '/diagrams/dev-pick/case2-result.svg' },
      },
      {
        title: '커서 페이지네이션과 분산 식별자 정책',
        subtitle: '조회 경계와 정렬 기준을 명시해 목록 API 구성',
        problem:
          '수집된 글을 키워드·카테고리·소스·언어로 탐색할 수 있도록 목록 조회 API를 구성했습니다. 페이지 이동 기준과 분산 환경의 글 식별자 정책을 일관되게 정의해야 했습니다.',
        cause:
          '오프셋 방식은 뒤쪽 페이지에서 건너뛰는 데이터가 많아질 수 있습니다. 발행 시간이 같은 글도 구분할 수 있도록 마지막 글의 ID와 발행 시각을 함께 조회 경계로 사용했습니다.',
        steps: [
          { title: '복합 커서 사용', body: 'lastPostId + pubDate를 기준으로 다음 페이지를 조회하도록 커서 페이지네이션을 적용했습니다.' },
          { title: '탐색 조건 제공', body: '키워드 · 카테고리 slug · 소스 사이트 · 언어 필터를 목록 조회와 함께 구성했습니다.' },
          { title: 'Snowflake ID', body: '41bit epoch · 10bit node · 12bit sequence 구조로 분산 환경의 식별자 정책을 통일했습니다.' },
        ],
        result: {
          headline: 'lastPostId + pubDate',
          sub: '명확한 다음 페이지 경계',
          bullets: [
            '커서 기반 목록 조회와 여러 탐색 필터 제공',
            '같은 발행 시각의 글도 ID로 구분할 수 있는 기준',
            '분산 노드의 고유 ID 생성을 위한 공통 정책',
          ],
        },
        note: '설계 고려사항: 정렬 기준·커서 조건·인덱스의 일치와 노드 ID 중복, 시계 역행에 대한 운영 정책이 필요합니다.',
        diagrams: { solution: '/diagrams/dev-pick/case3-solution.svg', result: '/diagrams/dev-pick/case3-result.svg' },
      },
    ],
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
  },
]

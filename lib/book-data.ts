// 홈 플립북의 챕터 정의와 타임라인 항목을 쪽 단위로 나누는 빌더

import { COMPACT_KINDS, timeline, type TimelineEntry } from '@/lib/timeline-data'

export type Chapter = {
  id: string
  label: string // '서막', '1장' ...
  title: string
  range: string
  story: string
  entryIds: string[]
}

export const chapters: Chapter[] = [
  {
    id: 'prologue',
    label: '서막',
    title: '학교와 동아리',
    range: '2019 — 2023',
    story: '관심을 프로젝트로 옮기며 개발의 기본기를 쌓았습니다.',
    entryIds: ['ajou', 'club-clear', 'club-atom', 'club-nuovo', 'award-drone', 'modulabs'],
  },
  {
    id: 'ch1',
    label: '1장',
    title: '실전 개발의 시작',
    range: '2024',
    story: '인턴 경험을 통해 실제 사용자를 위한 서비스를 개발하며 실전 개발 역량을 키웠습니다.',
    entryIds: ['cert-engineer', 'fleetsoft-intern', 'careminder-intern', 'award-startup-track', 'award-jeongjuyoung'],
  },
  {
    id: 'ch2',
    label: '2장',
    title: '클라우드와 운영',
    range: '2025',
    story: '기능을 만드는 것을 넘어, 서비스를 안정적으로 운영하는 개발자로 성장했습니다.',
    entryIds: [
      'cert-opic',
      'kakao-bootcamp',
      'youtil',
      'award-loadtest',
      'careminder-fulltime',
      'careflow-return',
      'carenote',
      'careform',
      'dev-pick',
    ],
  },
  {
    id: 'ch3',
    label: '3장',
    title: 'AX와 1인 개발',
    range: '2026',
    story: 'AI를 개발 프로세스에 통합하고, 기획부터 iOS 앱스토어 출시까지 혼자 완성하는 역량을 확장하고 있습니다.',
    entryIds: [
      'cert-aws-saa',
      'cert-sqld',
      'ces-2026',
      'goormthon-17',
      'monix',
      'harness',
      'todac',
      'scene-log',
      'scene-log-appstore',
    ],
  },
]

export type BookPage =
  | { kind: 'cover'; id: 'cover' }
  | { kind: 'author'; id: 'author' }
  | { kind: 'toc'; id: 'toc'; items: { chapterId: string; label: string; title: string; range: string; page: number }[] }
  | { kind: 'chapter'; id: string; chapter: Chapter }
  | { kind: 'entries'; id: string; chapter: Chapter; entries: TimelineEntry[]; index: number }
  | { kind: 'closing'; id: 'contact' }
  | { kind: 'blank'; id: string }
  | { kind: 'back'; id: 'back' }

// 한 쪽에 담는 무게 — 카드 1(통계 있는 카드 1.6), 마일스톤 0.3
const CAPACITY = 3.1
const weightOf = (e: TimelineEntry) => {
  if (COMPACT_KINDS.includes(e.kind)) return 0.3
  return e.stats ? 1.6 : 1
}

function chunk(entries: TimelineEntry[]): TimelineEntry[][] {
  const pages: TimelineEntry[][] = []
  let current: TimelineEntry[] = []
  let used = 0
  for (const e of entries) {
    const w = weightOf(e)
    if (current.length > 0 && used + w > CAPACITY) {
      pages.push(current)
      current = []
      used = 0
    }
    current.push(e)
    used += w
  }
  if (current.length > 0) pages.push(current)
  return pages
}

export function buildPages(): BookPage[] {
  const byId = new Map(timeline.map((e) => [e.id, e]))
  const pages: BookPage[] = [{ kind: 'cover', id: 'cover' }, { kind: 'author', id: 'author' }]

  // 목차 쪽은 자리만 잡고, 장 시작 쪽 번호가 확정된 뒤 채운다
  const tocIndex = pages.length
  pages.push({ kind: 'toc', id: 'toc', items: [] })

  const tocItems: Extract<BookPage, { kind: 'toc' }>['items'] = []
  for (const chapter of chapters) {
    tocItems.push({
      chapterId: chapter.id,
      label: chapter.label,
      title: chapter.title,
      range: chapter.range,
      page: pages.length,
    })
    pages.push({ kind: 'chapter', id: chapter.id, chapter })
    const entries = chapter.entryIds
      .map((id) => byId.get(id))
      .filter((e): e is TimelineEntry => Boolean(e))
      .sort((a, b) => a.start.localeCompare(b.start))
    chunk(entries).forEach((group, i) => {
      pages.push({ kind: 'entries', id: `${chapter.id}-${i}`, chapter, entries: group, index: i })
    })
  }

  pages.push({ kind: 'closing', id: 'contact' })
  // 뒷표지는 왼쪽 자리(홀수 인덱스)에 놓여야 닫힌 책으로 보인다
  if (pages.length % 2 === 0) pages.push({ kind: 'blank', id: 'blank-end' })
  pages.push({ kind: 'back', id: 'back' })
  pages[tocIndex] = { kind: 'toc', id: 'toc', items: tocItems }
  return pages
}

// 홈 플립북의 챕터 정의와 타임라인 항목을 쪽 단위로 나누는 빌더

import { COMPACT_KINDS, timeline, type TimelineEntry } from '@/lib/timeline-data'

export type Chapter = {
  id: string
  label: string // '서막', '1장' ...
  title: string
  range: string
  entryIds: string[]
}

export const chapters: Chapter[] = [
  {
    id: 'prologue',
    label: '서막',
    title: '학교와 동아리',
    range: '2019 — 2023',
    entryIds: ['ajou', 'club-clear', 'club-atom', 'club-nuovo', 'award-drone', 'modulabs'],
  },
  {
    id: 'ch1',
    label: '1장',
    title: '두 번의 인턴',
    range: '2024',
    entryIds: ['cert-engineer', 'fleetsoft-intern', 'careminder-intern', 'award-startup-track', 'award-jeongjuyoung'],
  },
  {
    id: 'ch2',
    label: '2장',
    title: '부트캠프',
    range: '2025 상반기',
    entryIds: ['cert-opic', 'kakao-bootcamp', 'youtil', 'award-loadtest'],
  },
  {
    id: 'ch3',
    label: '3장',
    title: '케어마인더',
    range: '2025.10 — 현재',
    entryIds: ['careminder-fulltime', 'careflow-return', 'carenote', 'careform', 'ces-2026'],
  },
  {
    id: 'ch4',
    label: '4장',
    title: '사이드 프로젝트와 해커톤',
    range: '2025.11 — 현재',
    entryIds: [
      'dev-pick',
      'cert-aws-saa',
      'cert-sqld',
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
  pages[tocIndex] = { kind: 'toc', id: 'toc', items: tocItems }
  return pages
}

// 개발 여정 플립북 — 두 쪽 펼침/한 쪽 보기, 3D 넘김 애니메이션, 키보드·스와이프·해시 점프를 담당하는 클라이언트 컴포넌트
'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import BookPage from '@/components/BookPage'
import { ProjectModal } from '@/components/ProjectModal'
import { buildPages } from '@/lib/book-data'
import { projects, type Project } from '@/lib/projects-data'

const MOBILE_QUERY = '(max-width: 768px)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

function useMedia(query: string) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    [query]
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}

type Flip = { dir: 'next' | 'prev'; from: number }

export default function Book() {
  const pages = useMemo(() => buildPages(), [])
  const isMobile = useMedia(MOBILE_QUERY)
  const reducedMotion = useMedia(REDUCED_QUERY)

  const [page, setPage] = useState(0)
  const [flip, setFlip] = useState<Flip | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchAxis = useRef<'horizontal' | 'vertical' | null>(null)

  const last = pages.length - 1
  // 데스크톱 펼침: spread s 는 왼쪽 2s-1, 오른쪽 2s. 표지(0)는 혼자 오른쪽에 놓인다.
  const spread = Math.ceil(page / 2)
  const leftIdx = 2 * spread - 1
  const rightIdx = 2 * spread
  const step = isMobile ? 1 : 2
  const canPrev = page > 0
  const canNext = isMobile ? page < last : rightIdx < last
  // 넘기는 동안은 닫힘 상태를 풀어 책이 열리는/닫히는 동작과 함께 가운데로 이동한다
  const closedFront = spread === 0 && !flip
  const closedBack = !isMobile && leftIdx === last && !flip

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(last, target))
      setFlip(null)
      setPage(clamped)
    },
    [last]
  )

  const next = useCallback(() => {
    if (!canNext || flip) return
    if (isMobile || reducedMotion) {
      setPage((p) => Math.min(last, p + step))
      return
    }
    setFlip({ dir: 'next', from: page })
  }, [canNext, flip, isMobile, reducedMotion, last, step, page])

  const prev = useCallback(() => {
    if (!canPrev || flip) return
    if (isMobile || reducedMotion) {
      setPage((p) => Math.max(0, p - step))
      return
    }
    setFlip({ dir: 'prev', from: page })
  }, [canPrev, flip, isMobile, reducedMotion, step, page])

  const commitFlip = useCallback(() => {
    if (!flip) return
    setPage(flip.dir === 'next' ? Math.min(last, flip.from + 2) : Math.max(0, flip.from - 2))
    setFlip(null)
  }, [flip, last])

  // 헤더 nav 의 해시(#cover / #toc / #contact)로 점프
  useEffect(() => {
    const tocIdx = pages.findIndex((p) => p.kind === 'toc')
    const targets: Record<string, number> = {
      cover: 0,
      intro: 0,
      toc: tocIdx,
      journey: tocIdx,
      projects: tocIdx,
      experience: tocIdx,
      contact: pages.findIndex((p) => p.kind === 'closing'),
    }
    const apply = () => {
      const key = window.location.hash.replace('#', '')
      if (key in targets) goTo(targets[key])
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [pages, last, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selected) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, selected])

  const openProject = useCallback((slug: string) => {
    const project = projects.find((p) => p.slug === slug)
    if (project) setSelected(project)
  }, [])

  // 카드·링크·버튼이 아닌 쪽 여백을 클릭하면 그 방향으로 넘긴다
  const onSlotClick = (side: 'left' | 'right') => (e: React.MouseEvent) => {
    const el = e.target as HTMLElement
    if (el.closest('a, button, [role="button"]')) return
    if (side === 'right') next()
    else prev()
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchAxis.current = null
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const touch = e.touches[0]
    const dx = touch.clientX - touchStartX.current
    const dy = touch.clientY - touchStartY.current

    if (!touchAxis.current && Math.max(Math.abs(dx), Math.abs(dy)) >= 10) {
      touchAxis.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
    }

    if (touchAxis.current === 'horizontal') e.preventDefault()
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null
    const axis = touchAxis.current
    touchAxis.current = null
    if (axis !== 'horizontal' || Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return
    if (dx < 0) next()
    else prev()
  }
  const onTouchCancel = () => {
    touchStartX.current = null
    touchStartY.current = null
    touchAxis.current = null
  }

  const render = (idx: number) =>
    idx >= 0 && idx <= last ? (
      <BookPage page={pages[idx]} pageNumber={idx} onOpenProject={openProject} onGoTo={goTo} />
    ) : (
      <div className="book-page book-blank" aria-hidden="true" />
    )

  // 넘기는 동안 정지된 쪽과 움직이는 낱장이 보여 줄 인덱스
  let staticLeft = leftIdx
  let staticRight = rightIdx
  let sheet: { front: number; back: number } | null = null
  if (flip) {
    const s = Math.ceil(flip.from / 2)
    if (flip.dir === 'next') {
      staticLeft = 2 * s - 1
      staticRight = 2 * s + 2
      sheet = { front: 2 * s, back: 2 * s + 1 }
    } else {
      staticLeft = 2 * s - 3
      staticRight = 2 * s
      sheet = { front: 2 * s - 1, back: 2 * s - 2 }
    }
  }

  const label = isMobile
    ? `${page} / ${last}`
    : spread === 0
      ? '표지'
      : leftIdx === last
        ? '뒷표지'
        : `${leftIdx}–${Math.min(rightIdx, last)} / ${last}`

  return (
    <div
      className="book-stage"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
    >
      {isMobile ? (
        <div className="book-single">
          <div key={page} className="book-slot book-slot-enter" onClick={onSlotClick('right')}>
            {render(page)}
          </div>
        </div>
      ) : (
        <div
          className={`book-spread${closedFront ? ' is-closed-front' : ''}${closedBack ? ' is-closed-back' : ''}${flip ? ' is-flipping' : ''}`}
        >
          <div className="book-slot book-slot-left" onClick={onSlotClick('left')}>
            {render(staticLeft)}
          </div>
          <div className="book-slot book-slot-right" onClick={onSlotClick('right')}>
            {render(staticRight)}
          </div>
          {flip && sheet && (
            <div className={`book-sheet book-sheet-${flip.dir}`} onAnimationEnd={commitFlip}>
              <div className="book-face book-face-front">{render(sheet.front)}</div>
              <div className="book-face book-face-back">{render(sheet.back)}</div>
            </div>
          )}
        </div>
      )}

      <div className="book-controls">
        <button type="button" onClick={prev} disabled={!canPrev || Boolean(flip)} aria-label="이전 쪽">
          ← 이전
        </button>
        <span className="book-controls-label">{label}</span>
        <button type="button" onClick={next} disabled={!canNext || Boolean(flip)} aria-label="다음 쪽">
          다음 →
        </button>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

// 프로젝트 트러블슈팅 케이스(핵심 문제 → 문제·원인 → 해결 설계 → 결과와 검증)를 다이어그램과 함께 렌더링
import Image from 'next/image'
import type { CaseStudy } from '@/lib/projects-data'

function Diagram({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="cs-diagram">
      <Image src={src} alt={alt} width={381} height={267} unoptimized />
    </figure>
  )
}

export function CaseStudyList({ cases }: { cases: CaseStudy[] }) {
  return (
    <div className="cs-list">
      {cases.map((c, idx) => (
        <article key={c.title} className="cs-item">
          <header className="cs-head">
            <span className="cs-number">CASE {String(idx + 1).padStart(2, '0')}</span>
            <h3>{c.title}</h3>
            <p>{c.subtitle}</p>
          </header>

          <div className="cs-grid cs-grid-2">
            <section className="cs-box">
              <h4>문제 상황</h4>
              <p>{c.problem}</p>
            </section>
            <section className="cs-box">
              <h4>원인 분석</h4>
              <p>{c.cause}</p>
            </section>
          </div>

          <section className="cs-block">
            <h4>해결 설계</h4>
            <div className={`cs-grid${c.diagrams?.solution ? ' cs-grid-media' : ''}`}>
              <ol className="cs-steps">
                {c.steps.map((s, i) => (
                  <li key={s.title}>
                    <strong>
                      {String(i + 1).padStart(2, '0')} {s.title}
                    </strong>
                    <span>{s.body}</span>
                  </li>
                ))}
              </ol>
              {c.diagrams?.solution && <Diagram src={c.diagrams.solution} alt={`${c.title} 해결 설계 다이어그램`} />}
            </div>
          </section>

          <section className="cs-block">
            <h4>결과와 검증</h4>
            <div className={`cs-grid${c.diagrams?.result ? ' cs-grid-media' : ''}`}>
              <div className="cs-result">
                <p className="cs-result-headline">{c.result.headline}</p>
                <p className="cs-result-sub">{c.result.sub}</p>
                <ul>
                  {c.result.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              {c.diagrams?.result && <Diagram src={c.diagrams.result} alt={`${c.title} 결과 다이어그램`} />}
            </div>
            {c.note && <p className="cs-note">{c.note}</p>}
          </section>
        </article>
      ))}
    </div>
  )
}

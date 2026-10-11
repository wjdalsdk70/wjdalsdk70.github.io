'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'intro', label: '소개' },
  { id: 'experience', label: '경력' },
  { id: 'projects', label: '프로젝트' },
  { id: 'education', label: '교육·자격' },
  { id: 'contact', label: '연락처' },
]

export default function PortfolioNav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 })
    sections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="portfolio-nav" aria-label="포트폴리오 섹션">
      <a className="portfolio-brand" href="#">정민의 개발 기록<span>JM.</span></a>
      <div className="portfolio-nav-links">
      {sections.map(({ id, label }) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
          {label}
        </a>
      ))}
      </div>
    </nav>
  )
}

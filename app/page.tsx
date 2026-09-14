import Image from 'next/image'
import Link from 'next/link'
import { FaJava, FaAws } from 'react-icons/fa'
import { SiSpringboot, SiFastapi, SiApachekafka, SiMysql, SiRedis, SiMongodb, SiDocker, SiGithubactions, SiTerraform, SiNextdotjs } from 'react-icons/si'
import { siteConfig } from '@/siteConfig'
import Timeline from '@/components/Timeline'
import { projects } from '@/lib/projects-data'
import { timeline } from '@/lib/timeline-data'

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
              <a href={`mailto:${siteConfig.social.email}`} className="primary-action">
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

      <section id="journey" className="portfolio-section" aria-labelledby="journey-title">
        <span id="projects" aria-hidden="true" />
        <span id="experience" aria-hidden="true" />
        <div className="section-heading">
          <p className="eyebrow">Journey</p>
          <h2 id="journey-title">개발 여정</h2>
        </div>
        <Timeline entries={timeline} projects={projects} />
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

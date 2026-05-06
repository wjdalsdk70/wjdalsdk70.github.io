import avatarImage from '@/assets/avatar.png'

export const siteConfig = {
  title: '이정민 포트폴리오',
  tagline: '문제를 구조화하고 제품으로 구현하는 개발자',
  siteUrl: 'https://wjdalsdk70.github.io',
  avatar: avatarImage,
  aboutUrl: '/about.pdf',
  portfolioUrl: '/portfolio.pdf',
  songUrl:
    'https://www.youtube.com/watch?v=E1rqAcMr-ps&list=RDE1rqAcMr-ps&start_radio=1',
  social: {
    name: '이정민',
    email: 'dlwjdals7073@gamil.com',
    github: 'wjdalsdk70',
    linkedin: 'https://www.linkedin.com/in/jm-info',
    twitter: 'twitter_username',
  },
  nav: [
    { name: 'Intro', href: '/#intro' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/#contact' },
  ],
} as const

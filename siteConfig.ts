import avatarImage from '@/assets/avatar.png'

export const siteConfig = {
  title: '이정민 포트폴리오',
  tagline: '안정적인 서비스 운영과 개선을 고민하는 개발자입니다.',
  siteUrl: 'https://wjdalsdk70.github.io',
  avatar: avatarImage,
  aboutUrl: '/about.pdf',
  portfolioUrl: '/portfolio.pdf',
  songUrl:
    'https://www.youtube.com/watch?v=E1rqAcMr-ps&list=RDE1rqAcMr-ps&start_radio=1',
  social: {
    name: '이정민',
    email: 'dlwjdals7073@gmail.com',
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

import avatarImage from '@/assets/avatar.png'

export const siteConfig = {
  title: 'JM BLOG',
  tagline: '개발 블로그',
  avatar: avatarImage,
  aboutUrl: '/about.pdf',
  songUrl:
    'https://www.youtube.com/watch?v=E1rqAcMr-ps&list=RDE1rqAcMr-ps&start_radio=1',
  social: {
    name: '이정민',
    email: 'dlwjdals7073@gamil.com',
    github: 'wjdalsdk70',
    twitter: 'twitter_username',
  },
  nav: [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'ARCHIVES', href: '/archives' },
    { name: 'CATEGORIES', href: '/categories' },
    { name: 'TAGS', href: '/tags' },
  ],
} as const

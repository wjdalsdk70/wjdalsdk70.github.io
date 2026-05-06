import type { MetadataRoute } from 'next'
import { siteConfig } from '@/siteConfig'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.siteUrl,            lastModified: new Date(), changeFrequency: 'daily',  priority: 1.0 },
    { url: `${siteConfig.siteUrl}/about`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]
}

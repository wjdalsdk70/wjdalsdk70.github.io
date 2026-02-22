import type { MetadataRoute } from 'next'
import { siteConfig } from '@/siteConfig'
import { getAllCategories, getAllPosts, getAllTags } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/archives', '/categories', '/tags']
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const postDate = post.date ? new Date(post.date) : null
    const isValidDate = !!postDate && !Number.isNaN(postDate.getTime())

    return {
      url: `${siteConfig.siteUrl}/posts/${encodeURIComponent(post.slug)}`,
      lastModified: isValidDate ? postDate : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  })

  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${siteConfig.siteUrl}/categories/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const tagEntries: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${siteConfig.siteUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  return [...staticEntries, ...postEntries, ...categoryEntries, ...tagEntries]
}

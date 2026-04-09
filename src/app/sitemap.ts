// W29: dynamic sitemap. The previous static public/sitemap.xml hand-listed
// 13 URLs and forgot every /blog/[slug] page, so the long-form articles
// (the highest organic-traffic asset on the site) were never indexed.
//
// Next.js will serve this file at /sitemap.xml automatically. Static
// public/sitemap.xml has been removed in the same commit.

import type { MetadataRoute } from 'next'
import { blogArticles } from '@/lib/blog-data'

const SITE = 'https://www.biolune.eu'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE}`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/apply`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/protocol`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/success-stories`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/news`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/legal/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/legal/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/legal/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/legal/licensing-agreement`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // W29: every blog article gets its own URL. Pulled from the same source
  // of truth that renders the article so adding a new article = automatic
  // sitemap inclusion.
  const blogEntries: MetadataRoute.Sitemap = Object.values(blogArticles).map((article) => ({
    url: `${SITE}/blog/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'

  const routes = [
    { path: '', priority: 1, changeFreq: 'weekly' as const },
    { path: '/solucao', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/como-funciona', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/segmentos', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/integracao', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/seguranca-e-compliance', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/sobre', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/contato', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/blog', priority: 0.6, changeFreq: 'weekly' as const },
    // Policy pages
    { path: '/politica-de-privacidade', priority: 0.5, changeFreq: 'yearly' as const },
    { path: '/politica-kyc-kyb', priority: 0.5, changeFreq: 'yearly' as const },
    { path: '/politica-pld-ft', priority: 0.5, changeFreq: 'yearly' as const },
    { path: '/politica-seguranca-informacao', priority: 0.5, changeFreq: 'yearly' as const },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }))
}

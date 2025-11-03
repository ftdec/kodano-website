import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com'

  const routes = [
    '',
    '/produtos',
    '/solucoes',
    '/precos',
    '/desenvolvedores',
    '/seguranca',
    '/clientes',
    '/sobre',
    '/contato',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}

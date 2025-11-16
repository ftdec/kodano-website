import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'

  const routes = [
    '',
    '/como-funciona',
    '/produtos',
    '/para-empresas',
    '/adquirentes',
    '/precos',
    '/sobre',
    '/fale-conosco',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}

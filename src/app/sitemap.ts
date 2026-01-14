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
    '/contato',
    '/solucoes',
    '/desenvolvedores',
    '/seguranca',
    // Institutional Policies
    '/politica-de-privacidade',
    '/politica-kyc-kyb',
    '/politica-pld-ft',
    '/politica-seguranca-informacao',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/politica') ? 0.6 : 0.8,
  }))
}

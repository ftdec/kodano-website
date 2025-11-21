/**
 * SEO Components and Utilities
 * Stripe-level SEO optimization with structured data
 */

import React from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

// ============================================================================
// SEO TYPES
// ============================================================================

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string;
  twitterCreator?: string;
  noindex?: boolean;
  nofollow?: boolean;
  jsonLd?: Record<string, unknown>;
  alternates?: { [lang: string]: string };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductSEOProps {
  name: string;
  description: string;
  image?: string;
  price?: {
    currency: string;
    value: number;
  };
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  brand?: string;
  rating?: {
    value: number;
    count: number;
  };
}

// ============================================================================
// DEFAULT SEO CONFIG
// ============================================================================

const DEFAULT_SEO = {
  title: "Kodano - Gateway de Pagamento Inteligente",
  description: "Simplifique seus pagamentos online com o gateway mais moderno do Brasil. Aprovação superior, antifraude integrado e suporte 24/7.",
  keywords: [
    "gateway de pagamento",
    "pagamento online",
    "processamento de pagamento",
    "antifraude",
    "split de pagamento",
    "marketplace",
    "fintech",
    "pagamento recorrente",
    "checkout transparente",
  ],
  ogType: "website" as const,
  twitterCard: "summary_large_image" as const,
  twitterSite: "@kodano",
  ogImage: "https://kodano.com/og-image.png",
  siteUrl: "https://kodano.com",
};

// ============================================================================
// MAIN SEO COMPONENT
// ============================================================================

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = DEFAULT_SEO.ogType,
  twitterCard = DEFAULT_SEO.twitterCard,
  twitterSite = DEFAULT_SEO.twitterSite,
  twitterCreator,
  noindex = false,
  nofollow = false,
  jsonLd,
  alternates,
}: SEOProps) {
  const pathname = usePathname();
  const siteUrl = DEFAULT_SEO.siteUrl;

  // Construct full title
  const fullTitle = title
    ? `${title} | Kodano`
    : DEFAULT_SEO.title;

  // Use defaults if not provided
  const metaDescription = description || DEFAULT_SEO.description;
  const metaKeywords = keywords || DEFAULT_SEO.keywords;
  const metaOgTitle = ogTitle || fullTitle;
  const metaOgDescription = ogDescription || metaDescription;
  const metaOgImage = ogImage || DEFAULT_SEO.ogImage;
  const canonicalUrl = canonical || `${siteUrl}${pathname}`;

  // Robots directive
  const robotsContent = `${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords.join(", ")} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={metaOgTitle} />
      <meta property="og:description" content={metaOgDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:site_name" content="Kodano" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      <meta name="twitter:title" content={metaOgTitle} />
      <meta name="twitter:description" content={metaOgDescription} />
      <meta name="twitter:image" content={metaOgImage} />

      {/* Alternate Languages */}
      {alternates && Object.entries(alternates).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#0D1B2A" />

      {/* Favicons */}
      <link rel="icon" href="/kodano-logo.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/kodano-logo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/kodano-logo.png" />
      <link rel="apple-touch-icon" href="/kodano-logo.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}

// ============================================================================
// ORGANIZATION SCHEMA
// ============================================================================

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kodano",
    description: DEFAULT_SEO.description,
    url: DEFAULT_SEO.siteUrl,
    logo: `${DEFAULT_SEO.siteUrl}/logo.png`,
    sameAs: [
      "https://twitter.com/kodano",
      "https://linkedin.com/company/kodano",
      "https://github.com/kodano",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-11-1234-5678",
      contactType: "customer service",
      availableLanguage: ["Portuguese", "English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Paulista, 1000",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01310-100",
      addressCountry: "BR",
    },
  };

  return <SEO jsonLd={schema} />;
}

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${DEFAULT_SEO.siteUrl}${item.url}`,
    })),
  };

  return <SEO jsonLd={schema} />;
}

// ============================================================================
// FAQ SCHEMA
// ============================================================================

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <SEO jsonLd={schema} />;
}

// ============================================================================
// PRODUCT SCHEMA
// ============================================================================

export function ProductSchema({
  name,
  description,
  image,
  price,
  availability = "InStock",
  brand = "Kodano",
  rating,
}: ProductSEOProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image || DEFAULT_SEO.ogImage,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: price ? {
      "@type": "Offer",
      price: price.value,
      priceCurrency: price.currency,
      availability: `https://schema.org/${availability}`,
    } : undefined,
    aggregateRating: rating ? {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
    } : undefined,
  };

  return <SEO jsonLd={schema} />;
}

// ============================================================================
// ARTICLE SCHEMA
// ============================================================================

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = "Kodano Team",
  keywords,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image || DEFAULT_SEO.ogImage,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Kodano",
      logo: {
        "@type": "ImageObject",
        url: `${DEFAULT_SEO.siteUrl}/logo.png`,
      },
    },
    keywords: keywords?.join(", "),
  };

  return <SEO jsonLd={schema} />;
}

// ============================================================================
// LOCAL BUSINESS SCHEMA
// ============================================================================

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kodano",
    description: DEFAULT_SEO.description,
    url: DEFAULT_SEO.siteUrl,
    telephone: "+55-11-1234-5678",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Paulista, 1000",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01310-100",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.5505,
      longitude: -46.6333,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
  };

  return <SEO jsonLd={schema} />;
}

// ============================================================================
// SOFTWARE APPLICATION SCHEMA
// ============================================================================

interface SoftwareApplicationSchemaProps {
  name: string;
  operatingSystem?: string;
  applicationCategory?: string;
  rating?: {
    value: number;
    count: number;
  };
  offers?: {
    price: number;
    currency: string;
  };
}

export function SoftwareApplicationSchema({
  name,
  operatingSystem = "Web",
  applicationCategory = "FinanceApplication",
  rating,
  offers,
}: SoftwareApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    operatingSystem,
    applicationCategory,
    aggregateRating: rating ? {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
    } : undefined,
    offers: offers ? {
      "@type": "Offer",
      price: offers.price,
      priceCurrency: offers.currency,
    } : undefined,
  };

  return <SEO jsonLd={schema} />;
}

// ============================================================================
// PAGE-SPECIFIC SEO CONFIGURATIONS
// ============================================================================

export const pageSEOConfigs: Record<string, SEOProps> = {
  "/": {
    title: "Gateway de Pagamento Inteligente",
    description: "Simplifique seus pagamentos online com o gateway mais moderno do Brasil. Aprovação superior, antifraude integrado e suporte 24/7.",
  },
  "/produtos": {
    title: "Produtos - Soluções de Pagamento",
    description: "Conheça nossas soluções completas de pagamento: Gateway, Checkout, Split, Recorrência, Antifraude e muito mais.",
    ogType: "product",
  },
  "/precos": {
    title: "Preços - Transparência Total",
    description: "Taxas competitivas e transparentes. Sem surpresas, sem letras miúdas. Escolha o plano ideal para seu negócio.",
  },
  "/como-funciona": {
    title: "Como Funciona - Tecnologia de Ponta",
    description: "Entenda como nossa tecnologia de orquestração inteligente maximiza suas aprovações e reduz custos.",
  },
  "/clientes": {
    title: "Clientes - Casos de Sucesso",
    description: "Veja como empresas reais transformaram seus pagamentos com Kodano. Cases de sucesso e depoimentos.",
  },
  "/fale-conosco": {
    title: "Fale Conosco - Suporte 24/7",
    description: "Entre em contato com nossa equipe de especialistas. Suporte técnico e comercial disponível 24/7.",
  },
  "/documentacao": {
    title: "Documentação - Guias e APIs",
    description: "Documentação completa da API, SDKs, guias de integração e exemplos práticos para desenvolvedores.",
  },
  "/blog": {
    title: "Blog - Insights e Novidades",
    description: "Artigos, tutoriais e insights sobre pagamentos online, tecnologia financeira e tendências do mercado.",
    ogType: "article",
  },
};

// ============================================================================
// SEO HOOK
// ============================================================================

export function useSEO(overrides?: SEOProps) {
  const pathname = usePathname();
  const pageConfig = pageSEOConfigs[pathname] || {};

  return {
    ...pageConfig,
    ...overrides,
  };
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OrganizationStructuredData, SoftwareApplicationStructuredData } from "@/components/seo/structured-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'),
  title: {
    default: "Kodano — Infraestrutura de confiança para pagamentos de alto valor",
    template: "%s | Kodano",
  },
  description: "Verificação de identidade antes da aprovação. Redução estrutural de contestação e risco em transações de alto valor.",
  keywords: [
    "pagamentos alto valor",
    "verificação identidade",
    "prevenção fraude",
    "redução contestação",
    "infraestrutura pagamentos",
    "segurança transações",
    "B2B payments",
    "enterprise payments",
    "payment security",
    "chargeback prevention",
  ],
  authors: [{ name: "Kodano" }],
  creator: "Kodano",
  publisher: "Kodano",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://kodano.com.br",
    title: "Kodano — Infraestrutura de confiança para pagamentos de alto valor",
    description: "Verificação de identidade antes da aprovação. Redução estrutural de contestação e risco.",
    siteName: "Kodano",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'}/api/og`,
        width: 1200,
        height: 630,
        alt: "Kodano - Infraestrutura de confiança para pagamentos de alto valor",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodano — Infraestrutura de confiança para pagamentos de alto valor",
    description: "Verificação de identidade antes da aprovação. Redução estrutural de contestação e risco.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'}/api/og`],
    creator: "@kodano",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/kodano-logo.png", sizes: "any" },
      { url: "/kodano-logo.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="color-scheme" content="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" type="image/png" sizes="32x32" href="/kodano-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/kodano-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <OrganizationStructuredData />
        <SoftwareApplicationStructuredData />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}

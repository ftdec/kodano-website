import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { OrganizationStructuredData, SoftwareApplicationStructuredData } from "@/components/seo/structured-data";
import { ClientLayout } from "@/components/layout/client-layout";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'),
  title: {
    default: "Kodano — Subadquirente com tecnologia avançada para empresas (SaaS de pagamentos, sem custódia)",
    template: "%s | Kodano",
  },
  description: "Subadquirente digital que oferece APIs modernas, taxas competitivas e orquestração inteligente de funcionalidades. Antifraude avançado, checkout otimizado e suporte especializado — sem custódia.",
  keywords: [
    "subadquirente",
    "facilitador de pagamentos",
    "plataforma SaaS pagamentos",
    "APIs de pagamento",
    "gateway de pagamentos B2B",
    "orquestração de funcionalidades",
    "taxas competitivas",
    "aprovação transações",
    "liquidação previsível",
    "PCI-ready",
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
    title: "Kodano — Subadquirente com tecnologia avançada",
    description: "Subadquirente digital que oferece APIs modernas, taxas competitivas e orquestração inteligente de funcionalidades.",
    siteName: "Kodano",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Kodano - Gateway de Pagamentos B2B",
        type: "image/png",
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'}/kodano-logo.png`,
        width: 1024,
        height: 1024,
        alt: "Kodano - Gateway de Pagamentos B2B",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodano — Subadquirente com tecnologia avançada",
    description: "Subadquirente digital com APIs modernas, taxas competitivas e orquestração inteligente de funcionalidades.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'}/og-image.png`],
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
      { url: "/kodano-logo.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/kodano-logo.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/kodano-logo.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kodano",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="light" style={{ colorScheme: 'light' }}>
      <head>
        {/* Force light mode - prevent dark mode completely */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remove dark class if exists
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                // Force light color scheme
                document.documentElement.style.colorScheme = 'light';
                // Prevent system dark mode
                const meta = document.createElement('meta');
                meta.name = 'color-scheme';
                meta.content = 'light';
                document.head.appendChild(meta);
              })();
            `,
          }}
        />
        {/* Favicon and Icons - Critical for Google Search Results */}
        <link rel="icon" type="image/png" sizes="32x32" href="/kodano-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/kodano-logo.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/kodano-logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="color-scheme" content="light" />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kodano.com.br" />
        <meta property="og:title" content="Kodano — Subadquirente com tecnologia avançada" />
        <meta property="og:description" content="Subadquirente digital que oferece APIs modernas, taxas competitivas e orquestração inteligente de funcionalidades." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Kodano - Gateway de Pagamentos B2B" />
        <meta property="og:site_name" content="Kodano" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kodano.com.br" />
        <meta name="twitter:title" content="Kodano — Subadquirente com tecnologia avançada" />
        <meta name="twitter:description" content="Subadquirente digital com APIs modernas, taxas competitivas e orquestração inteligente de funcionalidades." />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br'}/og-image.png`} />
        <meta name="twitter:creator" content="@kodano" />
        
        <OrganizationStructuredData />
        <SoftwareApplicationStructuredData />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

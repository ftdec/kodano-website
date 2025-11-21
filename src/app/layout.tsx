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
        url: "/kodano-logo.png",
        width: 1024,
        height: 1024,
        alt: "Kodano - Gateway de Pagamentos B2B",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodano — Subadquirente com tecnologia avançada",
    description: "Subadquirente digital com APIs modernas, taxas competitivas e orquestração inteligente de funcionalidades.",
    images: ["/kodano-logo.png"],
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
    ],
    shortcut: "/kodano-logo.png",
    apple: "/kodano-logo.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
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

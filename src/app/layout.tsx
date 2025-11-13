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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com'),
  title: {
    default: "Kodano — Orquestração multiadquirente para empresas (SaaS de pagamentos, sem custódia)",
    template: "%s | Kodano",
  },
  description: "Plataforma SaaS que negocia, integra e roteia transações entre múltiplas adquirentes — sem tocar no dinheiro. Reduza custo efetivo, aumente aprovação e tenha liquidação previsível com uma API unificada.",
  keywords: [
    "orquestração multiadquirente",
    "plataforma SaaS pagamentos",
    "roteamento transações",
    "multi-acquirer",
    "API unificada pagamentos",
    "governança multiadquirente",
    "MDR efetivo",
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
    url: "https://kodano.com",
    title: "Kodano — Orquestração multiadquirente para empresas",
    description: "Plataforma SaaS que negocia, integra e roteia transações entre múltiplas adquirentes — sem tocar no dinheiro.",
    siteName: "Kodano",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kodano - Gateway de Pagamentos B2B",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodano — Orquestração multiadquirente para empresas",
    description: "Plataforma SaaS que negocia, integra e roteia transações entre múltiplas adquirentes.",
    images: ["/og-image.png"],
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
    icon: "/kodano-logo.png",
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

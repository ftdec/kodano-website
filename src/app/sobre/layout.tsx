import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre - Kodano",
  description: "Construindo o futuro dos pagamentos.",
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


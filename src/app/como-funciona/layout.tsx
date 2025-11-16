import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Como Funciona - Kodano",
  description: "Orquestração feita com precisão. A rota certa, no momento certo.",
};

export default function ComoFuncionaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


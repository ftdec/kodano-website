import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Para Empresas - Kodano",
  description: "Tecnologia que impulsiona empresas que crescem com consistência.",
};

export default function ParaEmpresasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos - Kodano",
  description: "Soluções pensadas para operações que exigem desempenho.",
};

export default function ProdutosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


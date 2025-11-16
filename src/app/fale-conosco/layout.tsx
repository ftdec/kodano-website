import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fale Conosco - Kodano",
  description: "Preencha os dados e entraremos em contato.",
};

export default function FaleConoscoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


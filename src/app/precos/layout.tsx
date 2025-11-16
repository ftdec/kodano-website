import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preços - Kodano",
  description: "Flexibilidade para acompanhar o ritmo da sua empresa.",
};

export default function PrecosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


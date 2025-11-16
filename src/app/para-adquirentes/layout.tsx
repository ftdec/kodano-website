import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Para Adquirentes - Kodano",
  description: "Uma parceria que amplia o alcance e o volume da sua adquirência.",
};

export default function AdquirentesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


import { NavbarV2 } from "./navbar-v2";
import { Footer } from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavbarV2 />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}

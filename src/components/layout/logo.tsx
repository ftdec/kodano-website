import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 group ${className}`}
      aria-label="Kodano - Início"
    >
      {/* Símbolo à esquerda do nome - Logo maior: h-10 w-10 (mobile), h-11 w-11 (≥md) */}
      <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 transition-transform group-hover:scale-110 flex items-center justify-center">
        <Image
          src="/kodano-logo.png"
          alt=""
          width={44}
          height={44}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className="text-xl md:text-[22px] font-semibold tracking-tight font-[family-name:var(--font-poppins)] text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700 bg-[length:200%_100%] animate-gradient whitespace-nowrap flex items-center leading-none">
          Kodano
        </span>
      )}
    </Link>
  );
}

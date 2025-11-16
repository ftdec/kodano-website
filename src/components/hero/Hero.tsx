// src/components/hero/Hero.tsx
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroScene />
      <div className="relative z-10 flex flex-col items-center text-center py-24 md:py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Infraestrutura invisível que move o comércio moderno
        </motion.h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          APIs rápidas, segurança bancária e performance em escala — o gateway
          B2B criado para quem quer crescer com autonomia.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a href="/contato" className="rounded-full bg-[#053B3F] px-6 py-3 text-white font-semibold hover:bg-[#00A6B4] transition-colors">
            Fale com nosso time
          </a>
          <a href="/docs" className="rounded-full border border-[#053B3F] px-6 py-3 font-semibold text-[#053B3F] dark:text-white hover:bg-white/10 transition-colors">
            Ver documentação
          </a>
        </div>
      </div>
    </section>
  );
}

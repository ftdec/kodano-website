"use client";

import { motion } from "framer-motion";

const companies = [
  { name: "TechFlow", width: "w-24" },
  { name: "MarketHub", width: "w-28" },
  { name: "HealthPlus", width: "w-26" },
  { name: "EduTech", width: "w-24" },
  { name: "ShopConnect", width: "w-28" },
  { name: "PayFlow", width: "w-24" },
  { name: "DataCorp", width: "w-26" },
  { name: "CloudSys", width: "w-24" },
];

export function LogoWall() {
  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground text-center mb-8">
          Confiado por empresas de todos os tamanhos
        </p>

        {/* Infinite scroll container */}
        <div className="relative">
          <div className="flex space-x-12">
            {/* First set of logos */}
            <motion.div
              className="flex space-x-12 flex-shrink-0"
              animate={{
                x: [0, -100 * companies.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {companies.map((company, index) => (
                <div
                  key={`first-${index}`}
                  className={`${company.width} h-12 bg-muted rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity flex-shrink-0`}
                >
                  <span className="text-sm font-semibold text-muted-foreground">
                    {company.name}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Duplicate set for seamless loop */}
            <motion.div
              className="flex space-x-12 flex-shrink-0"
              animate={{
                x: [0, -100 * companies.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {companies.map((company, index) => (
                <div
                  key={`second-${index}`}
                  className={`${company.width} h-12 bg-muted rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity flex-shrink-0`}
                >
                  <span className="text-sm font-semibold text-muted-foreground">
                    {company.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

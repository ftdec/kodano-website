/**
 * Testimonials Section v2.0
 * Stripe-level testimonials showcase with carousel and animations
 */

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Building2,
  User,
  Verified,
  TrendingUp,
  MessageSquare,
  Heart,
} from "lucide-react";
import { easings, durations } from "@/lib/design-system/motion";
import { SectionContainer, SectionHeader } from "./section-wrapper";

// ============================================================================
// TESTIMONIAL CARD COMPONENT
// ============================================================================

interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  rating?: number;
  highlight?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  index: number;
  isActive?: boolean;
}

function TestimonialCard({
  quote,
  author,
  rating = 5,
  highlight,
  metrics,
  index,
  isActive = false,
}: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: durations.slow,
        ease: easings.emphasized,
      },
    },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1 + 0.3 + i * 0.05,
        type: "spring" as const,
        stiffness: 400,
      },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative h-full overflow-hidden rounded-xl border bg-card p-6 transition-all",
        isActive && "border-accent shadow-xl"
      )}
    >
      {/* Quote icon */}
      <motion.div
        initial={{ opacity: 0, rotate: -180 }}
        animate={isInView ? { opacity: 0.1, rotate: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.2 }}
        className="absolute -right-4 -top-4 text-accent"
      >
        <Quote className="h-32 w-32" />
      </motion.div>

      {/* Rating */}
      {rating && (
        <div className="mb-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={starVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Star
                className={cn(
                  "h-4 w-4 transition-colors",
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-transparent text-gray-300"
                )}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Highlight */}
      {highlight && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="mb-4"
        >
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            {highlight}
          </span>
        </motion.div>
      )}

      {/* Quote */}
      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.5 }}
        className="relative z-10 mb-6 text-lg font-medium leading-relaxed"
      >
        "{quote}"
      </motion.blockquote>

      {/* Metrics */}
      {metrics && metrics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.6 }}
          className="mb-6 grid grid-cols-2 gap-4 rounded-lg bg-accent/5 p-4"
        >
          {metrics.map((metric, i) => (
            <div key={i}>
              <div className="text-2xl font-bold text-accent">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Author */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.7 }}
        className="flex items-center gap-3"
      >
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-accent to-primary">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white">
              <User className="h-6 w-6" />
            </div>
          )}
          {/* Verified badge */}
          <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
            <Verified className="h-4 w-4 text-blue-500" />
          </div>
        </div>
        <div>
          <div className="font-semibold">{author.name}</div>
          <div className="text-sm text-muted-foreground">
            {author.role} • {author.company}
          </div>
        </div>
      </motion.div>

      {/* Hover effect */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-primary"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: durations.normal, ease: easings.emphasized }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}

// ============================================================================
// CAROUSEL COMPONENT
// ============================================================================

interface CarouselProps {
  testimonials: TestimonialCardProps[];
  autoPlay?: boolean;
  interval?: number;
}

function Carousel({ testimonials, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const dragX = useMotionValue(0);
  const animatedX = useSpring(dragX, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, interval, testimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsPlaying(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className="relative">
      {/* Main carousel container */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: durations.normal, ease: easings.emphasized }}
            style={{ x: animatedX }}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x > 50) {
                handlePrevious();
              } else if (offset.x < -50) {
                handleNext();
              }
              dragX.set(0);
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
                <TestimonialCard
                  key={currentIndex + index}
                  {...testimonial}
                  index={index}
                  isActive={index === 1}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between">
        {/* Dots indicator */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentIndex === index
                  ? "w-8 bg-accent"
                  : "bg-accent/30 hover:bg-accent/50"
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent/10 hover:text-accent"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </motion.button>

          <motion.button
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent/10 hover:text-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent/10 hover:text-accent"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STATS BAR COMPONENT
// ============================================================================

function StatsBar() {
  const stats = [
    { icon: <Building2 className="h-5 w-5" />, value: "5000+", label: "Empresas" },
    { icon: <TrendingUp className="h-5 w-5" />, value: "98%", label: "Satisfação" },
    { icon: <MessageSquare className="h-5 w-5" />, value: "10M+", label: "Transações/mês" },
    { icon: <Heart className="h-5 w-5" />, value: "4.9/5", label: "Avaliação" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: durations.slow }}
      className="mb-16 rounded-xl border bg-card/50 p-6 backdrop-blur-sm"
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            className="text-center"
          >
            <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// TESTIMONIALS DATA
// ============================================================================

const defaultTestimonials: Omit<TestimonialCardProps, "index">[] = [
  {
    quote: "A Kodano transformou completamente nossa operação de pagamentos. A taxa de aprovação aumentou 23% e o tempo de processamento caiu drasticamente.",
    author: {
      name: "Carlos Silva",
      role: "CEO",
      company: "TechStore Brasil",
    },
    rating: 5,
    highlight: "Taxa +23%",
    metrics: [
      { label: "Taxa Aprovação", value: "+23%" },
      { label: "Tempo Resposta", value: "-65%" },
    ],
  },
  {
    quote: "O suporte técnico é excepcional. Conseguimos integrar em apenas 2 dias e o dashboard é extremamente intuitivo.",
    author: {
      name: "Ana Costa",
      role: "CTO",
      company: "FinanceApp",
    },
    rating: 5,
    highlight: "Setup 2 dias",
  },
  {
    quote: "A melhor solução de pagamentos que já utilizamos. A API é moderna, bem documentada e extremamente confiável.",
    author: {
      name: "Pedro Oliveira",
      role: "Lead Developer",
      company: "E-commerce Plus",
    },
    rating: 5,
    highlight: "API Moderna",
  },
  {
    quote: "Reduzimos fraudes em 87% com o sistema antifraude da Kodano. ROI positivo desde o primeiro mês.",
    author: {
      name: "Maria Santos",
      role: "CFO",
      company: "MarketPlace XYZ",
    },
    rating: 5,
    highlight: "Fraude -87%",
    metrics: [
      { label: "Redução Fraude", value: "-87%" },
      { label: "ROI", value: "245%" },
    ],
  },
  {
    quote: "Dashboard em tempo real mudou o jogo para nós. Conseguimos tomar decisões baseadas em dados precisos.",
    author: {
      name: "João Mendes",
      role: "Product Manager",
      company: "SaaS Solutions",
    },
    rating: 5,
    highlight: "Real-time",
  },
  {
    quote: "Processamos mais de 100k transações por mês sem problemas. Uptime impecável e performance consistente.",
    author: {
      name: "Lucia Ferreira",
      role: "Operations Director",
      company: "Global Retail",
    },
    rating: 5,
    highlight: "100k/mês",
  },
];

// ============================================================================
// MAIN TESTIMONIALS SECTION
// ============================================================================

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  testimonials?: typeof defaultTestimonials;
  layout?: "grid" | "carousel" | "masonry";
  showStats?: boolean;
  className?: string;
}

export function TestimonialsSection({
  title = "O que nossos clientes dizem",
  subtitle = "Depoimentos reais",
  description = "Veja como empresas de todos os tamanhos estão transformando seus pagamentos com Kodano.",
  testimonials = defaultTestimonials,
  layout = "carousel",
  showStats = true,
  className,
}: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <SectionContainer ref={sectionRef} spacing="xl" background="muted" className={className}>
      {/* Header */}
      <SectionHeader
        badge={subtitle}
        title={title}
        description={description}
        centered
      />

      {/* Stats bar */}
      {showStats && <StatsBar />}

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: durations.slow }}
      >
        {layout === "carousel" && (
          <Carousel testimonials={testimonials} />
        )}

        {layout === "grid" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                index={index}
              />
            ))}
          </div>
        )}

        {layout === "masonry" && (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="mb-6 break-inside-avoid">
                <TestimonialCard {...testimonial} index={index} />
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: durations.slow }}
        className="mt-16 text-center"
      >
        <p className="mb-4 text-muted-foreground">
          Junte-se a milhares de empresas satisfeitas
        </p>
        <motion.a
          href="/cadastro"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white"
        >
          Começar agora
          <Star className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </SectionContainer>
  );
}

export default TestimonialsSection;
"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
  delay?: number;
}

export function AnimatedCounter({
  end,
  duration = 2.5,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  className = "",
  delay = 0,
}: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {hasAnimated ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          delay={delay}
        />
      ) : (
        <span>
          {prefix}0{suffix}
        </span>
      )}
    </span>
  );
}

interface AnimatedMetricProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function AnimatedMetric({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  description,
  icon,
  className = "",
}: AnimatedMetricProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {icon && <div className="mb-3">{icon}</div>}
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-2">
        <AnimatedCounter
          end={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </div>
      <div className="text-lg md:text-xl font-semibold text-foreground/90 mb-1">
        {label}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      )}
    </div>
  );
}

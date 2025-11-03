"use client";

import { useRef, useEffect, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

interface LottieAnimationProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  onHoverPlay?: boolean;
  speed?: number;
}

export function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className = "",
  onHoverPlay = false,
  speed = 1,
}: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  useEffect(() => {
    if (onHoverPlay && lottieRef.current) {
      if (isHovered) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isHovered, onHoverPlay]);

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay && !onHoverPlay}
      />
    </div>
  );
}

// Product-specific animation components
export function PaymentAnimation({ className = "", onHoverPlay = false }: Omit<LottieAnimationProps, "animationData">) {
  // Payment animation data (credit card processing)
  const animationData = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Payment Animation",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Card",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [360] },
              { t: 120, s: [360] },
            ],
          },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                d: 1,
                s: { a: 0, k: [80, 50] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 8 },
              },
              {
                ty: "fl",
                c: { a: 0, k: [0, 0.65, 0.71, 1] },
                o: { a: 0, k: 100 },
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 120,
        st: 0,
      },
    ],
  };

  return (
    <LottieAnimation
      animationData={animationData}
      className={className}
      onHoverPlay={onHoverPlay}
      speed={1.2}
    />
  );
}

export function ConnectAnimation({ className = "", onHoverPlay = false }: Omit<LottieAnimationProps, "animationData">) {
  // Connect animation data (network nodes connecting)
  const animationData = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Connect Animation",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Node 1",
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [100] },
              { t: 30, s: [100] },
              { t: 90, s: [100], e: [0] },
              { t: 120, s: [0] },
            ],
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [50, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [0, 0, 100], e: [100, 100, 100] },
              { t: 30, s: [100, 100, 100] },
            ],
          },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                d: 1,
                s: { a: 0, k: [20, 20] },
                p: { a: 0, k: [0, 0] },
              },
              {
                ty: "fl",
                c: { a: 0, k: [0, 0.65, 0.71, 1] },
                o: { a: 0, k: 100 },
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 120,
        st: 0,
      },
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: "Node 2",
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [100] },
              { t: 30, s: [100] },
              { t: 90, s: [100], e: [0] },
              { t: 120, s: [0] },
            ],
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [150, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [0, 0, 100], e: [100, 100, 100] },
              { t: 30, s: [100, 100, 100] },
            ],
          },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                d: 1,
                s: { a: 0, k: [20, 20] },
                p: { a: 0, k: [0, 0] },
              },
              {
                ty: "fl",
                c: { a: 0, k: [0.71, 0.88, 0.98, 1] },
                o: { a: 0, k: 100 },
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 120,
        st: 0,
      },
    ],
  };

  return (
    <LottieAnimation
      animationData={animationData}
      className={className}
      onHoverPlay={onHoverPlay}
      speed={1}
    />
  );
}

export function RadarAnimation({ className = "", onHoverPlay = false }: Omit<LottieAnimationProps, "animationData">) {
  // Radar animation data (scanning effect)
  const animationData = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Radar Animation",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Radar Sweep",
        sr: 1,
        ks: {
          o: { a: 0, k: 60 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [360] },
              { t: 120, s: [360] },
            ],
          },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                d: 1,
                s: { a: 0, k: [4, 60] },
                p: { a: 0, k: [0, 30] },
                r: { a: 0, k: 2 },
              },
              {
                ty: "fl",
                c: { a: 0, k: [0, 0.65, 0.71, 1] },
                o: { a: 0, k: 100 },
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 120,
        st: 0,
      },
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: "Circle",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                d: 1,
                s: { a: 0, k: [120, 120] },
                p: { a: 0, k: [0, 0] },
              },
              {
                ty: "st",
                c: { a: 0, k: [0, 0.65, 0.71, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 4 },
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 120,
        st: 0,
      },
    ],
  };

  return (
    <LottieAnimation
      animationData={animationData}
      className={className}
      onHoverPlay={onHoverPlay}
      speed={0.8}
    />
  );
}

export function CheckoutAnimation({ className = "", onHoverPlay = false }: Omit<LottieAnimationProps, "animationData">) {
  // Checkout animation data (shopping cart)
  const animationData = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Checkout Animation",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Cart",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [50, 100, 0], e: [150, 100, 0] },
              { t: 60, s: [150, 100, 0], e: [50, 100, 0] },
              { t: 120, s: [50, 100, 0] },
            ],
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                d: 1,
                s: { a: 0, k: [60, 40] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 6 },
              },
              {
                ty: "st",
                c: { a: 0, k: [0, 0.65, 0.71, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 4 },
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 120,
        st: 0,
      },
    ],
  };

  return (
    <LottieAnimation
      animationData={animationData}
      className={className}
      onHoverPlay={onHoverPlay}
      speed={1}
    />
  );
}

export function BillingAnimation({ className = "", onHoverPlay = false }: Omit<LottieAnimationProps, "animationData">) {
  // Billing animation data (invoice/receipt)
  const animationData = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Billing Animation",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Document",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [100, 0, 100], e: [100, 100, 100] },
              { t: 40, s: [100, 100, 100] },
            ],
          },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                d: 1,
                s: { a: 0, k: [70, 90] },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 6 },
              },
              {
                ty: "fl",
                c: { a: 0, k: [1, 1, 1, 1] },
                o: { a: 0, k: 100 },
              },
              {
                ty: "st",
                c: { a: 0, k: [0, 0.65, 0.71, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 3 },
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 120,
        st: 0,
      },
    ],
  };

  return (
    <LottieAnimation
      animationData={animationData}
      className={className}
      onHoverPlay={onHoverPlay}
      speed={1.2}
    />
  );
}

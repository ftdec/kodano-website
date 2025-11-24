"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ShimmerProps {
  children: ReactNode
  className?: string
}

export function Shimmer({ children, className = "" }: ShimmerProps) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

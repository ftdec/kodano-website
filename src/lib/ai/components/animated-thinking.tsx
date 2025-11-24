"use client"

import { motion } from "framer-motion"

interface AnimatedThinkingProps {
  baseText: string
}

export function AnimatedThinking({ baseText }: AnimatedThinkingProps) {
  return (
    <div className="flex items-center gap-1">
      <span>{baseText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
      >
        ...
      </motion.span>
    </div>
  )
}

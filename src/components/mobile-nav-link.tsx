"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface MobileNavLinkProps {
  href: string;
  label: string;
  index: number;
  onClose: () => void;
}

export function MobileNavLink({ href, label, index, onClose }: MobileNavLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: index * 0.02,
        duration: 0.15,
        ease: "easeOut",
      }}
    >
      <Link
        href={href}
        onClick={onClose}
        className="block min-h-[48px] px-4 py-3 text-base font-medium text-[#111111] hover:opacity-80 active:opacity-80 transition-opacity duration-200 rounded-lg -mx-2"
      >
        <motion.span
          className="block"
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.div>
  );
}

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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <Link
        href={href}
        onClick={onClose}
        className="block min-h-[48px] px-6 py-3 text-base font-medium text-white/90 hover:text-white transition-colors duration-200 active:bg-white/5 rounded-lg -mx-2"
      >
        <motion.span
          className="block"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.div>
  );
}


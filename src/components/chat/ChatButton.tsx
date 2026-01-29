"use client";

import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <motion.button
      id="chatButton"
      onClick={onClick}
      className="fixed bottom-4 right-4 z-40
        w-14 h-14 sm:w-14 sm:h-14
        bg-emerald-700 hover:bg-emerald-500 active:bg-emerald-500
        text-white rounded-full
        shadow-lg hover:shadow-xl active:shadow-xl
        transition-colors duration-200
        flex items-center justify-center
        border-2 border-emerald-400
        cursor-pointer touch-manipulation
        safe-bottom"
      style={{
        // Safe area for iOS notch/home indicator
        marginBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-label="Abrir chat Kodano"
    >
      <svg
        className="w-6 h-6 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
          clipRule="evenodd"
        />
      </svg>

      {/* Notification dot */}
      <span
        className="absolute -top-0.5 -right-0.5
          w-3 h-3
          bg-emerald-400 rounded-full
          border-2 border-emerald-700
          animate-pulse"
      />
    </motion.button>
  );
}

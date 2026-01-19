"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatPopupProps {
  onButtonClick: () => void;
}

export function ChatPopup({ onButtonClick }: ChatPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed
    if (isDismissed) return;

    // Show popup after 2 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isDismissed]);

  const handleClick = () => {
    setIsVisible(false);
    setIsDismissed(true);
    onButtonClick();
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="chatHint"
          className="fixed bottom-20 right-4 z-50 max-w-[280px] sm:max-w-xs"
          style={{
            marginBottom: "env(safe-area-inset-bottom, 0px)",
          }}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            onClick={handleClick}
            className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-4 cursor-pointer
              hover:shadow-2xl transition-shadow duration-200"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-slate-100 hover:bg-slate-200 
                rounded-full flex items-center justify-center text-slate-500 text-xs
                transition-colors touch-manipulation"
              aria-label="Fechar"
            >
              ✕
            </button>

            {/* Content */}
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C8DC] to-[#002A35] 
                flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">👋</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">
                  Olá! Posso ajudar?
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tire suas dúvidas sobre a Kodano
                </p>
              </div>
            </div>

            {/* Arrow pointing to chat button */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-slate-100 
              transform rotate-45" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

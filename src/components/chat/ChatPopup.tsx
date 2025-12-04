"use client";

import { useEffect, useState } from "react";

interface ChatPopupProps {
  onButtonClick: () => void;
}

export function ChatPopup({ onButtonClick }: ChatPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 1 second
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Hide popup after 7 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    // Hide popup when chat button is clicked
    const handleClick = () => {
      setIsVisible(false);
    };

    // This will be triggered by the parent component
    if (!isVisible) {
      return;
    }

    return () => {
      // Cleanup if needed
    };
  }, [onButtonClick, isVisible]);

  return (
    <div
      id="chatHint"
      className={`fixed bottom-24 right-6 z-50
        px-3 py-2 rounded-full
        bg-[#002A35] text-white text-xs sm:text-sm font-medium
        border border-[#00C8DC]
        shadow-lg
        transition-all duration-300
        ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
    >
      Fale comigo
    </div>
  );
}

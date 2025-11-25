"use client"

import Image from "next/image"

interface FloatingChatButtonProps {
  onClick: () => void
  ariaLabel: string
}

export function FloatingChatButton({ onClick, ariaLabel }: FloatingChatButtonProps) {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <button
        onClick={onClick}
        className="w-16 h-16 sm:w-14 sm:h-14 bg-[#002A35] active:bg-[#00C8DC] hover:bg-[#00C8DC] text-white rounded-full shadow-lg active:shadow-xl hover:shadow-xl transition-all duration-300 active:scale-95 hover:scale-110 flex items-center justify-center relative cursor-pointer border-2 border-[#00C8DC] touch-manipulation"
        aria-label={ariaLabel}
      >
        <svg
          className="w-8 h-8 sm:w-7 sm:h-7 text-blue-600"
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
        <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-3.5 sm:h-3.5 bg-[#00C8DC] rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  )
}

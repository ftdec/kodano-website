"use client"

import Image from "next/image"

interface FloatingChatButtonProps {
  onClick: () => void
  ariaLabel: string
}

export function FloatingChatButton({ onClick, ariaLabel }: FloatingChatButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="w-14 h-14 bg-white text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative cursor-pointer border-2 border-blue-500"
        aria-label={ariaLabel}
      >
        <svg
          className="w-7 h-7 text-blue-600"
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
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  )
}

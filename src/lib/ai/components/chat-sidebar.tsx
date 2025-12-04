"use client"

import type { CSSProperties } from "react"
import { ReactNode, useRef, useEffect, useMemo, useState } from "react"

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function ChatSidebar({ isOpen, onClose, children }: ChatSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { viewportHeight, bottomInset } = useChatViewport(isOpen)

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const sidebarStyle = useMemo<
    CSSProperties & {
      "--chat-bottom-inset"?: string
    }
  >(() => {
    const style: CSSProperties & { "--chat-bottom-inset"?: string } = {
      "--chat-bottom-inset": `${bottomInset}px`,
    }

    if (viewportHeight) {
      style.height = `${viewportHeight}px`
    }

    return style
  }, [viewportHeight, bottomInset])

  const contentStyle = useMemo<CSSProperties>(
    () => ({
      paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.5rem)",
    }),
    [],
  )

  return (
    <div
      ref={sidebarRef}
      style={sidebarStyle}
      className={`fixed right-0 top-0 w-full sm:max-w-[30rem] bg-white backdrop-blur-2xl backdrop-saturate-180 ring-2 ring-gray-200 border border-gray-200 shadow-[0_32px_80px_rgba(0,0,0,0.1)] transform transition-transform duration-300 ease-in-out z-50 rounded-none sm:rounded-l-3xl touch-pan-y ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >

      <div className="relative z-10 flex h-full flex-col" style={contentStyle}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 size-10 sm:size-10 shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 active:bg-gray-200 hover:bg-gray-200 border border-gray-200 active:border-gray-300 hover:border-gray-300 transition-all duration-200 active:scale-95 hover:scale-105 shadow-md active:shadow-lg hover:shadow-lg cursor-pointer touch-manipulation"
          aria-label="Close chat"
        >
          <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

// Viewport management hook for mobile keyboard
function useChatViewport(isOpen: boolean) {
  const [viewportHeight, setViewportHeight] = useState<number | null>(null)
  const [bottomInset, setBottomInset] = useState(0)

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") {
      return
    }

    const viewport = window.visualViewport

    const updateFromViewport = () => {
      if (!viewport) {
        setViewportHeight(window.innerHeight)
        setBottomInset(0)
        return
      }

      const keyboardOffset = Math.max(window.innerHeight - viewport.height, 0)
      const effectiveHeight = Math.round(viewport.height + keyboardOffset)

      setViewportHeight((prev) => (prev === effectiveHeight ? prev : effectiveHeight))
      setBottomInset((prev) => (prev === keyboardOffset ? prev : keyboardOffset))
    }

    updateFromViewport()

    if (viewport) {
      viewport.addEventListener("resize", updateFromViewport)
      viewport.addEventListener("scroll", updateFromViewport)
    } else {
      window.addEventListener("resize", updateFromViewport)
    }

    return () => {
      if (viewport) {
        viewport.removeEventListener("resize", updateFromViewport)
        viewport.removeEventListener("scroll", updateFromViewport)
      } else {
        window.removeEventListener("resize", updateFromViewport)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const handleResize = () => {
      if (!isOpen) {
        setViewportHeight(window.innerHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isOpen])

  return { viewportHeight, bottomInset }
}

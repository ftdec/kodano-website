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
      paddingTop: "calc(env(safe-area-inset-top, 0px) + 3.5rem)",
    }),
    [],
  )

  return (
    <div
      ref={sidebarRef}
      style={sidebarStyle}
      className={`fixed right-0 top-0 w-full max-w-[30rem] bg-gradient-to-br from-white/85 via-white/60 to-white/40 backdrop-blur-2xl backdrop-saturate-180 ring-2 ring-white/30 border border-white/20 shadow-[0_32px_80px_rgba(15,23,42,0.25)] transform transition-transform duration-300 ease-in-out z-50 rounded-l-3xl ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-8 h-72 w-72 rounded-full bg-white/70 blur-[80px] opacity-90" />
        <div className="absolute bottom-[-8rem] left-12 h-80 w-80 rounded-full bg-blue-500/30 blur-[80px] opacity-60" />
        <div className="absolute top-16 right-16 h-48 w-48 rounded-full bg-purple-300/20 blur-[60px] opacity-50" />
        <div className="absolute inset-x-12 top-12 h-2/3 rounded-[3rem] bg-white/15 blur-[64px] opacity-70" />
      </div>

      <div className="relative z-10 flex h-full flex-col" style={contentStyle}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 size-8 sm:size-10 shrink-0 flex items-center justify-center rounded-full bg-white/70 text-gray-600 hover:bg-white/85 border border-white/50 hover:border-white/60 transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
          aria-label="Close chat"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

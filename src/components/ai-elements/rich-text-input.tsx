"use client"

import dynamic from "next/dynamic"

interface RichTextInputProps {
  placeholder?: string
  onSubmit: (content: string) => void
}

// Load TipTap only on client-side to avoid SSR issues
const RichTextInputClient = dynamic(
  () => import("./rich-text-input-client").then((mod) => ({ default: mod.RichTextInputClient })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-white/90 backdrop-blur-sm p-2">
        <div className="flex-1 min-h-[2.5rem] px-4 py-2 text-gray-400">Loading...</div>
      </div>
    ),
  }
)

export function RichTextInput({ placeholder, onSubmit }: RichTextInputProps) {
  return <RichTextInputClient placeholder={placeholder} onSubmit={onSubmit} />
}

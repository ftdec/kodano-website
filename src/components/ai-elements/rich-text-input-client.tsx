"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect } from "react"

interface RichTextInputClientProps {
  placeholder?: string
  onSubmit: (content: string) => void
}

export function RichTextInputClient({ placeholder = "Type a message...", onSubmit }: RichTextInputClientProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[2.5rem] sm:min-h-[2.5rem] max-h-[8rem] sm:max-h-[10rem] overflow-y-auto px-3 py-2 sm:px-4 text-sm sm:text-base text-gray-900 placeholder:text-gray-400",
      },
    },
    onUpdate: ({ editor }) => {
      // Auto-resize as content grows
      const element = editor.view.dom
      element.style.height = "auto"
      element.style.height = `${Math.min(element.scrollHeight, 160)}px`
    },
  })

  useEffect(() => {
    if (!editor) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault()
        const content = editor.getText().trim()
        if (content) {
          onSubmit(content)
          editor.commands.clearContent()
        }
      }
    }

    const editorElement = editor.view.dom
    editorElement.addEventListener("keydown", handleKeyDown)

    return () => {
      editorElement.removeEventListener("keydown", handleKeyDown)
    }
  }, [editor, onSubmit])

  const handleSendClick = () => {
    if (!editor) return
    const content = editor.getText().trim()
    if (content) {
      onSubmit(content)
      editor.commands.clearContent()
    }
  }

  return (
    <div className="flex items-end gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border border-emerald-200 bg-emerald-50/50 backdrop-blur-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
      <EditorContent editor={editor} className="flex-1 min-w-0" />
      <button
        onClick={handleSendClick}
        className="shrink-0 m-1 sm:m-1.5 flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-emerald-600 text-white active:bg-emerald-700 hover:bg-emerald-700 transition-colors touch-manipulation"
        aria-label="Send message"
      >
        <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
  )
}

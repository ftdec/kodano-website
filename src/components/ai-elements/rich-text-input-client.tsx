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
          "prose prose-sm max-w-none focus:outline-none min-h-[2.5rem] max-h-[10rem] overflow-y-auto px-4 py-2 text-gray-900 dark:text-gray-100",
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
    <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-white/90 backdrop-blur-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
      <EditorContent editor={editor} className="flex-1 min-w-0" />
      <button
        onClick={handleSendClick}
        className="shrink-0 m-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        aria-label="Send message"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

"use client"

import { memo } from "react"
import { Streamdown } from "streamdown"

interface ResponseProps {
  children: string
}

export const Response = memo(function Response({ children }: ResponseProps) {
  return (
    <div 
      className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 chatbot-response"
      style={{ 
        userSelect: 'text',
        WebkitUserSelect: 'text',
      }}
    >
      <Streamdown>{children}</Streamdown>
    </div>
  )
})

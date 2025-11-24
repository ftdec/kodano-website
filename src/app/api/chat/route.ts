import { createAgentUIStreamResponse, UIMessage } from "ai"
import { createCalendarAgent } from "@/lib/ai/orchestrator"

export const maxDuration = 300 // 5 minutes for streaming

// Authentication helper
function ensureAuthenticated(req: Request): Response | null {
  if (process.env.SKIP_AUTH === "true") return null

  const endpointsSecret = process.env.ENDPOINTS_SECRET
  if (!endpointsSecret) {
    return new Response("ENDPOINTS_SECRET required", { status: 500 })
  }

  // Validate origin (production only)
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin")
    const referer = req.headers.get("referer")
    const host = req.headers.get("host")

    // Extract request origin
    let requestOrigin: string | null = null
    if (origin) {
      requestOrigin = origin
    } else if (referer) {
      try {
        requestOrigin = new URL(referer).origin
      } catch {}
    }

    // Validate against allowed origins or same-domain
    const allowedOrigins =
      process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) || []
    if (allowedOrigins.length > 0) {
      const isAllowed = allowedOrigins.some(
        (allowed) => requestOrigin === allowed || requestOrigin?.endsWith(`.${allowed}`),
      )
      if (!isAllowed) {
        return new Response("Unauthorized origin", { status: 403 })
      }
    } else if (host && requestOrigin) {
      const hostOrigin = `https://${host}`
      const httpHostOrigin = `http://${host}`
      if (requestOrigin !== hostOrigin && requestOrigin !== httpHostOrigin) {
        return new Response("Unauthorized origin", { status: 403 })
      }
    }
  }

  return null
}

export async function POST(req: Request) {
  // 1. Authenticate
  const authError = ensureAuthenticated(req)
  if (authError) return authError

  // 2. Parse and validate request body
  let body: { messages?: UIMessage[] }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { messages } = body

  // 3. Validate messages structure
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Messages required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  // Validate each message has required fields
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i] as unknown as Record<string, unknown>
    if (!msg || typeof msg !== "object" || !msg.role || typeof msg.role !== "string") {
      return new Response(JSON.stringify({ error: `Invalid message at index ${i}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }
    if (!msg.content && !msg.parts) {
      return new Response(
        JSON.stringify({ error: `Message ${i} missing content/parts` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  // 4. Create agent and stream response
  try {
    console.log("[Chat API] Creating agent...")
    const agent = createCalendarAgent()
    console.log("[Chat API] Agent created, starting stream...")
    
    const streamResponse = createAgentUIStreamResponse({
      agent,
      messages: messages as UIMessage[],
    })
    
    console.log("[Chat API] Stream response created")
    return streamResponse
  } catch (error) {
    console.error("[Chat API] Error in chat endpoint:", error)
    console.error("[Chat API] Error stack:", error instanceof Error ? error.stack : "No stack")
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

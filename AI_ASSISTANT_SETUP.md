# AI Assistant Widget - Setup Guide

The AI Assistant Widget has been successfully implemented in your Kodano website. This guide will help you configure and deploy it.

## 🎉 What's Been Implemented

A complete AI-powered chat widget with:
- **AI Chat Interface** powered by xAI (Grok)
- **Google Calendar Integration** for meeting bookings
- **Real-time Streaming** responses
- **Multi-language Support** (Portuguese/English)
- **Mobile-Responsive Design** with viewport handling
- **Auto-scroll** and smooth animations

## 📋 Setup Instructions

### 1. Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```bash
cp .env.local.example .env.local
```

#### Required Variables:

**xAI API Key:**
```bash
XAI_API_KEY=your_xai_api_key_here
```
Get from: https://console.x.ai/

**Google Calendar API (Service Account):**
```bash
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
IMPERSONATED_USER=your-calendar-email@example.com
```

**How to get Google Calendar credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Calendar API**
4. Create a **Service Account**:
   - Go to IAM & Admin > Service Accounts
   - Click "Create Service Account"
   - Give it a name (e.g., "Kodano Calendar Bot")
   - Click "Create and Continue"
   - Grant it the "Editor" role
   - Click "Done"
5. Create a **Key** for the service account:
   - Click on the service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Download the file
6. From the JSON file, extract:
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`
7. **Domain-Wide Delegation** (Important!):
   - Go to your Google Workspace Admin Console
   - Security > API Controls > Domain-wide Delegation
   - Add the service account's Client ID
   - Add OAuth scope: `https://www.googleapis.com/auth/calendar`
8. Set `IMPERSONATED_USER` to the email that owns the calendar

**Authentication (Optional):**
```bash
# For development, skip authentication
SKIP_AUTH=true

# For production, set these:
ENDPOINTS_SECRET=your-random-secret-key
ALLOWED_ORIGINS=https://kodano.com.br,https://www.kodano.com.br
```

### 2. Test the Setup

Start the development server:

```bash
npm run dev
```

Visit http://localhost:3000 and:
1. Look for the floating chat button in the bottom-right corner
2. Click it to open the chat sidebar
3. Try sending a message
4. Test calendar booking features

### 3. Verify Calendar Integration

To test calendar features:

1. Ask: "What's available tomorrow?"
2. Ask: "Schedule a meeting tomorrow at 2 PM"
3. Check your Google Calendar for the created event

## 🏗️ Architecture Overview

### Directory Structure

```
src/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts          # API endpoint for chat
├── lib/
│   ├── ai/
│   │   ├── orchestrator.ts       # AI agent with tools
│   │   ├── schemas.ts            # Zod validation schemas
│   │   ├── components/           # Widget UI components
│   │   ├── pure-functions/       # Business logic
│   │   └── repository-functions/ # Google Calendar API
│   ├── i18n/                     # Internationalization
│   └── shared/
│       └── schemas.ts            # Shared type definitions
└── components/
    ├── ai-elements/              # Reusable chat UI components
    └── layout/
        └── client-layout.tsx     # Widget integration point
```

### Key Components

**Server-Side:**
- `app/api/chat/route.ts` - Handles chat requests, validates auth, streams responses
- `lib/ai/orchestrator.ts` - Creates AI agent with calendar tools
- `lib/ai/pure-functions/` - Business logic (validation, formatting, etc.)
- `lib/ai/repository-functions/` - Google Calendar API interactions

**Client-Side:**
- `AIAssistantWidget` - Main orchestrator component
- `ChatSidebar` - Slide-in panel with mobile support
- `ConversationSection` - Message list with auto-scroll
- `InputSection` - Text input with suggestions
- `FloatingChatButton` - Entry point button

### Data Flow

```
User → FloatingButton → ChatSidebar → InputSection
                            ↓
                     sendMessage (useChat hook)
                            ↓
                    POST /api/chat (streaming)
                            ↓
                    createCalendarAgent
                            ↓
                  AI processes → calls tools
                            ↓
                  Google Calendar API
                            ↓
                 Streaming response → UI updates
```

## 🎨 Customization

### Change Language

Edit `src/components/layout/client-layout.tsx`:

```tsx
<I18nProvider locale="en"> {/* or "pt" */}
```

### Customize Appearance

The widget uses Tailwind CSS. Edit these files:
- `src/lib/ai/components/floating-chat-button.tsx` - Button style
- `src/lib/ai/components/chat-sidebar.tsx` - Sidebar appearance
- `src/components/ai-elements/message.tsx` - Message bubbles

### Modify AI Behavior

Edit `src/lib/ai/pure-functions/system-prompt.ts` to change:
- Agent personality
- Business rules
- Response guidelines

### Add/Remove Quick Actions

Edit `src/lib/i18n/dictionaries.ts`:

```typescript
quickActions: {
  solutions: "Your custom action",
  // ...
}
```

## 🔧 Tools Available to AI

The AI agent has these tools:

1. **checkAvailability** - Checks free time slots in a date range
2. **bookMeeting** - Creates calendar events with Google Meet links
3. **getWeekdayDate** - Gets dates for specific weekdays (e.g., "next Monday")
4. **getNextAvailability** - Finds the next available slot

### Default Attendees

Meetings automatically include: `contato@kodano.com.br`

To change this, edit `src/lib/ai/orchestrator.ts`:

```typescript
const DEFAULT_ATTENDEES = ["your-email@example.com"]
```

### Business Hours

Default: Monday-Friday, 9 AM - 6 PM (São Paulo Time)

To change, edit `src/lib/ai/pure-functions/business-hours.ts`:

```typescript
const BUSINESS_START_HOUR = 9  // 9 AM
const BUSINESS_END_HOUR = 18   // 6 PM
```

## 🚀 Production Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - `XAI_API_KEY`
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `IMPERSONATED_USER`
   - `SKIP_AUTH=false`
   - `ENDPOINTS_SECRET=<random-secret>`
   - `ALLOWED_ORIGINS=https://kodano.com.br`
4. Deploy!

### Security Considerations

1. **Never commit `.env.local`** to git
2. Set `SKIP_AUTH=false` in production
3. Use a strong `ENDPOINTS_SECRET`
4. Configure `ALLOWED_ORIGINS` to match your domain
5. Keep your Google Service Account key secure

## 📝 Translations

To add a new language:

1. Edit `src/lib/i18n/dictionaries.ts`
2. Add new locale type: `export type Locale = "en" | "pt" | "es"`
3. Create new dictionary:
   ```typescript
   const esDictionary: Dictionary = {
     aiWidget: {
       // Spanish translations
     }
   }
   ```
4. Add to dictionaries object:
   ```typescript
   export const dictionaries: Record<Locale, Dictionary> = {
     en: enDictionary,
     pt: ptDictionary,
     es: esDictionary,
   }
   ```

## 🐛 Troubleshooting

### Widget doesn't appear
- Check that `.env.local` exists with `SKIP_AUTH=true` for local dev
- Check browser console for errors
- Verify all dependencies are installed: `npm install`

### Calendar features not working
- Verify Google Calendar API is enabled in Google Cloud Console
- Check service account has domain-wide delegation
- Verify `IMPERSONATED_USER` has the calendar
- Check Google Calendar API credentials are correct

### AI doesn't respond
- Verify `XAI_API_KEY` is valid
- Check `/api/chat` endpoint in Network tab for errors
- Look at server logs for error messages

### TypeScript errors
```bash
npm run typecheck
```

### Build errors
```bash
npm run build
```

## 📚 Additional Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [xAI Documentation](https://docs.x.ai/)
- [Google Calendar API](https://developers.google.com/calendar)
- [Next.js 16 Docs](https://nextjs.org/docs)

## 🎯 Next Steps

1. **Configure your environment variables** (`.env.local`)
2. **Test the widget** locally
3. **Customize the appearance** and messages
4. **Set up production credentials**
5. **Deploy to Vercel**

---

**Need help?** The widget is fully functional and ready to use. Just configure your API keys and you're good to go!

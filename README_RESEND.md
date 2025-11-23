# 📧 Resend Email Service Setup

This document explains how to configure and use the Resend email service in the Kodano website.

## 📋 Prerequisites

- Resend account created at [resend.com](https://resend.com)
- API key generated in Resend dashboard
- Domain verified in Resend (for production)

## 🔧 Configuration

### 1. Environment Variables

Create a `.env.local` file in the root of the project with:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@kodano.com.br
RESEND_FROM_NAME=Kodano Pagamentos
```

**For Vercel Production:**

Add these same variables in:
- Vercel Dashboard → Your Project → Settings → Environment Variables
- Set for: **Production**, **Preview**, and **Development**

### 2. Domain Verification

**Important:** For production, you must verify your domain in Resend:

1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain (`kodano.com.br`)
3. Add the DNS records shown in Resend to your domain's DNS settings:
   - **SPF** (TXT record)
   - **DKIM** (TXT record)
   - **MX** (if receiving emails)
4. Wait for verification (usually 5-15 minutes)

**Note:** Until the domain is verified, you can use `onboarding@resend.dev` as `RESEND_FROM_EMAIL` for testing.

## 🧪 Testing

### Option 1: Test Page (Recommended)

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/test-email`

3. Fill in the form:
   - **To:** Your email address
   - **Subject:** Test subject
   - **Message:** HTML content

4. Click "Enviar email de teste"

5. Check your inbox (and spam folder) for the test email

### Option 2: Standalone Script

Test Resend without Next.js:

```bash
npm run test:resend seu@email.com
```

Or set `TEST_EMAIL` in `.env.local`:
```env
TEST_EMAIL=seu@email.com
```

Then run:
```bash
npm run test:resend
```

## 📡 API Usage

### Endpoint

`POST /api/email/send`

### Request Body

```json
{
  "to": "recipient@example.com",        // Required: string or string[]
  "subject": "Email Subject",            // Required: string
  "html": "<p>HTML content</p>",        // Required if text not provided
  "text": "Plain text content",          // Required if html not provided
  "name": "Custom Sender Name"           // Optional: overrides RESEND_FROM_NAME
}
```

### Response

**Success (200):**
```json
{
  "ok": true,
  "data": {
    "id": "email_id_from_resend",
    "message": "Email sent successfully"
  }
}
```

**Error (400/500):**
```json
{
  "ok": false,
  "error": "Error message",
  "details": "Detailed error (development only)"
}
```

### Example Usage

```typescript
const response = await fetch("/api/email/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: "contato@kodano.com.br",
    subject: "Nova mensagem de contato",
    html: "<p>Conteúdo HTML aqui</p>",
  }),
});

const result = await response.json();
if (result.ok) {
  console.log("Email sent:", result.data.id);
} else {
  console.error("Error:", result.error);
}
```

## 📁 File Structure

```
src/
├── lib/
│   ├── env.ts              # Environment variables helper
│   └── resend.ts           # Resend client instance
├── app/
│   ├── api/
│   │   └── email/
│   │       └── send/
│   │           └── route.ts    # Email sending API route
│   └── test-email/
│       └── page.tsx        # Test page UI
scripts/
└── test-resend.mts         # Standalone test script
```

## 🔍 Debugging

### Check Logs

**Development:**
- Check the terminal where `npm run dev` is running
- Look for `[Resend API]` prefixed logs

**Production (Vercel):**
1. Go to Vercel Dashboard → Your Project → Functions
2. Click on `/api/email/send`
3. View logs for recent invocations

### Common Issues

**"Missing RESEND_API_KEY"**
- Make sure `.env.local` exists and contains `RESEND_API_KEY`
- For Vercel, verify environment variables are set

**"Domain not found"**
- Domain not verified in Resend dashboard
- DNS records not propagated (wait 15-30 minutes)
- Use `onboarding@resend.dev` temporarily for testing

**"Unauthorized"**
- API key is invalid or expired
- Regenerate API key in Resend and update environment variables

**Emails not received**
- Check spam folder
- Verify recipient email address is correct
- Check Resend dashboard → Emails for delivery status

### Enable Detailed Logging

The API route logs detailed information in development mode. Check:
- Console output for `[Resend API]` logs
- Error details in API response (development only)

## ✅ Checklist

Before going to production:

- [ ] Domain verified in Resend dashboard
- [ ] DNS records added and verified
- [ ] Environment variables set in Vercel
- [ ] Test email sent successfully via `/test-email`
- [ ] Standalone script works (`npm run test:resend`)
- [ ] API route returns success response
- [ ] Emails received in inbox (not spam)

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Dashboard](https://resend.com/emails)
- [Resend Domains](https://resend.com/domains)
- [Resend API Keys](https://resend.com/api-keys)

## 🆘 Support

If you encounter issues:

1. Check Vercel Function logs for detailed errors
2. Verify environment variables are set correctly
3. Test with `onboarding@resend.dev` to isolate domain issues
4. Check Resend dashboard for email delivery status
5. Review `TROUBLESHOOTING.md` for common solutions


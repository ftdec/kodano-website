# Resend Debugging Guide

## Your Current Setup ✅

- Domain: `kodano.com.br` ✅ Verified
- From Email: `noreply@kodano.com.br`
- To Email: `contato@kodano.com.br`
- API Key: Set in Vercel ✅

## Step-by-Step Debugging

### 1. Check Vercel Function Logs

**This is the MOST IMPORTANT step:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Functions** tab
4. Click on `/api/contact`
5. Look for recent invocations
6. Check the logs for:
   - Error messages from Resend
   - Console.log outputs
   - Any stack traces

**What to look for:**
- `"Domain not found"` → Domain not fully verified
- `"Invalid from address"` → Email format issue
- `"Unauthorized"` → API key issue
- `"Rate limit exceeded"` → Too many requests

### 2. Check Resend Dashboard Logs

1. Go to [Resend Dashboard](https://resend.com/emails)
2. Check the **Emails** section
3. Look for:
   - Failed sends
   - Error messages
   - Delivery status

### 3. Verify DNS Records

Even though domain shows as verified, check:

1. Go to your DNS provider (wherever you manage kodano.com.br DNS)
2. Verify these records exist EXACTLY as shown in Resend:
   - **SPF** (TXT record for `send`)
   - **DKIM** (TXT record for `resend._domainkey`)
   - **MX** (if receiving emails)

**Important:** Some DNS providers auto-append the domain. If so, add a trailing dot (`.`) at the end of the record value.

Example:
- ❌ `feedback-smtp.sa-east-1.amazonses.com`
- ✅ `feedback-smtp.sa-east-1.amazonses.com.`

### 4. Test with Resend API Directly

Test if Resend works at all:

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer re_XTVZcoXG_Khe6CAQfxDCwzma5sz6cBBbG" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "noreply@kodano.com.br",
    "to": "contato@kodano.com.br",
    "subject": "Test Email",
    "html": "<p>Test</p>"
  }'
```

If this works, the issue is in the Next.js code.
If this fails, the issue is with Resend configuration.

### 5. Check Environment Variables

In Vercel, verify:
- Variables are set for **Production** environment
- No extra spaces or quotes
- Values are correct

### 6. Common Issues & Solutions

#### Issue: "Domain not found"
**Solution:** Wait 15-30 minutes after DNS changes, then verify again in Resend

#### Issue: "Invalid from address"
**Solution:** Make sure `noreply@kodano.com.br` matches exactly (no typos)

#### Issue: "Unauthorized"
**Solution:** 
- Regenerate API key in Resend
- Update in Vercel
- Redeploy

#### Issue: Emails sent but not received
**Solution:**
- Check spam folder
- Verify `contato@kodano.com.br` exists and can receive emails
- Check Resend delivery logs for bounces

### 7. Quick Test: Use onboarding@resend.dev

To isolate if it's a domain issue:

1. Temporarily change `RESEND_FROM_EMAIL` in Vercel to `onboarding@resend.dev`
2. Redeploy
3. Test form
4. If it works → Domain issue
5. If it doesn't → Code/API key issue

## Next Steps

1. **Check Vercel Function Logs** (most important!)
2. Share the exact error message you see
3. Check Resend dashboard for failed sends
4. Try the curl test above

## What Error Are You Seeing?

Please share:
- The exact error message shown in the form
- Any errors from Vercel Function logs
- Any errors from Resend dashboard

This will help pinpoint the exact issue!


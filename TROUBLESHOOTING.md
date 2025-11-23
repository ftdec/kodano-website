# Troubleshooting Resend Email Issues

## Common Issues and Solutions

### 1. Domain Not Verified (Most Common)

**Symptom:** Error when trying to send from `noreply@kodano.com.br`

**Solution:**
- Go to [Resend Domains](https://resend.com/domains)
- Add `kodano.com.br` if not already added
- Add the DNS records shown in Resend to your domain's DNS settings
- Wait for verification (usually 5-15 minutes)

**Quick Test Fix:**
Temporarily change `RESEND_FROM_EMAIL` in Vercel to `onboarding@resend.dev` to test if everything else works.

### 2. Check Vercel Environment Variables

Make sure all three variables are set:
- `RESEND_API_KEY` ✅
- `RESEND_FROM_EMAIL` ✅  
- `RESEND_TO_EMAIL` ✅

**To verify:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure all three are listed
3. **Redeploy** after adding/changing variables

### 3. Check Browser Console

Open browser DevTools (F12) → Console tab, and look for:
- Network errors (404, 500, etc.)
- CORS errors
- JavaScript errors

### 4. Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → Functions
2. Click on `/api/contact`
3. Check the logs for errors

Common errors you might see:
- `"Domain not found"` → Domain not verified in Resend
- `"Invalid API key"` → API key is wrong or expired
- `"Unauthorized"` → API key doesn't have permissions

### 5. Test the API Directly

You can test the API endpoint directly using curl:

```bash
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### 6. Verify Resend API Key

1. Go to [Resend API Keys](https://resend.com/api-keys)
2. Make sure your API key is active
3. Check if it has the correct permissions

## Quick Diagnostic Checklist

- [ ] Domain `kodano.com.br` is verified in Resend
- [ ] All 3 environment variables are set in Vercel
- [ ] Vercel deployment was restarted after adding variables
- [ ] API key is valid and active
- [ ] No errors in browser console
- [ ] No errors in Vercel function logs

## Still Not Working?

1. Check the error message shown in the form (it should now show detailed error)
2. Check Vercel function logs for the exact Resend error
3. Try using `onboarding@resend.dev` as `RESEND_FROM_EMAIL` temporarily to isolate the issue


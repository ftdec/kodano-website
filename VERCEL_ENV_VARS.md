# Vercel Environment Variables for Resend

Copy these variables to your Vercel project settings.

## Required Environment Variables

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these 3 variables:

---

### 1. RESEND_API_KEY

**Variable Name:** `RESEND_API_KEY`

**Value:** `re_8cgobSgr_3EzGmZa85beZ2KNLmtj6Kqvc`

**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

### 2. RESEND_FROM_EMAIL

**Variable Name:** `RESEND_FROM_EMAIL`

**Value:** `noreply@notifications.kodano.com.br`

**Environments:** ✅ Production, ✅ Preview, ✅ Development

**Note:** This is the email address that will send the emails. Must match a verified domain in Resend.

---

### 3. RESEND_TO_EMAIL

**Variable Name:** `RESEND_TO_EMAIL`

**Value:** `contato@kodano.com.br`

**Environments:** ✅ Production, ✅ Preview, ✅ Development

**Note:** This is the email address that will receive contact form submissions.

---

## Quick Copy-Paste Format

If you prefer to see them all together:

```
RESEND_API_KEY=re_8cgobSgr_3EzGmZa85beZ2KNLmtj6Kqvc
RESEND_FROM_EMAIL=noreply@notifications.kodano.com.br
RESEND_TO_EMAIL=contato@kodano.com.br
```

---

## After Adding Variables

1. **Redeploy** your application for changes to take effect
2. Go to **Deployments** → Click the three dots (⋯) → **Redeploy**
3. Or push a new commit to trigger a new deployment

---

## Verification Checklist

- [ ] All 3 variables added
- [ ] Variables set for Production, Preview, and Development
- [ ] No extra spaces or quotes in values
- [ ] Application redeployed after adding variables
- [ ] Domain `notifications.kodano.com.br` verified in Resend dashboard

---

## Troubleshooting

If emails still don't work after setting these:

1. **Check Vercel Function Logs:**
   - Dashboard → Functions → `/api/contact` → View logs

2. **Verify Domain in Resend:**
   - Go to [Resend Domains](https://resend.com/domains)
   - Ensure `notifications.kodano.com.br` shows as verified

3. **Test with onboarding@resend.dev:**
   - Temporarily change `RESEND_FROM_EMAIL` to `onboarding@resend.dev`
   - Redeploy and test
   - If it works, the issue is domain-related


# Resend → Gmail Delivery Troubleshooting

## Issue: Emails show as "sent" in Resend but don't appear in Gmail inbox

### Quick Checks (Do These First!)

1. **Check Spam/Junk Folder** 📬
   - Gmail often filters new senders to spam
   - Look in: Spam, Junk, Promotions, or Social tabs
   - Mark as "Not Spam" if found

2. **Check Resend Dashboard** 🔍
   - Go to: https://resend.com/emails
   - Find your email by ID
   - Check the delivery status:
     - ✅ **Delivered** = Email reached Gmail servers (check spam)
     - ⚠️ **Bounced** = Email was rejected (check error message)
     - ⏳ **Pending** = Still being processed

3. **Verify Domain Status** 🌐
   - Go to: https://resend.com/domains
   - Check if `notifications.kodano.com.br` shows as **Verified** ✅
   - If not verified, emails will be rejected or go to spam

### Common Issues & Solutions

#### Issue 1: Domain Not Fully Verified

**Symptoms:**
- Domain shows as "pending" in Resend
- Emails bounce or go to spam

**Solution:**
1. Go to Resend Domains dashboard
2. Click on `notifications.kodano.com.br`
3. Copy the DNS records shown:
   - **SPF** (TXT record)
   - **DKIM** (TXT record for `resend._domainkey`)
4. Add these records to your DNS provider (where you manage kodano.com.br)
5. Wait 5-15 minutes for DNS propagation
6. Click "Verify" in Resend dashboard

**Important:** Make sure you're adding records for the **subdomain** `notifications.kodano.com.br`, not the root domain.

#### Issue 2: DNS Records Incorrect

**Check your DNS records match exactly:**

```bash
# Check SPF record
dig TXT notifications.kodano.com.br | grep spf

# Check DKIM record  
dig TXT resend._domainkey.notifications.kodano.com.br | grep resend
```

**Common mistakes:**
- Missing trailing dot (`.`) in DNS values
- Wrong subdomain (using `kodano.com.br` instead of `notifications.kodano.com.br`)
- Records not propagated yet (wait 15-30 minutes)

#### Issue 3: Gmail Filtering

**Gmail is very strict. To improve deliverability:**

1. **Use a plain "from" address** (no display name issues):
   ```typescript
   from: 'noreply@notifications.kodano.com.br'  // ✅ Good
   from: 'Kodano <noreply@notifications.kodano.com.br>'  // ⚠️ Can cause issues
   ```

2. **Add a plain text version** of your email:
   ```typescript
   {
     html: htmlContent,
     text: 'Plain text version here',  // ✅ Helps deliverability
   }
   ```

3. **Avoid spam trigger words** in subject:
   - ❌ "Test", "Free", "Click here", "Urgent"
   - ✅ "Welcome", "Your order", "Account update"

#### Issue 4: From Address Format

**Current setup:**
```
From: Kodano Pagamentos <noreply@notifications.kodano.com.br>
```

**Try simplifying to:**
```
From: noreply@notifications.kodano.com.br
```

This can help with Gmail's filtering.

### Testing Steps

1. **Test with Resend's test domain first:**
   ```typescript
   from: 'onboarding@resend.dev'  // This always works
   ```
   If this works, the issue is domain-related.

2. **Check email headers** (if you receive it):
   - Open email in Gmail
   - Click "Show original" (three dots menu)
   - Look for:
     - `SPF: PASS`
     - `DKIM: PASS`
     - `DMARC: PASS`
   - If any fail, fix DNS records

3. **Use Resend's email testing:**
   - Go to Resend dashboard → Emails
   - Click on your email
   - Check delivery logs and any error messages

### Quick Fix: Test Script

Run this to test with better logging:

```bash
npm run test:resend
```

Or run the script directly:
```bash
npx tsx scripts/send-beautiful-email.mts
```

### Still Not Working?

1. **Check Resend logs:**
   - Dashboard → Emails → Click your email
   - Look for error messages or bounce reasons

2. **Try sending to a different email provider:**
   - Test with Outlook, Yahoo, or a different Gmail account
   - If it works elsewhere, it's Gmail-specific filtering

3. **Contact Resend support:**
   - They can check your domain setup
   - They can see delivery logs we can't access

### Best Practices Going Forward

1. **Warm up your domain:**
   - Start with low volume
   - Gradually increase
   - Gmail trusts domains with consistent sending patterns

2. **Use proper email authentication:**
   - SPF ✅
   - DKIM ✅
   - DMARC ✅ (optional but recommended)

3. **Monitor bounce rates:**
   - Keep bounce rate under 5%
   - Remove invalid emails immediately

4. **Use a dedicated subdomain for transactional emails:**
   - ✅ `notifications.kodano.com.br` (what you're using)
   - This protects your main domain reputation


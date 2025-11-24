# Gmail Delivery Issue - Emails Show as "Delivered" but Not Visible

## Status: ✅ Emails are being delivered to Gmail servers
All emails show status `delivered` in Resend, meaning they reached Gmail successfully.

## The Problem: Gmail is filtering/hiding the emails

Since emails are delivered but not visible, Gmail is likely:
1. **Silently filtering** them (not spam, but hidden)
2. **Categorizing** them into tabs you're not checking
3. **Marking as "Not Important"** and hiding them
4. **Applying account-level filters** you may have set

## Step-by-Step Gmail Troubleshooting

### 1. Check ALL Gmail Tabs 📬

Gmail has multiple inbox tabs. Check each one:
- **Primary** (default inbox)
- **Promotions** (often where transactional emails go)
- **Social**
- **Updates**
- **Forums**

**To see all tabs:**
- Go to Gmail Settings → Inbox
- Make sure "Default" or "Multiple Inboxes" is selected
- If you have "Important first" enabled, check the "Everything else" section

### 2. Search Gmail Specifically 🔍

Use these exact searches in Gmail:

```
from:notifications.kodano.com.br
```

```
from:noreply@notifications.kodano.com.br
```

```
subject:"Email de Teste"
```

```
subject:"Kodano"
```

**Important:** Make sure you're searching in "All Mail", not just "Inbox"

### 3. Check Gmail Filters ⚙️

1. Go to Gmail Settings (gear icon) → **See all settings**
2. Click **Filters and Blocked Addresses** tab
3. Look for any filters that might be:
   - Deleting emails
   - Archiving emails
   - Marking as read
   - Skipping inbox
   - Forwarding emails

4. Check if there's a filter for:
   - `notifications.kodano.com.br`
   - `noreply@`
   - Any filter with "Kodano" in it

### 4. Check "All Mail" Folder 📁

1. In Gmail, click on **"All Mail"** in the left sidebar
2. If you don't see it, click **"More"** to expand folders
3. Search for `from:notifications.kodano.com.br` in All Mail
4. If emails appear here but not in inbox, they're being filtered

### 5. Check Gmail's "Important" Feature ⭐

Gmail may be marking emails as "Not Important" and hiding them:

1. Go to Gmail Settings → **Inbox**
2. If "Important first" is enabled, check the "Everything else" section below
3. Look for a toggle that says "Show important mail only" - make sure it's OFF
4. Try switching to "Default" inbox type temporarily

### 6. Check Multiple Gmail Accounts 🔐

If you have multiple Gmail accounts signed in:

1. Make sure you're checking the correct account: `felipe.caltabiano.castro@gmail.com`
2. Check if emails are going to a different account
3. Sign out of all accounts and sign in to only the target account
4. Check if there's email forwarding set up that might be redirecting emails

### 7. Check Gmail Workspace/Organization Settings 🏢

If this is a Google Workspace account:

1. Check with your admin if there are organization-level filters
2. Check if there are content compliance rules blocking emails
3. Check if there are email routing rules

### 8. Try Gmail Search Operators 🔎

Use these advanced searches in Gmail:

```
in:all from:notifications.kodano.com.br
```

```
in:all subject:"Kodano"
```

```
in:all "noreply@notifications.kodano.com.br"
```

```
has:nouserlabels from:notifications.kodano.com.br
```

### 9. Check Gmail on Mobile 📱

Sometimes emails appear on mobile but not desktop (or vice versa):

1. Check Gmail app on your phone
2. Check if emails appear there
3. This can help identify if it's a desktop-specific filter

### 10. Create a Gmail Filter to Force Delivery 📥

Create a filter to ensure these emails always appear:

1. Go to Gmail Settings → Filters and Blocked Addresses
2. Click **Create a new filter**
3. In "From" field, enter: `notifications.kodano.com.br`
4. Click **Create filter**
5. Check these options:
   - ✅ **Never send it to Spam**
   - ✅ **Always mark it as important**
   - ✅ **Star it**
   - ✅ **Never mark it as read**
6. Click **Create filter**

This will force Gmail to show emails from your domain.

### 11. Check Email Headers (If You Find the Email) 📋

If you find the email anywhere in Gmail:

1. Open the email
2. Click the three dots (⋮) → **Show original**
3. Look for these headers:
   - `X-Gmail-Labels:` - Shows which labels Gmail applied
   - `X-Google-Original-From:` - Shows original sender
   - Check for any `X-Spam-Status:` or filtering indicators

### 12. Try a Different Gmail Account 🧪

Test if the issue is account-specific:

1. Send a test email to a different Gmail account
2. If it arrives there, the issue is specific to `felipe.caltabiano.castro@gmail.com`
3. This could indicate account-level filters or settings

## Quick Test: Send to a Non-Gmail Address

To confirm emails are working, check if `contato@kodano.com.br` receives the emails. If that works, it confirms the issue is Gmail-specific.

## Most Likely Causes (Based on "Delivered" Status)

Since Resend shows "delivered", the most likely causes are:

1. **Gmail Promotions Tab** - Emails are going to Promotions, not Primary
2. **Gmail Filter** - You have a filter that's archiving/skipping inbox
3. **"Important First" Inbox** - Emails marked as not important are hidden
4. **Gmail's Algorithm** - Gmail is silently filtering based on engagement

## Immediate Action Items

1. ✅ Check Gmail Promotions tab
2. ✅ Search Gmail: `from:notifications.kodano.com.br` in "All Mail"
3. ✅ Check Gmail Settings → Filters and Blocked Addresses
4. ✅ Create a filter to force delivery (see step 10 above)
5. ✅ Check "All Mail" folder, not just Inbox
6. ✅ Verify you're checking the correct Gmail account

## Still Not Found?

If you've tried all of the above and still can't find the emails:

1. **Check Resend Dashboard** - Verify the exact email address emails were sent to
2. **Check Email Headers** - If you find ANY email from Resend, check its headers
3. **Contact Gmail Support** - They can check account-level filters we can't see
4. **Try Gmail's "Search Mail"** with advanced operators

The emails ARE being delivered - Gmail is just hiding them somewhere. The filter creation (step 10) is the most likely solution.


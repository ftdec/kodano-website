# Resend Setup Guide

## Quick Start

1. **Get your Resend API Key:**
   - Sign up at [https://resend.com](https://resend.com)
   - Go to [API Keys](https://resend.com/api-keys)
   - Create a new API key
   - Copy the key (starts with `re_`)

2. **Create `.env.local` file:**
   Create a file named `.env.local` in the root of the project with:

   ```env
   # Resend Configuration
   RESEND_API_KEY=re_your_api_key_here

   # Email Configuration
   # For development, you can use onboarding@resend.dev
   # For production, use a verified domain email
   RESEND_FROM_EMAIL=onboarding@resend.dev

   # The email address that will receive contact form submissions
   RESEND_TO_EMAIL=contato@kodano.com
   ```

3. **For Production (Optional but Recommended):**
   - Go to [Domains](https://resend.com/domains) in Resend
   - Add your domain (e.g., `kodano.com`)
   - Configure DNS records as shown
   - Update `RESEND_FROM_EMAIL` to use your domain (e.g., `noreply@kodano.com`)

## Testing

After setting up, test the contact forms:
- Home page form
- `/contato` page
- `/fale-conosco` page

All forms will send emails to the address specified in `RESEND_TO_EMAIL`.

## Vercel Deployment

**IMPORTANT:** You must add these environment variables in Vercel for production:

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `RESEND_API_KEY` | `re_your_api_key_here` | Production, Preview, Development |
   | `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (or your verified domain email) | Production, Preview, Development |
   | `RESEND_TO_EMAIL` | `contato@kodano.com` | Production, Preview, Development |

4. After adding, **redeploy** your application for the changes to take effect

**Note:** For production, it's recommended to use a verified domain email for `RESEND_FROM_EMAIL` (e.g., `noreply@kodano.com`)

## Troubleshooting

- **"RESEND_API_KEY is not set"**: Make sure `.env.local` exists locally and environment variables are set in Vercel for production
- **Email not sending**: Check that your API key is valid and has the correct permissions
- **Domain not verified**: For production, make sure your domain is verified in Resend before using custom email addresses
- **Emails not working in production**: Verify that environment variables are set in Vercel and the deployment has been restarted


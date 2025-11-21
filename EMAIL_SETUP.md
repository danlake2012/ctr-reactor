# CTR Reactor Email Setup Guide

## Zoho Mail Configuration

Since you're using Zoho Mail with DNS records at Vercel, follow these steps:

### 1. Environment Variables Setup

**For Local Development (.env.local):**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Zoho Mail credentials:
```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=support@ctr-reactor.com
SMTP_PASS=your-zoho-mail-password
```

**For Vercel Deployment:**
1. Go to your Vercel dashboard
2. Navigate to your CTR Reactor project
3. Go to Settings → Environment Variables
4. Add these variables:
   - `SMTP_HOST`: `smtp.zoho.com`
   - `SMTP_PORT`: `587`
   - `SMTP_SECURE`: `false`
   - `SMTP_USER`: `support@ctr-reactor.com`
   - `SMTP_PASS`: Your Zoho Mail password

### 2. Zoho Mail Requirements

- ✅ **Email Account**: Make sure `support@ctr-reactor.com` exists in your Zoho Mail
- ✅ **DNS Records**: Your Vercel DNS should be properly configured
- ✅ **Password**: Use your Zoho Mail password (not main Zoho account password)
- ✅ **2FA**: If you have 2FA enabled, you might need an app-specific password

### 3. Test Your Email Configuration

Run the test script to verify everything works:

```bash
node test-email.js
```

This will:
- Test the SMTP connection
- Send a test email to your support address
- Confirm your configuration is working

### 4. Alternative: SSL Connection

If you prefer SSL connection, use these settings:
- `SMTP_PORT`: `465`
- `SMTP_SECURE`: `true`

### 5. Using the Support System

1. Start your development server: `npm run dev`
2. Submit a test ticket from `/support`
3. Go to `/admin` and reply to the ticket
4. Check your email and server console logs

### 6. Troubleshooting

If emails aren't sending:
- Run `node test-email.js` to diagnose connection issues
- Check your Zoho Mail credentials
- Verify DNS records are properly set up
- Check Vercel environment variables
- Look at server console logs for error messages

The system will log detailed information about email attempts, so you can debug any issues!
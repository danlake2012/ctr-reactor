# OAuth Setup Guide

This guide explains how to configure Google and Facebook OAuth authentication for the CTR-Reactor application using Supabase.

## Prerequisites

- A Supabase project (created when you set up the database)
- Google Cloud Console account (for Google OAuth)
- Meta for Developers account (for Facebook OAuth)

## 1. Configure OAuth in Supabase Dashboard

### Step 1: Access Authentication Settings

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project (`ctr-reactor`)
3. Click **Authentication** in the left sidebar
4. Click **Providers** tab

### Step 2: Get Redirect URLs

Supabase provides a redirect URL that you'll need for both Google and Facebook:

```
https://<your-project-ref>.supabase.co/auth/v1/callback
```

You can find this in the Providers settings page.

---

## 2. Google OAuth Setup

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if prompted:
   - User Type: **External**
   - App name: `CTR-Reactor`
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: `email`, `profile`
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: `CTR-Reactor Production`
   - Authorized JavaScript origins:
     - `https://ctr-reactor.com`
     - `http://localhost:3000` (for local testing)
   - Authorized redirect URIs:
     - `https://<your-project-ref>.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for local testing)
7. Click **Create** and copy your **Client ID** and **Client Secret**

### Step 2: Configure Google in Supabase

1. In Supabase Dashboard → Authentication → Providers
2. Find **Google** and toggle it **Enabled**
3. Paste your **Client ID** and **Client Secret**
4. Click **Save**

---

## 3. Facebook OAuth Setup

### Step 1: Create Facebook App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Choose **Consumer** as app type
4. Fill in app details:
   - App Name: `CTR-Reactor`
   - App Contact Email: Your email
5. Click **Create App**
6. In the app dashboard, click **Add Product**
7. Find **Facebook Login** and click **Set Up**
8. Choose **Web** platform
9. Enter your site URL: `https://ctr-reactor.com`

### Step 2: Configure OAuth Settings

1. Go to **Facebook Login** → **Settings**
2. Add Valid OAuth Redirect URIs:
   - `https://<your-project-ref>.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for local testing)
3. Click **Save Changes**
4. Go to **Settings** → **Basic**
5. Copy your **App ID** and **App Secret**

### Step 3: Configure Facebook in Supabase

1. In Supabase Dashboard → Authentication → Providers
2. Find **Facebook** and toggle it **Enabled**
3. Paste your **App ID** as Client ID
4. Paste your **App Secret** as Client Secret
5. Click **Save**

---

## 4. Testing OAuth Locally

### Update your `.env.local` (already configured)

Your Supabase credentials should already be set:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### Test the OAuth Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:3000`

3. Click **Login** or **Sign Up**

4. Click **Continue with Google** or **Continue with Facebook**

5. You should be redirected to the OAuth provider

6. After authorizing, you'll be redirected back to your app at `/auth/callback`

---

## 5. Production Deployment

### Update Redirect URLs for Production

Once deployed to Vercel:

1. **Google Cloud Console**:
   - Add `https://ctr-reactor.com` to Authorized JavaScript origins
   - Ensure redirect URI includes your Supabase callback URL

2. **Facebook App Settings**:
   - Add `https://ctr-reactor.com` to Valid OAuth Redirect URIs
   - Update App Domains to include `ctr-reactor.com`

3. **Supabase Dashboard**:
   - Navigate to Authentication → URL Configuration
   - Set **Site URL** to `https://ctr-reactor.com`
   - Add `https://ctr-reactor.com/**` to Redirect URLs

---

## 6. How OAuth Works in the App

### User Flow

1. User clicks "Continue with Google" or "Continue with Facebook"
2. App calls `signInWithOAuth(provider)` from `lib/oauth.ts`
3. Supabase redirects user to OAuth provider (Google/Facebook)
4. User authorizes the app
5. OAuth provider redirects back to Supabase callback URL
6. Supabase creates/updates user record and session
7. User is redirected to `/auth/callback` in your app
8. The callback page validates the session and redirects to dashboard

### Files Updated

- `lib/oauth.ts` - OAuth helper functions
- `app/components/LoginModal.tsx` - Added Google/Facebook buttons
- `app/components/SignUpModal.tsx` - Added Google/Facebook buttons
- `app/auth/callback/page.tsx` - Handles OAuth redirect (already exists)

---

## 7. Troubleshooting

### "Redirect URI mismatch" error

- Double-check that redirect URIs in Google/Facebook match exactly what Supabase provides
- Ensure no trailing slashes or typos

### OAuth buttons not showing

- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check browser console for errors
- Ensure Supabase providers are enabled in dashboard

### Users not created in database

- OAuth users are automatically created by Supabase in the `auth.users` table
- Check Supabase Dashboard → Authentication → Users to see OAuth users
- Your custom `users` table may need a trigger to sync OAuth users (see next section)

---

## 8. Sync OAuth Users to Custom Users Table

If you want OAuth users to also appear in your custom `users` table, create a Supabase trigger:

```sql
-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

Run this in Supabase SQL Editor (Dashboard → SQL Editor).

---

## Summary

✅ Google and Facebook OAuth buttons added to Login and Sign Up modals  
✅ OAuth flow uses Supabase built-in authentication  
✅ Users are redirected to `/auth/callback` after OAuth  
✅ Sessions are automatically managed by Supabase  

**Next Steps:**
1. Configure OAuth apps in Google and Facebook
2. Add credentials to Supabase Dashboard
3. Test locally
4. Deploy and update production redirect URLs
5. Wait for Vercel deployment limit to reset (midnight UTC)

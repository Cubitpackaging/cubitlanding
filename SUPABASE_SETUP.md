# Supabase Authentication Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready

## 2. Get Your Project Credentials

1. Go to Settings > API in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Anon/Public Key** (starts with `eyJ`)

## 3. Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Create the Admin User

1. Go to Authentication > Users in your Supabase dashboard
2. Click "Add User"
3. Enter:
   - **Email**: `hi@cubitpackaging.com`
   - **Password**: `H@mz@#53779`
4. Click "Create User"

## 5. Configure Authentication Settings

1. Go to Authentication > Settings
2. Under "Site URL", add your domain:
   - For local development: `http://localhost:3000`
   - For production: `https://your-domain.com`
3. Under "Redirect URLs", add:
   - `http://localhost:3000/admin/dashboard` (for local)
   - `https://your-domain.com/admin/dashboard` (for production)

## 6. Deploy to Vercel

1. Add the environment variables to your Vercel project:
   - Go to your Vercel project dashboard
   - Go to Settings > Environment Variables
   - Add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Redeploy your application

## 7. Test the Authentication

1. Go to `/admin` on your deployed site
2. Login with:
   - **Email**: `hi@cubitpackaging.com`
   - **Password**: `H@mz@#53779`
3. You should be redirected to the admin dashboard

## Troubleshooting

### Login Not Working
- Check that the environment variables are correctly set in Vercel
- Verify the user exists in Supabase Authentication > Users
- Check the browser console for any errors

### Redirects Not Working
- Ensure the redirect URLs are properly configured in Supabase
- Check that the domain matches exactly (including http/https)

### Access Denied
- Verify the email in the auth service matches exactly: `hi@cubitpackaging.com`
- Check that the user is confirmed in Supabase (not pending confirmation)

## Security Notes

- The admin email is hardcoded in `/lib/auth.js`
- Only users with the exact email `hi@cubitpackaging.com` can access admin features
- Supabase handles all password security and session management
- Sessions are automatically refreshed and secured 
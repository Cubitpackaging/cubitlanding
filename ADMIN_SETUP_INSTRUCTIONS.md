# Admin Setup Instructions for Cubit Packaging

## Step 1: Run SQL Setup
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire content from `supabase-admin-setup.sql`
4. Click **Run** to execute all commands

## Step 2: Create Admin User
1. In your Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User**
3. Fill in the details:
   - **Email**: `hi@cubitpackaging.com`
   - **Password**: `H@mz@#53779`
   - **Email Confirm**: Check this box to auto-confirm the email
4. Click **Create User**

## Step 3: Verify Setup
1. Go to your website's admin login: `https://yourdomain.com/admin`
2. Login with:
   - **Email**: `hi@cubitpackaging.com`
   - **Password**: `H@mz@#53779`
3. You should be able to access the admin dashboard

## Step 4: Test Form Submissions
1. Test the quote form on your website
2. Test the rush order form on your website
3. Check that both appear in the admin panel under **Form Submissions**

## What the SQL Setup Does:
- ✅ Creates `rush_orders` table for rush order storage
- ✅ Creates `quotes` table for quote storage (if not exists)
- ✅ Sets up proper permissions and security policies
- ✅ Creates admin user management system
- ✅ Creates dashboard statistics view
- ✅ Sets up automatic timestamp updates

## Admin Features Available:
- 📊 **Dashboard**: View statistics and quick actions
- 📝 **Form Submissions**: Manage quotes and rush orders
- 🏷️ **Products**: Manage product catalog
- 🖼️ **Images**: Upload and manage images
- 👥 **Users**: Manage admin users (if needed)

## Troubleshooting:
- If login fails, check that the user was created and email is confirmed
- If forms don't appear, verify the database tables were created
- If permissions fail, check that RLS policies are properly set up

## Security Notes:
- The admin system uses Supabase Row Level Security (RLS)
- Only users with `hi@cubitpackaging.com` email can access admin features
- All database operations are properly secured with authentication
- Password can be changed through the admin interface once logged in 
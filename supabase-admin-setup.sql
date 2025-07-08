-- Supabase Admin Setup for Cubit Packaging
-- Run these commands in your Supabase SQL Editor

-- 1. First, create the rush_orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS rush_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) DEFAULT 'rush-order',
  
  -- Personal Details
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  
  -- Project Details
  packaging_type VARCHAR(255) NOT NULL,
  quantity VARCHAR(255),
  dimensions VARCHAR(255),
  colors VARCHAR(255),
  material VARCHAR(255),
  finish_options VARCHAR(255),
  
  -- Rush Details
  deadline VARCHAR(255),
  urgency_level VARCHAR(50) DEFAULT 'standard',
  project_description TEXT,
  special_requirements TEXT,
  
  -- Files
  files_count INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'normal',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create updated_at trigger for rush_orders
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_rush_orders_updated_at ON rush_orders;
CREATE TRIGGER update_rush_orders_updated_at BEFORE UPDATE ON rush_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. Enable Row Level Security (RLS) for rush_orders
ALTER TABLE rush_orders ENABLE ROW LEVEL SECURITY;

-- 4. Create policies for rush_orders (drop if exists first)
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON rush_orders;
CREATE POLICY "Allow all operations for authenticated users" ON rush_orders
  FOR ALL USING (true);

-- 5. Grant permissions for rush_orders
GRANT ALL ON rush_orders TO anon;
GRANT ALL ON rush_orders TO authenticated;

-- 6. Ensure quotes table exists with proper structure
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) DEFAULT 'quote',
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  packaging_type VARCHAR(255) NOT NULL,
  quantity VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'normal',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create updated_at trigger for quotes
DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Enable RLS for quotes
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- 9. Create policies for quotes (drop if exists first)
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON quotes;
CREATE POLICY "Allow all operations for authenticated users" ON quotes
  FOR ALL USING (true);

-- 10. Grant permissions for quotes
GRANT ALL ON quotes TO anon;
GRANT ALL ON quotes TO authenticated;

-- 11. Create admin user function (this will be used by your application)
-- Note: You'll need to create the actual user through the Supabase Auth interface
-- or use the admin API. This is just a helper function.

-- 12. Create a function to check if a user is admin
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN user_email = 'hi@cubitpackaging.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. Create an admin_users table to manage admin permissions (optional)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. Insert the admin user
INSERT INTO admin_users (email, role) 
VALUES ('hi@cubitpackaging.com', 'admin')
ON CONFLICT (email) DO UPDATE SET 
  role = EXCLUDED.role,
  updated_at = NOW();

-- 15. Enable RLS for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 16. Create policies for admin_users (drop if exists first)
DROP POLICY IF EXISTS "Allow read for authenticated users" ON admin_users;
DROP POLICY IF EXISTS "Allow all operations for admins" ON admin_users;

CREATE POLICY "Allow read for authenticated users" ON admin_users
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations for admins" ON admin_users
  FOR ALL USING (is_admin(auth.email()));

-- 17. Grant permissions for admin_users
GRANT SELECT ON admin_users TO anon;
GRANT ALL ON admin_users TO authenticated;

-- 18. Create a view for dashboard stats
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
  (SELECT COUNT(*) FROM quotes) as total_quotes,
  (SELECT COUNT(*) FROM rush_orders) as total_rush_orders,
  (SELECT COUNT(*) FROM quotes WHERE status = 'pending') as pending_quotes,
  (SELECT COUNT(*) FROM rush_orders WHERE status = 'pending') as pending_rush_orders,
  (SELECT COUNT(*) FROM quotes WHERE created_at >= CURRENT_DATE) as today_quotes,
  (SELECT COUNT(*) FROM rush_orders WHERE created_at >= CURRENT_DATE) as today_rush_orders;

-- 19. Grant permissions for the view
GRANT SELECT ON dashboard_stats TO anon;
GRANT SELECT ON dashboard_stats TO authenticated;

-- Setup complete! 
-- Next steps:
-- 1. Go to Authentication > Users in your Supabase dashboard
-- 2. Create a new user with email: hi@cubitpackaging.com
-- 3. Set the password to: H@mz@#53779
-- 4. Confirm the user's email
-- 5. Test the login on your website 
-- Quick Supabase Setup for Cubit Packaging
-- This script safely handles existing objects

-- 1. Create rush_orders table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS rush_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) DEFAULT 'rush-order',
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  packaging_type VARCHAR(255) NOT NULL,
  quantity VARCHAR(255),
  dimensions VARCHAR(255),
  colors VARCHAR(255),
  material VARCHAR(255),
  finish_options VARCHAR(255),
  deadline VARCHAR(255),
  urgency_level VARCHAR(50) DEFAULT 'standard',
  project_description TEXT,
  special_requirements TEXT,
  files_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'normal',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create quotes table (only if it doesn't exist)
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

-- 3. Create update function (replace if exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Enable RLS on both tables
ALTER TABLE rush_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- 5. Grant basic permissions
GRANT ALL ON rush_orders TO anon;
GRANT ALL ON rush_orders TO authenticated;
GRANT ALL ON quotes TO anon;
GRANT ALL ON quotes TO authenticated;

-- 6. Create admin user record
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Insert admin user (ignore if exists)
INSERT INTO admin_users (email, role) 
VALUES ('hi@cubitpackaging.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 8. Grant permissions for admin_users
GRANT SELECT ON admin_users TO anon;
GRANT ALL ON admin_users TO authenticated;

-- Setup complete! 
-- Now create the user manually:
-- 1. Go to Authentication > Users in Supabase
-- 2. Add user: hi@cubitpackaging.com with password: H@mz@#53779
-- 3. Confirm the email 
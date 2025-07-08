-- Create rush_orders table for storing rush order requests
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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_rush_orders_updated_at BEFORE UPDATE ON rush_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE rush_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Allow all operations for authenticated users" ON rush_orders
  FOR ALL USING (true);

-- Grant permissions
GRANT ALL ON rush_orders TO anon;
GRANT ALL ON rush_orders TO authenticated; 
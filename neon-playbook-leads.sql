-- Playbook Leads Table for Neon Database
-- Run this in your Neon SQL Editor or via psql

CREATE TABLE IF NOT EXISTS playbook_leads (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  company_size VARCHAR(50) NOT NULL,
  phone VARCHAR(50),
  source VARCHAR(50) DEFAULT 'playbook',
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_playbook_leads_email ON playbook_leads(email);
CREATE INDEX IF NOT EXISTS idx_playbook_leads_status ON playbook_leads(status);
CREATE INDEX IF NOT EXISTS idx_playbook_leads_created_at ON playbook_leads(created_at DESC);

-- Create a function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_playbook_leads_updated_at ON playbook_leads;
CREATE TRIGGER update_playbook_leads_updated_at
  BEFORE UPDATE ON playbook_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for lead pipeline analytics
CREATE OR REPLACE VIEW lead_pipeline_stats AS
SELECT 
  status,
  COUNT(*) as count,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as last_7_days,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as last_30_days
FROM playbook_leads
GROUP BY status;

-- Sample query to view all leads
-- SELECT * FROM playbook_leads ORDER BY created_at DESC;

-- Sample query to view pipeline stats
-- SELECT * FROM lead_pipeline_stats;

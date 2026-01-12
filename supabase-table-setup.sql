-- SUPABASE TABLE SETUP
-- Run this in your Supabase SQL Editor

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
ON contact_submissions(email);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;

-- Allow anyone to insert (submit forms)
CREATE POLICY "Allow public inserts" 
ON contact_submissions 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Allow authenticated reads" 
ON contact_submissions 
FOR SELECT 
TO authenticated 
USING (true);

-- Verify table was created
SELECT * FROM contact_submissions LIMIT 1;


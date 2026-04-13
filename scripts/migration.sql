-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- Creates the internships table and enables Row Level Security

CREATE TABLE IF NOT EXISTS internships (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  url TEXT,
  deadline TEXT,
  salary TEXT,
  programme_type TEXT,
  disciplines TEXT,
  source TEXT NOT NULL DEFAULT 'unite',
  tracker TEXT,
  notes TEXT,
  scraped_at TEXT,
  UNIQUE(url, company, title)
);

-- Allow anonymous reads (needed for NEXT_PUBLIC publishable key)
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON internships FOR SELECT USING (true);

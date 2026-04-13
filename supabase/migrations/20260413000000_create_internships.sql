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

ALTER TABLE internships ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='internships' AND policyname='Public read access'
  ) THEN
    CREATE POLICY "Public read access" ON internships FOR SELECT USING (true);
  END IF;
END $$;

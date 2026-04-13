import pg from "pg";
const { Client } = pg;

const client = new Client({
  connectionString: "postgresql://postgres:bXCr8zpcXaYvCaLK@db.jpmfxybyclgcqsbgrkeq.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

await client.connect();

await client.query(`
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
`);

console.log("Table created (or already exists).");
await client.end();

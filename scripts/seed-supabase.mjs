/**
 * Seed script: reads internships.db and pushes all rows to Supabase.
 * Run: node scripts/seed-supabase.mjs
 */
import Database from "better-sqlite3";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";
import path from "path";
import { readFileSync } from "fs";

// Load .env.local manually (no dotenv dep)
const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../.env.local");
const envLines = readFileSync(envPath, "utf8").split("\n");
for (const line of envLines) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const DB_PATH = "/Users/cem/internship_scraper/internships.db";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

// First, ensure the table exists by running an upsert check
async function ensureTable() {
  const { error } = await supabase.rpc("exec_sql", {
    sql: `
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
        scraped_at TEXT
      );
    `,
  });
  // RPC may not be available — that's fine, table likely already exists
  if (error) console.log("Note: table setup via RPC not available, assuming table exists.");
}

async function pushBatch(rows) {
  const BATCH = 500;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error, count } = await supabase
      .from("internships")
      .upsert(batch, { onConflict: "url,company,title", ignoreDuplicates: true });
    if (error) {
      console.error("Error inserting batch:", error.message);
    } else {
      inserted += batch.length;
      process.stdout.write(`\rInserted ${inserted}/${rows.length}`);
    }
  }
  console.log("");
}

async function main() {
  const db = new Database(DB_PATH, { readonly: true });

  // Map trackr_listings
  const trackr = db.prepare("SELECT * FROM trackr_listings").all();
  const trackrRows = trackr.map((r) => ({
    title: r.programme_name || "Unnamed Programme",
    company: r.company || "Unknown",
    location: null,
    url: r.application_url || null,
    deadline: r.closing_date || null,
    salary: null,
    programme_type: r.programme_type || null,
    disciplines: null,
    source: "trackr",
    tracker: r.tracker || null,
    notes: r.notes || null,
    scraped_at: r.scraped_at || null,
  }));

  // Map gradcracker_listings
  const gradcracker = db.prepare("SELECT * FROM gradcracker_listings").all();
  const gradcrackerRows = gradcracker.map((r) => ({
    title: r.title || "Unnamed Role",
    company: r.employer || "Unknown",
    location: r.location || null,
    url: r.job_url || null,
    deadline: r.deadline || null,
    salary: r.salary || null,
    programme_type: r.duration || null,
    disciplines: r.disciplines || null,
    source: "gradcracker",
    tracker: null,
    notes: r.degree_required || null,
    scraped_at: r.scraped_at || null,
  }));

  const allRows = [...trackrRows, ...gradcrackerRows];
  console.log(`Pushing ${allRows.length} rows to Supabase...`);

  await ensureTable();
  await pushBatch(allRows);

  console.log("Done.");
  db.close();
}

main().catch(console.error);

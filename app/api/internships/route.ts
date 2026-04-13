import { NextRequest } from "next/server";
import { fetchAdzunaInternships } from "@/lib/adzuna";
import { getSupabaseInternships } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q") ?? "";
  const location = searchParams.get("location") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1");

  const [adzuna, supabase] = await Promise.allSettled([
    fetchAdzunaInternships(q || "internship", location || "uk", page),
    getSupabaseInternships(q, location, 50),
  ]);

  const adzunaRows = adzuna.status === "fulfilled" ? adzuna.value : [];
  const supabaseRows = supabase.status === "fulfilled" ? supabase.value : [];

  // Normalise supabase rows to shared shape
  const supabaseNormalised = supabaseRows.map((r) => ({
    id: `sb-${r.id}`,
    title: r.title,
    company: r.company,
    location: r.location ?? "",
    description: [r.programme_type, r.disciplines, r.notes].filter(Boolean).join(" · "),
    salary_min: null as number | null,
    salary_max: null as number | null,
    salary_display: r.salary ?? null,
    url: r.url ?? "#",
    created: r.scraped_at ?? "",
    source: r.source,
    deadline: r.deadline ?? null,
    tracker: r.tracker ?? null,
    programme_type: r.programme_type ?? null,
  }));

  const adzunaNormalised = adzunaRows.map((r) => ({
    ...r,
    salary_display:
      r.salary_min && r.salary_max
        ? `£${(r.salary_min / 1000).toFixed(0)}k–£${(r.salary_max / 1000).toFixed(0)}k`
        : null,
    deadline: null,
    tracker: null,
    programme_type: null,
  }));

  // Deduplicate by title+company
  const seen = new Set<string>();
  const merged = [...supabaseNormalised, ...adzunaNormalised].filter((r) => {
    const key = `${r.title.toLowerCase()}|${r.company.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return Response.json({ results: merged, total: merged.length });
}

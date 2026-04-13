import { createClient } from "@/utils/supabase/server";

export interface SupabaseInternship {
  id: number;
  title: string;
  company: string;
  location: string | null;
  url: string | null;
  deadline: string | null;
  salary: string | null;
  programme_type: string | null;
  disciplines: string | null;
  source: string;
  tracker: string | null;
  notes: string | null;
  scraped_at: string | null;
}

export async function getSupabaseInternships(
  query?: string,
  location?: string,
  limit = 50
): Promise<SupabaseInternship[]> {
  try {
    const supabase = await createClient();
    let req = supabase
      .from("internships")
      .select("*")
      .order("scraped_at", { ascending: false })
      .limit(limit);

    if (query) {
      req = req.or(
        `title.ilike.%${query}%,company.ilike.%${query}%,disciplines.ilike.%${query}%`
      );
    }
    if (location) {
      req = req.ilike("location", `%${location}%`);
    }

    const { data, error } = await req;
    if (error) {
      console.error("Supabase query error:", error.message);
      return [];
    }
    return data ?? [];
  } catch {
    return [];
  }
}

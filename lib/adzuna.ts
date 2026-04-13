export interface AdzunaInternship {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary_min: number | null;
  salary_max: number | null;
  url: string;
  created: string;
  source: "adzuna";
}

export async function fetchAdzunaInternships(
  query: string = "internship",
  location: string = "london",
  page = 1
): Promise<AdzunaInternship[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey || appId === "your_adzuna_app_id") {
    return getMockAdzunaInternships(query, location);
  }

  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: "25",
    what: query || "internship",
    where: location || "uk",
    category: "graduate-jobs",
    sort_by: "date",
    page: String(page),
  });

  const res = await fetch(
    `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?${params}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return getMockAdzunaInternships(query, location);

  const data = await res.json();
  return (data.results ?? []).map((job: Record<string, unknown>) => ({
    id: String(job.id),
    title: String(job.title ?? ""),
    company: String((job.company as Record<string, unknown>)?.display_name ?? "Unknown"),
    location: String((job.location as Record<string, unknown>)?.display_name ?? location),
    description: String(job.description ?? ""),
    salary_min: (job.salary_min as number) ?? null,
    salary_max: (job.salary_max as number) ?? null,
    url: String(job.redirect_url ?? ""),
    created: String(job.created ?? ""),
    source: "adzuna" as const,
  }));
}

function getMockAdzunaInternships(
  query: string,
  location: string
): AdzunaInternship[] {
  const companies = [
    "Goldman Sachs", "McKinsey & Company", "Google", "Amazon", "HSBC",
    "Barclays", "Deloitte", "PwC", "KPMG", "EY",
    "Morgan Stanley", "JP Morgan", "BlackRock", "Unilever", "BP",
  ];
  const titles = [
    "Summer Analyst Intern", "Technology Internship", "Finance Intern",
    "Software Engineering Intern", "Consulting Intern", "Data Science Intern",
    "Investment Banking Intern", "Marketing Intern", "Operations Intern",
  ];
  const locations = ["London", "Manchester", "Edinburgh", "Bristol", "Birmingham", "Leeds"];

  return Array.from({ length: 25 }, (_, i) => ({
    id: `mock-adzuna-${i + 1}`,
    title: titles[i % titles.length],
    company: companies[i % companies.length],
    location: locations[i % locations.length],
    description: `Exciting ${query || "internship"} opportunity at a leading firm in ${location}. Join our team and gain real-world experience.`,
    salary_min: 25000 + (i % 5) * 5000,
    salary_max: 35000 + (i % 5) * 5000,
    url: "#",
    created: new Date(Date.now() - i * 86400000).toISOString(),
    source: "adzuna" as const,
  }));
}

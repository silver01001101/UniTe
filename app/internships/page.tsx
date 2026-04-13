"use client";

import { useState, useEffect, useCallback } from "react";
import InternshipCard from "@/components/InternshipCard";

const UK_CITIES = ["", "London", "Manchester", "Edinburgh", "Bristol", "Birmingham", "Leeds", "Oxford", "Cambridge", "Glasgow", "Liverpool", "Newcastle", "Sheffield", "Nottingham", "Cardiff"];

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary_display?: string | null;
  url: string;
  source: string;
  deadline?: string | null;
  tracker?: string | null;
  programme_type?: string | null;
}

export default function InternshipsPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<Internship[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q: string, loc: string) => {
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (loc) params.set("location", loc);
      const res = await fetch(`/api/internships?${params}`);
      const data = await res.json();
      setResults(data.results ?? []);
      setTotal(data.total ?? 0);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    search("internship", "");
  }, [search]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    search(query, location);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">UK Internships</h1>
        <p className="text-gray-500 mt-1">Live listings from Adzuna and our community database</p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-border p-4 mb-8 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Role, company, or keyword…"
          className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-teal"
        />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-teal bg-white"
        >
          {UK_CITIES.map((c) => (
            <option key={c} value={c}>{c || "All UK cities"}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-teal text-white font-semibold uppercase tracking-wide px-6 py-2.5 rounded-lg hover:bg-teal-dark transition-colors text-sm"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-border p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
              <div className="h-3 bg-gray-100 rounded w-full mb-1" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
            </div>
          ))}
        </div>
      ) : results.length === 0 && searched ? (
        <div className="text-center py-20 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>No internships found. Try a different search.</p>
        </div>
      ) : (
        <>
          {!loading && searched && (
            <p className="text-sm text-gray-500 mb-4">{total} listing{total !== 1 ? "s" : ""} found</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((r) => (
              <InternshipCard key={r.id} internship={r} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

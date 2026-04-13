"use client";

import { useState, useEffect } from "react";
import UniteScoreCard from "@/components/UniteScoreCard";
import type { UniteScoreResult } from "@/lib/unite-score";

interface RankedUniversity {
  id: number;
  name: string;
  city: string;
  cwur_national_rank: number;
  cwur_world_rank: number;
  employment_rate: number;
  student_satisfaction: number;
  dei_programs: number;
  score: number;
  grade: string;
  factors: UniteScoreResult["factors"];
  summary: string;
}

type SortKey = "score" | "cwur_national_rank" | "employment_rate" | "student_satisfaction";

export default function RankingsPage() {
  const [universities, setUniversities] = useState<RankedUniversity[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("score");
  const [sortAsc, setSortAsc] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rankings")
      .then((r) => r.json())
      .then((d) => setUniversities(d.universities))
      .finally(() => setLoading(false));
  }, []);

  function handleSort(key: SortKey) {
    if (sortBy === key) setSortAsc((a) => !a);
    else { setSortBy(key); setSortAsc(key === "cwur_national_rank"); }
  }

  const sorted = [...universities].sort((a, b) => {
    const diff = (a[sortBy] as number) - (b[sortBy] as number);
    return sortAsc ? diff : -diff;
  });

  function SortIcon({ col }: { col: SortKey }) {
    if (sortBy !== col) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="text-teal ml-1">{sortAsc ? "↑" : "↓"}</span>;
  }

  const gradeColor: Record<string, string> = {
    "A+": "text-teal font-bold",
    A: "text-teal",
    "B+": "text-blue-600",
    B: "text-blue-500",
    "C+": "text-yellow-600",
    C: "text-yellow-500",
    D: "text-red-500",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">University Rankings</h1>
        <p className="text-gray-500 mt-1">Sorted by UniTe Score — click a column to resort, click a row to expand the score breakdown</p>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-14 bg-white rounded-lg animate-pulse border border-border" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-medium w-10">#</th>
                  <th className="px-4 py-3 text-left font-medium">University</th>
                  <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">City</th>
                  <th
                    className="px-4 py-3 text-center font-medium cursor-pointer hover:text-teal select-none"
                    onClick={() => handleSort("score")}
                  >
                    UniTe Score<SortIcon col="score" />
                  </th>
                  <th
                    className="px-4 py-3 text-center font-medium cursor-pointer hover:text-teal select-none hidden md:table-cell"
                    onClick={() => handleSort("cwur_national_rank")}
                  >
                    CWUR Rank<SortIcon col="cwur_national_rank" />
                  </th>
                  <th
                    className="px-4 py-3 text-center font-medium cursor-pointer hover:text-teal select-none hidden lg:table-cell"
                    onClick={() => handleSort("employment_rate")}
                  >
                    Employment<SortIcon col="employment_rate" />
                  </th>
                  <th
                    className="px-4 py-3 text-center font-medium cursor-pointer hover:text-teal select-none hidden lg:table-cell"
                    onClick={() => handleSort("student_satisfaction")}
                  >
                    Satisfaction<SortIcon col="student_satisfaction" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((uni, i) => (
                  <>
                    <tr
                      key={uni.id}
                      onClick={() => setExpanded(expanded === uni.id ? null : uni.id)}
                      className="border-t border-border hover:bg-off-white cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400 font-medium">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-navy">{uni.name}</td>
                      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{uni.city}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-teal font-bold text-base">{uni.score}</span>
                        <span className={`ml-1.5 text-xs ${gradeColor[uni.grade] ?? ""}`}>{uni.grade}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600 hidden md:table-cell">#{uni.cwur_national_rank}</td>
                      <td className="px-4 py-3 text-center text-gray-600 hidden lg:table-cell">{uni.employment_rate}%</td>
                      <td className="px-4 py-3 text-center text-gray-600 hidden lg:table-cell">{uni.student_satisfaction}/10</td>
                    </tr>
                    {expanded === uni.id && (
                      <tr key={`${uni.id}-expanded`} className="border-t border-teal/20 bg-off-white">
                        <td colSpan={7} className="px-4 py-4">
                          <UniteScoreCard
                            uniName={uni.name}
                            result={{ score: uni.score, grade: uni.grade as UniteScoreResult["grade"], factors: uni.factors, summary: uni.summary }}
                          />
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export interface UniversityData {
  id: number;
  name: string;
  city: string;
  cwur_world_rank: number;
  cwur_national_rank: number;
  cwur_score: number;
  research_output: number;
  quality_of_faculty: number;
  alumni_employment: number;
  employment_rate: number;
  student_satisfaction: number;
  dei_programs: number;
}

export interface ScoreFactor {
  label: string;
  points: number;
  max: number;
  note: string;
}

export interface UniteScoreResult {
  score: number;
  grade: "A+" | "A" | "B+" | "B" | "C+" | "C" | "D";
  factors: ScoreFactor[];
  summary: string;
}

// City → approx internship density index (1–10), London being highest
const CITY_INTERNSHIP_INDEX: Record<string, number> = {
  London: 10,
  Manchester: 7,
  Edinburgh: 6,
  Bristol: 6,
  Birmingham: 6,
  Leeds: 5,
  Coventry: 5,
  Glasgow: 6,
  Oxford: 7,
  Cambridge: 7,
  Cardiff: 4,
  York: 4,
  Bath: 5,
  Belfast: 4,
  Leicester: 4,
  Lancaster: 3,
  Loughborough: 3,
  Norwich: 3,
  Reading: 5,
  Guildford: 5,
  Southampton: 5,
  Newcastle: 5,
  Sheffield: 5,
  Nottingham: 5,
  Durham: 4,
  Canterbury: 3,
  Brighton: 5,
  Portsmouth: 3,
  Huddersfield: 3,
  Bournemouth: 3,
  Aberdeen: 3,
  Exeter: 4,
  Liverpool: 5,
};

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

export function computeUniteScore(uni: UniversityData): UniteScoreResult {
  // 1. Academic score (30 pts) — normalise CWUR score (0–100) to 30
  const academicPts = clamp((uni.cwur_score / 100) * 30, 0, 30);

  // 2. Graduate employment rate (20 pts)
  const employmentPts = clamp(((uni.employment_rate - 50) / 50) * 20, 0, 20);

  // 3. Internship density (25 pts) — city index 1–10 → 0–25
  const cityIndex = CITY_INTERNSHIP_INDEX[uni.city] ?? 4;
  const internshipPts = clamp((cityIndex / 10) * 25, 0, 25);

  // 4. Student satisfaction (15 pts) — scale 0–10 → 0–15
  const satisfactionPts = clamp((uni.student_satisfaction / 10) * 15, 0, 15);

  // 5. DEI programmes (10 pts) — 0 → 0, 1 → 4, 2 → 7, 3+ → 10
  const deiPts = clamp([0, 4, 7, 10][Math.min(uni.dei_programs, 3)], 0, 10);

  const rawScore = academicPts + employmentPts + internshipPts + satisfactionPts + deiPts;
  const score = Math.round(rawScore);

  const grade =
    score >= 88 ? "A+" :
    score >= 78 ? "A" :
    score >= 68 ? "B+" :
    score >= 58 ? "B" :
    score >= 48 ? "C+" :
    score >= 38 ? "C" : "D";

  const factors: ScoreFactor[] = [
    {
      label: "Academic Quality",
      points: Math.round(academicPts),
      max: 30,
      note: `CWUR score ${uni.cwur_score.toFixed(1)} (world rank #${uni.cwur_world_rank})`,
    },
    {
      label: "Graduate Employment",
      points: Math.round(employmentPts),
      max: 20,
      note: `${uni.employment_rate}% graduate employment rate`,
    },
    {
      label: "Internship Access",
      points: Math.round(internshipPts),
      max: 25,
      note: `${uni.city} internship market (index ${cityIndex}/10)`,
    },
    {
      label: "Student Satisfaction",
      points: Math.round(satisfactionPts),
      max: 15,
      note: `${uni.student_satisfaction}/10 student satisfaction`,
    },
    {
      label: "DEI Provision",
      points: Math.round(deiPts),
      max: 10,
      note: `${uni.dei_programs} active outreach programme${uni.dei_programs !== 1 ? "s" : ""}`,
    },
  ];

  const topFactor = [...factors].sort((a, b) => b.points / b.max - a.points / a.max)[0];
  const bottomFactor = [...factors].sort((a, b) => a.points / a.max - b.points / b.max)[0];

  const summary =
    `${uni.name} scores ${score}/100. ` +
    `Strongest in ${topFactor.label.toLowerCase()} (${topFactor.points}/${topFactor.max} pts). ` +
    (bottomFactor.points / bottomFactor.max < 0.6
      ? `Room to grow in ${bottomFactor.label.toLowerCase()} (${bottomFactor.points}/${bottomFactor.max} pts).`
      : `Consistently strong across all factors.`);

  return { score, grade, factors, summary };
}

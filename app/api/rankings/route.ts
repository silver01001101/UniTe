import cwurData from "@/data/cwur.json";
import { computeUniteScore, type UniversityData } from "@/lib/unite-score";

export async function GET() {
  const universities = (cwurData as UniversityData[]).map((uni) => ({
    ...uni,
    ...computeUniteScore(uni),
  }));

  universities.sort((a, b) => b.score - a.score);

  return Response.json({ universities });
}

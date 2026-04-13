import type { UniteScoreResult } from "@/lib/unite-score";

interface Props {
  uniName: string;
  result: UniteScoreResult;
}

const gradeColor: Record<string, string> = {
  "A+": "text-teal",
  A: "text-teal",
  "B+": "text-blue-500",
  B: "text-blue-400",
  "C+": "text-yellow-500",
  C: "text-yellow-400",
  D: "text-red-400",
};

export default function UniteScoreCard({ uniName, result }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-navy">{uniName}</h3>
          <p className="text-sm text-gray-500 mt-1">{result.summary}</p>
        </div>
        <div className="text-right ml-4 shrink-0">
          <div className="text-4xl font-bold text-teal">{result.score}</div>
          <div className={`text-xl font-bold ${gradeColor[result.grade]}`}>{result.grade}</div>
          <div className="text-xs text-gray-400">UniTe Score</div>
        </div>
      </div>

      {/* Factor bars */}
      <div className="space-y-3">
        {result.factors.map((f) => (
          <div key={f.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-body">{f.label}</span>
              <span className="text-gray-500">
                {f.points}/{f.max} pts · {f.note}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal rounded-full transition-all"
                style={{ width: `${(f.points / f.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

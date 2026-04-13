interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary_display?: string | null;
  url: string | null;
  source: string;
  deadline?: string | null;
  tracker?: string | null;
  programme_type?: string | null;
}

const sourceLabel: Record<string, { label: string; color: string }> = {
  adzuna: { label: "Adzuna", color: "bg-blue-100 text-blue-700" },
  trackr: { label: "Trackr", color: "bg-purple-100 text-purple-700" },
  gradcracker: { label: "Gradcracker", color: "bg-green-100 text-green-700" },
  unite: { label: "UniTe DB", color: "bg-teal/10 text-teal" },
};

export default function InternshipCard({ internship }: { internship: Internship }) {
  const badge = sourceLabel[internship.source] ?? { label: internship.source, color: "bg-gray-100 text-gray-600" };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-navy truncate">{internship.title}</h3>
          <p className="text-sm text-teal font-medium">{internship.company}</p>
        </div>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
        {internship.location && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {internship.location}
          </span>
        )}
        {internship.salary_display && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {internship.salary_display}
          </span>
        )}
        {internship.deadline && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Closes {internship.deadline}
          </span>
        )}
      </div>

      {internship.description && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{internship.description}</p>
      )}

      {internship.programme_type && (
        <p className="mt-1 text-xs text-gray-400">{internship.programme_type}</p>
      )}

      <div className="mt-4">
        {internship.url ? (
          <a
            href={internship.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-semibold uppercase tracking-wide text-teal border border-teal px-4 py-1.5 rounded hover:bg-teal hover:text-white transition-colors"
          >
            Apply
          </a>
        ) : (
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-gray-400 border border-gray-200 px-4 py-1.5 rounded">
            No link available
          </span>
        )}
      </div>
    </div>
  );
}

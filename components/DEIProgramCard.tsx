interface DEIProgram {
  id: number;
  name: string;
  organiser: string;
  organiser_url: string;
  description: string;
  eligibility: string;
  tags: string[];
  apply_url: string;
  deadline: string;
  locations: string[];
}

const tagColors = [
  "bg-teal/10 text-teal",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-green-100 text-green-700",
];

export default function DEIProgramCard({ program }: { program: DEIProgram }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow p-6 flex flex-col">
      <div>
        <h3 className="font-semibold text-navy text-base">{program.name}</h3>
        <a
          href={program.organiser_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-teal font-medium hover:underline"
        >
          {program.organiser}
        </a>
      </div>

      <p className="mt-3 text-sm text-gray-600 flex-1">{program.description}</p>

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Eligibility</p>
        <p className="text-sm text-gray-600">{program.eligibility}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {program.tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[i % tagColors.length]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>
          <span className="font-medium text-gray-700">Deadline:</span> {program.deadline}
        </span>
        <span>{program.locations.slice(0, 2).join(", ")}{program.locations.length > 2 ? " +" : ""}</span>
      </div>

      <a
        href={program.apply_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center text-sm font-semibold uppercase tracking-wide bg-teal text-white px-4 py-2 rounded hover:bg-teal-dark transition-colors"
      >
        Apply / Learn More
      </a>
    </div>
  );
}

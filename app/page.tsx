import Link from "next/link";

const features = [
  {
    href: "/internships",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "UK Internships",
    desc: "Browse thousands of live UK internship listings from Adzuna and our community database. Filter by keyword, city, and sector.",
    cta: "Find Internships",
  },
  {
    href: "/rankings",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "UniTe Rankings",
    desc: "Our proprietary UniTe Score combines academic quality, graduate employment, internship access, student satisfaction, and DEI provision.",
    cta: "See Rankings",
  },
  {
    href: "/chat",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Career Chat",
    desc: "Talk to our Mistral AI advisor about which universities best match your career goals — finance, tech, law, consulting, and more.",
    cta: "Start Chatting",
  },
  {
    href: "/dei",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "DEI & Outreach",
    desc: "Discover diversity, equity, and inclusion programmes from upReach, Sutton Trust, SEO London, and more — designed to open doors.",
    cta: "Explore Programs",
  },
];

const scoreFactors = [
  { label: "Academic Quality", weight: "30%", desc: "Based on CWUR world rankings and research output" },
  { label: "Graduate Employment", weight: "20%", desc: "Percentage of graduates in employment within 6 months" },
  { label: "Internship Access", weight: "25%", desc: "Proximity to major internship markets and employer density" },
  { label: "Student Satisfaction", weight: "15%", desc: "Overall student experience and campus rating" },
  { label: "DEI Provision", weight: "10%", desc: "Number of active outreach and inclusion programmes" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-4">
            Powered by real data
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
            Find your path.<br />
            <span className="text-teal">Study smart. Work better.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            UniTe brings together UK internships, university rankings, and AI career guidance into one platform — built to democratise access to opportunity.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/internships"
              className="bg-teal text-white font-semibold uppercase tracking-wide px-8 py-3 rounded hover:bg-teal-dark transition-colors"
            >
              Browse Internships
            </Link>
            <Link
              href="/rankings"
              className="border border-white text-white font-semibold uppercase tracking-wide px-8 py-3 rounded hover:bg-white hover:text-navy transition-colors"
            >
              View Rankings
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-bold text-navy text-center mb-12">Everything you need in one place</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.href} className="bg-white rounded-xl shadow-sm border border-border p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="text-teal mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-2 flex-1">{f.desc}</p>
              <Link
                href={f.href}
                className="mt-5 text-sm font-semibold uppercase tracking-wide text-teal hover:text-teal-dark transition-colors flex items-center gap-1"
              >
                {f.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How UniTe Score works */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How the UniTe Score works</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              A single transparent number combining five factors that actually matter for your career.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {scoreFactors.map((f) => (
              <div key={f.label} className="bg-navy-light rounded-lg p-5 border border-white/10">
                <div className="text-teal text-2xl font-bold mb-2">{f.weight}</div>
                <div className="text-white font-semibold text-sm mb-1">{f.label}</div>
                <div className="text-gray-400 text-xs">{f.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/rankings"
              className="bg-teal text-white font-semibold uppercase tracking-wide px-8 py-3 rounded hover:bg-teal-dark transition-colors inline-block"
            >
              See the Rankings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

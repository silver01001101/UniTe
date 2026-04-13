import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold text-white">
              Uni<span className="text-teal">Te</span>
            </span>
            <p className="mt-2 text-sm">
              Empowering UK students to find their path through internships, rankings, and career guidance.
            </p>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/internships" className="hover:text-teal transition-colors">Internships</Link></li>
              <li><Link href="/rankings" className="hover:text-teal transition-colors">Rankings</Link></li>
              <li><Link href="/chat" className="hover:text-teal transition-colors">Career Chat</Link></li>
              <li><Link href="/dei" className="hover:text-teal transition-colors">Outreach Programmes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-3">Data Sources</h3>
            <ul className="space-y-2 text-sm">
              <li>CWUR Rankings</li>
              <li>Adzuna Jobs API</li>
              <li>Mistral AI</li>
              <li>Community Scrapers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-3">About</h3>
            <p className="text-sm">
              UniTe Score combines academic quality, employment outcomes, internship access, student satisfaction, and outreach provision into one transparent metric.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-sm text-center">
          © {new Date().getFullYear()} UniTe. Built to democratise access to opportunity.
        </div>
      </div>
    </footer>
  );
}

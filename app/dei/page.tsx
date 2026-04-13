import deiPrograms from "@/data/dei-programs.json";
import DEIProgramCard from "@/components/DEIProgramCard";

export default function DEIPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal text-sm font-semibold uppercase tracking-widest mb-3">Opening Doors · Building Futures</p>
          <h1 className="text-4xl font-bold">Outreach Programmes</h1>
          <p className="mt-4 text-gray-300 text-lg">
            Discover programmes designed to level the playing field — connecting underrepresented students with top careers in finance, law, tech, and beyond.
          </p>
        </div>
      </section>

      {/* Program grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">{deiPrograms.length} programmes listed</p>
          <p className="text-xs text-gray-400">More programmes coming soon</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deiPrograms.map((program) => (
            <DEIProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <section className="bg-teal/10 border-t border-teal/20 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-navy">Know a programme we&apos;re missing?</h2>
          <p className="text-gray-500 mt-2 text-sm">
            UniTe&apos;s outreach database is community-driven. If you run or know of a programme not listed here, we&apos;d love to include it.
          </p>
          <a
            href="mailto:hello@unite.app"
            className="mt-4 inline-block bg-teal text-white font-semibold uppercase tracking-wide px-6 py-2.5 rounded hover:bg-teal-dark transition-colors text-sm"
          >
            Submit a Programme
          </a>
        </div>
      </section>
    </div>
  );
}

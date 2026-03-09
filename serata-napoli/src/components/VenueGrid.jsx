
import React, { memo, useMemo } from "react";
import { SlidersHorizontal, Sparkles, SearchX } from "lucide-react";
import VenueCard from "./VenueCard";

const MemoVenueCard = memo(VenueCard);

function VenueGrid({
  venues = [],
  total = 0,
  title = "Locali che sembrano fatti per te",
  subtitle = "risultati selezionati",
}) {
  const safeVenues = Array.isArray(venues) ? venues : [];
  const visibleCount = safeVenues.length;
  const totalCount = Number.isFinite(total) && total > 0 ? total : visibleCount;

  const resultLabel = useMemo(() => {
    if (visibleCount === 0) return "0 locali";
    if (visibleCount === 1) return "1 locale";
    return `${visibleCount} locali`;
  }, [visibleCount]);

  const hasFilteredResults = totalCount > visibleCount;

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.08),transparent_22%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_20%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              <Sparkles size={13} className="text-orange-300" />
              {subtitle}
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {title}
            </h2>

            <p className="mt-2 text-sm leading-7 text-white/55 sm:text-base">
              {visibleCount > 0
                ? hasFilteredResults
                  ? `Stai vedendo ${visibleCount} risultati su ${totalCount} locali disponibili.`
                  : `Abbiamo trovato ${resultLabel} compatibili con i filtri attuali.`
                : "Nessun risultato compatibile con la selezione corrente."}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-semibold text-white/75">
              <SlidersHorizontal size={16} className="text-orange-300" />
              <span>
                {resultLabel}
                {hasFilteredResults && (
                  <span className="text-white/35"> / {totalCount}</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {visibleCount > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {safeVenues.map((venue) => (
            <MemoVenueCard key={venue.id ?? venue.slug ?? venue.name} venue={venue} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-dashed border-white/10 bg-white/3 px-6 py-20 text-center shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.07),transparent_20%)] pointer-events-none" />

      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
          <SearchX size={34} className="text-white/30" />
        </div>

        <h3 className="text-2xl font-black text-white">Nessun locale trovato</h3>

        <p className="mt-3 text-base leading-7 text-white/50">
          Prova ad allargare i filtri, cambiare quartiere o ridurre i vincoli su energia,
          format e pubblico.
        </p>
      </div>
    </div>
  );
}

export default memo(VenueGrid);
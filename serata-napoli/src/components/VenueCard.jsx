import { ArrowUpRight, Clock3, MapPin, Star, Users } from "lucide-react";

export default function VenueCard({ venue }) {
  return (
    <article className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
      <div className="relative h-72 overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-[#050816]/20 to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
            {venue.tag}
          </span>
          <div className="rounded-full border border-amber-300/20 bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-100 backdrop-blur-xl">
            {venue.price}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {venue.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{venue.name}</h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-white/60">
              <MapPin size={15} />
              <span>{venue.zone}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/6 px-3 py-2 text-right">
            <div className="flex items-center gap-1 text-amber-300">
              <Star size={15} fill="currentColor" />
              <span className="text-sm font-bold">{venue.rating}</span>
            </div>
            <p className="mt-1 text-xs text-white/45">Top rated</p>
          </div>
        </div>

        <p className="text-sm leading-7 text-white/68">{venue.description}</p>

        <div className="grid grid-cols-2 gap-3">
          <MetaCard icon={Clock3} label="Orario top" value={venue.bestTime} />
          <MetaCard icon={Users} label="Mood" value={venue.mood} />
        </div>

        <button className="group/btn inline-flex w-full items-center justify-between rounded-2xl bg-linear-to-r from-white to-white/90 px-4 py-3.5 text-sm font-semibold text-slate-900 transition hover:opacity-95">
          Vedi dettagli locale
          <ArrowUpRight size={17} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}

function MetaCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-3">
      <div className="flex items-center gap-2 text-white/45">
        <Icon size={14} />
        <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

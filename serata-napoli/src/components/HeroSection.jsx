/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Flame,
  Music,
  Users,
  Wine,
  Utensils,
  Sparkles,
} from "lucide-react";

const moods = [
  { id: "casino", label: "Vogliamo casino", icon: Flame, glow: "from-orange-500/35 to-red-500/15", active: "border-orange-400/60 bg-orange-500/15 text-white shadow-[0_0_30px_rgba(249,115,22,0.25)]", badge: "bg-orange-500/20 text-orange-200", ring: "ring-orange-400/30" },
  { id: "tranquillo", label: "Tranquillo ma vivo", icon: Wine, glow: "from-emerald-500/35 to-teal-500/15", active: "border-emerald-400/60 bg-emerald-500/15 text-white shadow-[0_0_30px_rgba(16,185,129,0.22)]", badge: "bg-emerald-500/20 text-emerald-200", ring: "ring-emerald-400/30" },
  { id: "musica", label: "Musica live", icon: Music, glow: "from-sky-500/35 to-blue-500/15", active: "border-sky-400/60 bg-sky-500/15 text-white shadow-[0_0_30px_rgba(56,189,248,0.22)]", badge: "bg-sky-500/20 text-sky-200", ring: "ring-sky-400/30" },
  { id: "alternativo", label: "Alternativo", icon: Sparkles, glow: "from-fuchsia-500/35 to-violet-500/15", active: "border-fuchsia-400/60 bg-fuchsia-500/15 text-white shadow-[0_0_30px_rgba(217,70,239,0.22)]", badge: "bg-fuchsia-500/20 text-fuchsia-200", ring: "ring-fuchsia-400/30" },
  { id: "persone", label: "Conoscere persone", icon: Users, glow: "from-cyan-500/35 to-teal-500/15", active: "border-cyan-400/60 bg-cyan-500/15 text-white shadow-[0_0_30px_rgba(34,211,238,0.22)]", badge: "bg-cyan-500/20 text-cyan-200", ring: "ring-cyan-400/30" },
  { id: "food", label: "Esperienza food", icon: Utensils, glow: "from-amber-500/35 to-orange-500/15", active: "border-amber-400/60 bg-amber-500/15 text-white shadow-[0_0_30px_rgba(251,191,36,0.22)]", badge: "bg-amber-500/20 text-amber-200", ring: "ring-amber-400/30" },
];

export default function HeroSection({ onApplyMoodPreset, onScrollToFilters, onScrollToVenues }) {
  const navigate = useNavigate();

  return (
    <header className="relative isolate min-h-[92vh] overflow-hidden bg-[#050816]">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80" alt="Napoli by night" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_24%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-[#050816]/30 via-[#050816]/65 to-[#050816]" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[92vh] max-w-7xl flex-col px-4 sm:px-6 lg:px-8">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-1 items-center py-10">
          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-100 backdrop-blur-xl">
                <Sparkles size={15} className="text-orange-300" />
                Scopri locali, rooftop, cocktail bar e serate perfette per il tuo mood
              </div>
              <h1 className="text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                Dove vai
                <span className="block bg-linear-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                  stasera a Napoli?
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Un'interfaccia elegante, filtri intelligenti e suggerimenti visuali per trovare il posto giusto, dal pre-serata rilassato al locale pieno di energia.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button onClick={onScrollToFilters} className="group inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/30 transition hover:scale-[1.02] hover:shadow-orange-500/45">
                  Trova la tua serata
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={onScrollToVenues} className="rounded-2xl border border-white/10 bg-white/8 px-7 py-4 text-base font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/12 hover:text-white">
                  Esplora i top locali
                </button>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {moods.map(({ id, label, icon: Icon, glow, active, ring }) => {
                  const isActive = false; // No active state in hero
                  return (
                    <button key={id} type="button" onClick={() => onApplyMoodPreset?.({ selectedTipoSerata: getMoodPreset(id) })}
                      className={`group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${isActive ? `${active} ring-1 ${ring} scale-[1.02]` : "border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/10 hover:text-white"}`}>
                      <div className={`absolute inset-0 bg-linear-to-br ${glow} transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"}`} />
                      {isActive && (
                        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                      <div className="relative flex items-center gap-3 pr-14">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl backdrop-blur-xl transition-all ${isActive ? "bg-white/15 ring-1 ring-white/20 shadow-lg" : "bg-white/10 ring-1 ring-white/10"}`}>
                          <Icon size={20} className={isActive ? "text-white" : "text-white/90"} />
                        </div>
                        <span className={`text-sm font-semibold sm:text-base ${isActive ? "text-white" : "text-white/80"}`}>{label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard title="Locali selezionati" value="120+" subtitle="bar, club e rooftop" />
              <InfoCard title="Match del mood" value="94%" subtitle="esperienza più precisa" />
              <InfoCard title="Quartieri attivi" value="18" subtitle="Chiaia, Vomero, Centro e oltre" />
              <InfoCard title="Top trend" value="Aperitivo + DJ" subtitle="format più cercato" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-linear-to-t from-[#050816] to-transparent" />
    </header>
  );
}

function InfoCard({ title, value, subtitle }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <p className="text-sm text-white/55">{title}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm text-white/70">{subtitle}</p>
    </div>
  );
}

// Helper function to map mood id to preset
function getMoodPreset(id) {
  const presets = {
    casino: "Discoteca",
    tranquillo: "Aperitivo",
    musica: "Live Music",
    alternativo: "Lounge",
    persone: "Aperitivo + DJ",
    food: "Food & Drink",
  };
  return presets[id] || "";
}
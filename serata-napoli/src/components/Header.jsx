/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  MapPin,
  Search,
  Sparkles,
  Flame,
  Music,
  Users,
  Wine,
  Utensils,
  X,
  ArrowRight,
  Star,
} from "lucide-react";

const cities = [
  "Napoli",
  "Roma",
  "Milano",
  "Torino",
  "Firenze",
  "Bologna",
  "Venezia",
  "Palermo",
  "Genova",
  "Bari",
];

const zones = {
  Napoli: ["Centro", "Vomero", "Chiaia", "Posillipo", "Mergellina", "Fuorigrotta"],
  Roma: ["Centro Storico", "Trastevere", "Testaccio", "Monti", "Prati"],
  Milano: ["Centro", "Navigli", "Brera", "Porta Romana", "Isola"],
};

const moods = [
  { id: "casino", label: "Vogliamo casino", icon: Flame, glow: "from-orange-500/30 to-red-500/10" },
  { id: "tranquillo", label: "Tranquillo ma vivo", icon: Wine, glow: "from-emerald-500/30 to-teal-500/10" },
  { id: "musica", label: "Musica live", icon: Music, glow: "from-sky-500/30 to-blue-500/10" },
  { id: "alternativo", label: "Alternativo", icon: Sparkles, glow: "from-fuchsia-500/30 to-violet-500/10" },
  { id: "persone", label: "Conoscere persone", icon: Users, glow: "from-cyan-500/30 to-teal-500/10" },
  { id: "food", label: "Esperienza food", icon: Utensils, glow: "from-amber-500/30 to-orange-500/10" },
];

export default function NapoliHeader() {
  const [activeMood, setActiveMood] = useState("casino");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Napoli");
  const [selectedZone, setSelectedZone] = useState("Chiaia");
  const [step, setStep] = useState("city");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const filteredCities = useMemo(
    () => cities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const filteredZones = useMemo(
    () => (zones[selectedCity] || []).filter((zone) => zone.toLowerCase().includes(searchQuery.toLowerCase())),
    [selectedCity, searchQuery]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setStep("city");
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedZone((zones[city] && zones[city][0]) || "Centro");
    setStep("zone");
    setSearchQuery("");
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setIsDropdownOpen(false);
    setStep("city");
    setSearchQuery("");
  };

  return (
    <header className="relative isolate min-h-[92vh] overflow-hidden bg-[#050816]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80"
          alt="Napoli by night"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_24%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-[#050816]/30 via-[#050816]/65 to-[#050816]" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-10 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[92vh] max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 shadow-2xl ring-1 ring-white/15 backdrop-blur-xl">
              <Sparkles size={20} className="text-orange-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Night Guide</p>
              <h2 className="text-lg font-semibold text-white">Napoli Mood Finder</h2>
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {moods.slice(0, 4).map((mood) => (
              <button
                key={mood.id}
                onClick={() => setActiveMood(mood.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${activeMood === mood.id
                    ? "border-orange-400/60 bg-orange-500/20 text-white shadow-lg shadow-orange-500/20"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {mood.label}
              </button>
            ))}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              <MapPin size={16} className="text-orange-300" />
              <span>
                {selectedCity} · {selectedZone}
              </span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-[22rem] overflow-hidden rounded-3xl border border-white/10 bg-[#0c1224]/95 shadow-2xl backdrop-blur-2xl">
                <div className="border-b border-white/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      {step === "city" ? "Seleziona città" : `Zone di ${selectedCity}`}
                    </h3>
                    {step === "zone" && (
                      <button
                        onClick={() => {
                          setStep("city");
                          setSearchQuery("");
                        }}
                        className="text-xs font-medium text-white/60 transition hover:text-white"
                      >
                        Indietro
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={step === "city" ? "Cerca città..." : "Cerca zona..."}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-orange-400/50 focus:bg-white/10"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto p-2">
                  {(step === "city" ? filteredCities : filteredZones).length > 0 ? (
                    (step === "city" ? filteredCities : filteredZones).map((item) => {
                      const isActive = step === "city" ? item === selectedCity : item === selectedZone;
                      return (
                        <button
                          key={item}
                          onClick={() => (step === "city" ? handleCitySelect(item) : handleZoneSelect(item))}
                          className={`mb-1 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-all ${isActive
                              ? "bg-orange-500/15 text-orange-200"
                              : "text-white/75 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                          <span>{item}</span>
                          {isActive && <Star size={14} className="text-orange-300" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-4 py-10 text-center text-sm text-white/40">Nessun risultato trovato</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

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
                Un’interfaccia elegante, filtri intelligenti e suggerimenti visuali per trovare il posto giusto,
                dal pre-serata rilassato al locale pieno di energia.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button className="group inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/30 transition hover:scale-[1.02] hover:shadow-orange-500/45">
                  Trova la tua serata
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button className="rounded-2xl border border-white/10 bg-white/8 px-7 py-4 text-base font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/12 hover:text-white">
                  Esplora i top locali
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {moods.map(({ id, label, icon: Icon, glow }) => (
                  <button
                    key={id}
                    onClick={() => setActiveMood(id)}
                    className={`group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all ${activeMood === id
                        ? "border-white/20 bg-white/12 text-white shadow-2xl"
                        : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    <div className={`absolute inset-0 bg-linear-to-br ${glow} opacity-100`} />
                    <div className="relative flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10 backdrop-blur-xl">
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className="text-sm font-semibold sm:text-base">{label}</span>
                    </div>
                  </button>
                ))}
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

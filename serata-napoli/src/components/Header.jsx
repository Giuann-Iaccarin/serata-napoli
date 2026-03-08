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
  ChevronLeft,
  Check
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
  Torino: ["Centro", "San Salvario", "Crocetta"],
  Firenze: ["Centro", "Oltrarno", "Campo di Marte"],
  Bologna: ["Centro", "Bolognina", "Santo Stefano"],
  Venezia: ["San Marco", "Cannaregio", "Dorsoduro"],
  Palermo: ["Centro", "Mondello", "Kalsa"],
  Genova: ["Centro Storico", "Boccadasse", "Albaro"],
  Bari: ["Murattiano", "Bari Vecchia", "Poggiofranco"],
};

const moods = [
  {
    id: "casino",
    label: "Vogliamo casino",
    icon: Flame,
    glow: "from-orange-500/35 to-red-500/15",
    active: "border-orange-400/60 bg-orange-500/15 text-white shadow-[0_0_30px_rgba(249,115,22,0.25)]",
    badge: "bg-orange-500/20 text-orange-200",
    ring: "ring-orange-400/30",
  },
  {
    id: "tranquillo",
    label: "Tranquillo ma vivo",
    icon: Wine,
    glow: "from-emerald-500/35 to-teal-500/15",
    active: "border-emerald-400/60 bg-emerald-500/15 text-white shadow-[0_0_30px_rgba(16,185,129,0.22)]",
    badge: "bg-emerald-500/20 text-emerald-200",
    ring: "ring-emerald-400/30",
  },
  {
    id: "musica",
    label: "Musica live",
    icon: Music,
    glow: "from-sky-500/35 to-blue-500/15",
    active: "border-sky-400/60 bg-sky-500/15 text-white shadow-[0_0_30px_rgba(56,189,248,0.22)]",
    badge: "bg-sky-500/20 text-sky-200",
    ring: "ring-sky-400/30",
  },
  {
    id: "alternativo",
    label: "Alternativo",
    icon: Sparkles,
    glow: "from-fuchsia-500/35 to-violet-500/15",
    active: "border-fuchsia-400/60 bg-fuchsia-500/15 text-white shadow-[0_0_30px_rgba(217,70,239,0.22)]",
    badge: "bg-fuchsia-500/20 text-fuchsia-200",
    ring: "ring-fuchsia-400/30",
  },
  {
    id: "persone",
    label: "Conoscere persone",
    icon: Users,
    glow: "from-cyan-500/35 to-teal-500/15",
    active: "border-cyan-400/60 bg-cyan-500/15 text-white shadow-[0_0_30px_rgba(34,211,238,0.22)]",
    badge: "bg-cyan-500/20 text-cyan-200",
    ring: "ring-cyan-400/30",
  },
  {
    id: "food",
    label: "Esperienza food",
    icon: Utensils,
    glow: "from-amber-500/35 to-orange-500/15",
    active: "border-amber-400/60 bg-amber-500/15 text-white shadow-[0_0_30px_rgba(251,191,36,0.22)]",
    badge: "bg-amber-500/20 text-amber-200",
    ring: "ring-amber-400/30",
  },
];

export default function NapoliHeader() {
  const [activeMood, setActiveMood] = useState("casino");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Napoli");
  const [selectedZone, setSelectedZone] = useState("Chiaia");
  const [step, setStep] = useState("city");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const currentZones = useMemo(() => zones[selectedCity] || [], [selectedCity]);

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredZones = useMemo(() => {
    return currentZones.filter((zone) =>
      zone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentZones, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // eslint-disable-next-line react-hooks/immutability
        closeDropdown();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setStep("city");
    setSearchQuery("");
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleCitySelect = (city) => {
    const nextZones = zones[city] || [];
    setSelectedCity(city);
    setSelectedZone(nextZones[0] || "");
    setStep("zone");
    setSearchQuery("");
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    closeDropdown();
  };

  const visibleItems = step === "city" ? filteredCities : filteredZones;

  return (
    <header className="relative isolate min-h-[92vh] overflow-hidden bg-[#050816]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80"
          alt="Napoli by night"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_24%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/30 via-[#050816]/65 to-[#050816]" />
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

          <div className="relative z-50" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => (isDropdownOpen ? closeDropdown() : openDropdown())}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              <MapPin size={16} className="shrink-0 text-orange-300" />

              <div className="flex min-w-0 items-center gap-2">
                <span className="max-w-[90px] truncate rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
                  {selectedCity}
                </span>
                {selectedZone && (
                  <span className="max-w-[90px] truncate rounded-full bg-orange-500/15 px-2.5 py-1 text-xs font-semibold text-orange-200">
                    {selectedZone}
                  </span>
                )}
              </div>

              <ChevronDown
                size={16}
                className={`shrink-0 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-[20rem] overflow-hidden rounded-3xl border border-white/10 bg-[#0c1224]/95 shadow-2xl backdrop-blur-2xl">
                <div className="border-b border-white/10 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {step === "zone" && (
                        <button
                          type="button"
                          onClick={() => {
                            setStep("city");
                            setSearchQuery("");
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                        >
                          <ChevronLeft size={16} />
                        </button>
                      )}
                      <h3 className="text-sm font-semibold text-white">
                        {step === "city" ? "Seleziona città" : `Zone di ${selectedCity}`}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={closeDropdown}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
                    />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={step === "city" ? "Cerca città..." : "Cerca zona..."}
                      autoFocus
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-orange-400/50 focus:bg-white/10"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-56 overflow-y-auto p-2">
                  {visibleItems.length > 0 ? (
                    visibleItems.map((item) => {
                      const isActive =
                        step === "city" ? item === selectedCity : item === selectedZone;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            step === "city" ? handleCitySelect(item) : handleZoneSelect(item)
                          }
                          className={`mb-1 flex w-full items-center justify-between rounded-2xl border px-4 py-2.5 text-left text-sm transition-all ${isActive
                            ? "border-orange-400/40 bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-white shadow-[0_0_0_1px_rgba(251,146,60,0.12)]"
                            : "border-transparent text-white/75 hover:border-white/10 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                          <span className="truncate font-medium">{item}</span>

                          <div className="ml-3 flex shrink-0 items-center gap-2">
                            {isActive && (
                              <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-200">
                                attiva
                              </span>
                            )}
                            {isActive && <Star size={14} className="text-orange-300" />}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-4 py-8 text-center text-sm text-white/40">
                      Nessun risultato trovato
                    </div>
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
                <span className="block bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                  stasera a Napoli?
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Un’interfaccia elegante, filtri intelligenti e suggerimenti visuali per trovare il posto giusto,
                dal pre-serata rilassato al locale pieno di energia.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/30 transition hover:scale-[1.02] hover:shadow-orange-500/45">
                  Trova la tua serata
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button className="rounded-2xl border border-white/10 bg-white/8 px-7 py-4 text-base font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/12 hover:text-white">
                  Esplora i top locali
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {moods.map(({ id, label, icon: Icon, glow, active, badge, ring }) => {
                  const isActive = activeMood === id;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveMood(id)}
                      className={`group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${isActive
                        ? `${active} ring-1 ${ring} scale-[1.02]`
                        : "border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${glow} transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"
                          }`}
                      />

                      {isActive && (
                        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                          <Check size={14} className="text-white" />
                        </div>
                      )}

                      <div className="relative flex items-center gap-3 pr-14">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl backdrop-blur-xl transition-all ${isActive
                            ? "bg-white/15 ring-1 ring-white/20 shadow-lg"
                            : "bg-white/10 ring-1 ring-white/10"
                            }`}
                        >
                          <Icon size={20} className={isActive ? "text-white" : "text-white/90"} />
                        </div>

                        <span className={`text-sm font-semibold sm:text-base ${isActive ? "text-white" : "text-white/80"}`}>
                          {label}
                        </span>
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

      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#050816] to-transparent" />
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
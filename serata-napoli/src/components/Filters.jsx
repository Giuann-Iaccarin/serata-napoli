/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Flame,
  HeartHandshake,
  TrendingUp,
  UserCircle,
  Building2,
  Music4,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Trees,
  CalendarDays,
  MapPinned,
  Users,
  Wallet,
  Search,
  X,
  Sparkles,
  ChevronUp,
} from "lucide-react";

const DEFAULT_FILTERS = {
  priceRange: ["€", "€€", "€€€"],
  selectedZone: "Napoli città",
  selectedQuartiere: "Chiaia",
  selectedAge: "23-26",
  selectedEnergy: 4,
  selectedSocial: 4,
  selectedAffluenza: 3,
  selectedTipoSerata: "Aperitivo + DJ",
  selectedPubblico: "Misto",
  selectedLocation: "Entrambi",
  selectedFormats: ["DJ Set"],
  selectedDays: ["Ven", "Sab"],
  selectedIdealFor: "Amici",
};

const PRICE_OPTIONS = ["€", "€€", "€€€"];
const AGE_RANGES = ["18-22", "23-26", "27-30", "30+"];
const ZONE_OPTIONS = ["Napoli città", "Vomero", "Chiaia", "Centro Storico", "Posillipo"];
const QUARTIERE_OPTIONS_BY_ZONE = {
  "Napoli città": ["Chiaia", "Vomero", "Centro", "Posillipo", "Mergellina", "Fuorigrotta"],
  Vomero: ["Vomero", "Arenella"],
  Chiaia: ["Chiaia", "Mergellina"],
  "Centro Storico": ["Centro", "Decumani", "San Lorenzo"],
  Posillipo: ["Posillipo", "Marechiaro"],
};
const TIPO_SERATA_OPTIONS = [
  "Discoteca",
  "Aperitivo",
  "Live Music",
  "Food & Drink",
  "Rooftop",
  "Beach Club",
  "Lounge",
  "Aperitivo + DJ",
];
const PUBBLICO_OPTIONS = ["Misto", "Giovane", "Maturo", "Internazionale", "Locale", "Alternativo"];
const LOCATION_OPTIONS = ["Entrambi", "Indoor", "Outdoor"];
const FORMAT_OPTIONS = ["DJ Set", "Live Band", "Karaoke", "Dancing", "Aperitivo", "Cena", "Brunch", "After Party"];
const DAYS_OPTIONS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const IDEAL_FOR_OPTIONS = ["Solo", "Coppia", "Amici", "Gruppo", "Networking", "Date", "Famiglia"];

export default function NapoliFilters() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showAdvanced, setShowAdvanced] = useState(true);

  const {
    priceRange,
    selectedZone,
    selectedQuartiere,
    selectedAge,
    selectedEnergy,
    selectedSocial,
    selectedAffluenza,
    selectedTipoSerata,
    selectedPubblico,
    selectedLocation,
    selectedFormats,
    selectedDays,
    selectedIdealFor,
  } = filters;

  const quartiereOptions = useMemo(() => {
    return QUARTIERE_OPTIONS_BY_ZONE[selectedZone] || QUARTIERE_OPTIONS_BY_ZONE["Napoli città"];
  }, [selectedZone]);

  useEffect(() => {
    if (!quartiereOptions.includes(selectedQuartiere)) {
      setFilters((prev) => ({
        ...prev,
        selectedQuartiere: quartiereOptions[0],
      }));
    }
  }, [quartiereOptions, selectedQuartiere]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const updateZone = (value) => {
    const nextQuartieri = QUARTIERE_OPTIONS_BY_ZONE[value] || QUARTIERE_OPTIONS_BY_ZONE["Napoli città"];

    setFilters((prev) => ({
      ...prev,
      selectedZone: value,
      selectedQuartiere: nextQuartieri.includes(prev.selectedQuartiere)
        ? prev.selectedQuartiere
        : nextQuartieri[0],
    }));
  };

  const toggleMultiValue = (key, value, fallback = []) => {
    setFilters((prev) => {
      const current = prev[key];
      const exists = current.includes(value);
      const next = exists ? current.filter((item) => item !== value) : [...current, value];

      return {
        ...prev,
        [key]: next.length ? next : fallback,
      };
    });
  };

  const togglePrice = (price) => {
    setFilters((prev) => {
      const exists = prev.priceRange.includes(price);
      const next = exists
        ? prev.priceRange.filter((item) => item !== price)
        : [...prev.priceRange, price];

      return {
        ...prev,
        priceRange: next.length
          ? [...next].sort((a, b) => a.length - b.length)
          : [price],
      };
    });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const activeCount = useMemo(() => {
    let count = 0;

    if (priceRange.length > 0) count += 1;
    if (selectedZone) count += 1;
    if (selectedQuartiere) count += 1;
    if (selectedAge) count += 1;
    if (selectedEnergy) count += 1;
    if (selectedSocial) count += 1;
    if (selectedAffluenza) count += 1;
    if (selectedTipoSerata) count += 1;
    if (selectedPubblico) count += 1;
    if (selectedLocation) count += 1;
    if (selectedIdealFor) count += 1;
    if (selectedFormats.length > 0) count += 1;
    if (selectedDays.length > 0) count += 1;

    return count;
  }, [
    priceRange,
    selectedZone,
    selectedQuartiere,
    selectedAge,
    selectedEnergy,
    selectedSocial,
    selectedAffluenza,
    selectedTipoSerata,
    selectedPubblico,
    selectedLocation,
    selectedIdealFor,
    selectedFormats,
    selectedDays,
  ]);

  return (
    <section className="relative -mt-20 z-30 max-w-7xl mx-auto px-4">
      <div className="relative overflow-visible rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl shadow-2xl">
        {/* Decorative Background Gradient */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs uppercase tracking-wider text-orange-400 font-bold mb-3">
                <Sparkles size={14} />
                Filtri Smart
              </div>
              <h3 className="text-3xl font-black text-white mb-2">
                Trova la tua serata perfetta
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activeCount > 0 && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5">
                  <span className="text-sm text-white/70">Filtri attivi</span>
                  <span className="flex items-center justify-center min-w-[24px] h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-black px-2">
                    {activeCount}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 font-semibold text-sm"
              >
                <RotateCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                Reset
              </button>
            </div>
          </div>

          {/* Main Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {/* Price */}
            <FilterButtonGroup
              label="Prezzo"
              options={PRICE_OPTIONS}
              selected={priceRange}
              onToggle={togglePrice}
              color="orange"
              icon={Wallet}
            />

            {/* Zone */}
            <DropdownFilter
              label="Zona"
              value={selectedZone}
              options={ZONE_OPTIONS}
              onChange={updateZone}
              icon={<MapPinned size={15} />}
              searchable
            />

            {/* Quartiere */}
            <DropdownFilter
              label="Quartiere"
              value={selectedQuartiere}
              options={quartiereOptions}
              onChange={(value) => updateFilter("selectedQuartiere", value)}
              icon={<Building2 size={15} />}
              searchable
            />

            {/* Age */}
            <DropdownFilter
              label="Età media"
              value={`${selectedAge} anni`}
              options={AGE_RANGES.map((a) => `${a} anni`)}
              onChange={(value) => updateFilter("selectedAge", value.replace(" anni", ""))}
              highlight
              icon={<Users size={15} />}
            />

            {/* Tipo Serata */}
            <DropdownFilter
              label="Tipo serata"
              value={selectedTipoSerata}
              options={TIPO_SERATA_OPTIONS}
              onChange={(value) => updateFilter("selectedTipoSerata", value)}
              icon={<Music4 size={15} />}
            />

            {/* Pubblico */}
            <DropdownFilter
              label="Pubblico"
              value={selectedPubblico}
              options={PUBBLICO_OPTIONS}
              onChange={(value) => updateFilter("selectedPubblico", value)}
              icon={<UserCircle size={15} />}
            />
          </div>

          {/* Level Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <LevelFilter
              label="Energia"
              value={selectedEnergy}
              onChange={(value) => updateFilter("selectedEnergy", value)}
              icon={Flame}
              color="orange"
            />
            <LevelFilter
              label="Socialità"
              value={selectedSocial}
              onChange={(value) => updateFilter("selectedSocial", value)}
              icon={HeartHandshake}
              color="blue"
            />
            <LevelFilter
              label="Affluenza"
              value={selectedAffluenza}
              onChange={(value) => updateFilter("selectedAffluenza", value)}
              icon={TrendingUp}
              color="purple"
            />
          </div>

          {/* Advanced Filters Toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full group flex items-center justify-between px-5 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 mb-4"
          >
            <div className="flex items-center gap-3">
              <SlidersHorizontal size={20} className="text-orange-400 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-white font-bold">Filtri Avanzati</span>
              {(selectedFormats.length > 0 || selectedDays.length > 0) && (
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
              )}
            </div>
            <ChevronDown
              size={20}
              className={`text-white/60 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Advanced Filters Content */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 animate-in slide-in-from-top-2 fade-in duration-300">
              <FilterButtonGroup
                label="Location"
                options={LOCATION_OPTIONS}
                selected={[selectedLocation]}
                onToggle={(value) => updateFilter("selectedLocation", value)}
                color="cyan"
                single
                icon={Trees}
              />

              <FilterButtonGroup
                label="Ideale per"
                options={IDEAL_FOR_OPTIONS}
                selected={[selectedIdealFor]}
                onToggle={(value) => updateFilter("selectedIdealFor", value)}
                color="purple"
                single
                icon={HeartHandshake}
              />

              <FilterButtonGroup
                label="Format"
                options={FORMAT_OPTIONS}
                selected={selectedFormats}
                onToggle={(value) => toggleMultiValue("selectedFormats", value, ["DJ Set"])}
                color="blue"
                icon={Music4}
              />

              <FilterButtonGroup
                label="Giorni top"
                options={DAYS_OPTIONS}
                selected={selectedDays}
                onToggle={(value) => toggleMultiValue("selectedDays", value, ["Ven", "Sab"])}
                color="green"
                icon={CalendarDays}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==================== Helper Components ====================

function FilterButtonGroup({ label, options, selected, onToggle, color, single = false, icon: Icon }) {
  const colors = {
    orange: {
      active: "border-orange-500/50 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-100 shadow-lg shadow-orange-500/20",
      inactive: "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20"
    },
    blue: {
      active: "border-blue-500/50 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-100 shadow-lg shadow-blue-500/20",
      inactive: "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20"
    },
    cyan: {
      active: "border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-100 shadow-lg shadow-cyan-500/20",
      inactive: "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20"
    },
    green: {
      active: "border-emerald-500/50 bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-100 shadow-lg shadow-emerald-500/20",
      inactive: "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20"
    },
    purple: {
      active: "border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-100 shadow-lg shadow-purple-500/20",
      inactive: "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20"
    },
  };

  const colorConfig = colors[color] || colors.orange;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon size={16} className="text-white/60" />}
        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
          {label}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = single ? selected[0] === opt : selected.includes(opt);

          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`group relative inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${isSelected ? colorConfig.active : colorConfig.inactive
                }`}
            >
              {isSelected && <Check size={14} className="animate-in zoom-in duration-200" />}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LevelFilter({ label, value, onChange, icon: Icon, color }) {
  const colors = {
    orange: {
      active: "text-orange-400",
      glow: "drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]",
      bg: "bg-orange-500/20"
    },
    blue: {
      active: "text-blue-400",
      glow: "drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]",
      bg: "bg-blue-500/20"
    },
    purple: {
      active: "text-purple-400",
      glow: "drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]",
      bg: "bg-purple-500/20"
    },
  };

  const colorConfig = colors[color] || colors.orange;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-white/60" />
        <span className="text-xs font-bold uppercase tracking-wider text-white/60">
          {label}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        {[1, 2, 3, 4, 5].map((i) => {
          const isActive = i <= value;

          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i)}
              className={`group relative p-2.5 rounded-xl transition-all duration-300 transform hover:scale-125 ${isActive ? colorConfig.bg : 'hover:bg-white/5'
                }`}
              aria-label={`${label} ${i}`}
            >
              <Icon
                size={22}
                className={`transition-all duration-300 ${isActive
                  ? `${colorConfig.active} ${colorConfig.glow}`
                  : 'text-white/20 group-hover:text-white/40'
                  }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DropdownFilter({
  label,
  value,
  options,
  onChange,
  highlight = false,
  icon = null,
  searchable = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    return options.filter((opt) => opt.toLowerCase().includes(query.toLowerCase()));
  }, [options, query, searchable]);

  return (
    <div ref={containerRef} className="relative">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          {icon && <span className="text-white/60">{icon}</span>}
          <span className="text-xs font-bold uppercase tracking-wider text-white/60">
            {label}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 text-left transition-all duration-300"
        >
          <span className={`text-sm font-semibold truncate ${highlight ? "text-orange-400" : "text-white"
            }`}>
            {value}
          </span>

          <ChevronDown
            size={16}
            className={`text-white/60 group-hover:text-white transition-all duration-300 flex-shrink-0 ${open ? "rotate-180" : ""
              }`}
          />
        </button>

        {/* Dropdown Menu - Portal Style */}
        {open && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

            {/* Menu */}
            <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-white/10 bg-slate-900/98 backdrop-blur-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
              {searchable && (
                <div className="p-3 border-b border-white/10 bg-white/5">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={`Cerca ${label.toLowerCase()}...`}
                      autoFocus
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white outline-none placeholder:text-white/40 focus:border-orange-400/50 focus:bg-white/10 transition-all"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="max-h-60 overflow-y-auto p-2 custom-scrollbar">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => {
                    const isActive = opt === value;

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          onChange(opt);
                          setOpen(false);
                          setQuery("");
                        }}
                        className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 ${isActive
                          ? "bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 font-bold text-orange-100"
                          : "text-white/75 hover:bg-white/5 hover:text-white border border-transparent"
                          }`}
                      >
                        <span className="truncate">{opt}</span>
                        {isActive && (
                          <Check size={16} className="flex-shrink-0 ml-2 text-orange-400 animate-in zoom-in duration-200" />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Search size={32} className="mx-auto mb-2 text-white/20" />
                    <p className="text-sm text-white/40">Nessun risultato</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 146, 60, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.7);
        }
      `}</style>
    </div>
  );
}
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
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
} from "lucide-react";

export default function NapoliFilters() {
  const [priceRange, setPriceRange] = useState(["€", "€€", "€€€"]);
  const [selectedZone, setSelectedZone] = useState("Napoli città");
  const [selectedQuartiere, setSelectedQuartiere] = useState("Chiaia");
  const [selectedAge, setSelectedAge] = useState("23-26");
  const [selectedEnergy, setSelectedEnergy] = useState(4);
  const [selectedSocial, setSelectedSocial] = useState(4);
  const [selectedAffluenza, setSelectedAffluenza] = useState(3);
  const [selectedTipoSerata, setSelectedTipoSerata] = useState("Aperitivo + DJ");
  const [selectedPubblico, setSelectedPubblico] = useState("Misto");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Entrambi");
  const [selectedFormats, setSelectedFormats] = useState(["DJ Set"]);
  const [selectedDays, setSelectedDays] = useState(["Ven", "Sab"]);
  const [selectedIdealFor, setSelectedIdealFor] = useState("Amici");

  const priceOptions = ["€", "€€", "€€€"];
  const ageRanges = ["18-22", "23-26", "27-30", "30+"];
  const tipoSerataOptions = ["Discoteca", "Aperitivo", "Live Music", "Food & Drink", "Rooftop", "Beach Club", "Lounge", "Aperitivo + DJ"];
  const pubblicoOptions = ["Misto", "Giovane", "Maturo", "Internazionale", "Locale", "Alternativo"];
  const locationOptions = ["Entrambi", "Indoor", "Outdoor"];
  const formatOptions = ["DJ Set", "Live Band", "Karaoke", "Dancing", "Aperitivo", "Cena", "Brunch", "After Party"];
  const daysOptions = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
  const idealForOptions = ["Solo", "Coppia", "Amici", "Gruppo", "Networking", "Date", "Famiglia"];

  const activeCount = useMemo(() => {
    let count = 0;
    if (priceRange.length !== 3) count += 1;
    if (selectedFormats.length) count += 1;
    if (selectedDays.length) count += 1;
    if (selectedLocation !== "Entrambi") count += 1;
    if (selectedIdealFor !== "Amici") count += 1;
    return count;
  }, [priceRange, selectedFormats, selectedDays, selectedLocation, selectedIdealFor]);

  const togglePrice = (price) => {
    if (priceRange.includes(price)) {
      setPriceRange(priceRange.filter((p) => p !== price));
    } else {
      setPriceRange([...priceRange, price].sort((a, b) => a.length - b.length));
    }
  };

  const toggleFormat = (format) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const resetFilters = () => {
    setPriceRange(["€", "€€", "€€€"]);
    setSelectedZone("Napoli città");
    setSelectedQuartiere("Chiaia");
    setSelectedAge("23-26");
    setSelectedEnergy(4);
    setSelectedSocial(4);
    setSelectedAffluenza(3);
    setSelectedTipoSerata("Aperitivo + DJ");
    setSelectedPubblico("Misto");
    setSelectedLocation("Entrambi");
    setSelectedFormats(["DJ Set"]);
    setSelectedDays(["Ven", "Sab"]);
    setSelectedIdealFor("Amici");
  };

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/8 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6 lg:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_24%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_22%)]" />
      <div className="relative z-10">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-white/60">
              <SlidersHorizontal size={13} /> filtri smart
            </div>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Personalizza la tua serata perfetta</h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Combina budget, quartiere, livello di energia e format per ottenere suggerimenti più belli,
              più ordinati e molto più premium da vedere.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/75">
              Filtri attivi <span className="ml-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">{activeCount}</span>
            </div>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/12 hover:text-white"
            >
              <RotateCcw size={16} /> Resetta tutto
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FilterButtonGroup label="Prezzo" options={priceOptions} selected={priceRange} onToggle={togglePrice} color="orange" />
              <DropdownFilter label="Zona" value={selectedZone} options={["Napoli città", "Vomero", "Chiaia", "Centro Storico", "Posillipo"]} onChange={setSelectedZone} />
              <DropdownFilter label="Quartiere" value={selectedQuartiere} options={["Chiaia", "Vomero", "Centro", "Posillipo", "Mergellina", "Fuorigrotta"]} onChange={setSelectedQuartiere} />
              <DropdownFilter label="Età media" value={`${selectedAge} anni`} options={ageRanges.map((a) => `${a} anni`)} onChange={(val) => setSelectedAge(val.replace(" anni", ""))} highlight />
              <DropdownFilter label="Tipo serata" value={selectedTipoSerata} options={tipoSerataOptions} onChange={setSelectedTipoSerata} icon={<Music4 size={15} />} />
              <DropdownFilter label="Pubblico" value={selectedPubblico} options={pubblicoOptions} onChange={setSelectedPubblico} icon={<UserCircle size={15} />} />
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-black/15 p-4 md:grid-cols-3">
              <LevelFilter label="Energia" value={selectedEnergy} onChange={setSelectedEnergy} icon={Flame} color="orange" />
              <LevelFilter label="Socialità" value={selectedSocial} onChange={setSelectedSocial} icon={HeartHandshake} color="blue" />
              <LevelFilter label="Affluenza" value={selectedAffluenza} onChange={setSelectedAffluenza} icon={TrendingUp} color="purple" />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="h-full rounded-[28px] border border-white/10 bg-black/15 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Filtri avanzati</p>
                  <p className="mt-1 text-sm text-white/55">Location, giorni, format e target della serata</p>
                </div>
                <button
                  onClick={() => setShowAdvanced((prev) => !prev)}
                  className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                    showAdvanced
                      ? "border-orange-400/40 bg-orange-500/15 text-orange-200"
                      : "border-white/10 bg-white/6 text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <SlidersHorizontal size={15} />
                  {showAdvanced ? "Chiudi" : "Apri"}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedFormats.slice(0, 2).map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
                {selectedDays.slice(0, 2).map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
                <Badge>{selectedLocation}</Badge>
              </div>
            </div>
          </div>
        </div>

        {showAdvanced && (
          <div className="animate-in fade-in slide-in-from-top-2 mt-4 grid gap-4 rounded-[30px] border border-white/10 bg-black/15 p-4 duration-300 md:grid-cols-2 xl:grid-cols-4">
            <FilterButtonGroup label="Location" options={locationOptions} selected={[selectedLocation]} onToggle={setSelectedLocation} color="orange" single icon={Trees} />
            <FilterButtonGroup label="Ideale per" options={idealForOptions} selected={[selectedIdealFor]} onToggle={setSelectedIdealFor} color="purple" single icon={Building2} />
            <FilterButtonGroup label="Format" options={formatOptions} selected={selectedFormats} onToggle={toggleFormat} color="blue" icon={Music4} />
            <FilterButtonGroup label="Giorni top" options={daysOptions} selected={selectedDays} onToggle={toggleDay} color="green" icon={CalendarDays} />
          </div>
        )}
      </div>
    </section>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/75">
      {children}
    </span>
  );
}

function FilterButtonGroup({ label, options, selected, onToggle, color, single = false, icon: Icon }) {
  const colors = {
    orange: "border-orange-400/40 bg-orange-500/15 text-orange-100 shadow-lg shadow-orange-500/10",
    blue: "border-sky-400/40 bg-sky-500/15 text-sky-100 shadow-lg shadow-sky-500/10",
    green: "border-emerald-400/40 bg-emerald-500/15 text-emerald-100 shadow-lg shadow-emerald-500/10",
    purple: "border-violet-400/40 bg-violet-500/15 text-violet-100 shadow-lg shadow-violet-500/10",
  };

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center gap-2">
        {Icon && <Icon size={15} className="text-white/60" />}
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = single ? selected[0] === opt : selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-sm font-semibold transition-all ${
                isSelected
                  ? colors[color]
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {isSelected && <Check size={14} />}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LevelFilter({ label, value, onChange, icon: Icon, color }) {
  const activeColor = {
    orange: "text-orange-400",
    blue: "text-sky-400",
    purple: "text-violet-400",
  };

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">{label}</span>
      <div className="mt-3 flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className="rounded-xl p-2 transition hover:scale-110"
          >
            <Icon size={20} className={i <= value ? activeColor[color] : "text-white/20"} />
          </button>
        ))}
      </div>
    </div>
  );
}

function DropdownFilter({ label, value, options, onChange, highlight = false, icon = null }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-[24px] border border-white/10 bg-white/5 p-4">
      <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.22em] text-white/55">{label}</span>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left transition hover:bg-white/10"
      >
        <div className="flex min-w-0 items-center gap-2">
          {icon && <span className="text-white/60">{icon}</span>}
          <span className={`truncate text-sm font-semibold ${highlight ? "text-orange-200" : "text-white"}`}>{value}</span>
        </div>
        <ChevronDown size={16} className={`text-white/60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-full z-30 mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1224]/95 shadow-2xl backdrop-blur-2xl">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition ${
                  opt === value
                    ? "bg-orange-500/15 font-semibold text-orange-100"
                    : "text-white/75 hover:bg-white/5 hover:text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
const MOOD_FILTER_PRESETS = {
  casino: {
    selectedTipoSerata: "Discoteca",
    selectedEnergy: 5,
    selectedSocial: 4,
    selectedAffluenza: 5,
    selectedLocation: "Indoor",
    selectedFormats: ["DJ Set", "Dancing", "After Party"],
    selectedIdealFor: "Gruppo",
    selectedPubblico: "Giovane",
    selectedDays: ["Ven", "Sab"],
  },
  tranquillo: {
    selectedTipoSerata: "Aperitivo",
    selectedEnergy: 2,
    selectedSocial: 3,
    selectedAffluenza: 2,
    selectedLocation: "Outdoor",
    selectedFormats: ["Aperitivo", "Cena"],
    selectedIdealFor: "Coppia",
    selectedPubblico: "Misto",
    selectedDays: ["Gio", "Ven", "Sab"],
  },
  musica: {
    selectedTipoSerata: "Live Music",
    selectedEnergy: 3,
    selectedSocial: 4,
    selectedAffluenza: 3,
    selectedLocation: "Entrambi",
    selectedFormats: ["Live Band"],
    selectedIdealFor: "Amici",
    selectedPubblico: "Misto",
    selectedDays: ["Ven", "Sab"],
  },
  alternativo: {
    selectedTipoSerata: "Lounge",
    selectedEnergy: 3,
    selectedSocial: 4,
    selectedAffluenza: 3,
    selectedLocation: "Entrambi",
    selectedFormats: ["DJ Set", "Karaoke"],
    selectedIdealFor: "Networking",
    selectedPubblico: "Alternativo",
    selectedDays: ["Gio", "Ven", "Sab"],
  },
  persone: {
    selectedTipoSerata: "Aperitivo + DJ",
    selectedEnergy: 4,
    selectedSocial: 5,
    selectedAffluenza: 4,
    selectedLocation: "Entrambi",
    selectedFormats: ["Aperitivo", "DJ Set"],
    selectedIdealFor: "Networking",
    selectedPubblico: "Internazionale",
    selectedDays: ["Ven", "Sab"],
  },
  food: {
    selectedTipoSerata: "Food & Drink",
    selectedEnergy: 2,
    selectedSocial: 3,
    selectedAffluenza: 2,
    selectedLocation: "Entrambi",
    selectedFormats: ["Cena", "Brunch", "Aperitivo"],
    selectedIdealFor: "Date",
    selectedPubblico: "Misto",
    selectedDays: ["Sab", "Dom"],
  },
};

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Check,
  User,
  Heart,
  Bookmark,
  Settings,
  Bell,
  LogOut,
  Crown,
  ChevronRight,
} from "lucide-react";

const cities = [
  "Napoli", "Roma", "Milano", "Torino", "Firenze",
  "Bologna", "Venezia", "Palermo", "Genova", "Bari",
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
  { id: "casino", label: "Vogliamo casino", icon: Flame, glow: "from-orange-500/35 to-red-500/15", active: "border-orange-400/60 bg-orange-500/15 text-white shadow-[0_0_30px_rgba(249,115,22,0.25)]", badge: "bg-orange-500/20 text-orange-200", ring: "ring-orange-400/30" },
  { id: "tranquillo", label: "Tranquillo ma vivo", icon: Wine, glow: "from-emerald-500/35 to-teal-500/15", active: "border-emerald-400/60 bg-emerald-500/15 text-white shadow-[0_0_30px_rgba(16,185,129,0.22)]", badge: "bg-emerald-500/20 text-emerald-200", ring: "ring-emerald-400/30" },
  { id: "musica", label: "Musica live", icon: Music, glow: "from-sky-500/35 to-blue-500/15", active: "border-sky-400/60 bg-sky-500/15 text-white shadow-[0_0_30px_rgba(56,189,248,0.22)]", badge: "bg-sky-500/20 text-sky-200", ring: "ring-sky-400/30" },
  { id: "alternativo", label: "Alternativo", icon: Sparkles, glow: "from-fuchsia-500/35 to-violet-500/15", active: "border-fuchsia-400/60 bg-fuchsia-500/15 text-white shadow-[0_0_30px_rgba(217,70,239,0.22)]", badge: "bg-fuchsia-500/20 text-fuchsia-200", ring: "ring-fuchsia-400/30" },
  { id: "persone", label: "Conoscere persone", icon: Users, glow: "from-cyan-500/35 to-teal-500/15", active: "border-cyan-400/60 bg-cyan-500/15 text-white shadow-[0_0_30px_rgba(34,211,238,0.22)]", badge: "bg-cyan-500/20 text-cyan-200", ring: "ring-cyan-400/30" },
  { id: "food", label: "Esperienza food", icon: Utensils, glow: "from-amber-500/35 to-orange-500/15", active: "border-amber-400/60 bg-amber-500/15 text-white shadow-[0_0_30px_rgba(251,191,36,0.22)]", badge: "bg-amber-500/20 text-amber-200", ring: "ring-amber-400/30" },
];

// ─── User menu items ──────────────────────────────────────────────────────────
const USER_MENU = [
  {
    section: "Account",
    items: [
      { icon: User, label: "Profilo", sub: "Gestisci il tuo account", route: "/profile" },
      { icon: Crown, label: "Napoli Premium", sub: "Sblocca tutti i locali", highlight: true, route: "/premium" },
      { icon: Bell, label: "Notifiche", sub: "3 nuovi eventi", badge: "3", route: "/notifications" },
    ],
  },
  {
    section: "Libreria",
    items: [
      { icon: Heart, label: "Preferiti", sub: "12 locali salvati", route: "/favorites" },
      { icon: Bookmark, label: "Lista serate", sub: "5 serate in programma", route: "/serate-list" },
    ],
  },
  {
    section: "",
    items: [
      { icon: Settings, label: "Impostazioni", sub: "", route: "/settings" },
      { icon: LogOut, label: "Esci", sub: "", danger: true, route: "/login" },
    ],
  },
];

export default function NapoliHeader({ onApplyMoodPreset }) {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Napoli");
  const [selectedZone, setSelectedZone] = useState("Chiaia");
  const [step, setStep] = useState("city");
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  const currentZones = useMemo(() => zones[selectedCity] || [], [selectedCity]);
  const filteredCities = useMemo(() => cities.filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery]);
  const filteredZones = useMemo(() => currentZones.filter((z) => z.toLowerCase().includes(searchQuery.toLowerCase())), [currentZones, searchQuery]);

  // Location picker — click outside
  useEffect(() => {
    const onDown = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) closeDropdown(); };
    const onKey = (e) => { if (e.key === "Escape") { closeDropdown(); closeUserMenu(); } };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", onDown);
      document.addEventListener("keydown", onKey);
    }
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [isDropdownOpen]);

  // User menu — click outside
  useEffect(() => {
    const onDown = (e) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target)) closeUserMenu(); };
    if (userMenuOpen) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [userMenuOpen]);

  const closeDropdown = () => { setIsDropdownOpen(false); setStep("city"); setSearchQuery(""); };
  const openDropdown = () => setIsDropdownOpen(true);

  const openUserMenu = () => {
    setUserMenuOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setUserMenuVisible(true)));
  };
  const closeUserMenu = () => {
    setUserMenuVisible(false);
    setTimeout(() => setUserMenuOpen(false), 280);
  };
  const toggleUserMenu = () => userMenuOpen ? closeUserMenu() : openUserMenu();

  // ← FIX: naviga alla route e chiude il menu
  const handleMenuItemClick = (route) => {
    closeUserMenu();
    if (route) navigate(route);
  };

  const handleCitySelect = (city) => { const nz = zones[city] || []; setSelectedCity(city); setSelectedZone(nz[0] || ""); setStep("zone"); setSearchQuery(""); };
  const handleZoneSelect = (zone) => { setSelectedZone(zone); closeDropdown(); };

  const visibleItems = step === "city" ? filteredCities : filteredZones;

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

        {/* ── NAV ──────────────────────────────────────────────────────────── */}
        <nav className="flex items-center justify-between py-6 gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 shadow-2xl ring-1 ring-white/15 backdrop-blur-xl">
              <Sparkles size={20} className="text-orange-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Night Guide</p>
              <h2 className="text-lg font-semibold text-white">Napoli Mood Finder</h2>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/')} className="text-white/70 hover:text-white transition text-sm font-medium">Home</button>
            <button onClick={() => navigate('/events')} className="text-white/70 hover:text-white transition text-sm font-medium">Eventi</button>
            <button onClick={() => navigate('/top-venues')} className="text-white/70 hover:text-white transition text-sm font-medium">Top Venues</button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Location picker */}
            <div className="relative z-50" ref={dropdownRef}>
              <button type="button" onClick={() => isDropdownOpen ? closeDropdown() : openDropdown()}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/15">
                <MapPin size={16} className="shrink-0 text-orange-300" />
                <div className="flex min-w-0 items-center gap-2">
                  <span className="max-w-22 truncate rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">{selectedCity}</span>
                  {selectedZone && (
                    <span className="max-w-22 truncate rounded-full bg-orange-500/15 px-2.5 py-1 text-xs font-semibold text-orange-200">{selectedZone}</span>
                  )}
                </div>
                <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 overflow-hidden rounded-3xl border border-white/10 bg-[#0c1224]/95 shadow-2xl backdrop-blur-2xl">
                  <div className="border-b border-white/10 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {step === "zone" && (
                          <button type="button" onClick={() => { setStep("city"); setSearchQuery(""); }}
                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white">
                            <ChevronLeft size={16} />
                          </button>
                        )}
                        <h3 className="text-sm font-semibold text-white">{step === "city" ? "Seleziona città" : `Zone di ${selectedCity}`}</h3>
                      </div>
                      <button type="button" onClick={closeDropdown} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
                      <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={step === "city" ? "Cerca città..." : "Cerca zona..."} autoFocus
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-orange-400/50 focus:bg-white/10" />
                      {searchQuery && (
                        <button type="button" onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white">
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-56 overflow-y-auto p-2">
                    {visibleItems.length > 0 ? visibleItems.map((item) => {
                      const isActive = step === "city" ? item === selectedCity : item === selectedZone;
                      return (
                        <button key={item} type="button" onClick={() => step === "city" ? handleCitySelect(item) : handleZoneSelect(item)}
                          className={`mb-1 flex w-full items-center justify-between rounded-2xl border px-4 py-2.5 text-left text-sm transition-all ${isActive
                            ? "border-orange-400/40 bg-linear-to-r from-orange-500/20 to-amber-500/10 text-white shadow-[0_0_0_1px_rgba(251,146,60,0.12)]"
                            : "border-transparent text-white/75 hover:border-white/10 hover:bg-white/5 hover:text-white"}`}>
                          <span className="truncate font-medium">{item}</span>
                          <div className="ml-3 flex shrink-0 items-center gap-2">
                            {isActive && <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-200">attiva</span>}
                            {isActive && <Star size={14} className="text-orange-300" />}
                          </div>
                        </button>
                      );
                    }) : (
                      <div className="px-4 py-8 text-center text-sm text-white/40">Nessun risultato trovato</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── USER MENU ─────────────────────────────────────────────── */}
            <div className="relative z-50" ref={userMenuRef}>
              <button type="button" onClick={toggleUserMenu}
                className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 ${userMenuOpen
                  ? "border-orange-400/50 bg-orange-500/15 shadow-[0_0_24px_rgba(251,146,60,0.25)]"
                  : "border-white/10 bg-white/10 hover:border-white/20 hover:bg-white/15"
                  } backdrop-blur-xl`}>
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-linear-to-br from-orange-400 to-pink-500 shadow-inner">
                  <User size={14} className="text-white" />
                </div>
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-500 ring-2 ring-[#050816]">
                  <span className="text-[8px] font-black text-white leading-none">3</span>
                </span>
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div
                  style={{
                    opacity: userMenuVisible ? 1 : 0,
                    transform: userMenuVisible ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
                    transition: "opacity 280ms cubic-bezier(0.16,1,0.3,1), transform 280ms cubic-bezier(0.16,1,0.3,1)",
                    transformOrigin: "top right",
                  }}
                  className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-3xl border border-white/10 bg-[#0c1224]/97 shadow-2xl shadow-black/60 backdrop-blur-2xl"
                >
                  {/* Profile header */}
                  <div className="relative overflow-hidden p-5 border-b border-white/10">
                    <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-pink-500/5 to-transparent" />
                    <div className="relative flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-400 to-pink-500 shadow-lg shadow-orange-500/30 ring-2 ring-white/10">
                        <User size={20} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate">Marco Esposito</p>
                        <p className="text-xs text-white/50 truncate">marco@email.it</p>
                      </div>
                      <div className="ml-auto shrink-0">
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/20 border border-orange-500/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-300">
                          <Crown size={10} />
                          Free
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu sections */}
                  <div className="p-2">
                    {USER_MENU.map((section, si) => (
                      <div key={si}>
                        {section.section && (
                          <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                            {section.section}
                          </p>
                        )}
                        {si > 0 && !section.section && (
                          <div className="my-2 border-t border-white/8" />
                        )}
                        {section.items.map(({ icon: Icon, label, sub, badge, highlight, danger, route }) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => handleMenuItemClick(route)}
                            className={`group w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all duration-200 ${danger
                              ? "hover:bg-red-500/10 text-white/60 hover:text-red-400"
                              : highlight
                                ? "hover:bg-orange-500/10 text-white/80 hover:text-orange-200"
                                : "hover:bg-white/6 text-white/75 hover:text-white"
                              }`}>
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all ${danger
                              ? "bg-white/5 group-hover:bg-red-500/15"
                              : highlight
                                ? "bg-orange-500/15 group-hover:bg-orange-500/25"
                                : "bg-white/5 group-hover:bg-white/10"
                              }`}>
                              <Icon size={15} className={`transition-colors ${danger ? "group-hover:text-red-400" :
                                highlight ? "text-orange-400" : ""
                                }`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm font-semibold ${highlight ? "text-orange-300" : ""}`}>{label}</p>
                              {sub && <p className="text-xs text-white/40 truncate">{sub}</p>}
                            </div>
                            {badge && (
                              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-black text-white">
                                {badge}
                              </span>
                            )}
                            {!badge && !danger && (
                              <ChevronRight size={14} className="shrink-0 text-white/20 group-hover:text-white/50 transition-all group-hover:translate-x-0.5" />
                            )}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/8 px-4 py-3">
                    <p className="text-center text-[10px] text-white/25">NapoliNights v1.0 · Night Guide</p>
                  </div>
                </div>
              )}
            </div>
            {/* ── END USER MENU ─────────────────────────────────────────── */}

          </div>
        </nav>

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
                <button className="group inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/30 transition hover:scale-[1.02] hover:shadow-orange-500/45">
                  Trova la tua serata
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button className="rounded-2xl border border-white/10 bg-white/8 px-7 py-4 text-base font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/12 hover:text-white">
                  Esplora i top locali
                </button>
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
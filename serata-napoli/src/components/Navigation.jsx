/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown, MapPin, Search, Sparkles, X, Star,
  User, Heart, Bookmark, Settings, Bell, LogOut, Crown,
  ChevronRight, Menu, Home, Calendar, BookOpen, Map,
} from "lucide-react";

const cities = [
  "Napoli", "Roma", "Milano", "Torino", "Firenze",
  "Bologna", "Venezia", "Palermo", "Genova", "Bari",
];

const zones = {
  Napoli:  ["Centro", "Vomero", "Chiaia", "Posillipo", "Mergellina", "Fuorigrotta"],
  Roma:    ["Centro Storico", "Trastevere", "Testaccio", "Monti", "Prati"],
  Milano:  ["Centro", "Navigli", "Brera", "Porta Romana", "Isola"],
  Torino:  ["Centro", "San Salvario", "Crocetta"],
  Firenze: ["Centro", "Oltrarno", "Campo di Marte"],
  Bologna: ["Centro", "Bolognina", "Santo Stefano"],
  Venezia: ["San Marco", "Cannaregio", "Dorsoduro"],
  Palermo: ["Centro", "Mondello", "Kalsa"],
  Genova:  ["Centro Storico", "Boccadasse", "Albaro"],
  Bari:    ["Murattiano", "Bari Vecchia", "Poggiofranco"],
};

const NAV_LINKS = [
  { icon: Home,     label: "Home",   route: "/" },
  { icon: Calendar, label: "Eventi", route: "/events" },
  { icon: BookOpen, label: "Guide",  route: "/guide" },
  { icon: Map,      label: "Mappa",  route: "/map" },
];

const USER_MENU = [
  {
    section: "Account",
    items: [
      { icon: User,     label: "Profilo",        sub: "Gestisci il tuo account", route: "/profile" },
      { icon: Crown,    label: "Napoli Premium", sub: "Sblocca tutti i locali",  highlight: true, route: "/premium" },
      { icon: Bell,     label: "Notifiche",      sub: "3 nuovi eventi",          badge: "3",  route: "/notifications" },
    ],
  },
  {
    section: "Libreria",
    items: [
      { icon: Heart,    label: "Preferiti",    sub: "12 locali salvati",     route: "/favorites" },
      { icon: Bookmark, label: "Lista serate", sub: "5 serate in programma", route: "/serate-list" },
    ],
  },
  {
    section: "",
    items: [
      { icon: Settings, label: "Impostazioni", sub: "", route: "/settings" },
      { icon: LogOut,   label: "Esci",         sub: "", danger: true, route: "/login" },
    ],
  },
];

/* ── lock body scroll ──────────────────────────────────────────────────────── */
function useLockScroll(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [locked]);
}

/* ── Backdrop ──────────────────────────────────────────────────────────────── */
function Backdrop({ visible, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none", transition: "opacity 260ms ease" }}
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
    />
  );
}

/* ── BottomSheet ────────────────────────────────────────────────────────────── */
function BottomSheet({ open, onClose, title, children }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (open) requestAnimationFrame(() => requestAnimationFrame(() => setVis(true)));
    else setVis(false);
  }, [open]);
  useLockScroll(open);
  if (!open) return null;
  return (
    <>
      <Backdrop visible={vis} onClick={onClose} />
      <div
        style={{ transform: vis ? "translateY(0)" : "translateY(100%)", transition: "transform 320ms cubic-bezier(0.16,1,0.3,1)" }}
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-white/10 bg-[#0c1224] shadow-2xl"
      >
        <div className="flex justify-center pt-3 pb-0.5"><div className="h-1 w-10 rounded-full bg-white/20" /></div>
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}

/* ── MobileDrawer (slide from right) ───────────────────────────────────────── */
function MobileDrawer({ open, onClose, onNavigate }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (open) requestAnimationFrame(() => requestAnimationFrame(() => setVis(true)));
    else setVis(false);
  }, [open]);
  useLockScroll(open);
  if (!open) return null;
  return (
    <>
      <Backdrop visible={vis} onClick={onClose} />
      <div
        style={{ transform: vis ? "translateX(0)" : "translateX(100%)", transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)" }}
        className="fixed right-0 top-0 bottom-0 z-50 w-72 max-w-[85vw] bg-[#0c1224] border-l border-white/10 shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-orange-300" />
            <span className="font-bold text-white">Noctis</span>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">Navigazione</p>
          {NAV_LINKS.map(({ icon: Icon, label, route }) => {
            const isActive = location.pathname === route;
            return (
              <button key={label} onClick={() => onNavigate(route)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                  isActive
                    ? 'text-orange-300 bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}>
                <Icon size={17} className={`shrink-0 ${isActive ? 'text-orange-300' : 'text-orange-300/70'}`} />
                <span className="text-sm font-medium">{label}</span>
                <ChevronRight size={14} className="ml-auto text-white/20" />
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <button onClick={() => onNavigate("/premium")}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:opacity-90 transition active:scale-95">
            <Crown size={15} />
            Passa a Premium
          </button>
        </div>
      </div>
    </>
  );
}

/* ── UserMenuContent ────────────────────────────────────────────────────────── */
function UserMenuContent({ onItemClick }) {
  return (
    <>
      <div className="relative overflow-hidden px-4 py-4 border-b border-white/10">
        <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-pink-500/5 to-transparent" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange-400 to-pink-500 shadow-lg shadow-orange-500/25 ring-2 ring-white/10">
            <User size={18} className="text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-white text-sm truncate">Marco Esposito</p>
            <p className="text-xs text-white/50 truncate">marco@email.it</p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-orange-500/20 border border-orange-500/30 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-300">
            <Crown size={9} />Free
          </span>
        </div>
      </div>

      <div className="p-2">
        {USER_MENU.map((section, si) => (
          <div key={si}>
            {section.section && (
              <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-white/30">{section.section}</p>
            )}
            {si > 0 && !section.section && <div className="my-1.5 border-t border-white/10" />}
            {section.items.map(({ icon: Icon, label, sub, badge, highlight, danger, route }) => (
              <button key={label} type="button" onClick={() => onItemClick(route)}
                className={`group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                  danger ? "text-white/60 hover:bg-red-500/10 hover:text-red-400"
                  : highlight ? "text-white/80 hover:bg-orange-500/10 hover:text-orange-200"
                  : "text-white/75 hover:bg-white/5 hover:text-white"
                }`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all ${
                  danger ? "bg-white/5 group-hover:bg-red-500/15"
                  : highlight ? "bg-orange-500/15 group-hover:bg-orange-500/25"
                  : "bg-white/5 group-hover:bg-white/10"
                }`}>
                  <Icon size={15} className={danger ? "group-hover:text-red-400" : highlight ? "text-orange-400" : ""} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold ${highlight ? "text-orange-300" : ""}`}>{label}</p>
                  {sub && <p className="text-xs text-white/40 truncate">{sub}</p>}
                </div>
                {badge
                  ? <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-black text-white">{badge}</span>
                  : !danger && <ChevronRight size={13} className="shrink-0 text-white/20 group-hover:text-white/50 transition group-hover:translate-x-0.5" />
                }
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-4 py-3">
        <p className="text-center text-[10px] text-white/25">Noctis v1.0</p>
      </div>
    </>
  );
}

/* ── LocationList (shared between desktop dropdown & mobile sheet) ─────────── */
function LocationList({ step, setStep, searchQuery, setSearchQuery, selectedCity, selectedZone, visibleItems, handleCitySelect, handleZoneSelect }) {
  return (
    <>
      {step === "zone" && (
        <div className="px-4 pt-3 pb-0">
          <button onClick={() => { setStep("city"); setSearchQuery(""); }}
            className="flex items-center gap-1.5 text-xs text-orange-300 hover:text-orange-200 transition">
            <ChevronDown size={13} className="rotate-90" />
            <span>Tutte le città</span>
          </button>
        </div>
      )}
      <div className="px-4 py-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={step === "city" ? "Cerca città..." : "Cerca zona..."}
            autoFocus
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-9 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-orange-400/50 focus:bg-white/10"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition">
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto px-3 pb-4 space-y-0.5">
        {visibleItems.length > 0 ? visibleItems.map((item) => {
          const isActive = step === "city" ? item === selectedCity : item === selectedZone;
          return (
            <button key={item} type="button"
              onClick={() => step === "city" ? handleCitySelect(item) : handleZoneSelect(item)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                isActive
                  ? "border-orange-400/40 bg-linear-to-r from-orange-500/20 to-amber-500/10 text-white"
                  : "border-transparent text-white/75 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}>
              <span className="font-medium">{item}</span>
              <div className="flex shrink-0 items-center gap-2">
                {isActive && <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-200">attiva</span>}
                {isActive ? <Star size={13} className="text-orange-300" /> : <ChevronRight size={13} className="text-white/25" />}
              </div>
            </button>
          );
        }) : (
          <div className="py-8 text-center text-sm text-white/40">Nessun risultato trovato</div>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Napoli");
  const [selectedZone, setSelectedZone] = useState("Chiaia");
  const [step, setStep]                 = useState("city");
  const [searchQuery, setSearchQuery]   = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [userMenuOpen,    setUserMenuOpen]    = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const currentZones   = useMemo(() => zones[selectedCity] || [], [selectedCity]);
  const filteredCities = useMemo(() => cities.filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery]);
  const filteredZones  = useMemo(() => currentZones.filter((z) => z.toLowerCase().includes(searchQuery.toLowerCase())), [currentZones, searchQuery]);
  const visibleItems   = step === "city" ? filteredCities : filteredZones;

  /* click-outside for desktop dropdowns */
  useEffect(() => {
    const onDown = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) closeLocation(); };
    const onKey  = (e) => { if (e.key === "Escape") { closeLocation(); closeUserMenu(); } };
    if (locationOpen && !isMobile) {
      document.addEventListener("mousedown", onDown);
      document.addEventListener("keydown",   onKey);
    }
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [locationOpen, isMobile]);

  useEffect(() => {
    const onDown = (e) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target)) closeUserMenu(); };
    if (userMenuOpen && !isMobile) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [userMenuOpen, isMobile]);

  const closeLocation = () => { setLocationOpen(false); setStep("city"); setSearchQuery(""); };

  const handleCitySelect = (city) => { setSelectedCity(city); setSelectedZone(zones[city]?.[0] || ""); setStep("zone"); setSearchQuery(""); };
  const handleZoneSelect = (zone) => { setSelectedZone(zone); closeLocation(); };

  const openUserMenu   = () => { setUserMenuOpen(true); requestAnimationFrame(() => requestAnimationFrame(() => setUserMenuVisible(true))); };
  const closeUserMenu  = () => { setUserMenuVisible(false); setTimeout(() => setUserMenuOpen(false), 280); };
  const toggleUserMenu = () => (userMenuOpen ? closeUserMenu() : openUserMenu());

  const handleMenuItemClick = (route) => { closeUserMenu(); setMobileMenuOpen(false); if (route) navigate(route); };

  const locationListProps = { step, setStep, searchQuery, setSearchQuery, selectedCity, selectedZone, visibleItems, handleCitySelect, handleZoneSelect };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-5">
          <div className="flex items-center justify-between gap-3">

            {/* Logo */}
            <button onClick={() => navigate("/")} className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <Sparkles size={17} className="text-orange-300" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">Noctis</span>
            </button>

            {/* Desktop nav links */}
            <div className="hidden sm:flex items-center gap-1">
              {NAV_LINKS.map(({ label, route }) => {
                const isActive = location.pathname === route;
                return (
                  <button key={label} onClick={() => navigate(route)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'text-orange-300 bg-white/10'
                        : 'text-white/65 hover:text-white hover:bg-white/5'
                    }`}>
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Location button */}
              <div className="relative" ref={dropdownRef}>
                <button type="button"
                  onClick={() => locationOpen ? closeLocation() : setLocationOpen(true)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/10 active:scale-95">
                  <MapPin size={14} className="shrink-0 text-orange-300" />
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-white leading-tight">{selectedCity}</span>
                  <span className="hidden sm:inline rounded-full bg-orange-500/15 px-2 py-0.5 text-xs font-semibold text-orange-200 leading-tight">{selectedZone}</span>
                  <ChevronDown size={13} className={`shrink-0 text-white/50 transition-transform duration-300 ${locationOpen && !isMobile ? "rotate-180" : ""}`} />
                </button>

                {/* Desktop-only dropdown */}
                {locationOpen && !isMobile && (
                  <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1224]/97 shadow-2xl backdrop-blur-2xl">
                    <LocationList {...locationListProps} />
                  </div>
                )}
              </div>

              {/* User avatar */}
              <div className="relative" ref={userMenuRef}>
                <button type="button" onClick={toggleUserMenu}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 ${
                    userMenuOpen
                      ? "border-orange-400/50 bg-orange-500/15 shadow-[0_0_20px_rgba(251,146,60,0.2)]"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  } backdrop-blur-xl`}>
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-br from-orange-400 to-pink-500">
                    <User size={13} className="text-white" />
                  </div>
                  <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-500 ring-2 ring-[#050816]">
                    <span className="text-[7px] font-black text-white leading-none">3</span>
                  </span>
                </button>

                {/* Desktop user dropdown */}
                {userMenuOpen && !isMobile && (
                  <div
                    style={{
                      opacity: userMenuVisible ? 1 : 0,
                      transform: userMenuVisible ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)",
                      transition: "opacity 280ms cubic-bezier(0.16,1,0.3,1), transform 280ms cubic-bezier(0.16,1,0.3,1)",
                      transformOrigin: "top right",
                    }}
                    className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1224]/97 shadow-2xl shadow-black/60 backdrop-blur-2xl"
                  >
                    <UserMenuContent onItemClick={handleMenuItemClick} />
                  </div>
                )}
              </div>

              {/* Hamburger — mobile only */}
              <button type="button" onClick={() => setMobileMenuOpen(true)}
                className="sm:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white transition active:scale-95">
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile: location bottom-sheet */}
      <BottomSheet open={locationOpen && isMobile} onClose={closeLocation}
        title={step === "city" ? "Seleziona città" : `Zone di ${selectedCity}`}>
        <LocationList {...locationListProps} />
      </BottomSheet>

      {/* Mobile: user menu bottom-sheet */}
      <BottomSheet open={userMenuOpen && isMobile} onClose={closeUserMenu} title="Il mio account">
        <div className="pb-safe"><UserMenuContent onItemClick={handleMenuItemClick} /></div>
      </BottomSheet>

      {/* Mobile: nav drawer */}
      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}
        onNavigate={(r) => { setMobileMenuOpen(false); navigate(r); }} />
    </>
  );
}
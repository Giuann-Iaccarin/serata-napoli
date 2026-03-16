import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import LeafletMapVenues from "../components/LeafletMapVenues";
import { MOCK_VENUES } from "../data/mockVenues";
import { MapPin, Star, Navigation as NavIcon, Filter, Search, X, ExternalLink } from "lucide-react";

// ─── Zone disponibili per il filtro ──────────────────────────────────────────
const FILTER_ZONES = [
    "Tutti",
    "Napoli città",
    "Centro Storico",
    "Chiaia",
    "Vomero",
    "Posillipo",
    "Mergellina",
    "Fuorigrotta",
];

function zoneMatch(venueZone, filterZone) {
    if (filterZone === "Tutti") return true;
    return venueZone?.trim().toLowerCase() === filterZone.trim().toLowerCase();
}

function searchMatch(venue, query) {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
        venue.name.toLowerCase().includes(q) ||
        venue.zone.toLowerCase().includes(q) ||
        venue.quartiere.toLowerCase().includes(q) ||
        venue.address.toLowerCase().includes(q) ||
        venue.tag.toLowerCase().includes(q) ||
        venue.description.toLowerCase().includes(q)
    );
}

function directionsUrl(venue) {
    if (venue.lat && venue.lng) {
        return `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;
    }
    // fallback al link googleAddress già presente nel dataset
    return venue.googleAddress ?? "#";
}

// ─── Pagina ───────────────────────────────────────────────────────────────────
export default function MapPage() {
    const navigate = useNavigate();
    const [selectedZone, setSelectedZone] = useState("Tutti");
    const [searchQuery, setSearchQuery] = useState("");

    const zoneFilteredVenues = useMemo(
        () => MOCK_VENUES.filter((v) => zoneMatch(v.zone, selectedZone)),
        [selectedZone]
    );

    const displayedVenues = useMemo(
        () => zoneFilteredVenues.filter((v) => searchMatch(v, searchQuery)),
        [zoneFilteredVenues, searchQuery]
    );

    const hasSearch = searchQuery.trim().length > 0;

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />

            <section className="relative z-20 px-4 py-12">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-white mb-3">
                            Mappa dei Locali
                        </h1>
                        <p className="text-lg text-white/60">
                            Esplora tutti i locali di Napoli sulla mappa interattiva
                        </p>
                    </div>

                    {/* Filtro zone */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Filter size={18} className="text-orange-400" />
                            <span className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                                Filtra per zona
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {FILTER_ZONES.map((zone) => (
                                <button
                                    key={zone}
                                    onClick={() => setSelectedZone(zone)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${selectedZone === zone
                                        ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30"
                                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20"
                                        }`}
                                >
                                    {zone}
                                    {zone !== "Tutti" && (
                                        <span className="ml-2 text-xs opacity-60">
                                            {MOCK_VENUES.filter((v) => zoneMatch(v.zone, zone)).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mappa */}
                    <div className="bg-white/5 rounded-3xl p-4 backdrop-blur-xl border border-white/10 mb-8">
                        <div className="flex items-center justify-between mb-3 px-2">
                            <span className="text-sm text-white/50">
                                {zoneFilteredVenues.length} locale
                                {zoneFilteredVenues.length !== 1 ? "i" : ""} in vista
                            </span>
                            <span className="text-xs text-white/30">© OpenStreetMap</span>
                        </div>
                        <LeafletMapVenues
                            venues={zoneFilteredVenues}
                            onVenueClick={(venue) => navigate(`/venue/${venue.id}`)}
                        />
                    </div>

                    {/* Barra di ricerca */}
                    <div className="mb-5">
                        <div className="relative">
                            <Search
                                size={17}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cerca per nome, zona, tipo di locale…"
                                className="w-full rounded-2xl bg-white/5 border border-white/10 py-3 pl-11 pr-11 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-orange-500/50 focus:bg-white/8 focus:ring-1 focus:ring-orange-500/30"
                            />
                            {hasSearch && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                    aria-label="Cancella ricerca"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        {hasSearch && (
                            <p className="mt-2 px-1 text-xs text-white/40">
                                {displayedVenues.length === 0
                                    ? "Nessun risultato per"
                                    : `${displayedVenues.length} risultat${displayedVenues.length === 1 ? "o" : "i"} per`}{" "}
                                <span className="text-orange-400 font-medium">"{searchQuery}"</span>
                            </p>
                        )}
                    </div>

                    {/* Grid card */}
                    {displayedVenues.length > 0 ? (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {displayedVenues.map((venue) => (
                                <VenueMapCard
                                    key={venue.id}
                                    venue={venue}
                                    searchQuery={searchQuery}
                                    onClick={() => navigate(`/venue/${venue.id}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <span className="mb-3 text-5xl">{hasSearch ? "🔍" : "🍕"}</span>
                            <p className="text-lg font-semibold text-white/70">
                                {hasSearch ? "Nessun locale trovato" : "Nessun locale per questa zona"}
                            </p>
                            <p className="mt-1 text-sm text-white/40">
                                {hasSearch
                                    ? "Prova con un termine diverso o cambia zona"
                                    : "Prova a selezionare un'altra zona dal filtro in alto"}
                            </p>
                            {hasSearch && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="mt-4 px-4 py-2 rounded-full text-sm bg-white/10 text-white/60 hover:bg-white/15 hover:text-white transition-all border border-white/10"
                                >
                                    Cancella ricerca
                                </button>
                            )}
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    );
}

// ─── Helper: evidenzia il testo cercato ──────────────────────────────────────
function highlightText(text, query) {
    if (!query.trim()) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = String(text).split(new RegExp(`(${escaped})`, "gi"));
    return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-orange-500/30 text-orange-200 rounded px-0.5 not-italic">
                {part}
            </mark>
        ) : (
            part
        )
    );
}

// ─── Card venue ───────────────────────────────────────────────────────────────
function VenueMapCard({ venue, onClick, searchQuery = "" }) {
    const url = directionsUrl(venue);

    return (
        <div className="group bg-white/5 rounded-2xl p-4 backdrop-blur-xl border border-white/10 hover:border-orange-500/40 transition-all duration-300">
            {/* Riga principale — click → pagina locale */}
            <div
                onClick={onClick}
                className="flex items-start gap-3 cursor-pointer"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 group-hover:bg-orange-500/25 transition-colors">
                    <MapPin size={18} className="text-orange-400" />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white truncate leading-tight">
                        {highlightText(venue.name, searchQuery)}
                    </h3>
                    <p className="text-xs text-white/50 truncate mt-0.5">
                        {highlightText(venue.zone, searchQuery)} · {venue.address}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                            <Star size={11} className="text-orange-400 fill-orange-400" />
                            <span className="text-xs text-white/70 font-medium">{venue.rating}</span>
                        </div>
                        <span className="text-white/30 text-xs">·</span>
                        <span className="text-xs text-white/50">{venue.price}</span>
                        <span className="text-white/30 text-xs">·</span>
                        <span className="text-xs text-white/50 truncate">
                            {highlightText(venue.tag, searchQuery)}
                        </span>
                    </div>
                </div>

                <NavIcon
                    size={15}
                    className="text-white/20 group-hover:text-orange-400 shrink-0 transition-colors mt-0.5"
                />
            </div>

            {/* Divider */}
            <div className="my-3 border-t border-white/5" />

            {/* Bottoni azione */}
            <div className="flex gap-2">
                <button
                    onClick={onClick}
                    className="flex-1 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 text-orange-300 text-xs font-semibold py-2 transition-colors"
                >
                    Apri locale
                </button>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-1.5 flex-1 rounded-xl bg-white/8 hover:bg-white/15 text-white/60 hover:text-white text-xs font-semibold py-2 transition-colors"
                >
                    <ExternalLink size={11} />
                    Indicazioni
                </a>
            </div>
        </div>
    );
}
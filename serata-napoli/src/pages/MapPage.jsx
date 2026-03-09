import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { MOCK_VENUES } from "../data/mockVenues";
import { MapPin, Star, Navigation as NavIcon, Filter } from "lucide-react";

export default function MapPage() {
    const navigate = useNavigate();
    const [selectedZone, setSelectedZone] = useState("Tutti");

    const zones = ["Tutti", "Centro", "Vomero", "Chiaia", "Posillipo", "Mergellina", "Fuorigrotta"];

    const filteredVenues = selectedZone === "Tutti"
        ? MOCK_VENUES
        : MOCK_VENUES.filter(venue => venue.zone === selectedZone);

    return (
        <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
            <Navigation />

            <section className="relative mt-20 z-20 px-4 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-white mb-4">Mappa dei Locali</h1>
                        <p className="text-lg text-white/70">Esplora tutti i locali di Napoli sulla mappa interattiva</p>
                    </div>

                    {/* Filtri zona */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Filter size={20} className="text-orange-300" />
                            <span className="text-white font-semibold">Filtra per zona:</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {zones.map((zone) => (
                                <button
                                    key={zone}
                                    onClick={() => setSelectedZone(zone)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        selectedZone === zone
                                            ? "bg-orange-500 text-white"
                                            : "bg-white/10 text-white/70 hover:bg-white/20"
                                    }`}
                                >
                                    {zone}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mappa */}
                    <div className="bg-white/5 rounded-3xl p-6 backdrop-blur-xl border border-white/10 mb-8">
                        <div className="aspect-[16/9] bg-gray-800 rounded-2xl relative overflow-hidden">
                            {/* Placeholder mappa - in produzione usare Google Maps o Mapbox */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin size={48} className="text-orange-300 mx-auto mb-4" />
                                    <p className="text-white/70">Mappa interattiva di Napoli</p>
                                    <p className="text-white/50 text-sm">I marker mostrano la posizione dei locali</p>
                                </div>
                            </div>

                            {/* Marker locali */}
                            {filteredVenues.slice(0, 8).map((venue, index) => (
                                <VenueMarker
                                    key={venue.id}
                                    venue={venue}
                                    position={getRandomPosition(index)}
                                    onClick={() => navigate(`/venue/${venue.slug}`)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Lista locali filtrati */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredVenues.map((venue) => (
                            <VenueMapCard
                                key={venue.id}
                                venue={venue}
                                onClick={() => navigate(`/venue/${venue.slug}`)}
                            />
                        ))}
                    </div>

                    <Footer />
                </div>
            </section>
        </main>
    );
}

function VenueMarker({ venue, position, onClick }) {
    return (
        <div
            onClick={onClick}
            className="absolute cursor-pointer group"
            style={{ left: position.x, top: position.y }}
        >
            <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 shadow-lg group-hover:bg-orange-400 transition-colors">
                    <MapPin size={16} className="text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                        {venue.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function VenueMapCard({ venue, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white/5 rounded-2xl p-4 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 shrink-0">
                    <MapPin size={20} className="text-orange-300" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white truncate">{venue.name}</h3>
                    <p className="text-sm text-white/60 truncate">{venue.zone} • {venue.address}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                            <Star size={12} className="text-orange-300 fill-orange-300" />
                            <span className="text-xs text-white/70">{venue.rating}</span>
                        </div>
                        <span className="text-xs text-white/50">•</span>
                        <span className="text-xs text-white/70">{venue.price}</span>
                    </div>
                </div>
                <NavIcon size={16} className="text-white/40 shrink-0" />
            </div>
        </div>
    );
}

// Funzione helper per posizioni casuali sulla mappa (placeholder)
function getRandomPosition(index) {
    const positions = [
        { x: '20%', y: '30%' },
        { x: '35%', y: '25%' },
        { x: '50%', y: '40%' },
        { x: '65%', y: '35%' },
        { x: '25%', y: '55%' },
        { x: '45%', y: '60%' },
        { x: '70%', y: '50%' },
        { x: '55%', y: '20%' },
    ];
    return positions[index] || { x: '50%', y: '50%' };
}
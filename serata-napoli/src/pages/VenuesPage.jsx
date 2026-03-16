import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { MOCK_VENUES } from "../data/mockVenues";
import { MapPin, Star, Clock } from "lucide-react";

export default function VenuesPage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />

            <section className="relative mt-20 z-20 px-4 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-white mb-4">Locali a Napoli</h1>
                        <p className="text-lg text-white/70">Esplora tutti i locali e trova il posto perfetto per la tua serata</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {MOCK_VENUES.map((venue) => (
                            <VenueCard key={venue.id} venue={venue} onClick={() => navigate(`/venue/${venue.slug}`)} />
                        ))}
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}

function VenueCard({ venue, onClick }) {
    return (
        <div
            onClick={onClick}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 cursor-pointer"
        >
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                {venue.highlight && (
                    <div className="absolute top-4 left-4 rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1">
                        <span className="text-xs font-bold text-orange-200">Top</span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-1">{venue.name}</h3>
                    <p className="text-sm text-white/70">{venue.zone} • {venue.price}</p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        <Star size={14} className="text-orange-300 fill-orange-300" />
                        <span className="text-sm font-semibold text-white">{venue.rating}</span>
                    </div>
                    <span className="text-sm text-white/60">({venue.reviews} recensioni)</span>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <MapPin size={14} />
                        <span>{venue.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <Clock size={14} />
                        <span>{venue.bestTime}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {venue.mood.slice(0, 2).map((mood) => (
                        <span
                            key={mood}
                            className="rounded-full bg-cyan-500/20 border border-cyan-500/30 px-3 py-1 text-xs font-medium text-cyan-200"
                        >
                            {mood}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { MOCK_EVENTS } from "../data/mockVenues";
import { Calendar, Clock, Euro, MapPin, Users } from "lucide-react";

export default function EventsPage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
            <Navigation />

            <section className="relative mt-20 z-20 px-4 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-white mb-4">Eventi a Napoli</h1>
                        <p className="text-lg text-white/70">Scopri tutti gli eventi speciali nei migliori locali della città</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {MOCK_EVENTS.map((event) => (
                            <EventCard key={event.id} event={event} onClick={() => navigate(`/event/${event.id}`)} />
                        ))}
                    </div>

                    <Footer />
                </div>
            </section>
        </main>
    );
}

function EventCard({ event, onClick }) {
    return (
        <div
            onClick={onClick}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 cursor-pointer"
        >
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="p-6">
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                    <p className="text-sm text-white/70 line-clamp-2">{event.description}</p>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <Calendar size={14} />
                        <span>{new Date(event.date).toLocaleDateString('it-IT')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <Clock size={14} />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <Euro size={14} />
                        <span>{event.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <Users size={14} />
                        <span>{event.capacity} posti</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {event.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1 text-xs font-medium text-orange-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
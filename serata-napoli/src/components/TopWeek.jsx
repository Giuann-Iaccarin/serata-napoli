import React from 'react';
import { Trophy, TrendingUp, Flame, Star, ChevronRight } from 'lucide-react';
import VenueCard from './VenueCard';

export default function TopWeek() {
    const topVenues = [
        {
            name: "Movida Club",
            zone: "Chiaia",
            mood: "casino",
            price: "€€",
            age: "22-25",
            energy: 5,
            social: 4,
            badges: ["DJ Set", "Indoor", "Ven-Sab"],
            highlight: true
        },
        {
            name: "Bohémien",
            zone: "Vomero",
            mood: "musica",
            price: "€",
            age: "24-27",
            energy: 3,
            social: 5,
            badges: ["Live Band", "Outdoor", "Unico"],
            highlight: true
        },
        {
            name: "Sottosopra",
            zone: "Centro Storico",
            mood: "alternativo",
            price: "€€",
            age: "23-26",
            energy: 3,
            social: 3,
            badges: ["Quiz Night", "Indoor", "Networking"],
            highlight: true
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Section Header */}
            <div className="relative mb-12">
                {/* Background Glow */}
                <div className="absolute -inset-x-4 -inset-y-8 bg-linear-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 blur-3xl rounded-3xl"></div>

                <div className="relative bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-orange-500/30 rounded-3xl p-8 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <Trophy size={48} className="text-orange-400 fill-orange-400" />
                                <div className="absolute inset-0 blur-xl bg-orange-400/50 animate-pulse"></div>
                            </div>
                            <div>
                                <h2 className="text-5xl font-black bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                                    Top della settimana
                                </h2>
                                <p className="text-white/60 font-medium mt-1">
                                    I locali più hot di Napoli in questo momento 🔥
                                </p>
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="flex flex-wrap gap-6 mt-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={20} className="text-emerald-400" />
                                <span className="text-white/80 font-semibold">+247% visite</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Flame size={20} className="text-orange-400" />
                                <span className="text-white/80 font-semibold">Alta richiesta</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-white/80 font-semibold">Rating 4.8+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Venues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {topVenues.map((venue, index) => (
                    <div
                        key={index}
                        className="relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Rank Badge */}
                        <div className="absolute -top-3 -left-3 z-30 w-12 h-12 bg-linear-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl shadow-orange-500/50 border-4 border-slate-900">
                            {index + 1}
                        </div>
                        <VenueCard venue={venue} />
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center">
                <button className="group relative px-8 py-4 bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                        Vedi tutti i top locali
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>
        </div>
    );
}

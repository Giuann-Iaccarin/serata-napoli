import React, { useState } from 'react';
import VenueCard from './VenueCard';
import { SlidersHorizontal, Sparkles, TrendingUp } from 'lucide-react';

export default function ResultsGrid() {
    const [sortBy, setSortBy] = useState('relevance');

    // Mock data - sostituisci con dati reali
    const venues = [
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
            badges: ["Quiz Night", "Indoor", "Networking"]
        },
        {
            name: "La Terrazza",
            zone: "Posillipo",
            mood: "tranquillo",
            price: "€€€",
            age: "24-27",
            energy: 2,
            social: 3,
            badges: ["Outdoor", "Vista mare", "Coppie"]
        },
        {
            name: "Ex Fadda",
            zone: "Vomero",
            mood: "casino",
            price: "€€",
            age: "20-24",
            energy: 4,
            social: 5,
            badges: ["DJ Set", "Indoor/Outdoor", "Gruppi"]
        },
        {
            name: "Kestè",
            zone: "Chiaia",
            mood: "food",
            price: "€",
            age: "22-26",
            energy: 3,
            social: 4,
            badges: ["Street Food", "Outdoor", "Esperienza unica"]
        },
        {
            name: "Lanificio 25",
            zone: "Bagnoli",
            mood: "musica",
            price: "€€",
            age: "23-27",
            energy: 4,
            social: 4,
            badges: ["Concerti", "Indoor", "Single"]
        },
        {
            name: "Nabilah",
            zone: "Chiaia",
            mood: "tranquillo",
            price: "€€",
            age: "25-28",
            energy: 2,
            social: 3,
            badges: ["Cocktail bar", "Indoor", "Primo appuntamento"]
        },
        {
            name: "Doppiozeroo",
            zone: "Centro",
            mood: "alternativo",
            price: "€",
            age: "21-25",
            energy: 3,
            social: 5,
            badges: ["Arte", "Eventi speciali", "Networking"]
        }
    ];

    const sortOptions = [
        { value: 'relevance', label: 'Più rilevanti', icon: Sparkles },
        { value: 'popular', label: 'Più popolari', icon: TrendingUp },
        { value: 'price-low', label: 'Prezzo: basso', icon: SlidersHorizontal },
        { value: 'price-high', label: 'Prezzo: alto', icon: SlidersHorizontal }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header with Sort Options */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-4xl font-black text-white mb-2">
                        Risultati per te
                    </h2>
                    <p className="text-white/60 font-medium">
                        {venues.length} locali trovati
                    </p>
                </div>

                {/* Sort Dropdown */}
                <div className="relative group">
                    <button className="flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-semibold transition-all duration-300">
                        <SlidersHorizontal size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span>Ordina per: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                    </button>

                    {/* Dropdown Menu - puoi implementare la logica di apertura/chiusura */}
                    <div className="hidden group-hover:block absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-30">
                        {sortOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setSortBy(option.value)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${sortBy === option.value
                                        ? 'bg-linear-to-r from-orange-500/20 to-pink-500/20 text-orange-400 border-l-4 border-orange-500'
                                        : 'text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                                        }`}
                                >
                                    <Icon size={16} />
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue, index) => (
                    <div
                        key={index}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <VenueCard venue={venue} />
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-12">
                <button className="group relative px-8 py-4 bg-linear-to-r from-white/5 to-white/10 hover:from-orange-500/20 hover:to-pink-500/20 border border-white/10 hover:border-orange-500/50 rounded-2xl text-white font-bold transition-all duration-300 transform hover:scale-105 overflow-hidden">
                    <span className="relative z-10">Carica altri locali</span>
                    <div className="absolute inset-0 bg-linear-to-r from-orange-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>
        </div>
    );
}
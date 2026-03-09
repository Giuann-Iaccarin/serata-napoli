import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin, Search, Star, Users, TrendingUp,
    ArrowRight, Filter, Grid, List
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for cities - in a real app this would come from an API
const CITIES_DATA = [
    {
        id: 'napoli-centro',
        name: 'Centro Storico',
        description: 'Il cuore pulsante di Napoli con storia, cultura e locali tradizionali',
        image: '/api/placeholder/400/300',
        venueCount: 247,
        avgRating: 4.6,
        trending: true,
        categories: ['Tradizionale', 'Storico', 'Turistico'],
        highlights: ['Piazza Garibaldi', 'Via Toledo', 'Decumani']
    },
    {
        id: 'chiaia',
        name: 'Chiaia',
        description: 'Quartiere elegante con locali esclusivi e vista sul golfo',
        image: '/api/placeholder/400/300',
        venueCount: 89,
        avgRating: 4.8,
        trending: false,
        categories: ['Elegante', 'Vista mare', 'Esclusivo'],
        highlights: ['Lungomare', 'Villa Comunale', 'Piazza Vittoria']
    },
    {
        id: 'vomero',
        name: 'Vomero',
        description: 'Quartiere residenziale con locali moderni e vista panoramica',
        image: '/api/placeholder/400/300',
        venueCount: 156,
        avgRating: 4.4,
        trending: true,
        categories: ['Moderno', 'Panoramico', 'Famigliare'],
        highlights: ['Certosa di San Martino', 'Villa Floridiana', 'Castel Sant\'Elmo']
    },
    {
        id: 'posillipo',
        name: 'Posillipo',
        description: 'Zona esclusiva con ristoranti di pesce e vista mozzafiato',
        image: '/api/placeholder/400/300',
        venueCount: 67,
        avgRating: 4.7,
        trending: false,
        categories: ['Pesce', 'Vista mare', 'Romantico'],
        highlights: ['Marechiaro', 'Pausilypon', 'Coroglio']
    },
    {
        id: 'arenella',
        name: 'Arenella',
        description: 'Quartiere universitario con locali giovani e alternativi',
        image: '/api/placeholder/400/300',
        venueCount: 94,
        avgRating: 4.2,
        trending: true,
        categories: ['Giovane', 'Alternativo', 'Studentesco'],
        highlights: ['Università', 'Parco Virgiliano', 'Rione Alto']
    },
    {
        id: 'secondigliano',
        name: 'Secondigliano',
        description: 'Zona in crescita con locali etnici e cucina fusion',
        image: '/api/placeholder/400/300',
        venueCount: 43,
        avgRating: 4.1,
        trending: false,
        categories: ['Fusion', 'Etnico', 'Nuovo'],
        highlights: ['Scampia', 'Miano', 'Pianura']
    }
];

export default function Cities() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('trending');

    const filteredCities = CITIES_DATA
        .filter(city =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.avgRating - a.avgRating;
                case 'venues':
                    return b.venueCount - a.venueCount;
                case 'trending':
                default:
                    return b.trending ? 1 : -1;
            }
        });

    const handleCityClick = (cityId) => {
        navigate(`/search?city=${cityId}`);
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-6xl">

                    {/* Hero */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <MapPin className="w-4 h-4" />
                            Zone di Napoli
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Esplora le zone di Napoli
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Scopri i migliori locali in ogni quartiere della città
                        </p>

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <div className="relative max-w-md w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    placeholder="Cerca una zona..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-12 py-4 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none"
                                />
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white focus:border-orange-400/50 focus:outline-none"
                            >
                                <option value="trending">Più popolari</option>
                                <option value="rating">Miglior valutazione</option>
                                <option value="venues">Più locali</option>
                            </select>

                            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-white/60 hover:text-white'
                                        }`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-white/60 hover:text-white'
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cities Grid/List */}
                    <div className={`grid gap-6 ${viewMode === 'grid'
                            ? 'md:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1'
                        }`}>
                        {filteredCities.map((city) => (
                            <div
                                key={city.id}
                                onClick={() => handleCityClick(city.id)}
                                className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-orange-400/30 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className={`relative overflow-hidden rounded-t-3xl ${viewMode === 'grid' ? 'h-48' : 'h-32'
                                    }`}>
                                    <div className="absolute inset-0 bg-linear-to-br from-orange-500/20 to-pink-500/20" />
                                    <div className="absolute inset-0 bg-black/40" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-white">{city.name}</h3>
                                            {city.trending && (
                                                <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/30 rounded-full px-2 py-1">
                                                    <TrendingUp className="w-3 h-3 text-orange-400" />
                                                    <span className="text-xs text-orange-300 font-medium">Trending</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="text-white/70 mb-4 line-clamp-2">{city.description}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-white font-medium">{city.avgRating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4 text-orange-400" />
                                                <span className="text-white/70 text-sm">{city.venueCount} locali</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {city.categories.slice(0, 3).map((category, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-white/60">
                                            <span className="font-medium">Highlights:</span> {city.highlights.slice(0, 2).join(', ')}
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No results */}
                    {filteredCities.length === 0 && (
                        <div className="text-center py-12">
                            <MapPin className="w-16 h-16 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Nessuna zona trovata
                            </h3>
                            <p className="text-white/60">
                                Prova a modificare i termini di ricerca
                            </p>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="mt-16 grid gap-6 md:grid-cols-3">
                        <div className="text-center rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-orange-400 mb-2">
                                {CITIES_DATA.reduce((sum, city) => sum + city.venueCount, 0)}
                            </div>
                            <div className="text-white/70">Locali totali</div>
                        </div>
                        <div className="text-center rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-orange-400 mb-2">
                                {CITIES_DATA.length}
                            </div>
                            <div className="text-white/70">Zone coperte</div>
                        </div>
                        <div className="text-center rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-orange-400 mb-2">
                                {(CITIES_DATA.reduce((sum, city) => sum + city.avgRating, 0) / CITIES_DATA.length).toFixed(1)}
                            </div>
                            <div className="text-white/70">Valutazione media</div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heart, MapPin, Star, Clock, Users, Euro,
    Search, Filter, Grid, List, X, ChevronDown
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

// Mock data for favorites
const FAVORITE_VENUES = [
    {
        id: 1,
        name: "Rooftop 45",
        category: "Rooftop Bar",
        location: "Vomero",
        rating: 4.8,
        price: "€€€",
        distance: "2.1 km",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80",
        tags: ["Cocktail", "Vista panoramica", "Musica lounge"],
        addedDate: "2024-01-15",
        notes: "Perfetto per aperitivo al tramonto"
    },
    {
        id: 2,
        name: "Bar del Porto",
        category: "Cocktail Bar",
        location: "Centro Storico",
        rating: 4.6,
        price: "€€",
        distance: "1.8 km",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
        tags: ["Cocktail", "Live Music", "Storico"],
        addedDate: "2024-01-10",
        notes: "Ottima selezione di whisky"
    },
    {
        id: 3,
        name: "Discoteca Eden",
        category: "Discoteca",
        location: "Fuorigrotta",
        rating: 4.4,
        price: "€€€",
        distance: "3.5 km",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
        tags: ["Dancing", "DJ Set", "Grande pista"],
        addedDate: "2024-01-08",
        notes: "Ideale per serate movimentate"
    },
    {
        id: 4,
        name: "Caffè Gambrinus",
        category: "Caffè Storico",
        location: "Centro",
        rating: 4.7,
        price: "€€",
        distance: "0.8 km",
        image: "https://images.unsplash.com/photo-1559054663-8e03873cc45d?auto=format&fit=crop&w=400&q=80",
        tags: ["Storico", "Caffè", "Pasticceria"],
        addedDate: "2024-01-05",
        notes: "Perfetto per colazione o merenda"
    }
];

const SORT_OPTIONS = [
    { value: 'name', label: 'Nome' },
    { value: 'rating', label: 'Valutazione' },
    { value: 'distance', label: 'Distanza' },
    { value: 'date', label: 'Data aggiunta' }
];

const VIEW_MODES = [
    { value: 'grid', icon: Grid, label: 'Griglia' },
    { value: 'list', icon: List, label: 'Lista' }
];

export default function Favorites() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(FAVORITE_VENUES);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);

    const filteredFavorites = favorites
        .filter(venue =>
            venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'rating':
                    return b.rating - a.rating;
                case 'distance':
                    return parseFloat(a.distance) - parseFloat(b.distance);
                case 'date':
                    return new Date(b.addedDate) - new Date(a.addedDate);
                default:
                    return 0;
            }
        });

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(venue => venue.id !== id));
    };

    const VenueCard = ({ venue }) => (
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-orange-400/30 hover:bg-orange-500/5 transition-all duration-300">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Remove button */}
                <button
                    onClick={() => removeFavorite(venue.id)}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500/80"
                >
                    <X size={16} />
                </button>

                {/* Rating */}
                <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-sm text-white">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    {venue.rating}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-1">{venue.name}</h3>
                    <p className="text-white/60 text-sm">{venue.category} • {venue.location}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {venue.distance}
                        </div>
                        <div className="flex items-center gap-1">
                            <Euro size={14} />
                            {venue.price}
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {venue.tags.slice(0, 2).map((tag, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                        >
                            {tag}
                        </span>
                    ))}
                    {venue.tags.length > 2 && (
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                            +{venue.tags.length - 2}
                        </span>
                    )}
                </div>

                {/* Notes */}
                {venue.notes && (
                    <p className="text-sm text-white/70 italic mb-4">"{venue.notes}"</p>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(`/venue/${venue.id}`)}
                        className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-colors"
                    >
                        Vedi dettagli
                    </button>
                    <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                        <Heart size={18} className="fill-red-400 text-red-400" />
                    </button>
                </div>
            </div>
        </div>
    );

    const VenueListItem = ({ venue }) => (
        <div className="flex gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-orange-400/30 hover:bg-orange-500/5 transition-all duration-300">
            {/* Image */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                <img
                    src={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">{venue.name}</h3>
                        <p className="text-white/60 text-sm">{venue.category} • {venue.location}</p>
                    </div>
                    <button
                        onClick={() => removeFavorite(venue.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="flex items-center gap-6 mb-3">
                    <div className="flex items-center gap-1 text-sm text-white/60">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        {venue.rating}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-white/60">
                        <MapPin size={14} />
                        {venue.distance}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-white/60">
                        <Euro size={14} />
                        {venue.price}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {venue.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {venue.notes && (
                    <p className="text-sm text-white/70 italic">"{venue.notes}"</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 shrink-0">
                <button
                    onClick={() => navigate(`/venue/${venue.id}`)}
                    className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-colors"
                >
                    Vedi dettagli
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Heart size={18} className="fill-red-400 text-red-400" />
                </button>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <UserHeader />

            <section className="relative px-4 py-12">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="w-8 h-8 text-red-400 fill-red-400" />
                            <h1 className="text-3xl font-black text-white">I miei preferiti</h1>
                        </div>
                        <p className="text-white/60">
                            {favorites.length} locali salvati • Scopri i tuoi posti preferiti a Napoli
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                placeholder="Cerca nei preferiti..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                            />
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex items-center gap-3">

                            {/* Sort */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-white focus:border-orange-400/50 focus:outline-none"
                                >
                                    {SORT_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value} className="bg-[#050816]">
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
                            </div>

                            {/* View Mode */}
                            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
                                {VIEW_MODES.map(mode => (
                                    <button
                                        key={mode.value}
                                        onClick={() => setViewMode(mode.value)}
                                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${viewMode === mode.value
                                            ? 'bg-orange-500 text-white'
                                            : 'text-white/70 hover:text-white'
                                            }`}
                                    >
                                        <mode.icon size={16} />
                                        <span className="hidden sm:inline">{mode.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${showFilters
                                    ? 'bg-orange-500 text-white'
                                    : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                                    }`}
                            >
                                <Filter size={16} />
                                <span className="hidden sm:inline">Filtri</span>
                            </button>
                        </div>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <h3 className="text-lg font-bold text-white mb-4">Filtri avanzati</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Categoria</label>
                                    <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none">
                                        <option value="">Tutte le categorie</option>
                                        <option value="bar">Bar</option>
                                        <option value="discoteca">Discoteca</option>
                                        <option value="ristorante">Ristorante</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Quartiere</label>
                                    <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none">
                                        <option value="">Tutti i quartieri</option>
                                        <option value="centro">Centro</option>
                                        <option value="vomero">Vomero</option>
                                        <option value="chiaia">Chiaia</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Prezzo</label>
                                    <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none">
                                        <option value="">Tutti i prezzi</option>
                                        <option value="€">€</option>
                                        <option value="€€">€€</option>
                                        <option value="€€€">€€€</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    {filteredFavorites.length > 0 ? (
                        <div className={`grid gap-6 ${viewMode === 'grid'
                            ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                            : 'grid-cols-1'
                            }`}>
                            {filteredFavorites.map(venue =>
                                viewMode === 'grid' ? (
                                    <VenueCard key={venue.id} venue={venue} />
                                ) : (
                                    <VenueListItem key={venue.id} venue={venue} />
                                )
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">
                                {searchQuery ? 'Nessun risultato trovato' : 'Nessun preferito'}
                            </h3>
                            <p className="text-white/60 mb-6">
                                {searchQuery
                                    ? 'Prova con termini di ricerca diversi'
                                    : 'Inizia a salvare i tuoi locali preferiti'
                                }
                            </p>
                            {!searchQuery && (
                                <button
                                    onClick={() => navigate('/')}
                                    className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors"
                                >
                                    Esplora locali
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
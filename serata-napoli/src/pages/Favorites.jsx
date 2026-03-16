/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heart, MapPin, Star, Euro,
    Search, Grid, List, X, ChevronDown, Lock, Crown
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

const FAVORITE_VENUES = [
    {
        id: 1,
        name: 'Rooftop 45',
        category: 'Rooftop Bar',
        location: 'Vomero',
        rating: 4.8,
        price: '€€€',
        distance: '2.1 km',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80',
        tags: ['Cocktail', 'Vista panoramica', 'Musica lounge'],
        addedDate: '2024-01-15',
        notes: 'Perfetto per aperitivo al tramonto'
    },
    {
        id: 2,
        name: 'Bar del Porto',
        category: 'Cocktail Bar',
        location: 'Centro Storico',
        rating: 4.6,
        price: '€€',
        distance: '1.8 km',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
        tags: ['Cocktail', 'Live Music', 'Storico'],
        addedDate: '2024-01-10',
        notes: 'Ottima selezione di whisky'
    },
    {
        id: 3,
        name: 'Discoteca Eden',
        category: 'Discoteca',
        location: 'Fuorigrotta',
        rating: 4.4,
        price: '€€€',
        distance: '3.5 km',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
        tags: ['Dancing', 'DJ Set', 'Grande pista'],
        addedDate: '2024-01-08',
        notes: 'Ideale per serate movimentate'
    },
    {
        id: 4,
        name: 'Caffè Gambrinus',
        category: 'Caffè Storico',
        location: 'Centro',
        rating: 4.7,
        price: '€€',
        distance: '0.8 km',
        image: 'https://images.unsplash.com/photo-1559054663-8e03873cc45d?auto=format&fit=crop&w=400&q=80',
        tags: ['Storico', 'Caffè', 'Pasticceria'],
        addedDate: '2024-01-05',
        notes: 'Perfetto per colazione o merenda'
    },
    {
        id: 5,
        name: 'Lido Marechiaro',
        category: 'Beach Bar',
        location: 'Posillipo',
        rating: 4.5,
        price: '€€€',
        distance: '4.2 km',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        tags: ['Vista mare', 'Aperitivo', 'Tramonto'],
        addedDate: '2024-01-03',
        notes: 'Tramonto mozzafiato'
    },
    {
        id: 6,
        name: 'Jazz Club Trentuno',
        category: 'Live Music',
        location: 'Chiaia',
        rating: 4.9,
        price: '€€€',
        distance: '1.2 km',
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=400&q=80',
        tags: ['Jazz', 'Live', 'Cocktail'],
        addedDate: '2024-01-01',
        notes: 'Il meglio del jazz napoletano'
    }
];

const MAX_FREE = 5; // Free plan limit
const USER_PLAN = 'free'; // 'free' | 'premium'

const SORT_OPTIONS = [
    { value: 'date', label: 'Data aggiunta' },
    { value: 'name', label: 'Nome' },
    { value: 'rating', label: 'Valutazione' },
    { value: 'distance', label: 'Distanza' },
];

export default function Favorites() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(FAVORITE_VENUES);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [viewMode, setViewMode] = useState('grid');

    const isPremium = USER_PLAN === 'premium';

    const filtered = favorites
        .filter(v =>
            v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
            return new Date(b.addedDate) - new Date(a.addedDate);
        });

    // Venues the user can actually see
    const visibleFavorites = isPremium ? filtered : filtered.slice(0, MAX_FREE);
    // Locked venues (free plan overflow)
    const lockedFavorites = isPremium ? [] : filtered.slice(MAX_FREE);

    const removeFavorite = id => setFavorites(prev => prev.filter(v => v.id !== id));

    // ── Card (Grid) ────────────────────────────────────────────────────────────
    const VenueCard = ({ venue, locked = false }) => (
        <div className={`group relative overflow-hidden rounded-3xl border bg-white/5 backdrop-blur-xl transition-all duration-300
            ${locked ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-orange-400/30 hover:bg-orange-500/5'}`}>
            {/* Image */}
            <div className="relative aspect-4/3 overflow-hidden">
                <img src={venue.image} alt={venue.name}
                    className={`h-full w-full object-cover transition-transform duration-300 ${locked ? '' : 'group-hover:scale-110'}`} />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="text-center">
                            <Lock size={28} className="mx-auto mb-2 text-orange-400" />
                            <p className="text-sm font-semibold text-white">Piano Premium</p>
                        </div>
                    </div>
                )}

                {!locked && (
                    <button onClick={() => removeFavorite(venue.id)}
                        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500/80">
                        <X size={16} />
                    </button>
                )}

                <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-sm text-white">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" /> {venue.rating}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-3">
                    <h3 className="mb-1 text-xl font-bold text-white">{venue.name}</h3>
                    <p className="text-sm text-white/60">{venue.category} • {venue.location}</p>
                </div>
                <div className="mb-4 flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1"><MapPin size={14} /> {venue.distance}</div>
                    <div className="flex items-center gap-1"><Euro size={14} /> {venue.price}</div>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                    {venue.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{tag}</span>
                    ))}
                    {venue.tags.length > 2 && (
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">+{venue.tags.length - 2}</span>
                    )}
                </div>
                {venue.notes && <p className="mb-4 text-sm italic text-white/70">"{venue.notes}"</p>}

                <div className="flex gap-3">
                    {locked ? (
                        <button onClick={() => navigate('/premium')}
                            className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-colors">
                            Sblocca con Premium
                        </button>
                    ) : (
                        <>
                            <button onClick={() => navigate(`/venue/${venue.id}`)}
                                className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-colors">
                                Vedi dettagli
                            </button>
                            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                                <Heart size={18} className="fill-red-400 text-red-400" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    // ── List Item ──────────────────────────────────────────────────────────────
    const VenueListItem = ({ venue, locked = false }) => (
        <div className={`flex gap-6 rounded-3xl border bg-white/5 p-6 backdrop-blur-xl transition-all duration-300
            ${locked ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-orange-400/30 hover:bg-orange-500/5'}`}>
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                <img src={venue.image} alt={venue.name} className="h-full w-full object-cover" />
                {locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <Lock size={20} className="text-orange-400" />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="mb-2 flex items-start justify-between">
                    <div>
                        <h3 className="mb-1 text-xl font-bold text-white">{venue.name}</h3>
                        <p className="text-sm text-white/60">{venue.category} • {venue.location}</p>
                    </div>
                    {!locked && (
                        <button onClick={() => removeFavorite(venue.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                            <X size={16} />
                        </button>
                    )}
                </div>
                <div className="mb-3 flex items-center gap-5 text-sm text-white/60">
                    <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400" /> {venue.rating}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {venue.distance}</span>
                    <span className="flex items-center gap-1"><Euro size={14} /> {venue.price}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {venue.tags.map((tag, i) => (
                        <span key={i} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
                {locked ? (
                    <button onClick={() => navigate('/premium')}
                        className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-colors">
                        Premium
                    </button>
                ) : (
                    <>
                        <button onClick={() => navigate(`/venue/${venue.id}`)}
                            className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-colors">
                            Dettagli
                        </button>
                        <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                            <Heart size={18} className="fill-red-400 text-red-400" />
                        </button>
                    </>
                )}
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
                        <div className="mb-4 flex items-center gap-3">
                            <Heart className="h-8 w-8 fill-red-400 text-red-400" />
                            <h1 className="text-3xl font-black text-white">I miei preferiti</h1>
                        </div>
                        <p className="text-white/60">
                            {favorites.length} locali salvati
                            {!isPremium && (
                                <span className="ml-2 text-orange-400">• {Math.min(favorites.length, MAX_FREE)}/{MAX_FREE} visibili con Free</span>
                            )}
                        </p>
                    </div>

                    {/* Free plan banner */}
                    {!isPremium && (
                        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-orange-400/30 bg-orange-500/10 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <Crown size={20} className="text-orange-400" />
                                <p className="text-sm text-white/80">
                                    Con il piano <span className="font-bold text-orange-300">Free</span> puoi salvare fino a <span className="font-bold text-white">{MAX_FREE} preferiti</span>.
                                    Passa a Premium per salvarli tutti!
                                </p>
                            </div>
                            <button onClick={() => navigate('/premium')}
                                className="shrink-0 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400 transition-colors">
                                Upgrade
                            </button>
                        </div>
                    )}

                    {/* Controls */}
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                            <input type="text" placeholder="Cerca nei preferiti…" value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none" />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                                    className="appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-white focus:border-orange-400/50 focus:outline-none">
                                    {SORT_OPTIONS.map(o => (
                                        <option key={o.value} value={o.value} className="bg-[#050816]">{o.label}</option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                            </div>

                            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
                                {[{ v: 'grid', I: Grid }, { v: 'list', I: List }].map(({ v, I }) => (
                                    <button key={v} onClick={() => setViewMode(v)}
                                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                                            ${viewMode === v ? 'bg-orange-500 text-white' : 'text-white/70 hover:text-white'}`}>
                                        <I size={16} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    {filtered.length > 0 ? (
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {visibleFavorites.map(venue =>
                                viewMode === 'grid'
                                    ? <VenueCard key={venue.id} venue={venue} />
                                    : <VenueListItem key={venue.id} venue={venue} />
                            )}
                            {lockedFavorites.map(venue =>
                                viewMode === 'grid'
                                    ? <VenueCard key={venue.id} venue={venue} locked />
                                    : <VenueListItem key={venue.id} venue={venue} locked />
                            )}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Heart className="mx-auto mb-4 h-16 w-16 text-white/20" />
                            <h3 className="mb-2 text-xl font-bold text-white">
                                {searchQuery ? 'Nessun risultato trovato' : 'Nessun preferito'}
                            </h3>
                            <p className="mb-6 text-white/60">
                                {searchQuery ? 'Prova con termini diversi' : 'Inizia a salvare i tuoi locali preferiti'}
                            </p>
                            {!searchQuery && (
                                <button onClick={() => navigate('/')}
                                    className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors">
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
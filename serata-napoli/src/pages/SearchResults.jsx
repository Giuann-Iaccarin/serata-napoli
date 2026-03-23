/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Search, MapPin, Star, Clock, Euro, Filter,
    SlidersHorizontal, X, ArrowUpDown
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { MOCK_VENUES } from '../data/mockVenues';

// Mock search results
const SEARCH_RESULTS = [
    ...MOCK_VENUES,
    {
        id: 999,
        name: "Nuovo Locale Trovato",
        category: "Cocktail Bar",
        location: "Centro Storico",
        rating: 4.2,
        price: "€€",
        distance: "1.2 km",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80",
        tags: ["Nuovo", "Cocktail", "Live Music"],
        description: "Nuovo locale appena aperto con cocktail innovativi"
    }
];

const SORT_OPTIONS = [
    { value: 'relevance', label: 'Rilevanza' },
    { value: 'rating', label: 'Valutazione' },
    { value: 'distance', label: 'Distanza' },
    { value: 'price-low', label: 'Prezzo crescente' },
    { value: 'price-high', label: 'Prezzo decrescente' }
];

const SEARCH_RESULTS_STATE_KEY = 'serataNapoli.searchResultsState';

function loadSearchResultsState() {
    if (typeof window === 'undefined') return {};

    try {
        const raw = localStorage.getItem(SEARCH_RESULTS_STATE_KEY);
        if (!raw) return {};
        return JSON.parse(raw);
    } catch (error) {
        console.error('Error loading search results state', error);
        return {};
    }
}

const FILTER_CATEGORIES = [
    { id: 'category', label: 'Categoria', options: ['Bar', 'Ristorante', 'Discoteca', 'Rooftop', 'Lounge'] },
    { id: 'price', label: 'Prezzo', options: ['€', '€€', '€€€'] },
    { id: 'rating', label: 'Valutazione minima', options: ['3+', '4+', '4.5+'] },
    { id: 'location', label: 'Zona', options: ['Centro', 'Vomero', 'Chiaia', 'Fuorigrotta'] }
];

export default function SearchResults() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const persistedState = loadSearchResultsState();

    const [results, setResults] = useState(SEARCH_RESULTS);
    const [sortBy, setSortBy] = useState(persistedState.sortBy || 'relevance');
    const [activeFilters, setActiveFilters] = useState(persistedState.activeFilters || {});
    const [showFilters, setShowFilters] = useState(false);
    const [searchInput, setSearchInput] = useState(persistedState.searchInput || query || '');

    useEffect(() => {
        try {
            localStorage.setItem(SEARCH_RESULTS_STATE_KEY, JSON.stringify({
                searchInput,
                activeFilters,
                sortBy,
            }));
        } catch (error) {
            console.error('Error saving search results state', error);
        }
    }, [searchInput, activeFilters, sortBy]);

    const filteredResults = useMemo(() => {
        let filtered = results.filter(venue => {
            // Text search
            const searchTerm = searchInput.toLowerCase();
            const matchesSearch = !searchTerm ||
                venue.name.toLowerCase().includes(searchTerm) ||
                venue.category.toLowerCase().includes(searchTerm) ||
                venue.location.toLowerCase().includes(searchTerm) ||
                venue.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            // Category filter
            const categoryFilter = activeFilters.category;
            const matchesCategory = !categoryFilter || venue.category.includes(categoryFilter);

            // Price filter
            const priceFilter = activeFilters.price;
            const matchesPrice = !priceFilter || venue.price.includes(priceFilter);

            // Rating filter
            const ratingFilter = activeFilters.rating;
            const matchesRating = !ratingFilter ||
                venue.rating >= parseFloat(ratingFilter.replace('+', ''));

            // Location filter
            const locationFilter = activeFilters.location;
            const matchesLocation = !locationFilter || venue.location.includes(locationFilter);

            return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesLocation;
        });

        // Sort results
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'distance':
                    return parseFloat(a.distance) - parseFloat(b.distance);
                case 'price-low':
                    return a.price.length - b.price.length;
                case 'price-high':
                    return b.price.length - a.price.length;
                case 'relevance':
                default:
                    return b.rating - a.rating; // Default to rating for relevance
            }
        });

        return filtered;
    }, [results, searchInput, activeFilters, sortBy]);

    const handleFilterChange = (category, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [category]: prev[category] === value ? undefined : value
        }));
    };

    const clearFilters = () => {
        setActiveFilters({});
    };

    const activeFiltersCount = Object.values(activeFilters).filter(Boolean).length;

    const VenueCard = ({ venue }) => (
        <div
            onClick={() => navigate(`/venue/${venue.id}`)}
            className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-orange-400/30 hover:bg-orange-500/5 transition-all duration-300 overflow-hidden"
        >
            <div className="aspect-16/10 overflow-hidden">
                <img
                    src={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-sm text-white">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    {venue.rating}
                </div>
            </div>

            <div className="p-6">
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">
                        {venue.name}
                    </h3>
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

                <div className="flex flex-wrap gap-2 mb-4">
                    {venue.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {venue.description && (
                    <p className="text-sm text-white/70 line-clamp-2">{venue.description}</p>
                )}
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-7xl">

                    {/* Search Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Search className="w-8 h-8 text-orange-400" />
                            <div>
                                <h1 className="text-3xl font-black text-white">
                                    {query ? `Risultati per "${query}"` : 'Risultati ricerca'}
                                </h1>
                                <p className="text-white/60">
                                    {filteredResults.length} locali trovati
                                    {activeFiltersCount > 0 && ` • ${activeFiltersCount} filtri attivi`}
                                </p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Cerca locali, categorie, zone..."
                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">

                        {/* Sort */}
                        <div className="flex items-center gap-3">
                            <ArrowUpDown size={18} className="text-white/60" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-orange-400/50 focus:outline-none"
                            >
                                {SORT_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value} className="bg-[#050816]">
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filters Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${showFilters || activeFiltersCount > 0
                                ? 'bg-orange-500 text-white'
                                : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                                }`}
                        >
                            <SlidersHorizontal size={16} />
                            Filtri
                            {activeFiltersCount > 0 && (
                                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Filtri</h3>
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-orange-400 hover:text-orange-300"
                                    >
                                        Cancella tutti
                                    </button>
                                )}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {FILTER_CATEGORIES.map(category => (
                                    <div key={category.id}>
                                        <h4 className="font-semibold text-white mb-3">{category.label}</h4>
                                        <div className="space-y-2">
                                            {category.options.map(option => (
                                                <label key={option} className="flex items-center gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={category.id}
                                                        checked={activeFilters[category.id] === option}
                                                        onChange={() => handleFilterChange(category.id, option)}
                                                        className="text-orange-500 focus:ring-orange-500"
                                                    />
                                                    <span className="text-white/80">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Results Grid */}
                    {filteredResults.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredResults.map(venue => (
                                <VenueCard key={venue.id} venue={venue} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Nessun risultato trovato</h3>
                            <p className="text-white/60 mb-6">
                                Prova a modificare i filtri o i termini di ricerca
                            </p>
                            <button
                                onClick={() => {
                                    setSearchInput('');
                                    setActiveFilters({});
                                }}
                                className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors"
                            >
                                Cancella filtri
                            </button>
                        </div>
                    )}

                    {/* Load More */}
                    {filteredResults.length > 0 && filteredResults.length >= 12 && (
                        <div className="text-center mt-12">
                            <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-white hover:bg-white/10 transition-colors">
                                Carica altri risultati
                            </button>
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    );
}
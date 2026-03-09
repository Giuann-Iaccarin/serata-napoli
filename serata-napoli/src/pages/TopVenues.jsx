import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Crown, Star, TrendingUp, MapPin, Euro, Clock,
    Heart, Share2, Filter, Award, Flame, Sparkles
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock top venues data
const TOP_VENUES = [
    {
        id: 1,
        name: "Rooftop 45",
        category: "Rooftop Bar",
        location: "Vomero",
        rating: 4.9,
        reviews: 234,
        price: "€€€",
        distance: "2.1 km",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80",
        tags: ["Vista panoramica", "Cocktail", "Musica lounge"],
        description: "Il rooftop più esclusivo di Napoli con vista mozzafiato sul golfo",
        isTopRated: true,
        trending: true,
        badge: "Miglior Vista"
    },
    {
        id: 2,
        name: "Bar del Porto",
        category: "Cocktail Bar",
        location: "Centro Storico",
        rating: 4.8,
        reviews: 189,
        price: "€€",
        distance: "1.8 km",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
        tags: ["Cocktail", "Live Music", "Storico"],
        description: "Cocktail bar storico con oltre 100 anni di tradizione",
        isTopRated: true,
        trending: false,
        badge: "Tradizione"
    },
    {
        id: 3,
        name: "Discoteca Eden",
        category: "Discoteca",
        location: "Fuorigrotta",
        rating: 4.7,
        reviews: 456,
        price: "€€€",
        distance: "3.5 km",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
        tags: ["Dancing", "DJ Set", "Grande pista"],
        description: "La discoteca più grande di Napoli con serate indimenticabili",
        isTopRated: false,
        trending: true,
        badge: "Più Grande"
    },
    {
        id: 4,
        name: "Caffè Gambrinus",
        category: "Caffè Storico",
        location: "Centro",
        rating: 4.6,
        reviews: 312,
        price: "€€",
        distance: "0.8 km",
        image: "https://images.unsplash.com/photo-1559054663-8e03873cc45d?auto=format&fit=crop&w=400&q=80",
        tags: ["Storico", "Caffè", "Pasticceria"],
        description: "Il caffè più famoso di Napoli, luogo di incontro della borghesia",
        isTopRated: true,
        trending: false,
        badge: "Istorico"
    },
    {
        id: 5,
        name: "Lounge 69",
        category: "Lounge Bar",
        location: "Chiaia",
        rating: 4.5,
        reviews: 167,
        price: "€€€",
        distance: "1.2 km",
        image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=400&q=80",
        tags: ["Lounge", "Cocktail", "Elegante"],
        description: "Atmosfera raffinata con cocktail creativi e musica selezionata",
        isTopRated: false,
        trending: true,
        badge: "Elegante"
    },
    {
        id: 6,
        name: "Pizzeria Da Michele",
        category: "Pizzeria",
        location: "Centro Storico",
        rating: 4.4,
        reviews: 892,
        price: "€",
        distance: "1.5 km",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
        tags: ["Pizza", "Tradizionale", "Economico"],
        description: "La pizza napoletana autentica dal 1870",
        isTopRated: false,
        trending: false,
        badge: "Autentica"
    }
];

const CATEGORIES = [
    { id: 'all', label: 'Tutti', icon: Crown },
    { id: 'rooftop', label: 'Rooftop', icon: TrendingUp },
    { id: 'bar', label: 'Bar', icon: Sparkles },
    { id: 'discoteca', label: 'Discoteche', icon: Flame },
    { id: 'storico', label: 'Storici', icon: Award }
];

export default function TopVenues() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('rating');

    const filteredVenues = TOP_VENUES
        .filter(venue => {
            if (selectedCategory === 'all') return true;
            if (selectedCategory === 'rooftop') return venue.category.includes('Rooftop');
            if (selectedCategory === 'bar') return venue.category.includes('Bar') && !venue.category.includes('Rooftop');
            if (selectedCategory === 'discoteca') return venue.category.includes('Discoteca');
            if (selectedCategory === 'storico') return venue.tags.includes('Storico') || venue.badge === 'Istorico';
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'reviews') return b.reviews - a.reviews;
            if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
            return 0;
        });

    const VenueCard = ({ venue, index }) => (
        <div
            onClick={() => navigate(`/venue/${venue.id}`)}
            className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-orange-400/30 hover:bg-orange-500/5 transition-all duration-300 overflow-hidden"
        >
            {/* Badge */}
            <div className="relative">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-bold">
                        #{index + 1}
                    </div>
                    {venue.badge && (
                        <div className="rounded-full bg-white/20 backdrop-blur-xl px-3 py-1 text-xs text-white font-semibold">
                            {venue.badge}
                        </div>
                    )}
                </div>

                {/* Trending indicator */}
                {venue.trending && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-1 text-xs text-white font-semibold">
                        <Flame size={12} />
                        Trending
                    </div>
                )}

                <div className="aspect-[4/3] overflow-hidden">
                    <img
                        src={venue.image}
                        alt={venue.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
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
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            {venue.rating}
                        </div>
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

                <p className="text-sm text-white/70 mb-4 line-clamp-2">{venue.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {venue.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                            key={tagIndex}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm text-white/50">
                        {venue.reviews} recensioni
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                            <Heart size={16} />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <Crown className="w-4 h-4" />
                            I Migliori di Napoli
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            I locali
                            <span className="block bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                                più amati
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Scopri i locali meglio valutati e più popolari della città,
                            selezionati dalla nostra community
                        </p>
                    </div>

                    {/* Category Filters */}
                    <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                <category.icon size={16} />
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Sort Controls */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className="text-white/60">Ordina per:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-orange-400/50 focus:outline-none"
                        >
                            <option value="rating" className="bg-[#050816]">Valutazione</option>
                            <option value="reviews" className="bg-[#050816]">Recensioni</option>
                            <option value="distance" className="bg-[#050816]">Distanza</option>
                        </select>
                    </div>

                    {/* Venues Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredVenues.map((venue, index) => (
                            <VenueCard key={venue.id} venue={venue} index={index} />
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid gap-6 md:grid-cols-4 text-center">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <Crown className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                            <div className="text-2xl font-black text-white mb-1">50+</div>
                            <div className="text-white/60">Locali valutati</div>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                            <div className="text-2xl font-black text-white mb-1">4.6</div>
                            <div className="text-white/60">Valutazione media</div>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                            <div className="text-2xl font-black text-white mb-1">2.3k</div>
                            <div className="text-white/60">Recensioni totali</div>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                            <div className="text-2xl font-black text-white mb-1">15</div>
                            <div className="text-white/60">Nuovi questa settimana</div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <div className="rounded-3xl border border-white/10 bg-linear-to-r from-orange-500/10 via-pink-500/5 to-purple-500/10 p-8 backdrop-blur-xl">
                            <h2 className="text-2xl font-black text-white mb-4">
                                Hai un locale preferito?
                            </h2>
                            <p className="text-white/70 mb-6">
                                Condividi la tua esperienza e aiutaci a mantenere aggiornata la nostra selezione
                            </p>
                            <button className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors">
                                Suggerisci un locale
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Tag, Search, Star, Users, TrendingUp,
    ArrowRight, Filter, Grid, List, Coffee,
    Utensils, Wine, Music, Heart, Zap
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for categories - in a real app this would come from an API
export const CATEGORIES_DATA = [
    {
        id: 'tradizionale',
        name: 'Cucina Tradizionale',
        description: 'Pizza, pasta e piatti tipici della tradizione napoletana',
        icon: Utensils,
        color: 'from-red-500 to-orange-500',
        venueCount: 156,
        avgRating: 4.7,
        trending: true,
        subcategories: ['Pizza', 'Pasta', 'Cucina Casalinga', 'Antipasti'],
        popularVenues: ['Da Michele', 'L\'Antica Pizzeria', 'Concettina ai Tre Santi']
    },
    {
        id: 'pesce',
        name: 'Frutti di Mare',
        description: 'Ristoranti specializzati in pesce fresco e cucina di mare',
        icon: Wine,
        color: 'from-blue-500 to-cyan-500',
        venueCount: 89,
        avgRating: 4.6,
        trending: false,
        subcategories: ['Ostriche', 'Grigliate', 'Zuppe', 'Crudi'],
        popularVenues: ['Marechiaro', 'Il Gobbo', 'La Sirena']
    },
    {
        id: 'fusion',
        name: 'Cucina Fusion',
        description: 'Cucina creativa che fonde tradizioni diverse',
        icon: Zap,
        color: 'from-purple-500 to-pink-500',
        venueCount: 67,
        avgRating: 4.4,
        trending: true,
        subcategories: ['Asiatica-Napoletana', 'Mediterranea', 'Moderna', 'Sperimentale'],
        popularVenues: ['Fusion Lab', 'East-West', 'Creatività']
    },
    {
        id: 'romantico',
        name: 'Romantico',
        description: 'Locali perfetti per una serata speciale o un appuntamento',
        icon: Heart,
        color: 'from-pink-500 to-rose-500',
        venueCount: 94,
        avgRating: 4.8,
        trending: false,
        subcategories: ['Vista Mare', 'Terrazze', 'Candele', 'Musica Soft'],
        popularVenues: ['Rooftop 45', 'Vista Golfo', 'Luna Rossa']
    },
    {
        id: 'live-music',
        name: 'Musica Live',
        description: 'Locali con concerti, DJ set e serate musicali',
        icon: Music,
        color: 'from-emerald-500 to-teal-500',
        venueCount: 78,
        avgRating: 4.5,
        trending: true,
        subcategories: ['Jazz', 'Rock', 'DJ Set', 'Tradizionale'],
        popularVenues: ['Blue Note', 'Rock House', 'Jam Session']
    },
    {
        id: 'bar',
        name: 'Bar & Cocktail',
        description: 'Bar esclusivi con cocktail artigianali e atmosfera unica',
        icon: Coffee,
        color: 'from-amber-500 to-yellow-500',
        venueCount: 123,
        avgRating: 4.3,
        trending: false,
        subcategories: ['Cocktail', 'Vini', 'Birre Artigianali', 'Signature Drinks'],
        popularVenues: ['Mixology', 'Wine Bar', 'Craft Beer']
    },
    {
        id: 'alternativo',
        name: 'Alternativo',
        description: 'Locali unici, underground e fuori dagli schemi',
        icon: Zap,
        color: 'from-indigo-500 to-purple-500',
        venueCount: 45,
        avgRating: 4.2,
        trending: true,
        subcategories: ['Underground', 'Artistico', 'Vintage', 'Eclettico'],
        popularVenues: ['The Cave', 'Art Space', 'Retro Bar']
    },
    {
        id: 'famigliare',
        name: 'Famigliare',
        description: 'Locali adatti a famiglie con bambini e gruppi',
        icon: Users,
        color: 'from-green-500 to-emerald-500',
        venueCount: 112,
        avgRating: 4.4,
        trending: false,
        subcategories: ['Kids Friendly', 'Gruppi', 'Casual', 'Tradizionale'],
        popularVenues: ['Family Corner', 'Group House', 'Casual Dining']
    }
];

export default function Categories() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('trending');

    const filteredCategories = CATEGORIES_DATA
        .filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
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


    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-6xl">

                    {/* Hero */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <Tag className="w-4 h-4" />
                            Categorie
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Esplora per categoria
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Trova il locale perfetto per ogni tipo di serata e gusto
                        </p>

                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <div className="relative max-w-md w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    placeholder="Cerca una categoria..."
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

                    {/* Categories Grid/List */}
                    <div className={`grid gap-6 ${viewMode === 'grid'
                        ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        : 'grid-cols-1'
                        }`}>
                        {filteredCategories.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-orange-400/30 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${category.color} shadow-lg`}>
                                            <category.icon className="w-6 h-6 text-white" />
                                        </div>
                                        {category.trending && (
                                            <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/30 rounded-full px-2 py-1">
                                                <TrendingUp className="w-3 h-3 text-orange-400" />
                                                <span className="text-xs text-orange-300 font-medium">Hot</span>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                                    <p className="text-white/70 mb-4 line-clamp-2">{category.description}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-white font-medium">{category.avgRating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4 text-orange-400" />
                                                <span className="text-white/70 text-sm">{category.venueCount} locali</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {category.subcategories.slice(0, 3).map((subcategory, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full"
                                                >
                                                    {subcategory}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-4">
                                        <div className="text-sm text-white/60 mb-2">
                                            <span className="font-medium">Popolari:</span>
                                        </div>
                                        <div className="text-sm text-white/80">
                                            {category.popularVenues.slice(0, 2).join(', ')}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No results */}
                    {filteredCategories.length === 0 && (
                        <div className="text-center py-12">
                            <Tag className="w-16 h-16 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Nessuna categoria trovata
                            </h3>
                            <p className="text-white/60">
                                Prova a modificare i termini di ricerca
                            </p>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="mt-16 grid gap-6 md:grid-cols-4">
                        <div className="text-center rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-orange-400 mb-2">
                                {CATEGORIES_DATA.length}
                            </div>
                            <div className="text-white/70">Categorie</div>
                        </div>
                        <div className="text-center rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-orange-400 mb-2">
                                {CATEGORIES_DATA.reduce((sum, cat) => sum + cat.venueCount, 0)}
                            </div>
                            <div className="text-white/70">Locali totali</div>
                        </div>
                        <div className="text-center rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-orange-400 mb-2">
                                {(CATEGORIES_DATA.reduce((sum, cat) => sum + cat.avgRating, 0) / CATEGORIES_DATA.length).toFixed(1)}
                            </div>
                            <div className="text-white/70">Valutazione media</div>
                        </div>
                        <div className="text-center rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <div className="text-3xl font-black text-orange-400 mb-2">
                                {CATEGORIES_DATA.filter(cat => cat.trending).length}
                            </div>
                            <div className="text-white/70">Trending</div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
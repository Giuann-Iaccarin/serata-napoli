import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, MapPin, Users, Clock, Plus, Edit, Trash2,
    Star, Heart, Share2, ChevronRight, Filter, Search
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

// Mock data for planned evenings
const PLANNED_SERATE = [
    {
        id: 1,
        title: "Serata romantica al Vomero",
        date: "2024-01-25",
        time: "20:00",
        status: "planned",
        venues: [
            {
                id: 1,
                name: "Rooftop 45",
                category: "Rooftop Bar",
                time: "20:00 - 22:00",
                rating: 4.8
            },
            {
                id: 2,
                name: "Bar del Porto",
                category: "Cocktail Bar",
                time: "22:00 - 00:00",
                rating: 4.6
            }
        ],
        participants: 2,
        mood: "Tranquillo ma vivo",
        notes: "Cena vista mare e cocktail dopo",
        totalCost: "€80-120"
    },
    {
        id: 2,
        title: "Notte folle con gli amici",
        date: "2024-01-27",
        time: "22:00",
        status: "planned",
        venues: [
            {
                id: 3,
                name: "Discoteca Eden",
                category: "Discoteca",
                time: "22:00 - 04:00",
                rating: 4.4
            }
        ],
        participants: 6,
        mood: "Vogliamo casino",
        notes: "Compleanno di Marco - massima baldoria!",
        totalCost: "€40-60"
    },
    {
        id: 3,
        title: "Aperitivo + Live Music",
        date: "2024-01-20",
        time: "18:30",
        status: "completed",
        venues: [
            {
                id: 4,
                name: "Caffè Gambrinus",
                category: "Caffè Storico",
                time: "18:30 - 20:00",
                rating: 4.7
            },
            {
                id: 5,
                name: "Blue Note",
                category: "Live Music",
                time: "20:30 - 23:00",
                rating: 4.5
            }
        ],
        participants: 4,
        mood: "Musica live",
        notes: "Perfetta combinazione aperitivo e concerto",
        totalCost: "€60-80",
        rating: 5
    }
];

const STATUS_CONFIG = {
    planned: { label: "Pianificata", color: "bg-blue-500/20 text-blue-300" },
    completed: { label: "Completata", color: "bg-emerald-500/20 text-emerald-300" },
    cancelled: { label: "Annullata", color: "bg-red-500/20 text-red-300" }
};

export default function SerateList() {
    const navigate = useNavigate();
    const [serate, setSerate] = useState(PLANNED_SERATE);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSerate = serate
        .filter(serata => {
            const matchesFilter = filter === 'all' || serata.status === filter;
            const matchesSearch = serata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                serata.mood.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const deleteSerata = (id) => {
        if (confirm('Sei sicuro di voler eliminare questa serata?')) {
            setSerate(prev => prev.filter(s => s.id !== id));
        }
    };

    const SerataCard = ({ serata }) => (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-orange-400/30 hover:bg-orange-500/5 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{serata.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_CONFIG[serata.status].color}`}>
                            {STATUS_CONFIG[serata.status].label}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(serata.date).toLocaleDateString('it-IT')}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {serata.time}
                        </div>
                        <div className="flex items-center gap-1">
                            <Users size={14} />
                            {serata.participants} persone
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-white/70">Mood:</span>
                        <span className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-300">
                            {serata.mood}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => deleteSerata(serata.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Venues */}
            <div className="space-y-3 mb-4">
                {serata.venues.map((venue, index) => (
                    <div key={venue.id} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20">
                                <span className="text-sm font-bold text-orange-300">{index + 1}</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">{venue.name}</h4>
                                <p className="text-sm text-white/60">{venue.category}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-white/60">
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {venue.time}
                            </div>
                            <div className="flex items-center gap-1">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                {venue.rating}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Notes & Cost */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                    {serata.notes && (
                        <p className="text-sm text-white/70 italic">"{serata.notes}"</p>
                    )}
                </div>
                <div className="text-right">
                    <p className="text-sm text-white/60">Costo stimato</p>
                    <p className="font-semibold text-white">{serata.totalCost}</p>
                </div>
            </div>

            {/* Rating for completed serate */}
            {serata.status === 'completed' && serata.rating && (
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-white/70">La tua valutazione:</span>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={i < serata.rating ? "fill-yellow-400 text-yellow-400" : "text-white/30"}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={() => navigate(`/venue/${serata.venues[0].id}`)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-colors"
                >
                    Vedi locali
                    <ChevronRight size={16} />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Share2 size={18} />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Heart size={18} />
                </button>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <UserHeader />

            <section className="relative px-4 py-12">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Calendar className="w-8 h-8 text-orange-400" />
                                <h1 className="text-3xl font-black text-white">Lista serate</h1>
                            </div>
                            <p className="text-white/60">
                                {serate.length} serate pianificate • Organizza le tue uscite a Napoli
                            </p>
                        </div>

                        <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors">
                            <Plus size={18} />
                            Pianifica serata
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                placeholder="Cerca serate..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center gap-3">
                            {[
                                { value: 'all', label: 'Tutte', count: serate.length },
                                { value: 'planned', label: 'Pianificate', count: serate.filter(s => s.status === 'planned').length },
                                { value: 'completed', label: 'Completate', count: serate.filter(s => s.status === 'completed').length }
                            ].map(filterOption => (
                                <button
                                    key={filterOption.value}
                                    onClick={() => setFilter(filterOption.value)}
                                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${filter === filterOption.value
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                        }`}
                                >
                                    {filterOption.label}
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${filter === filterOption.value
                                        ? 'bg-white/20 text-white'
                                        : 'bg-orange-500/20 text-orange-300'
                                        }`}>
                                        {filterOption.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Serate List */}
                    {filteredSerate.length > 0 ? (
                        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                            {filteredSerate.map(serata => (
                                <SerataCard key={serata.id} serata={serata} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">
                                {searchQuery ? 'Nessuna serata trovata' : 'Nessuna serata pianificata'}
                            </h3>
                            <p className="text-white/60 mb-6">
                                {searchQuery
                                    ? 'Prova con termini di ricerca diversi'
                                    : 'Inizia a pianificare le tue serate a Napoli'
                                }
                            </p>
                            {!searchQuery && (
                                <button className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors">
                                    Pianifica la tua prima serata
                                </button>
                            )}
                        </div>
                    )}

                    {/* Stats */}
                    {serate.length > 0 && (
                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl text-center">
                                <div className="text-3xl font-black text-white mb-2">
                                    {serate.filter(s => s.status === 'completed').length}
                                </div>
                                <div className="text-white/60">Serate completate</div>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl text-center">
                                <div className="text-3xl font-black text-white mb-2">
                                    {serate.filter(s => s.status === 'planned').length}
                                </div>
                                <div className="text-white/60">Serate pianificate</div>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl text-center">
                                <div className="text-3xl font-black text-white mb-2">
                                    {serate.reduce((sum, s) => sum + s.participants, 0)}
                                </div>
                                <div className="text-white/60">Partecipanti totali</div>
                            </div>
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    );
}
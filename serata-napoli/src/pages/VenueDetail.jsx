/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, Euro, Users, Flame, Heart, Navigation, Share2, Clock,
    Calendar, Home, Music, Star, TrendingUp, ChevronLeft, Phone,
    Globe, Instagram, MessageCircle, Bookmark, AlertCircle
} from 'lucide-react';
import { getVenueById, MOCK_VENUES } from '../data/mockVenues';

export default function VenueDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        const loadVenue = () => {
            setLoading(true);

            // Simulate network delay
            setTimeout(() => {
                const foundVenue = getVenueById(id);
                setVenue(foundVenue);
                setLoading(false);
            }, 300);
        };

        loadVenue();
    }, [id]);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/70 font-semibold">Caricamento...</p>
                </div>
            </div>
        );
    }

    // Not Found State
    if (!venue) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <AlertCircle size={64} className="mx-auto mb-4 text-orange-400" />
                    <h2 className="text-3xl font-black text-white mb-4">Locale non trovato</h2>
                    <p className="text-white/60 mb-8">
                        Il locale con ID "{id}" non esiste nel nostro database.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105"
                    >
                        Torna alla Home
                    </button>
                </div>
            </div>
        );
    }

    const moodConfig = {
        casino: {
            gradient: 'from-orange-500 via-red-500 to-pink-600',
            bgGlow: 'bg-orange-500/10',
            textColor: 'text-orange-400',
            label: '🔥 Vogliamo casino'
        },
        tranquillo: {
            gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
            bgGlow: 'bg-emerald-500/10',
            textColor: 'text-emerald-400',
            label: '🍹 Tranquillo ma vivo'
        },
        musica: {
            gradient: 'from-blue-500 via-indigo-500 to-purple-600',
            bgGlow: 'bg-blue-500/10',
            textColor: 'text-blue-400',
            label: '🎵 Musica live'
        },
        alternativo: {
            gradient: 'from-purple-500 via-fuchsia-500 to-pink-600',
            bgGlow: 'bg-purple-500/10',
            textColor: 'text-purple-400',
            label: '🎨 Alternativo'
        },
        food: {
            gradient: 'from-amber-500 via-orange-500 to-red-600',
            bgGlow: 'bg-amber-500/10',
            textColor: 'text-amber-400',
            label: '🍽 Esperienza food'
        }
    };

    const config = moodConfig[venue.mood] || moodConfig.casino;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-semibold transition-all duration-300"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Torna ai risultati
                </button>
            </div>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        {venue.image && (
                            <img
                                src={venue.image}
                                alt={venue.name}
                                className="w-full h-full object-cover opacity-20"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/70"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <div className={`inline-block px-4 py-2 rounded-xl bg-gradient-to-r ${config.gradient} text-white text-sm font-bold mb-4`}>
                                    {config.label}
                                </div>
                                <h1 className="text-6xl font-black text-white mb-4 bg-gradient-to-r from-white via-orange-100 to-pink-200 bg-clip-text text-transparent">
                                    {venue.name}
                                </h1>
                                <div className="flex items-center gap-3 text-white/70 text-lg mb-4">
                                    <MapPin size={20} className="text-orange-400" />
                                    <span className="font-semibold">{venue.zone}, Napoli</span>
                                </div>
                                <p className="text-white/60 font-medium">{venue.address}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsSaved(!isSaved)}
                                    className={`p-4 rounded-2xl backdrop-blur-xl transition-all duration-300 ${isSaved
                                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    <Heart size={24} fill={isSaved ? 'currentColor' : 'none'} />
                                </button>
                                <button className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl text-white transition-all duration-300">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <Star size={24} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-3xl font-black text-white">{venue.rating}</span>
                            </div>
                            <span className="text-white/60 font-medium">({venue.reviews} recensioni)</span>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard
                                icon={Euro}
                                label="Prezzo"
                                value={venue.price}
                                color="text-amber-400"
                            />
                            <StatCard
                                icon={Users}
                                label="Età media"
                                value={venue.age}
                                color="text-cyan-400"
                            />
                            <StatCard
                                icon={Flame}
                                label="Energia"
                                value={`${venue.energy}/5`}
                                color="text-orange-400"
                            />
                            <StatCard
                                icon={TrendingUp}
                                label="Affluenza"
                                value={`${venue.affluenza}/5`}
                                color="text-purple-400"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-orange-400 mb-4 flex items-center gap-2">
                                <MessageCircle size={24} />
                                Perché andarci
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                {venue.description}
                            </p>
                        </div>

                        {/* Data Points */}
                        <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6">Dettagli</h2>

                            <div className="grid grid-cols-2 gap-6">
                                <DetailItem
                                    icon={Calendar}
                                    label="Giorni migliori"
                                    value={venue.bestDays.join(", ")}
                                />
                                <DetailItem
                                    icon={Home}
                                    label="Ambiente"
                                    value={venue.location}
                                />
                                <DetailItem
                                    icon={Music}
                                    label="Formati"
                                    value={venue.formats.join(", ")}
                                />
                                <DetailItem
                                    icon={Users}
                                    label="Socialità"
                                    value={`${venue.social}/5`}
                                />
                            </div>
                        </div>

                        {/* Ideal For Tags */}
                        <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6">Ideale per</h2>
                            <div className="flex flex-wrap gap-3">
                                {venue.idealFor.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 rounded-2xl text-white font-bold text-lg"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact & Actions */}
                    <div className="space-y-6">
                        {/* Action Buttons */}
                        <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
                            <button className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Navigation size={20} />
                                    Indicazioni
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2">
                                <Bookmark size={20} />
                                Salva
                            </button>

                            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2">
                                <Share2 size={20} />
                                Condividi
                            </button>
                        </div>

                        {/* Contact Info */}
                        {(venue.phone || venue.website || venue.instagram) && (
                            <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                                <h3 className="text-xl font-black text-white mb-4">Contatti</h3>
                                <div className="space-y-3">
                                    {venue.phone && <ContactItem icon={Phone} text={venue.phone} />}
                                    {venue.website && <ContactItem icon={Globe} text={venue.website} />}
                                    {venue.instagram && <ContactItem icon={Instagram} text={venue.instagram} />}
                                </div>
                            </div>
                        )}

                        {/* Opening Hours */}
                        {venue.hours && (
                            <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                    <Clock size={20} />
                                    Orari
                                </h3>
                                <div className="space-y-2 text-white/70">
                                    {Object.entries(venue.hours).map(([day, hours]) => (
                                        <div key={day} className="flex justify-between">
                                            <span>{day}</span>
                                            <span className={hours === 'Chiuso' ? 'text-white/50' : 'text-white font-semibold'}>
                                                {hours}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
                <Icon size={20} className={color} />
                <span className="text-white/50 text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-2xl font-black text-white">{value}</p>
        </div>
    );
}

function DetailItem({ icon: Icon, label, value }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="text-orange-400" />
                <span className="text-white/50 text-sm font-bold uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-white font-bold text-lg">{value}</p>
        </div>
    );
}

function ContactItem({ icon: Icon, text }) {
    return (
        <a
            href="#"
            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
        >
            <Icon size={18} className="text-orange-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white/80 group-hover:text-white font-medium">{text}</span>
        </a>
    );
}
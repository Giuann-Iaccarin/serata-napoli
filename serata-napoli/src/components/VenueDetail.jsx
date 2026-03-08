/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    MapPin, Euro, Users, Flame, Heart, Navigation, Share2, Clock,
    Calendar, Home, Music, Star, TrendingUp, ChevronLeft, Phone,
    Globe, Instagram, Facebook, MessageCircle, Bookmark
} from 'lucide-react';

export default function VenueDetail({ venue, onBack }) {
    const [isSaved, setIsSaved] = useState(false);

    // Mock data - sostituisci con dati reali
    const venueData = venue || {
        name: "Movida Club",
        zone: "Chiaia",
        address: "Via Cavallerizza a Chiaia, 45",
        mood: "casino",
        price: "€€",
        age: "22-25",
        energy: 5,
        social: 4,
        affluenza: 4,
        description: "Il Movida è il punto di riferimento per chi cerca una serata ad alta energia nel cuore di Chiaia. DJ set di qualità, atmosfera elettrica e una crowd giovane e vivace. Perfetto per chi vuole ballare fino all'alba e fare nuove amicizie. Il weekend il locale è sempre sold out, quindi meglio prenotare.",
        bestDays: ["Venerdì", "Sabato"],
        idealFor: ["Gruppi", "Single", "Conoscere persone"],
        formats: ["DJ Set", "Dancing"],
        location: "Indoor",
        phone: "+39 081 123 4567",
        website: "www.movidaclub.it",
        rating: 4.7,
        reviews: 328,
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800"
    };

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

    const config = moodConfig[venueData.mood] || moodConfig.casino;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-semibold transition-all duration-300"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Torna ai risultati
                </button>
            </div>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={venueData.image}
                            alt={venueData.name}
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/90 to-slate-900/70"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <div className={`inline-block px-4 py-2 rounded-xl bg-linear-to-r ${config.gradient} text-white text-sm font-bold mb-4`}>
                                    {config.label}
                                </div>
                                <h1 className="text-6xl font-black text-white mb-4 bg-linear-to-r from-white via-orange-100 to-pink-200 bg-clip-text text-transparent">
                                    {venueData.name}
                                </h1>
                                <div className="flex items-center gap-3 text-white/70 text-lg mb-4">
                                    <MapPin size={20} className="text-orange-400" />
                                    <span className="font-semibold">{venueData.zone}, Napoli</span>
                                </div>
                                <p className="text-white/60 font-medium">{venueData.address}</p>
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
                                <span className="text-3xl font-black text-white">{venueData.rating}</span>
                            </div>
                            <span className="text-white/60 font-medium">({venueData.reviews} recensioni)</span>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard
                                icon={Euro}
                                label="Prezzo"
                                value={venueData.price}
                                color="text-amber-400"
                            />
                            <StatCard
                                icon={Users}
                                label="Età media"
                                value={venueData.age}
                                color="text-cyan-400"
                            />
                            <StatCard
                                icon={Flame}
                                label="Energia"
                                value={`${venueData.energy}/5`}
                                color="text-orange-400"
                            />
                            <StatCard
                                icon={TrendingUp}
                                label="Affluenza"
                                value={`${venueData.affluenza}/5`}
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
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-orange-400 mb-4 flex items-center gap-2">
                                <MessageCircle size={24} />
                                Perché andarci
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                {venueData.description}
                            </p>
                        </div>

                        {/* Data Points */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6">Dettagli</h2>

                            <div className="grid grid-cols-2 gap-6">
                                <DetailItem
                                    icon={Calendar}
                                    label="Giorni migliori"
                                    value={venueData.bestDays.join(", ")}
                                />
                                <DetailItem
                                    icon={Home}
                                    label="Ambiente"
                                    value={venueData.location}
                                />
                                <DetailItem
                                    icon={Music}
                                    label="Formati"
                                    value={venueData.formats.join(", ")}
                                />
                                <DetailItem
                                    icon={Users}
                                    label="Socialità"
                                    value={`${venueData.social}/5`}
                                />
                            </div>
                        </div>

                        {/* Ideal For Tags */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6">Ideale per</h2>
                            <div className="flex flex-wrap gap-3">
                                {venueData.idealFor.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-6 py-3 bg-linear-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 rounded-2xl text-white font-bold text-lg"
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
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
                            <button className="w-full group relative overflow-hidden bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Navigation size={20} />
                                    Indicazioni
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                            <h3 className="text-xl font-black text-white mb-4">Contatti</h3>
                            <div className="space-y-3">
                                <ContactItem icon={Phone} text={venueData.phone} />
                                <ContactItem icon={Globe} text={venueData.website} />
                                <ContactItem icon={Instagram} text="@movidaclub" />
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                <Clock size={20} />
                                Orari
                            </h3>
                            <div className="space-y-2 text-white/70">
                                <div className="flex justify-between">
                                    <span>Lun - Mer</span>
                                    <span className="text-white/50">Chiuso</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Gio</span>
                                    <span className="text-white font-semibold">22:00 - 03:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Ven - Sab</span>
                                    <span className="text-orange-400 font-bold">22:00 - 05:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Dom</span>
                                    <span className="text-white/50">Chiuso</span>
                                </div>
                            </div>
                        </div>
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

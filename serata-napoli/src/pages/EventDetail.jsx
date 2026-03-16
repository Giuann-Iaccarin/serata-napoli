/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Calendar, Clock, MapPin, Euro, Users, Star, Heart, Share2,
    Navigation, Bookmark, ChevronLeft, Tag, ArrowRight, Check,
    MessageCircle, Phone, Globe, Instagram, Facebook, Twitter
} from 'lucide-react';
import { getVenueById, getEventById } from '../data/mockVenues';

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [isBooked, setIsBooked] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const foundEvent = getEventById(id);
            if (foundEvent) {
                setEvent(foundEvent);
                // Get venue details
                const venueData = getVenueById(foundEvent.venueId);
                setVenue(venueData);
            }
            setLoading(false);
        }, 300);
    }, [id]);

    useEffect(() => {
        if (event && venue) {
            document.title = `${event.title} - ${venue.name} | Noctis`;
        }
    }, [event, venue]);

    const handleBookEvent = () => {
        setIsBooked(true);
        // Here you would integrate with booking system
        setTimeout(() => setIsBooked(false), 3000); // Reset after 3 seconds
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: `Scopri l'evento: ${event.title} presso ${venue?.name}`,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            // Show toast notification
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050816] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/70 font-semibold">Caricamento evento...</p>
                </div>
            </div>
        );
    }

    if (!event || !venue) {
        return (
            <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 border-4 border-orange-500 rounded-full mx-auto mb-4 text-orange-400" />
                    <h2 className="text-3xl font-black text-white mb-4">Evento non trovato</h2>
                    <p className="text-white/60 mb-8">L'evento con ID "{id}" non esiste.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                        Torna alla Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050816] text-white">
            {/* Back button */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-semibold transition-all duration-300"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Torna indietro
                </button>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative overflow-hidden rounded-3xl min-h-96 md:min-h-120">
                    <div className="absolute inset-0">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-[#050816]/75 to-[#050816]/20" />
                        <div className="absolute inset-0 bg-linear-to-r from-[#050816]/60 via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
                        {/* Top badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <div className="px-3 py-1.5 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 text-white text-xs font-bold shadow-lg">
                                {event.type}
                            </div>
                            {event.tags?.map((tag, i) => (
                                <div key={i} className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5">
                                    <Tag size={12} />
                                    {tag}
                                </div>
                            ))}
                        </div>

                        {/* Event title */}
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-none mb-3 drop-shadow-2xl">
                            {event.title}
                        </h1>

                        {/* Venue info */}
                        <div className="flex items-center gap-2 text-white/80 mb-4">
                            <MapPin size={16} className="text-orange-400 shrink-0" />
                            <span className="font-semibold text-base">{venue.name} - {venue.zone}, Napoli</span>
                        </div>

                        {/* Event details */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5">
                                <Calendar size={16} className="text-cyan-400" />
                                <span className="text-white font-semibold">
                                    {new Date(event.date).toLocaleDateString('it-IT', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long'
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5">
                                <Clock size={16} className="text-green-400" />
                                <span className="text-white font-semibold">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5">
                                <Euro size={16} className="text-amber-400" />
                                <span className="text-white font-semibold">{event.price}</span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleBookEvent}
                                disabled={isBooked}
                                className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 ${isBooked
                                        ? 'bg-green-500 cursor-not-allowed'
                                        : 'bg-linear-to-r from-orange-500 to-pink-500 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105'
                                    }`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {isBooked ? (
                                        <>
                                            <Check size={18} />
                                            Prenotato!
                                        </>
                                    ) : (
                                        <>
                                            Prenota Ora
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>

                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className={`p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${isSaved
                                        ? 'bg-pink-500 border-pink-400 text-white shadow-lg shadow-pink-500/40'
                                        : 'bg-black/30 border-white/20 text-white hover:bg-black/50'
                                    }`}
                            >
                                <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
                            </button>

                            <button
                                onClick={handleShare}
                                className="p-4 bg-black/30 border border-white/20 text-white hover:bg-black/50 rounded-2xl backdrop-blur-xl transition-all duration-300"
                            >
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                                <MessageCircle size={22} className="text-orange-400" />
                                Descrizione Evento
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">{event.description}</p>
                        </div>

                        {/* What's Included */}
                        {event.includes && (
                            <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                                <h2 className="text-2xl font-black text-white mb-6">Cosa Include</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {event.includes.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Check size={16} className="text-green-400 shrink-0" />
                                            <span className="text-white/80">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Venue Info */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6">Luogo dell'Evento</h2>
                            <div className="flex items-start gap-4">
                                <img
                                    src={venue.image}
                                    alt={venue.name}
                                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                                />
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{venue.name}</h3>
                                    <p className="text-white/60 mb-4">{venue.description}</p>
                                    <button
                                        onClick={() => navigate(`/venue/${venue.id}`)}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300"
                                    >
                                        Vedi Locale
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
                        {/* Event Details Card */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                            <h3 className="text-lg font-black text-white mb-4">Dettagli Evento</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Capacità</span>
                                    <span className="text-white font-semibold">{event.capacity} persone</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Età minima</span>
                                    <span className="text-white font-semibold">{event.ageRestriction}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Dress Code</span>
                                    <span className="text-white font-semibold">{event.dressCode}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Tipo</span>
                                    <span className="text-white font-semibold">{event.type}</span>
                                </div>
                            </div>
                        </div>

                        {/* Venue Contact */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                            <h3 className="text-lg font-black text-white mb-4">Contatti Locale</h3>
                            <div className="space-y-3">
                                {venue.phone && (
                                    <a
                                        href={`tel:${venue.phone}`}
                                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
                                    >
                                        <Phone size={18} className="text-orange-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-white/80 group-hover:text-white font-medium">{venue.phone}</span>
                                    </a>
                                )}
                                {venue.website && (
                                    <a
                                        href={`https://${venue.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
                                    >
                                        <Globe size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-white/80 group-hover:text-white font-medium">{venue.website}</span>
                                    </a>
                                )}
                                {venue.instagram && (
                                    <a
                                        href={`https://instagram.com/${venue.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
                                    >
                                        <Instagram size={18} className="text-pink-400 group-hover:scale-110 transition-transform" />
                                        <span className="text-white/80 group-hover:text-white font-medium">@{venue.instagram.replace('@', '')}</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Directions */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                            <button
                                onClick={() => window.open(venue.googleAddress, '_blank')}
                                className="w-full group relative overflow-hidden bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Navigation size={18} />
                                    Indicazioni
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
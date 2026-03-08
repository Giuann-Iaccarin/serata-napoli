/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, Euro, Users, Flame, Heart, Navigation, Share2, Clock,
    Calendar, Home, Music, Star, TrendingUp, ChevronLeft, Phone,
    Globe, Instagram, MessageCircle, Bookmark, AlertCircle, X,
    ChevronRight, ThumbsUp, Filter, CalendarDays, Tag, MapPinned
} from 'lucide-react';
import { getVenueById } from '../data/mockVenues';

export default function VenueDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const loadVenue = () => {
            setLoading(true);
            setTimeout(() => {
                const foundVenue = getVenueById(id);
                setVenue(foundVenue);
                setLoading(false);
            }, 300);
        };

        loadVenue();
    }, [id]);

    useEffect(() => {
        if (venue) {
            document.title = `${venue.name} - ${venue.zone} | NapoliNights`;
        }
    }, [venue]);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
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
            <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <AlertCircle size={64} className="mx-auto mb-4 text-orange-400" />
                    <h2 className="text-3xl font-black text-white mb-4">Locale non trovato</h2>
                    <p className="text-white/60 mb-8">
                        Il locale con ID "{id}" non esiste nel nostro database.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105"
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
            textColor: 'text-orange-400',
            label: '🔥 Vogliamo casino'
        },
        tranquillo: {
            gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
            textColor: 'text-emerald-400',
            label: '🍹 Tranquillo ma vivo'
        },
        musica: {
            gradient: 'from-blue-500 via-indigo-500 to-purple-600',
            textColor: 'text-blue-400',
            label: '🎵 Musica live'
        },
        alternativo: {
            gradient: 'from-purple-500 via-fuchsia-500 to-pink-600',
            textColor: 'text-purple-400',
            label: '🎨 Alternativo'
        },
        food: {
            gradient: 'from-amber-500 via-orange-500 to-red-600',
            textColor: 'text-amber-400',
            label: '🍽 Esperienza food'
        }
    };

    const config = moodConfig[venue.mood] || moodConfig.casino;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-semibold transition-all duration-300"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Torna ai risultati
                </button>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        {venue.image && (
                            <img
                                src={venue.image}
                                alt={venue.name}
                                className="w-full h-full object-cover opacity-20"
                            />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/90 to-slate-900/70"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <div className={`px-4 py-2 rounded-xl bg-linear-to-r ${config.gradient} text-white text-sm font-bold`}>
                                        {config.label}
                                    </div>
                                    {venue.tag && (
                                        <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold flex items-center gap-2">
                                            <Tag size={14} />
                                            {venue.tag}
                                        </div>
                                    )}
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black text-white mb-4 bg-linear-to-r from-white via-orange-100 to-pink-200 bg-clip-text text-transparent">
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

                        {/* Rating & Best Time */}
                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <Star size={24} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-3xl font-black text-white">{venue.rating}</span>
                                <span className="text-white/60 font-medium">({venue.reviews} recensioni)</span>
                            </div>
                            {venue.bestTime && (
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                                    <Clock size={20} className="text-cyan-400" />
                                    <span className="text-white font-semibold">Best time: {venue.bestTime}</span>
                                </div>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard icon={Euro} label="Prezzo" value={venue.price} color="text-amber-400" />
                            <StatCard icon={Users} label="Età media" value={venue.age} color="text-cyan-400" />
                            <StatCard icon={Flame} label="Energia" value={`${venue.energy}/5`} color="text-orange-400" />
                            <StatCard icon={TrendingUp} label="Affluenza" value={`${venue.affluenza}/5`} color="text-purple-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery */}
                        {venue.gallery && venue.gallery.length > 0 && (
                            <ImageGallery
                                images={venue.gallery}
                                venueName={venue.name}
                                onImageClick={(index) => {
                                    setCurrentImageIndex(index);
                                    setSelectedImage(venue.gallery[index]);
                                }}
                            />
                        )}

                        {/* Description */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-orange-400 mb-4 flex items-center gap-2">
                                <MessageCircle size={24} />
                                Perché andarci
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                {venue.description}
                            </p>
                        </div>

                        {/* Details */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6">Dettagli</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <DetailItem icon={Calendar} label="Giorni migliori" value={venue.bestDays.join(", ")} />
                                <DetailItem icon={Home} label="Ambiente" value={venue.location} />
                                <DetailItem icon={Music} label="Formati" value={venue.formats.join(", ")} />
                                <DetailItem icon={Users} label="Socialità" value={`${venue.social}/5`} />
                            </div>
                        </div>

                        {/* Ideal For Tags */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6">Ideale per</h2>
                            <div className="flex flex-wrap gap-3">
                                {venue.idealFor.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-6 py-3 bg-linear-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 rounded-2xl text-white font-bold text-lg"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Events Section - Only if venue has events */}
                        {venue.upcomingEvents && venue.upcomingEvents.length > 0 && (
                            <EventsSection events={venue.upcomingEvents} />
                        )}

                        {/* Reviews Section */}
                        {venue.userReviews && venue.userReviews.length > 0 && (
                            <ReviewsSection reviews={venue.userReviews} rating={venue.rating} totalReviews={venue.reviews} />
                        )}
                    </div>

                    {/* Right Column - Sticky Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
                        {/* Action Buttons */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">
                            <button
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.zone)}`, '_blank')}
                                className="w-full group relative overflow-hidden bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Navigation size={20} />
                                    Indicazioni
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
                                {isSaved ? 'Salvato' : 'Salva'}
                            </button>

                            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2">
                                <Share2 size={20} />
                                Condividi
                            </button>
                        </div>

                        {/* Contact Info */}
                        {(venue.phone || venue.website || venue.instagram) && (
                            <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                                <h3 className="text-xl font-black text-white mb-4">Contatti</h3>
                                <div className="space-y-3">
                                    {venue.phone && <ContactItem icon={Phone} text={venue.phone} href={`tel:${venue.phone}`} />}
                                    {venue.website && <ContactItem icon={Globe} text={venue.website} href={`https://${venue.website}`} />}
                                    {venue.instagram && <ContactItem icon={Instagram} text={venue.instagram} href={`https://instagram.com/${venue.instagram.replace('@', '')}`} />}
                                </div>
                            </div>
                        )}

                        {/* Opening Hours */}
                        {venue.hours && (
                            <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
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

            {/* Image Lightbox */}
            {selectedImage && (
                <ImageLightbox
                    images={venue.gallery}
                    currentIndex={currentImageIndex}
                    onClose={() => setSelectedImage(null)}
                    onNext={() => {
                        const nextIndex = (currentImageIndex + 1) % venue.gallery.length;
                        setCurrentImageIndex(nextIndex);
                        setSelectedImage(venue.gallery[nextIndex]);
                    }}
                    onPrev={() => {
                        const prevIndex = (currentImageIndex - 1 + venue.gallery.length) % venue.gallery.length;
                        setCurrentImageIndex(prevIndex);
                        setSelectedImage(venue.gallery[prevIndex]);
                    }}
                />
            )}
        </div>
    );
}

// ==================== Helper Components ====================

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

function ContactItem({ icon: Icon, text, href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
        >
            <Icon size={18} className="text-orange-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white/80 group-hover:text-white font-medium">{text}</span>
        </a>
    );
}

function ImageGallery({ images, venueName, onImageClick }) {
    return (
        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-black text-white mb-6">Galleria Foto</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => onImageClick(index)}
                        className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                    >
                        <img
                            src={image}
                            alt={`${venueName} - ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                ))}
            </div>
        </div>
    );
}

function ImageLightbox({ images, currentIndex, onClose, onNext, onPrev }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 z-10"
            >
                <X size={24} />
            </button>

            {/* Previous Button */}
            <button
                onClick={onPrev}
                className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 z-10"
            >
                <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button
                onClick={onNext}
                className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 z-10"
            >
                <ChevronRight size={32} />
            </button>

            {/* Image */}
            <img
                src={images[currentIndex]}
                alt={`Gallery ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-2xl"
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-white font-semibold">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}

function ReviewsSection({ reviews, rating, totalReviews }) {
    return (
        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">Recensioni</h2>
                <div className="flex items-center gap-2">
                    <Star size={24} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-black text-white">{rating}</span>
                    <span className="text-white/60">({totalReviews})</span>
                </div>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}

function ReviewCard({ review }) {
    const [isHelpful, setIsHelpful] = useState(false);

    return (
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-start gap-4 mb-4">
                <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                />
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">{review.author}</h4>
                        <span className="text-white/50 text-sm">{new Date(review.date).toLocaleDateString('it-IT')}</span>
                    </div>
                    <div className="flex gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
                            />
                        ))}
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4">{review.comment}</p>
                    <button
                        onClick={() => setIsHelpful(!isHelpful)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isHelpful
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                            }`}
                    >
                        <ThumbsUp size={14} fill={isHelpful ? 'currentColor' : 'none'} />
                        Utile ({review.helpful + (isHelpful ? 1 : 0)})
                    </button>
                </div>
            </div>
        </div>
    );
}

function EventsSection({ events }) {
    return (
        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <CalendarDays size={24} className="text-orange-400" />
                Prossimi Eventi
            </h2>
            <div className="space-y-4">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}

function EventCard({ event }) {
    return (
        <div className="group p-6 bg-linear-to-r from-white/5 to-white/10 border border-white/10 hover:border-orange-500/30 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-orange-400 group-hover:to-pink-500 transition-all duration-300">
                        {event.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(event.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {event.time}
                        </span>
                    </div>
                </div>
                <span className="px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-xs font-bold">
                    {event.type}
                </span>
            </div>
            <p className="text-white/70 mb-4">{event.description}</p>
            <div className="flex items-center justify-between">
                <span className="text-white font-bold">{event.price}</span>
                <button className="px-4 py-2 bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105">
                    Dettagli
                </button>
            </div>
        </div>
    );
}
/* eslint-disable react-hooks/refs */
/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    MapPin, Euro, Users, Flame, Heart, Navigation, Share2, Clock,
    Calendar, Home, Music, Star, TrendingUp, ChevronLeft, Phone,
    Globe, Instagram, MessageCircle, Bookmark, AlertCircle, X,
    ChevronRight, ThumbsUp, CalendarDays, Tag, Copy, Send, Twitter,
    Check, Facebook, ChevronDown,
} from "lucide-react";
import { getVenueById, MOCK_EVENTS } from "../data/mockVenues";

// ─── Constants ───────────────────────────────────────────────────────────────

const MOOD_CONFIG = {
    casino: { gradient: "from-orange-500 via-red-500 to-pink-600", label: "🔥 Vogliamo casino" },
    tranquillo: { gradient: "from-emerald-500 via-teal-500 to-cyan-600", label: "🍹 Tranquillo ma vivo" },
    musica: { gradient: "from-blue-500 via-indigo-500 to-purple-600", label: "🎵 Musica live" },
    alternativo: { gradient: "from-purple-500 via-fuchsia-500 to-pink-600", label: "🎨 Alternativo" },
    food: { gradient: "from-amber-500 via-orange-500 to-red-600", label: "🍽 Esperienza food" },
};

const SHARE_URL = typeof window !== "undefined" ? window.location.href : "";
const SHARE_TITLE = "Guarda questo locale!";
const SHARE_TEXT = "Ti condivido questo locale, secondo me ti può piacere.";

const REVIEWS_PREVIEW = 3;
const EVENTS_PREVIEW = 2;

// ─── Toast ───────────────────────────────────────────────────────────────────

function Toast({ message, visible }) {
    return ReactDOM.createPortal(
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-10000 flex items-center gap-2 px-5 py-3 rounded-2xl
            bg-emerald-500/90 backdrop-blur-xl shadow-lg shadow-emerald-900/40 text-white font-semibold text-sm
            transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <Check size={16} className="shrink-0" />
            {message}
        </div>,
        document.body
    );
}

// ─── Share Menu ───────────────────────────────────────────────────────────────

function ShareMenu({ open, position, onClose, actions }) {
    if (!open) return null;
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-9999" onClick={onClose}>
            <div
                className="absolute w-72 overflow-hidden rounded-3xl border border-white/10 bg-[#0c1224]/95 shadow-2xl backdrop-blur-2xl"
                style={{ top: position.top, left: Math.max(16, position.left) }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <div>
                        <p className="text-sm font-bold text-white">Condividi locale</p>
                        <p className="text-xs text-white/45">Scegli come inviarlo</p>
                    </div>
                    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white">
                        <X size={14} />
                    </button>
                </div>
                <div className="p-2">
                    {actions.map(({ icon, label, onClick, active }, i) => (
                        <ShareAction key={i} icon={icon} label={label} onClick={onClick} active={active} />
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}

function ShareAction({ icon: Icon, label, onClick, active = false }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`mb-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition
                ${active ? "bg-emerald-500/15 text-emerald-200" : "text-white/80 hover:bg-white/5 hover:text-white"}`}
        >
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${active ? "bg-emerald-500/15" : "bg-white/6"}`}>
                <Icon size={17} />
            </div>
            <span className="font-medium">{label}</span>
        </button>
    );
}

// ─── useShare hook ────────────────────────────────────────────────────────────

function useShare(venue) {
    const [shareOpen, setShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [sharePosition, setSharePosition] = useState({ top: 0, left: 0 });
    const shareRef = useRef(null);
    const shareButtonRef = useRef(null);

    const openPopup = (url) => window.open(url, "_blank", "noopener,noreferrer,width=700,height=700");

    const calcPosition = () => {
        if (shareButtonRef.current) {
            const rect = shareButtonRef.current.getBoundingClientRect();
            setSharePosition({ top: rect.bottom + 12, left: rect.right - 288 });
        }
    };

    const toggleShareMenu = () => {
        if (!shareOpen) calcPosition();
        setShareOpen((p) => !p);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(SHARE_URL);
            setCopied(true);
            setToastVisible(true);
            setTimeout(() => { setCopied(false); setToastVisible(false); }, 2200);
        } catch (e) { console.error(e); }
    };

    const handleNativeShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: SHARE_URL });
                setShareOpen(false);
            } else {
                await handleCopyLink();
            }
        } catch (e) { console.error(e); }
    };

    const handleWhatsApp = () => openPopup(`https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SHARE_URL}`)}`);
    const handleTelegram = () => openPopup(`https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`);
    const handleTwitter = () => openPopup(`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`);
    const handleFacebook = () => openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`);

    // Build actions array — only include whatsapp/fb/twitter if venue has those fields
    const buildActions = () => {
        const actions = [
            { icon: copied ? Check : Copy, label: copied ? "Link copiato!" : "Copia link", onClick: handleCopyLink, active: copied },
        ];
        if (venue?.whatsapp) actions.push({ icon: MessageCircle, label: "WhatsApp", onClick: handleWhatsApp });
        if (venue?.facebook) actions.push({ icon: Facebook, label: "Facebook", onClick: handleFacebook });
        if (venue?.twitter) actions.push({ icon: Twitter, label: "X / Twitter", onClick: handleTwitter });
        actions.push({ icon: Send, label: "Telegram", onClick: handleTelegram });
        return actions;
    };

    useEffect(() => {
        const onMouseDown = (e) => { if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false); };
        const onKeyDown = (e) => { if (e.key === "Escape") setShareOpen(false); };
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("keydown", onKeyDown);
        return () => { document.removeEventListener("mousedown", onMouseDown); document.removeEventListener("keydown", onKeyDown); };
    }, []);

    useEffect(() => {
        if (!shareOpen) return;
        window.addEventListener("resize", calcPosition);
        window.addEventListener("scroll", calcPosition, true);
        return () => { window.removeEventListener("resize", calcPosition); window.removeEventListener("scroll", calcPosition, true); };
    }, [shareOpen]);

    return {
        shareOpen, sharePosition, shareRef, shareButtonRef, toastVisible,
        toggleShareMenu, buildActions,
    };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Icon size={16} className={color} />
                <span className="text-white/40 text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-xl font-black text-white">{value}</p>
        </div>
    );
}

function DetailItem({ icon: Icon, label, value }) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Icon size={18} className="text-orange-400" />
                <span className="text-white/50 text-sm font-bold uppercase tracking-wider">
                    {label}
                </span>
            </div>

            <p className="text-white font-bold text-lg">
                {value}
            </p>
        </div>
    );
}

function ContactItem({ icon: Icon, text, href }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group">
            <Icon size={18} className="text-orange-400 group-hover:scale-110 transition-transform duration-300 shrink-0" />
            <span className="text-white/80 group-hover:text-white font-medium truncate">{text}</span>
        </a>
    );
}

function SectionCard({ children, className = "" }) {
    return (
        <div className={`bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 ${className}`}>
            {children}
        </div>
    );
}

function SectionTitle({ icon: Icon, children, color = "text-white" }) {
    return (
        <h2 className={`text-2xl font-black ${color} mb-6 flex items-center gap-2`}>
            {Icon && <Icon size={22} className="text-orange-400" />}
            {children}
        </h2>
    );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

function ImageGallery({ images, venueName, onImageClick }) {
    return (
        <SectionCard>
            <SectionTitle>Galleria Foto</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((src, i) => (
                    <button key={i} onClick={() => onImageClick(i)}
                        className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all duration-300">
                        <img src={src} alt={`${venueName} - ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                ))}
            </div>
        </SectionCard>
    );
}

function ImageLightbox({ images, currentIndex, onClose, onNext, onPrev }) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, onNext, onPrev]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <button onClick={onClose} className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"><X size={24} /></button>
            <button onClick={onPrev} className="absolute left-4  p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"><ChevronLeft size={32} /></button>
            <button onClick={onNext} className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"><ChevronRight size={32} /></button>
            <img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} className="max-w-full max-h-full object-contain rounded-2xl" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-white font-semibold text-sm">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

function StarRow({ rating, size = 16 }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={size} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} />
            ))}
        </div>
    );
}

function ReviewCard({ review }) {
    const [isHelpful, setIsHelpful] = useState(false);
    return (
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-300 shrink-0 w-full">
            <div className="flex items-start gap-4">
                <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full border-2 border-white/20 shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white">{review.author}</h4>
                        <span className="text-white/40 text-xs">{new Date(review.date).toLocaleDateString("it-IT")}</span>
                    </div>
                    <StarRow rating={review.rating} />
                    <p className="text-white/80 leading-relaxed mt-3 mb-4">{review.comment}</p>
                    <button
                        onClick={() => setIsHelpful((p) => !p)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isHelpful
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                            }`}
                    >
                        <ThumbsUp size={14} fill={isHelpful ? "currentColor" : "none"} />
                        Utile ({review.helpful + (isHelpful ? 1 : 0)})
                    </button>
                </div>
            </div>
        </div>
    );
}

// Modal overlay for "see all" drawer
function ExpandDrawer({ title, onClose, children }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-9000 flex items-end md:items-center justify-center" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            {/* Drawer */}
            <div
                className="relative z-10 w-full max-w-2xl max-h-[80vh] flex flex-col bg-slate-900 border border-white/10 rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                    <h3 className="text-lg font-black text-white">{title}</h3>
                    <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all">
                        <X size={18} />
                    </button>
                </div>
                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1 p-6 space-y-4">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

function ReviewsSection({ reviews, rating, totalReviews }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const preview = reviews.slice(0, REVIEWS_PREVIEW);
    const hasMore = reviews.length > REVIEWS_PREVIEW;

    return (
        <>
            <SectionCard>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                        Recensioni
                    </h2>
                    <div className="flex items-center gap-2">
                        <Star size={20} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xl font-black text-white">{rating}</span>
                        <span className="text-white/50 text-sm">({totalReviews})</span>
                    </div>
                </div>
                <div className="space-y-4">
                    {preview.map((r) => <ReviewCard key={r.id} review={r} />)}
                </div>
                {hasMore && (
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300"
                    >
                        <ChevronDown size={16} />
                        Visualizza tutte le {reviews.length} recensioni
                    </button>
                )}
            </SectionCard>

            {drawerOpen && (
                <ExpandDrawer title={`Tutte le recensioni (${reviews.length})`} onClose={() => setDrawerOpen(false)}>
                    {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                </ExpandDrawer>
            )}
        </>
    );
}

// ─── Events ──────────────────────────────────────────────────────────────────

function EventCard({ event, onEventClick }) {
    return (
        <div className="group p-6 bg-linear-to-r from-white/5 to-white/10 border border-white/10 hover:border-orange-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-orange-400 group-hover:to-pink-500 transition-all duration-300">
                        {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm">
                        <span className="flex items-center gap-1">
                            <Calendar size={13} />
                            {new Date(event.date).toLocaleDateString("it-IT", { day: "numeric", month: "long" })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={13} />
                            {event.time}
                        </span>
                    </div>
                </div>
                <span className="px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-xs font-bold shrink-0">
                    {event.type}
                </span>
            </div>
            <p className="text-white/70 mb-4 text-sm leading-relaxed">{event.description}</p>
            <div className="flex items-center justify-between">
                <span className="text-white font-bold">{event.price}</span>
                <button
                    onClick={() => onEventClick(event.id)}
                    className="px-4 py-2 bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 text-sm"
                >
                    Dettagli
                </button>
            </div>
        </div>
    );
}

function EventsSection({ events, onEventClick }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const preview = events.slice(0, EVENTS_PREVIEW);
    const hasMore = events.length > EVENTS_PREVIEW;

    return (
        <>
            <SectionCard>
                <SectionTitle icon={CalendarDays}>Prossimi Eventi</SectionTitle>
                <div className="space-y-4">
                    {preview.map((e) => <EventCard key={e.id} event={e} onEventClick={onEventClick} />)}
                </div>
                {hasMore && (
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300"
                    >
                        <ChevronDown size={16} />
                        Visualizza tutti gli {events.length} eventi
                    </button>
                )}
            </SectionCard>

            {drawerOpen && (
                <ExpandDrawer title={`Tutti gli eventi (${events.length})`} onClose={() => setDrawerOpen(false)}>
                    {events.map((e) => <EventCard key={e.id} event={e} onEventClick={onEventClick} />)}
                </ExpandDrawer>
            )}
        </>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VenueDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const share = useShare(venue);
    const config = MOOD_CONFIG[venue?.mood] ?? MOOD_CONFIG.casino;

    useEffect(() => {
        setLoading(true);
        setTimeout(() => { setVenue(getVenueById(id)); setLoading(false); }, 300);
    }, [id]);

    useEffect(() => {
        if (venue) document.title = `${venue.name} - ${venue.zone} | NapoliNights`;
    }, [venue]);

    const openLightbox = (index) => { setCurrentImageIndex(index); setSelectedImage(venue.gallery[index]); };
    const closeLightbox = () => setSelectedImage(null);
    const goNext = () => {
        const next = (currentImageIndex + 1) % venue.gallery.length;
        setCurrentImageIndex(next); setSelectedImage(venue.gallery[next]);
    };
    const goPrev = () => {
        const prev = (currentImageIndex - 1 + venue.gallery.length) % venue.gallery.length;
        setCurrentImageIndex(prev); setSelectedImage(venue.gallery[prev]);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/70 font-semibold">Caricamento...</p>
                </div>
            </div>
        );
    }

    if (!venue) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <AlertCircle size={64} className="mx-auto mb-4 text-orange-400" />
                    <h2 className="text-3xl font-black text-white mb-4">Locale non trovato</h2>
                    <p className="text-white/60 mb-8">Il locale con ID "{id}" non esiste nel nostro database.</p>
                    <button onClick={() => navigate("/")} className="px-8 py-4 bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 transform">
                        Torna alla Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
            <Toast message="Link copiato negli appunti!" visible={share.toastVisible} />
            <ShareMenu
                open={share.shareOpen}
                position={share.sharePosition}
                onClose={share.toggleShareMenu}
                actions={share.buildActions()}
            />

            {/* Back button */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <button
                    onClick={() => navigate("/")}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-semibold transition-all duration-300"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Torna ai risultati
                </button>
            </div>

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative overflow-hidden rounded-3xl min-h-105 md:min-h-120">
                    {/* Full bleed background image */}
                    <div className="absolute inset-0">
                        {venue.image && (
                            <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                        )}
                        {/* Layered overlays for depth */}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />
                        <div className="absolute inset-0 bg-linear-to-r from-slate-950/60 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 pt-16">
                        {/* Top row: badges + save button */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className={`px-3 py-1.5 rounded-xl bg-linear-to-r ${config.gradient} text-white text-xs font-bold shadow-lg`}>
                                    {config.label}
                                </div>
                                {venue.tag && (
                                    <div className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5">
                                        <Tag size={12} />
                                        {venue.tag}
                                    </div>
                                )}
                            </div>
                            {/* Only save — share is in sidebar */}
                            <button
                                onClick={() => setIsSaved((p) => !p)}
                                className={`p-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${isSaved
                                    ? "bg-pink-500 border-pink-400 text-white shadow-lg shadow-pink-500/40"
                                    : "bg-black/30 border-white/20 text-white hover:bg-black/50"
                                    }`}
                                aria-label="Salva"
                            >
                                <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Venue name */}
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-3 drop-shadow-2xl">
                            {venue.name}
                        </h1>

                        {/* Location row */}
                        <div className="flex flex-col items-start gap-1 mb-6">
                            <div className="flex items-center gap-2 text-white/80">
                                <MapPin size={16} className="text-orange-400 shrink-0" />
                                <span className="font-semibold text-base">{venue.zone}, Napoli</span>
                            </div>
                            <p className="text-white/45 text-sm pl-6">{venue.address}</p>
                        </div>

                        {/* Bottom row: rating + best time + stats */}
                        <div className="flex flex-col gap-4">
                            {/* Rating & best time pill */}
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5">
                                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-xl font-black text-white">{venue.rating}</span>
                                    <span className="text-white/40 text-sm">({venue.reviews})</span>
                                </div>
                                {venue.bestTime && (
                                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5">
                                        <Clock size={16} className="text-cyan-400" />
                                        <span className="text-white font-semibold text-sm">{venue.bestTime}</span>
                                    </div>
                                )}
                            </div>

                            {/* Quick stats row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <StatCard icon={Euro} label="Prezzo" value={venue.price} color="text-amber-400" />
                                <StatCard icon={Users} label="Età media" value={venue.age} color="text-cyan-400" />
                                <StatCard icon={Flame} label="Energia" value={`${venue.energy}/5`} color="text-orange-400" />
                                <StatCard icon={TrendingUp} label="Affluenza" value={`${venue.affluenza}/5`} color="text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Left column ─────────────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-8">
                        {venue.gallery?.length > 0 && (
                            <ImageGallery images={venue.gallery} venueName={venue.name} onImageClick={openLightbox} />
                        )}

                        <SectionCard>
                            <SectionTitle icon={MessageCircle} color="text-orange-400">Perché andarci</SectionTitle>
                            <p className="text-white/80 text-lg leading-relaxed">{venue.description}</p>
                        </SectionCard>

                        <SectionCard>
                            <SectionTitle>Dettagli</SectionTitle>

                            <div className="grid grid-cols-2 gap-6 text-center">
                                <DetailItem icon={Calendar} label="Giorni migliori" value={venue.bestDays.join(", ")} />
                                <DetailItem icon={Home} label="Ambiente" value={venue.location} />
                                <DetailItem icon={Music} label="Formati" value={venue.formats.join(", ")} />
                                <DetailItem icon={Users} label="Socialità" value={`${venue.social}/5`} />
                            </div>

                        </SectionCard>

                        <SectionCard>
                            <SectionTitle>Ideale per</SectionTitle>
                            <div className="flex flex-wrap gap-3">
                                {venue.idealFor.map((tag, i) => (
                                    <span key={i} className="px-5 py-2.5 bg-linear-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 rounded-2xl text-white font-bold">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </SectionCard>

                        {MOCK_EVENTS.filter(e => e.venueId === venue.id).length > 0 && <EventsSection events={MOCK_EVENTS.filter(e => e.venueId === venue.id)} onEventClick={(eventId) => navigate(`/event/${eventId}`)} />}
                        {venue.userReviews?.length > 0 && <ReviewsSection reviews={venue.userReviews} rating={venue.rating} totalReviews={venue.reviews} />}
                    </div>

                    {/* ── Right column (sticky sidebar) ───────────────────── */}
                    <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">

                        {/* CTA buttons */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-3">
                            <button
                                onClick={() => window.open(venue.googleAddress, "_blank")}
                                className="w-full group relative overflow-hidden bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02] transform"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Navigation size={18} />
                                    Indicazioni
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>

                            <button
                                onClick={() => setIsSaved((p) => !p)}
                                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                                {isSaved ? "Salvato" : "Salva"}
                            </button>

                            <div ref={share.shareRef} className="w-full">
                                <button
                                    ref={share.shareButtonRef}
                                    onClick={share.toggleShareMenu}
                                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Share2 size={18} />
                                    Condividi
                                </button>
                            </div>
                        </div>

                        {/* Contacts */}
                        {(venue.phone || venue.website || venue.instagram || venue.facebook || venue.twitter) && (
                            <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                                <h3 className="text-lg font-black text-white mb-4">Contatti</h3>
                                <div className="space-y-2">
                                    {venue.phone && <ContactItem icon={Phone} text={venue.phone} href={`tel:${venue.phone}`} />}
                                    {venue.website && <ContactItem icon={Globe} text={venue.website} href={`https://${venue.website}`} />}
                                    {venue.instagram && <ContactItem icon={Instagram} text={venue.instagram} href={`https://instagram.com/${venue.instagram.replace("@", "")}`} />}
                                    {venue.facebook && <ContactItem icon={Facebook} text={venue.facebook} href={`https://facebook.com/${venue.facebook}`} />}
                                    {venue.twitter && <ContactItem icon={Twitter} text={venue.twitter} href={`https://twitter.com/${venue.twitter.replace("@", "")}`} />}
                                </div>
                            </div>
                        )}

                        {/* Hours */}
                        {venue.hours && (
                            <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                                    <Clock size={18} className="text-orange-400" />
                                    Orari
                                </h3>
                                <div className="space-y-2">
                                    {Object.entries(venue.hours).map(([day, hours]) => (
                                        <div key={day} className="flex justify-between text-sm">
                                            <span className="text-white/60">{day}</span>
                                            <span className={hours === "Chiuso" ? "text-white/30" : "text-white font-semibold"}>{hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <ImageLightbox images={venue.gallery} currentIndex={currentImageIndex} onClose={closeLightbox} onNext={goNext} onPrev={goPrev} />
            )}
        </div>
    );
}
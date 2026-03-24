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
    Check, Facebook, ChevronDown, UtensilsCrossed, ExternalLink,
    Play, Film,
} from "lucide-react";
import { getVenueById, MOCK_EVENTS } from "../data/mockVenues";

// ── Componenti estratti in file separati ──────────────────────────────────────
import Toast from "../components/Toast";
import SectionCard from "../components/SectionCard";
import SectionTitle from "../components/SectionTitle";
import ImageGallery from "../components/ImageGallery";
import ImageLightbox from "../components/ImageLightbox";
import StarRow from "../components/StarRow";
import ExpandDrawer from "../components/ExpandDrawer";
import SocialSection from "../components/SocialSection";
import CommentBox from "../components/CommentBox";

// ─── Constants ────────────────────────────────────────────────────────────────

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
            setCopied(true); setToastVisible(true);
            setTimeout(() => { setCopied(false); setToastVisible(false); }, 2200);
        } catch (e) { console.error(e); }
    };

    const handleWhatsApp = () => openPopup(`https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SHARE_URL}`)}`);
    const handleTelegram = () => openPopup(`https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`);
    const handleTwitter = () => openPopup(`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`);
    const handleFacebook = () => openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`);

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
        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        if (!shareOpen) return;
        window.addEventListener("resize", calcPosition);
        window.addEventListener("scroll", calcPosition, true);
        return () => {
            window.removeEventListener("resize", calcPosition);
            window.removeEventListener("scroll", calcPosition, true);
        };
    }, [shareOpen]);

    return { shareOpen, sharePosition, shareRef, shareButtonRef, toastVisible, toggleShareMenu, buildActions };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="flex flex-col items-center text-center">
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
                <span className="text-white/50 text-sm font-bold uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-white font-bold text-lg">{value}</p>
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

// ─── Reviews ─────────────────────────────────────────────────────────────────

function ReviewCard({ review }) {
    const [isHelpful, setIsHelpful] = useState(false);
    return (
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-300 w-full">
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

function ReviewsSection({ reviews, rating, totalReviews }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const preview = reviews.slice(0, REVIEWS_PREVIEW);
    const hasMore = reviews.length > REVIEWS_PREVIEW;

    return (
        <>
            <SectionCard>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-white">Recensioni</h2>
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

// ─── Menu ─────────────────────────────────────────────────────────────────────
//
// Formati supportati in venue.menu:
//   - stringa URL            → pulsante link esterno
//   - array piatto           → [{ name, price, description?, allergens? }]
//   - array con categorie    → [{ category, items: [{ name, price, ... }] }]
// venue.menuUrl              → link "Apri completo" accanto all'array

function MenuItemRow({ item }) {
    return (
        <div className="flex items-start justify-between gap-4 px-5 py-4 bg-black/20 hover:bg-black/30 transition-colors duration-200">
            <div className="flex-1 min-w-0">
                <p className="text-white font-semibold leading-snug">{item.name}</p>
                {item.description && (
                    <p className="text-white/45 text-sm mt-1 leading-relaxed">{item.description}</p>
                )}
                {Array.isArray(item.allergens) && item.allergens.length > 0 && (
                    <p className="text-white/25 text-xs mt-1.5">Allergeni: {item.allergens.join(", ")}</p>
                )}
            </div>
            {item.price && (
                <span className="text-orange-400 font-black text-base shrink-0 tabular-nums">{item.price}</span>
            )}
        </div>
    );
}

function MenuAccordionItem({ item }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-white/10">
            <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-black/20 hover:bg-black/30 transition-colors duration-200 focus:outline-none"
                onClick={() => setOpen((v) => !v)}
            >
                <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold leading-snug">{item.name}</p>
                </div>
                {item.price && (
                    <span className="text-orange-400 font-black text-base shrink-0 tabular-nums">{item.price}</span>
                )}
                <span className={`ml-2 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}>
                    ▼
                </span>
            </button>
            {open && (
                <div className="flex flex-col md:flex-row gap-4 px-7 pb-5 pt-5 bg-white/80 border border-orange-200 rounded-b-xl animate-fade-in">
                    {item.image && (
                        <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg border border-orange-200 shadow-md self-center md:self-start" />
                    )}
                    <div className="flex-1 min-w-0">
                        {item.description && (
                            <p className="mb-2 text-gray-900 font-semibold leading-relaxed text-base">{item.description}</p>
                        )}
                        {Array.isArray(item.allergens) && item.allergens.length > 0 && (
                            <p className="text-gray-700 text-xs mb-1">Allergeni: {item.allergens.join(", ")}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
function MenuLinkButton({ href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/40 rounded-2xl transition-all duration-300"
        >
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/20">
                    <UtensilsCrossed size={22} className="text-orange-400" />
                </div>
                <div>
                    <p className="text-white font-bold">Visualizza il menu completo</p>
                    <p className="text-white/45 text-sm mt-0.5">Si apre in una nuova scheda</p>
                </div>
            </div>
            <ExternalLink size={18} className="text-white/30 group-hover:text-orange-400 transition-colors duration-300 shrink-0" />
        </a>
    );
}

function MenuSection({ venue }) {
    const [openCategory, setOpenCategory] = useState(null);

    if (typeof venue.menu === "string") {
        return (
            <SectionCard>
                <SectionTitle icon={UtensilsCrossed}>Menu</SectionTitle>
                <MenuLinkButton href={venue.menu} />
            </SectionCard>
        );
    }

    if (!Array.isArray(venue.menu) || venue.menu.length === 0) {
        if (venue.menuUrl) {
            return (
                <SectionCard>
                    <SectionTitle icon={UtensilsCrossed}>Menu</SectionTitle>
                    <MenuLinkButton href={venue.menuUrl} />
                </SectionCard>
            );
        }
        return null;
    }

    const isCategorized = venue.menu[0] && Array.isArray(venue.menu[0].items);

    return (
        <SectionCard>
            <div className="flex items-center justify-between mb-6">
                <SectionTitle icon={UtensilsCrossed}>Menu</SectionTitle>
                {venue.menuUrl && (
                    <a
                        href={venue.menuUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200"
                    >
                        Apri completo <ExternalLink size={14} />
                    </a>
                )}
            </div>

            {isCategorized ? (
                <div className="space-y-3">
                    {venue.menu.map((cat, idx) => {
                        const isOpen = openCategory === idx;
                        const items = Array.isArray(cat.items) ? cat.items : [];
                        return (
                            <div key={idx} className="overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-300">
                                <button
                                    onClick={() => setOpenCategory(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/8 transition-colors duration-200"
                                >
                                    <span className="text-white font-bold text-base">{cat.category}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/35 text-sm">{items.length} voci</span>
                                        <ChevronDown size={16} className={`text-white/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                    </div>
                                </button>
                                {isOpen && (
                                    <div className="divide-y divide-white/5">
                                        {items.map((item, i) => <MenuAccordionItem key={i} item={item} />)}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="divide-y divide-white/5 rounded-2xl overflow-hidden border border-white/10">
                    {venue.menu.map((item, i) => <MenuAccordionItem key={i} item={item} />)}
                </div>
            )}
        </SectionCard>
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
    const [userComments, setUserComments] = useState([]);

    const share = useShare(venue);
    const config = MOOD_CONFIG[venue?.mood] ?? MOOD_CONFIG.casino;

    const handleAddComment = (text) => {
        setUserComments((prev) => [
            ...prev,
            { id: Date.now(), text, date: new Date().toISOString(), author: "Utente anonimo" },
        ]);
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => { setVenue(getVenueById(id)); setLoading(false); }, 300);
    }, [id]);

    useEffect(() => {
        if (venue) document.title = `${venue.name} - ${venue.zone} | Noctis`;
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

            {/* Back */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-semibold transition-all duration-300"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Torna indietro
                </button>
            </div>

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative overflow-hidden rounded-3xl min-h-105 md:min-h-120">
                    <div className="absolute inset-0">
                        {venue.image && <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />
                        <div className="absolute inset-0 bg-linear-to-r from-slate-950/60 via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 pt-16">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className={`px-3 py-1.5 rounded-xl bg-linear-to-r ${config.gradient} text-white text-xs font-bold shadow-lg`}>
                                    {config.label}
                                </div>
                                {venue.tag && (
                                    <div className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5">
                                        <Tag size={12} />{venue.tag}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setIsSaved((p) => !p)}
                                className={`p-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${isSaved ? "bg-pink-500 border-pink-400 text-white shadow-lg shadow-pink-500/40" : "bg-black/30 border-white/20 text-white hover:bg-black/50"
                                    }`}
                                aria-label="Salva"
                            >
                                <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                            </button>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-3 drop-shadow-2xl">
                            {venue.name}
                        </h1>

                        <div className="flex flex-col items-start gap-1 mb-6">
                            <div className="flex items-center gap-2 text-white/80">
                                <MapPin size={16} className="text-orange-400 shrink-0" />
                                <span className="font-semibold text-base">{venue.zone}, Napoli</span>
                            </div>
                            <p className="text-white/45 text-sm pl-6">{venue.address}</p>
                        </div>

                        <div className="flex flex-col gap-4">
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

            {/* ── Main content ───────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left column */}
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

                        {/* Menu */}
                        <MenuSection venue={venue} />

                        {/* Social — decommentare quando SocialSection è pronta */}
                        {/* <SocialSection venue={venue} /> */}

                        {/* Eventi */}
                        {MOCK_EVENTS.filter((e) => e.venueId === venue.id).length > 0 && (
                            <EventsSection
                                events={MOCK_EVENTS.filter((e) => e.venueId === venue.id)}
                                onEventClick={(eventId) => navigate(`/event/${eventId}`)}
                            />
                        )}

                        {/* Recensioni */}
                        {venue.userReviews?.length > 0 && (
                            <ReviewsSection
                                reviews={venue.userReviews}
                                rating={venue.rating}
                                totalReviews={venue.reviews}
                            />
                        )}

                        {/* Commenti utente */}
                        <SectionCard>
                            <CommentBox onAddComment={handleAddComment} />
                            {userComments.length > 0 && (
                                <div className="mt-6 space-y-3">
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider">
                                        Commenti degli utenti
                                    </p>
                                    {userComments.map((c) => (
                                        <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                            <div className="text-xs text-white/35 mb-1.5">
                                                {c.author} · {new Date(c.date).toLocaleString("it-IT")}
                                            </div>
                                            <p className="text-white/80 text-sm leading-relaxed">{c.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </SectionCard>
                    </div>

                    {/* Right column (sticky) */}
                    <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">

                        {/* CTA */}
                        <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-3">
                            <button
                                onClick={() => window.open(venue.googleAddress, "_blank")}
                                className="w-full group relative overflow-hidden bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02] transform"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Navigation size={18} /> Indicazioni
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
                                    <Share2 size={18} /> Condividi
                                </button>
                            </div>
                        </div>

                        {/* Contatti */}
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

                        {/* Orari */}
                        {venue.hours && (
                            <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                                    <Clock size={18} className="text-orange-400" /> Orari
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
                <ImageLightbox
                    images={venue.gallery}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onNext={goNext}
                    onPrev={goPrev}
                />
            )}
        </div>
    );
}
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, ArrowUpRight, Sparkles, Heart } from 'lucide-react';

const NAV = {
    'Esplora': ['Napoli', 'Zone di Napoli'],
    'Categorie': ['Discoteche', 'Aperitivi', 'Live Music', 'Food Experience', 'Rooftop Bar'],
    'Aiuto': ['Come funziona', 'FAQ', 'Contattaci', 'Termini di servizio', 'Privacy Policy'],
};

const SOCIALS = [
    { icon: Instagram, href: '#', label: 'Instagram', color: '#e1306c' },
    { icon: Facebook, href: '#', label: 'Facebook', color: '#1877f2' },
    { icon: Twitter, href: '#', label: 'Twitter/X', color: '#1da1f2' },
    { icon: Mail, href: '#', label: 'Email', color: '#f97316' },
];

const CITIES_MARQUEE = ['Centro', 'Vomero', 'Chiaia', 'Posillipo', 'Mergellina', 'Fuorigrotta', 'Centro', 'Vomero', 'Chiaia', 'Posillipo', 'Mergellina', 'Fuorigrotta'];

const ROUTES = {
    'Esplora': {
        'Napoli': '/cities',
        'Zone di Napoli': '/cities'
    },
    'Categorie': {
        'Discoteche': '/categories',
        'Aperitivi': '/categories',
        'Live Music': '/categories',
        'Food Experience': '/categories',
        'Rooftop Bar': '/categories'
    },
    'Aiuto': {
        'Come funziona': '/how-it-works',
        'FAQ': '/faq',
        'Contattaci': '/contact',
        'Termini di servizio': '/terms',
        'Privacy Policy': '/privacy'
    }
};

export default function Footer() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const year = new Date().getFullYear();
    const navigate = useNavigate();

    const handleSubscribe = () => {
        if (email.includes('@')) { setSent(true); setEmail(''); }
    };

    return (
        <footer className="relative overflow-hidden bg-[#050816] mt-16" style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* ── noise grain overlay ─────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

            {/* ── ambient glows ───────────────────────────────────────────── */}
            <div className="pointer-events-none absolute -left-40 top-0 h-125 w-125 rounded-full bg-orange-500/8 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-100 w-100 rounded-full bg-fuchsia-500/8 blur-[100px]" />

            {/* ── big marquee city strip ──────────────────────────────────── */}
            <div className="relative border-b border-white/6 py-5 overflow-hidden">
                <div className="flex whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
                    {[...CITIES_MARQUEE, ...CITIES_MARQUEE].map((c, i) => (
                        <span key={i} className="mx-6 text-sm font-bold uppercase tracking-[0.25em] text-white/65 select-none">
                            {c}
                            <span className="ml-6 text-orange-500/30">·</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── main content ───────────────────────────────────────────── */}
            <div className="relative px-6 pt-20 pb-10">

                {/* TOP: brand + nav + newsletter */}
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.8fr_1fr_1fr_1fr] lg:gap-10 mb-20">

                    {/* Brand */}
                    <div>
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/12">
                                <Sparkles size={18} className="text-orange-300" />
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-[0.35em] text-white/35 leading-none mb-1">Noctis</span>
                                <span className="block text-xl font-black text-white leading-none">NapoliNights</span>
                            </div>
                        </div>

                        <p className="text-[15px] leading-relaxed text-white/40 mb-8 max-w-xs">
                            La piattaforma per scoprire i migliori locali e serate a Napoli.
                            Filtra per mood, trova il tuo posto.
                        </p>

                        {/* Socials */}
                        <div className="flex gap-2">
                            {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                                <a key={label} href={href} aria-label={label}
                                    className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 transition-all duration-300 hover:border-white/20 hover:bg-white/10 overflow-hidden">
                                    <Icon size={16} className="relative z-10 text-white/40 transition-colors duration-300 group-hover:text-white" />
                                    {/* color flash on hover */}
                                    <span className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-xl"
                                        style={{ background: color }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav columns */}
                    {Object.entries(NAV).map(([cat, links]) => (
                        <div key={cat}>
                            <p className="mb-5 text-[11px] font-black uppercase tracking-[0.3em] text-white/25">{cat}</p>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" onClick={(e) => { e.preventDefault(); navigate(ROUTES[cat][link]); }}
                                            className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-white/45 transition-all duration-200 hover:text-white">
                                            <span className="relative">
                                                {link}
                                                <span className="absolute -bottom-px left-0 h-px w-0 bg-orange-400 transition-all duration-300 group-hover:w-full" />
                                            </span>
                                            <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-0.5 transition-all duration-200" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* NEWSLETTER — editorial style */}
                <div className="relative mb-16 overflow-hidden rounded-4xl border border-white/8 bg-white/3">
                    {/* decorative slash lines */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
                    {/* glow spot */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-orange-500/20 blur-3xl" />

                    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-8 py-10">
                        <div className="max-w-sm">
                            <span className="mb-3 inline-block text-[10px] font-black uppercase tracking-[0.35em] text-orange-400">Newsletter</span>
                            <h3 className="text-2xl font-black text-white leading-tight mb-2">
                                Le migliori serate<br />
                                <span className="text-white/40">direttamente nell'inbox</span>
                            </h3>
                        </div>
                        <div className="w-full md:w-auto">
                            {sent ? (
                                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4">
                                    <span className="text-emerald-400 font-bold">✓ Iscritto!</span>
                                    <span className="text-white/50 text-sm">Ci vediamo in inbox.</span>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                                        placeholder="tua@email.com"
                                        className="w-full sm:w-64 rounded-2xl border border-white/10 bg-white/6 px-5 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-orange-500/40 focus:bg-white/10 transition-all"
                                    />
                                    <button onClick={handleSubscribe}
                                        className="group relative overflow-hidden rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.97]">
                                        <span className="relative z-10">Iscriviti</span>
                                        <span className="absolute inset-0 -translate-x-full bg-white/15 group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── divider ─── */}
                <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

                {/* BOTTOM BAR */}
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    {/* Left: city + tagline */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[13px] text-white/25">
                            <MapPin size={13} className="text-orange-500/60" />
                            <span>Napoli, Italia</span>
                        </div>
                        <span className="text-white/10">·</span>
                        <div className="flex items-center gap-1.5 text-[13px] text-white/25">
                            <span>Made with</span>
                            <Heart size={12} className="text-pink-500/70 fill-pink-500/70" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                            <span>in Napoli</span>
                        </div>
                    </div>

                    {/* Center: copyright */}
                    <p className="text-[12px] font-medium text-white/20 tracking-wide order-last md:order-0">
                        © {year} NapoliNights · Tutti i diritti riservati
                    </p>

                    {/* Right: legal links */}
                    <div className="flex items-center gap-5">
                        {['Privacy', 'Termini', 'Cookie'].map((l) => (
                            <a key={l} href="#" onClick={(e) => { e.preventDefault(); if (l === 'Privacy') navigate('/privacy'); else if (l === 'Termini') navigate('/terms'); }} className="text-[12px] text-white/25 transition-colors hover:text-white/60">{l}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── bottom edge glow ───────────────────────────────────────── */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
                @keyframes marquee {
                    from { transform: translateX(0) }
                    to   { transform: translateX(-50%) }
                }
            `}</style>
        </footer>
    );
}
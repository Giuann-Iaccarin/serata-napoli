/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ChevronLeft, ExternalLink, Search, X, Info,
    UtensilsCrossed, Leaf, Flame, Star, ChevronDown,
} from "lucide-react";
import { getVenueById } from "../data/mockVenues";

// ─── Font loader ──────────────────────────────────────────────────────────────

const FONT_URLS = {
    elegante: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap",
    bistrot: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap",
    street: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;500;600;700&display=swap",
};

function useFonts(type) {
    useEffect(() => {
        const id = `menu-fonts-${type}`;
        if (document.getElementById(id)) return;
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = FONT_URLS[type] ?? FONT_URLS.elegante;
        document.head.appendChild(link);
    }, [type]);
}

// ─── Theme configs ────────────────────────────────────────────────────────────

const THEMES = {
    elegante: {
        // fonts
        displayFont: "'Cormorant Garamond', serif",
        bodyFont: "'DM Sans', sans-serif",
        // wrappers
        pageBg: "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(180,120,40,0.08) 0%, transparent 60%), linear-gradient(to bottom, #0a0d14, #0d1018, #0a0c12)",
        pageText: "text-white",
        maxWidth: "max-w-xl",
        // item row
        itemNameCls: "text-white/90 text-lg",
        itemPriceCls: "text-amber-300/90 text-lg tabular-nums",
        itemDescCls: "text-white/30 text-sm",
        itemBorderCls: "border-b border-white/[0.06]",
        itemHoverCls: "hover:bg-transparent",
        // expanded detail
        detailBg: "bg-black/30 border border-amber-400/10",
        // category header
        catHeaderCls: null, // handled inline
        // search
        searchBg: "bg-white/[0.04] border-white/[0.08] focus:border-amber-400/30",
        searchText: "text-white placeholder-white/15",
        // back button
        backCls: "text-white/25 hover:text-white/60",
        // nav pill active / inactive
        navActive: "bg-amber-400/15 border-amber-400/40 text-amber-300",
        navInactive: "bg-white/[0.04] border-white/[0.08] text-white/40 hover:text-white/60",
        // misc
        accentColor: "amber",
        grain: true,
    },
    bistrot: {
        displayFont: "'Playfair Display', serif",
        bodyFont: "'Lato', sans-serif",
        pageBg: "#f2ece0",
        pageText: "text-stone-800",
        maxWidth: "max-w-2xl",
        itemNameCls: "text-stone-800 text-[17px]",
        itemPriceCls: "text-[#c4522a] font-bold text-base tabular-nums",
        itemDescCls: "text-stone-400 text-sm",
        itemBorderCls: "border-b border-stone-200",
        itemHoverCls: "hover:bg-stone-100/60",
        detailBg: "bg-white border border-stone-200 shadow-sm",
        catHeaderCls: null,
        searchBg: "bg-white border-stone-300 focus:border-[#c4522a]",
        searchText: "text-stone-700 placeholder-stone-300",
        backCls: "text-stone-400 hover:text-stone-700",
        navActive: "bg-[#c4522a] border-[#c4522a] text-white",
        navInactive: "bg-white border-stone-200 text-stone-400 hover:text-stone-600",
        accentColor: "terracotta",
        grain: false,
    },
    street: {
        displayFont: "'Bebas Neue', sans-serif",
        bodyFont: "'Barlow Condensed', sans-serif",
        pageBg: "#0f0f0f",
        pageText: "text-white",
        maxWidth: "max-w-2xl",
        itemNameCls: "text-white text-2xl tracking-wide uppercase",
        itemPriceCls: "text-[#f5c842] text-xl font-bold tabular-nums tracking-wide",
        itemDescCls: "text-white/40 text-sm",
        itemBorderCls: "border-b border-white/[0.08]",
        itemHoverCls: "hover:bg-white/[0.03]",
        detailBg: "bg-[#1a1a1a] border border-white/10",
        catHeaderCls: null,
        searchBg: "bg-white/5 border-white/10 focus:border-[#f5c842]/50",
        searchText: "text-white placeholder-white/20",
        backCls: "text-white/25 hover:text-white/60",
        navActive: "bg-[#f5c842] border-[#f5c842] text-black",
        navInactive: "bg-white/5 border-white/10 text-white/40 hover:text-white/70",
        accentColor: "yellow",
        grain: false,
    },
};

// ─── Shared allergen map ──────────────────────────────────────────────────────

const ALLERGEN_MAP = {
    glutine: "text-amber-600   border-amber-300   bg-amber-50",
    latte: "text-blue-600    border-blue-300    bg-blue-50",
    uova: "text-yellow-600  border-yellow-300  bg-yellow-50",
    soia: "text-emerald-600 border-emerald-300 bg-emerald-50",
    fruttasecca: "text-orange-600  border-orange-300  bg-orange-50",
    pesce: "text-cyan-600    border-cyan-300    bg-cyan-50",
    crostacei: "text-red-600     border-red-300     bg-red-50",
    solfiti: "text-purple-600  border-purple-300  bg-purple-50",
};
// dark-mode overrides for elegante/street
const ALLERGEN_MAP_DARK = {
    glutine: "text-amber-300/80  border-amber-400/20  bg-amber-400/8",
    latte: "text-blue-300/80   border-blue-400/20   bg-blue-400/8",
    uova: "text-yellow-300/80 border-yellow-400/20 bg-yellow-400/8",
    soia: "text-emerald-300/80 border-emerald-400/20 bg-emerald-400/8",
    fruttasecca: "text-orange-300/80 border-orange-400/20 bg-orange-400/8",
    pesce: "text-cyan-300/80   border-cyan-400/20   bg-cyan-400/8",
    crostacei: "text-red-300/80    border-red-400/20    bg-red-400/8",
    solfiti: "text-purple-300/80 border-purple-400/20 bg-purple-400/8",
};

function allergenCls(a, dark) {
    const map = dark ? ALLERGEN_MAP_DARK : ALLERGEN_MAP;
    return map[a?.toLowerCase()] ?? (dark ? "text-white/40 border-white/10 bg-white/5" : "text-stone-500 border-stone-300 bg-stone-50");
}

// ─── Item badge ───────────────────────────────────────────────────────────────

function ItemBadge({ tag, type }) {
    if (!tag) return null;
    const isDark = type !== "bistrot";
    const map = {
        vegan: { icon: Leaf, label: "Vegan", cls: isDark ? "text-emerald-400 border-emerald-400/25 bg-emerald-400/8" : "text-emerald-700 border-emerald-300 bg-emerald-50" },
        vegetariano: { icon: Leaf, label: "Veg", cls: isDark ? "text-green-400 border-green-400/25 bg-green-400/8" : "text-green-700 border-green-300 bg-green-50" },
        piccante: { icon: Flame, label: "Piccante", cls: isDark ? "text-red-400 border-red-400/25 bg-red-400/8" : "text-red-600 border-red-300 bg-red-50" },
        novita: { icon: Star, label: "Novità", cls: isDark ? "text-amber-400 border-amber-400/25 bg-amber-400/8" : "text-amber-700 border-amber-300 bg-amber-50" },
    };
    const cfg = map[tag.toLowerCase()];
    if (!cfg) return null;
    const Icon = cfg.icon;
    return (
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold border ${cfg.cls}`}>
            <Icon size={9} />{cfg.label}
        </span>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE: ELEGANTE
// ═══════════════════════════════════════════════════════════════════════════════

function EleganteHeader({ venue }) {
    const t = THEMES.elegante;
    return (
        <header className="text-center py-10 pb-4">
            <div className="flex items-center gap-3 justify-center mb-6">
                <div className="h-px w-16 bg-linear-to-rrom-transparent to-amber-400/30" />
                <span className="text-amber-400/50 text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: t.bodyFont, fontWeight: 400 }}>Menu</span>
                <div className="h-px w-16 bg-linear-to-l from-transparent to-amber-400/30" />
            </div>
            <h1 className="text-5xl text-white/95 leading-tight tracking-wide mb-2" style={{ fontFamily: t.displayFont, fontWeight: 300 }}>
                {venue?.name ?? "Locale"}
            </h1>
            {venue?.zone && (
                <p className="text-white/25 text-sm tracking-[0.2em] uppercase" style={{ fontFamily: t.bodyFont, fontWeight: 300 }}>
                    {venue.zone}, Napoli
                </p>
            )}
            <div className="flex items-center gap-2 justify-center mt-6">
                <div className="h-px flex-1 max-w-15 bg-amber-400/20" />
                <span className="text-amber-400/40 text-base">✦</span>
                <div className="h-px flex-1 max-w-15 bg-amber-400/20" />
            </div>
        </header>
    );
}

function EleganteCategoryDivider({ label }) {
    const t = THEMES.elegante;
    return (
        <div className="flex items-center gap-4 py-8 px-2">
            <div className="flex-1 h-px bg-linear-to-r from-transparent to-amber-400/25" />
            <div className="flex items-center gap-3">
                <span className="text-amber-400/40 text-xs">◆</span>
                <p className="text-amber-300/80 text-xl tracking-[0.2em] uppercase" style={{ fontFamily: t.displayFont, fontWeight: 300, fontStyle: "italic" }}>
                    {label}
                </p>
                <span className="text-amber-400/40 text-xs">◆</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent to-amber-400/25" />
        </div>
    );
}

function EleganteItem({ item, index }) {
    const [open, setOpen] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const hasImage = !!item.image;
    const t = THEMES.elegante;
    const delay = `${(index % 8) * 40}ms`;

    return (
        <div style={{ opacity: 0, animation: `fadeUp 0.4s ease forwards ${delay}` }}>
            <button
                onClick={() => hasImage && setOpen(v => !v)}
                className={`w-full text-left py-4 border-b border-white/6 transition-colors duration-200 ${hasImage ? "cursor-pointer" : "cursor-default"}`}
            >
                <div className="flex items-baseline gap-0">
                    <span className="text-white/90 text-lg leading-snug shrink-0 hover:text-amber-100 transition-colors" style={{ fontFamily: t.displayFont, fontWeight: 400 }}>
                        {item.name}
                    </span>
                    {item.tag && <span className="ml-2 shrink-0 relative -top-px"><ItemBadge tag={item.tag} type="elegante" /></span>}
                    <span className="flex-1 mx-3 mb-1 border-b border-dotted border-white/10 hover:border-amber-400/20 transition-colors min-w-5" aria-hidden />
                    {item.price
                        ? <span className="text-amber-300/90 shrink-0 text-lg tabular-nums" style={{ fontFamily: t.displayFont, fontWeight: 600 }}>{item.price}</span>
                        : <span className="text-white/15 shrink-0 text-sm">—</span>
                    }
                    {hasImage && (
                        <span className={`ml-3 text-white/20 text-xs transition-all duration-300 shrink-0 ${open ? "rotate-180 text-amber-400/50" : ""}`}>▾</span>
                    )}
                </div>
                {item.description && (
                    <p className="mt-0.5 text-white/30 text-sm leading-snug line-clamp-1" style={{ fontFamily: t.bodyFont, fontWeight: 300 }}>
                        {item.description}
                    </p>
                )}
            </button>

            {open && hasImage && (
                <div className="mb-4 rounded-2xl overflow-hidden border border-amber-400/10 bg-black/30">
                    <div className={`relative w-full overflow-hidden transition-all duration-500 ${imgLoaded ? "h-52" : "h-0"}`}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                            onLoad={() => setImgLoaded(true)} onError={(e) => { e.target.parentElement.style.display = "none"; }} />
                        <div className="absolute inset-0 bg-linear-to-trom-black/70 via-transparent to-transparent" />
                        <p className="absolute bottom-3 left-4 text-white/80 text-2xl" style={{ fontFamily: t.displayFont, fontStyle: "italic", fontWeight: 300 }}>
                            {item.name}
                        </p>
                    </div>
                    {(item.description || (item.allergens?.length > 0)) && (
                        <div className="px-5 py-4 space-y-3">
                            {item.description && <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: t.bodyFont, fontWeight: 300 }}>{item.description}</p>}
                            {item.allergens?.length > 0 && (
                                <div className="pt-2 border-t border-white/5">
                                    <p className="text-white/20 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1" style={{ fontFamily: t.bodyFont }}>
                                        <Info size={9} /> Allergeni
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.allergens.map((a, i) => (
                                            <span key={i} className={`px-2 py-0.5 rounded-full text-[11px] border ${allergenCls(a, true)}`} style={{ fontFamily: t.bodyFont }}>{a}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE: BISTROT
// ═══════════════════════════════════════════════════════════════════════════════

function BistrotHeader({ venue }) {
    const t = THEMES.bistrot;
    return (
        <header className="text-center py-10">
            {/* Decorative plate-style ring */}
            <div className="w-20 h-20 mx-auto mb-5 rounded-full border-2 border-[#c4522a]/30 flex items-center justify-center bg-[#c4522a]/5">
                <UtensilsCrossed size={28} className="text-[#c4522a]/60" />
            </div>
            <p className="text-[#c4522a]/70 text-xs tracking-[0.35em] uppercase mb-2" style={{ fontFamily: t.bodyFont, fontWeight: 700 }}>
                Carta dei Piatti
            </p>
            <h1 className="text-5xl text-stone-800 leading-tight mb-1" style={{ fontFamily: t.displayFont, fontWeight: 700 }}>
                {venue?.name ?? "Locale"}
            </h1>
            {venue?.zone && (
                <p className="text-stone-400 text-sm" style={{ fontFamily: t.bodyFont, fontWeight: 300 }}>
                    {venue.zone} · Napoli
                </p>
            )}
            {/* Wavy underline */}
            <div className="mt-5 flex justify-center">
                <svg width="120" height="8" viewBox="0 0 120 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 4 Q15 0 30 4 Q45 8 60 4 Q75 0 90 4 Q105 8 120 4" stroke="#c4522a" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
                </svg>
            </div>
        </header>
    );
}

function BistrotCategoryDivider({ label }) {
    const t = THEMES.bistrot;
    return (
        <div className="py-6 px-2">
            <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-stone-300" />
                <span className="text-[#c4522a] text-[10px] tracking-[0.3em] uppercase font-bold px-2" style={{ fontFamily: t.bodyFont }}>
                    {label}
                </span>
                <div className="flex-1 h-px bg-stone-300" />
            </div>
        </div>
    );
}

function BistrotItem({ item, index }) {
    const [open, setOpen] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const hasImage = !!item.image;
    const t = THEMES.bistrot;
    const delay = `${(index % 8) * 40}ms`;

    return (
        <div
            className={`group rounded-xl mb-2 overflow-hidden transition-shadow duration-200 ${hasImage ? "hover:shadow-md cursor-pointer" : ""}`}
            style={{ opacity: 0, animation: `fadeUp 0.4s ease forwards ${delay}` }}
        >
            <button
                onClick={() => hasImage && setOpen(v => !v)}
                className={`w-full text-left px-4 py-3.5 flex items-start gap-3 border border-transparent transition-all duration-200 rounded-xl
                    ${hasImage ? "hover:border-stone-200 hover:bg-white" : ""}`}
            >
                {/* Left: name + desc */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-stone-800 text-[17px] leading-snug" style={{ fontFamily: t.displayFont, fontWeight: 400 }}>
                            {item.name}
                        </span>
                        {item.tag && <ItemBadge tag={item.tag} type="bistrot" />}
                    </div>
                    {item.description && (
                        <p className="text-stone-400 text-sm mt-0.5 leading-snug line-clamp-2" style={{ fontFamily: t.bodyFont, fontWeight: 300 }}>
                            {item.description}
                        </p>
                    )}
                </div>
                {/* Right: price + chevron */}
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                    {item.price && (
                        <span className="text-[#c4522a] font-bold text-base tabular-nums" style={{ fontFamily: t.bodyFont }}>
                            {item.price}
                        </span>
                    )}
                    {hasImage && (
                        <ChevronDown size={14} className={`text-stone-300 group-hover:text-[#c4522a] transition-all duration-300 ${open ? "rotate-180 text-[#c4522a]" : ""}`} />
                    )}
                </div>
            </button>

            {open && hasImage && (
                <div className="mx-0 mb-2 rounded-xl overflow-hidden bg-white border border-stone-200 shadow-sm">
                    <div className={`relative overflow-hidden transition-all duration-500 ${imgLoaded ? "h-48" : "h-0"}`}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                            onLoad={() => setImgLoaded(true)} onError={(e) => { e.target.parentElement.style.display = "none"; }} />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    </div>
                    {(item.description || item.allergens?.length > 0) && (
                        <div className="px-4 py-4 space-y-2">
                            {item.description && (
                                <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: t.bodyFont, fontWeight: 300 }}>
                                    {item.description}
                                </p>
                            )}
                            {item.allergens?.length > 0 && (
                                <div>
                                    <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1.5 flex items-center gap-1" style={{ fontFamily: t.bodyFont }}>
                                        <Info size={9} /> Allergeni
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.allergens.map((a, i) => (
                                            <span key={i} className={`px-2 py-0.5 rounded-full text-[11px] border ${allergenCls(a, false)}`} style={{ fontFamily: t.bodyFont }}>{a}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Separator */}
            {!open && <div className="mx-4 h-px bg-stone-200/70" />}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLE: STREET
// ═══════════════════════════════════════════════════════════════════════════════

function StreetHeader({ venue }) {
    const t = THEMES.street;
    return (
        <header className="pt-10 pb-6">
            <div className="flex items-center gap-2 mb-3">
                <div className="h-1 w-8 bg-[#f5c842]" />
                <span className="text-[#f5c842] text-xs tracking-[0.35em] uppercase" style={{ fontFamily: t.bodyFont, fontWeight: 700 }}>
                    Menù
                </span>
            </div>
            <h1 className="text-7xl leading-none text-white mb-1" style={{ fontFamily: t.displayFont, letterSpacing: "0.02em" }}>
                {venue?.name ?? "Locale"}
            </h1>
            {venue?.zone && (
                <p className="text-white/30 text-sm uppercase tracking-widest" style={{ fontFamily: t.bodyFont, fontWeight: 500 }}>
                    {venue.zone} · Napoli
                </p>
            )}
            {/* Bold rule */}
            <div className="mt-5 h-0.5 bg-linear-to-r from-[#f5c842] via-[#f5c842]/40 to-transparent" />
        </header>
    );
}

function StreetCategoryDivider({ label }) {
    const t = THEMES.street;
    return (
        <div className="pt-8 pb-4">
            <p className="text-[#f5c842] text-3xl leading-none" style={{ fontFamily: t.displayFont, letterSpacing: "0.05em" }}>
                {label.toUpperCase()}
            </p>
            <div className="mt-1 h-px bg-white/10" />
        </div>
    );
}

function StreetItem({ item, index }) {
    const [open, setOpen] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const hasImage = !!item.image;
    const t = THEMES.street;
    const delay = `${(index % 8) * 35}ms`;

    return (
        <div style={{ opacity: 0, animation: `fadeUp 0.35s ease forwards ${delay}` }}>
            <button
                onClick={() => hasImage && setOpen(v => !v)}
                className={`w-full text-left py-4 border-b border-white/[0.07] flex items-start gap-4 transition-colors duration-150
                    ${hasImage ? "cursor-pointer hover:bg-white/2.5" : "cursor-default"}`}
            >
                <div className="flex-1 min-w-0">
                    {/* Name row */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-white text-2xl leading-tight uppercase tracking-wide" style={{ fontFamily: t.displayFont }}>
                            {item.name}
                        </span>
                        {item.tag && <ItemBadge tag={item.tag} type="street" />}
                    </div>
                    {/* Description always visible */}
                    {item.description && (
                        <p className="text-white/35 text-sm mt-1 leading-snug line-clamp-2" style={{ fontFamily: t.bodyFont, fontWeight: 400 }}>
                            {item.description}
                        </p>
                    )}
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1.5 pt-0.5">
                    {item.price && (
                        <span
                            className="text-[#f5c842] text-xl font-bold tabular-nums"
                            style={{ fontFamily: t.displayFont }}
                        >
                            {item.price}
                        </span>
                    )}
                    {hasImage && (
                        <span className={`text-white/20 text-xs transition-all duration-300 ${open ? "rotate-180 text-[#f5c842]/60" : ""}`}>▾</span>
                    )}
                </div>
            </button>

            {open && hasImage && (
                <div className="mb-1 rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/10">
                    <div className={`relative overflow-hidden transition-all duration-500 ${imgLoaded ? "h-52" : "h-0"}`}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                            onLoad={() => setImgLoaded(true)} onError={(e) => { e.target.parentElement.style.display = "none"; }} />
                        {/* Bold overlay with name */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                        <p className="absolute bottom-3 left-4 text-white text-3xl uppercase leading-none" style={{ fontFamily: t.displayFont }}>
                            {item.name}
                        </p>
                    </div>
                    {item.allergens?.length > 0 && (
                        <div className="px-4 py-3">
                            <p className="text-white/20 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1" style={{ fontFamily: t.bodyFont }}>
                                <Info size={9} /> Allergeni
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {item.allergens.map((a, i) => (
                                    <span key={i} className={`px-2 py-0.5 rounded-full text-[11px] border ${allergenCls(a, true)}`} style={{ fontFamily: t.bodyFont }}>{a}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED: search, nav, empty state, category layout
// ═══════════════════════════════════════════════════════════════════════════════

function SearchBar({ value, onChange, type }) {
    const t = THEMES[type];
    return (
        <div className="relative">
            <Search size={14} className={`absolute left-4 top-1/2 -translate-y-1/2 opacity-40 ${type === "bistrot" ? "text-stone-500" : "text-white"}`} />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Cerca nel menu…"
                className={`w-full border rounded-2xl pl-11 pr-10 py-3 text-sm outline-none transition-all duration-200 ${t.searchBg} ${t.searchText}`}
                style={{ fontFamily: t.bodyFont, fontWeight: 300 }}
            />
            {value && (
                <button onClick={() => onChange("")} className={`absolute right-3.5 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-70 transition-opacity ${type === "bistrot" ? "text-stone-600" : "text-white"}`}>
                    <X size={13} />
                </button>
            )}
        </div>
    );
}

function CategoryNav({ categories, activeIdx, onSelect, type }) {
    if (categories.length < 2) return null;
    const t = THEMES[type];
    return (
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(i)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border whitespace-nowrap
                        ${activeIdx === i ? t.navActive : t.navInactive}`}
                    style={{ fontFamily: t.bodyFont, fontWeight: 600 }}
                >
                    {cat.category ?? cat.name}
                </button>
            ))}
        </div>
    );
}

function EmptyState({ message, sub, type }) {
    const t = THEMES[type];
    const isBistrot = type === "bistrot";
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            {type === "elegante" && <span className="text-4xl text-amber-400/20 mb-4" style={{ fontFamily: t.displayFont }}>✦</span>}
            {type === "bistrot" && <UtensilsCrossed size={32} className="text-stone-300 mb-4" />}
            {type === "street" && <span className="text-5xl text-white/10 mb-4" style={{ fontFamily: t.displayFont }}>—</span>}
            <p className={`text-base ${isBistrot ? "text-stone-400" : "text-white/30"}`}
                style={{ fontFamily: t.displayFont, fontStyle: type === "elegante" ? "italic" : "normal" }}>
                {message}
            </p>
            {sub && <p className={`text-sm mt-1 ${isBistrot ? "text-stone-300" : "text-white/15"}`} style={{ fontFamily: t.bodyFont, fontWeight: 300 }}>{sub}</p>}
        </div>
    );
}

// Category section wrapper — picks correct item + divider per type
function CategorySection({ category, searchQuery, type }) {
    const items = Array.isArray(category.items) ? category.items : [];
    const filtered = searchQuery
        ? items.filter(i => i.name?.toLowerCase().includes(searchQuery) || i.description?.toLowerCase().includes(searchQuery))
        : items;
    if (filtered.length === 0) return null;
    const label = category.category ?? category.name ?? "Altro";

    const Divider = type === "elegante" ? EleganteCategoryDivider
        : type === "bistrot" ? BistrotCategoryDivider
            : StreetCategoryDivider;

    const Item = type === "elegante" ? EleganteItem
        : type === "bistrot" ? BistrotItem
            : StreetItem;

    return (
        <section>
            <Divider label={label} />
            <div>
                {filtered.map((item, i) => <Item key={item.id ?? i} item={item} index={i} />)}
            </div>
        </section>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function MenuPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [activeNav, setActiveNav] = useState(0);

    const venue = getVenueById ? getVenueById(id) : null;

    // Resolve type: venue.menuType, fallback "elegante"
    const type = ["elegante", "bistrot", "street"].includes(venue?.menuType) ? venue.menuType : "elegante";

    useFonts(type);

    const t = THEMES[type];
    const menu = venue?.menu;

    const isCategorized = Array.isArray(menu) && menu.length > 0 && Array.isArray(menu[0]?.items);
    const isFlat = Array.isArray(menu) && menu.length > 0 && !isCategorized;
    const isUrl = typeof menu === "string";
    const isEmpty = !menu || (Array.isArray(menu) && menu.length === 0);

    const q = search.toLowerCase().trim();

    const flatFiltered = isFlat
        ? (q ? menu.filter(i => i.name?.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)) : menu)
        : [];

    const totalItems = isCategorized
        ? menu.reduce((n, c) => n + (Array.isArray(c.items) ? c.items.length : 0), 0)
        : isFlat ? menu.length : 0;

    const scrollToCategory = (idx) => {
        setActiveNav(idx);
        document.getElementById(`menu-cat-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };


    // Per-type back button label/color
    const isBistrot = type === "bistrot";

    // Page background
    const pageStyle = typeof t.pageBg === "string" && t.pageBg.startsWith("#")
        ? { backgroundColor: t.pageBg }
        : { background: t.pageBg };

    // Item component
    const ItemComp = type === "elegante" ? EleganteItem : type === "bistrot" ? BistrotItem : StreetItem;
    const Header = type === "elegante" ? EleganteHeader : type === "bistrot" ? BistrotHeader : StreetHeader;

    // Funzione per tornare alla pagina del locale
    const handleBackToVenue = () => {
        if (venue?.id) {
            navigate(`/venue/${venue.id}`);
        } else {
            navigate(-1);
        }
    };

    return (
        <>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                /* bistrot texture */
                .bistrot-texture {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23f2ece0'/%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E");
                }
                /* grain for elegante */
                .menu-grain {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
                    background-repeat: repeat;
                }
            `}</style>

            <div className={`min-h-screen relative ${t.pageText} ${type === "bistrot" ? "bistrot-texture" : ""}`} style={pageStyle}>

                {/* Elegante grain */}
                {t.grain && (
                    <div className="fixed inset-0 pointer-events-none opacity-[0.025] menu-grain" />
                )}
                {/* Elegante warm glow */}
                {type === "elegante" && (
                    <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(180,120,40,0.08) 0%, transparent 60%)" }} />
                )}
                {/* Street grid lines */}
                {type === "street" && (
                    <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
                    />
                )}

                <div className={`${t.maxWidth} mx-auto px-5 relative z-10`}>

                    {/* Back */}
                    <div className="pt-8 pb-2">
                        <button
                            onClick={handleBackToVenue}
                            className={`group flex items-center gap-2 transition-colors duration-200 text-sm ${t.backCls}`}
                            style={{ fontFamily: t.bodyFont, fontWeight: 300 }}
                        >
                            <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                            Torna al locale
                        </button>
                    </div>

                    {/* Header */}
                    <Header venue={venue} />

                    {/* External link */}
                    {venue?.menuUrl && (
                        <div className="flex justify-center mb-6">
                            <a
                                href={venue.menuUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${type === "elegante" ? "text-amber-400/50 hover:text-amber-400/80 border-b border-amber-400/20 hover:border-amber-400/50 pb-0.5"
                                    : type === "bistrot" ? "text-[#c4522a]/60 hover:text-[#c4522a] border-b border-[#c4522a]/20 hover:border-[#c4522a]/60 pb-0.5"
                                        : "text-[#f5c842]/50 hover:text-[#f5c842]/80 border-b border-[#f5c842]/20 hover:border-[#f5c842]/40 pb-0.5"
                                    }`}
                                style={{ fontFamily: t.bodyFont, fontWeight: 300 }}
                            >
                                Scarica menu completo <ExternalLink size={10} />
                            </a>
                        </div>
                    )}

                    {/* URL only */}
                    {isUrl && (
                        <div className="my-8">
                            <a href={menu} target="_blank" rel="noopener noreferrer"
                                className={`group flex items-center justify-between w-full p-5 rounded-2xl border transition-all duration-300 ${type === "elegante" ? "border-amber-400/15 hover:border-amber-400/35 bg-amber-400/3 hover:bg-amber-400/6"
                                    : type === "bistrot" ? "border-stone-200 hover:border-[#c4522a]/40 bg-white hover:shadow-sm"
                                        : "border-white/10 hover:border-[#f5c842]/30 bg-white/5 hover:bg-white/8"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${type === "bistrot" ? "bg-[#c4522a]/10 border border-[#c4522a]/20" : "bg-amber-400/10 border border-amber-400/20"
                                        }`}>
                                        <UtensilsCrossed size={18} className={type === "bistrot" ? "text-[#c4522a]/70" : "text-amber-400/70"} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm" style={{ fontFamily: t.bodyFont }}>Visualizza il menu completo</p>
                                        <p className={`text-xs mt-0.5 ${isBistrot ? "text-stone-400" : "text-white/30"}`} style={{ fontFamily: t.bodyFont, fontWeight: 300 }}>Si apre in una nuova scheda</p>
                                    </div>
                                </div>
                                <ExternalLink size={15} className={`transition-colors shrink-0 ${isBistrot ? "text-stone-300 group-hover:text-[#c4522a]" : "text-white/20 group-hover:text-amber-400/60"}`} />
                            </a>
                        </div>
                    )}

                    {isEmpty && <EmptyState message="Nessun menu disponibile" sub="Il locale non ha ancora pubblicato il menu" type={type} />}

                    {(isFlat || isCategorized) && (
                        <>
                            {/* Search */}
                            {totalItems > 6 && (
                                <div className="mb-5">
                                    <SearchBar value={search} onChange={setSearch} type={type} />
                                </div>
                            )}

                            {/* Category quick-nav */}
                            {isCategorized && !q && (
                                <div className="mb-2">
                                    <CategoryNav categories={menu} activeIdx={activeNav} onSelect={scrollToCategory} type={type} />
                                </div>
                            )}

                            {/* Flat */}
                            {isFlat && (
                                flatFiltered.length === 0
                                    ? <EmptyState message={`Nessun risultato per "${search}"`} type={type} />
                                    : <div className="py-2">{flatFiltered.map((item, i) => <ItemComp key={item.id ?? i} item={item} index={i} />)}</div>
                            )}

                            {/* Categorized */}
                            {isCategorized && menu.map((cat, i) => (
                                <div key={cat.id ?? i} id={`menu-cat-${i}`}>
                                    <CategorySection category={cat} searchQuery={q} type={type} />
                                </div>
                            ))}
                        </>
                    )}

                    {/* Footer */}
                    {(isFlat || isCategorized) && (
                        <footer className="py-12 text-center space-y-3">
                            {type === "elegante" && (
                                <>
                                    <div className="flex items-center gap-3 justify-center">
                                        <div className="h-px flex-1 bg-white/5" />
                                        <span className="text-white/10 text-xs" style={{ fontFamily: t.displayFont }}>✦</span>
                                        <div className="h-px flex-1 bg-white/5" />
                                    </div>
                                    <p className="text-white/15 text-xs leading-relaxed" style={{ fontFamily: t.bodyFont, fontWeight: 300 }}>
                                        Prezzi e disponibilità possono variare.<br />Comunicare eventuali allergie al personale.
                                    </p>
                                </>
                            )}
                            {type === "bistrot" && (
                                <p className="text-stone-300 text-xs leading-relaxed" style={{ fontFamily: t.bodyFont, fontStyle: "italic" }}>
                                    I prezzi sono da intendersi IVA inclusa.<br />Si prega di comunicare eventuali intolleranze al personale.
                                </p>
                            )}
                            {type === "street" && (
                                <p className="text-white/15 text-xs uppercase tracking-widest" style={{ fontFamily: t.bodyFont, fontWeight: 500 }}>
                                    Prezzi soggetti a variazione · Comunicare allergie
                                </p>
                            )}
                        </footer>
                    )}

                </div>
            </div>
        </>
    );
}
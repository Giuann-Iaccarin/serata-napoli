import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, MapPin, Users, Clock, Plus, Edit, Trash2,
    Star, Heart, Share2, ChevronRight, Search, X, Save, Loader
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

const PLANNED_SERATE = [
    {
        id: 1,
        title: 'Serata romantica al Vomero',
        date: '2024-01-25',
        time: '20:00',
        status: 'planned',
        venues: [
            { id: 1, name: 'Rooftop 45', category: 'Rooftop Bar', time: '20:00 – 22:00', rating: 4.8 },
            { id: 2, name: 'Bar del Porto', category: 'Cocktail Bar', time: '22:00 – 00:00', rating: 4.6 },
        ],
        participants: 2,
        mood: 'Tranquillo ma vivo',
        notes: 'Cena vista mare e cocktail dopo',
        totalCost: '€80–120'
    },
    {
        id: 2,
        title: 'Notte folle con gli amici',
        date: '2024-01-27',
        time: '22:00',
        status: 'planned',
        venues: [
            { id: 3, name: 'Discoteca Eden', category: 'Discoteca', time: '22:00 – 04:00', rating: 4.4 },
        ],
        participants: 6,
        mood: 'Vogliamo casino',
        notes: 'Compleanno di Marco – massima baldoria!',
        totalCost: '€40–60'
    },
    {
        id: 3,
        title: 'Aperitivo + Live Music',
        date: '2024-01-20',
        time: '18:30',
        status: 'completed',
        venues: [
            { id: 4, name: 'Caffè Gambrinus', category: 'Caffè Storico', time: '18:30 – 20:00', rating: 4.7 },
            { id: 5, name: 'Blue Note', category: 'Live Music', time: '20:30 – 23:00', rating: 4.5 },
        ],
        participants: 4,
        mood: 'Musica live',
        notes: 'Perfetta combinazione aperitivo e concerto',
        totalCost: '€60–80',
        rating: 5
    }
];

const STATUS_CONFIG = {
    planned: { label: 'Pianificata', color: 'bg-blue-500/20 text-blue-300' },
    completed: { label: 'Completata', color: 'bg-emerald-500/20 text-emerald-300' },
    cancelled: { label: 'Annullata', color: 'bg-red-500/20 text-red-300' }
};

const MOOD_OPTIONS = [
    'Tranquillo ma vivo', 'Vogliamo casino', 'Musica live',
    'Aperitivo elegante', 'Serata romantica', 'Uscita tra amici', 'Festa di compleanno'
];

// ── Pianifica Serata Modal ────────────────────────────────────────────────────
function PianificaModal({ onClose, onSave }) {
    const [form, setForm] = useState({
        title: '', date: '', time: '20:00', participants: 2,
        mood: MOOD_OPTIONS[0], notes: '', totalCost: ''
    });
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const set = (key, val) => {
        setForm(f => ({ ...f, [key]: val }));
        setErrors(e => ({ ...e, [key]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Il titolo è obbligatorio';
        if (!form.date) e.date = 'La data è obbligatoria';
        return e;
    };

    const handleSave = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setSaving(true);
        await new Promise(r => setTimeout(r, 700));
        onSave({
            id: Date.now(),
            ...form,
            participants: Number(form.participants),
            status: 'planned',
            venues: []
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0c1224] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20">
                            <Calendar size={20} className="text-orange-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Pianifica una serata</h3>
                    </div>
                    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-white/70">Titolo serata *</label>
                        <input value={form.title} onChange={e => set('title', e.target.value)}
                            placeholder="Es. Aperitivo al Vomero"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none" />
                        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-white/70">Data *</label>
                            <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none" />
                            {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-white/70">Orario</label>
                            <input type="time" value={form.time} onChange={e => set('time', e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none" />
                        </div>
                    </div>

                    {/* Participants + Cost */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-white/70">Partecipanti</label>
                            <input type="number" min={1} max={50} value={form.participants}
                                onChange={e => set('participants', e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none" />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-white/70">Costo stimato</label>
                            <input value={form.totalCost} onChange={e => set('totalCost', e.target.value)}
                                placeholder="Es. €40–60"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none" />
                        </div>
                    </div>

                    {/* Mood */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-white/70">Mood serata</label>
                        <div className="flex flex-wrap gap-2">
                            {MOOD_OPTIONS.map(m => (
                                <button key={m} onClick={() => set('mood', m)}
                                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors
                                        ${form.mood === m
                                            ? 'border-orange-400/50 bg-orange-500/20 text-orange-300'
                                            : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'}`}>
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-white/70">Note</label>
                        <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                            rows={3} placeholder="Aggiungi note, idee, wishlist…"
                            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none" />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button onClick={onClose}
                            className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-white hover:bg-white/10 transition-colors">
                            Annulla
                        </button>
                        <button onClick={handleSave} disabled={saving}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-400 transition-colors disabled:opacity-60">
                            {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                            {saving ? 'Salvataggio…' : 'Crea serata'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Serata Card — uniform height via flex-col ─────────────────────────────────
function SerataCard({ serata, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-orange-400/30 hover:bg-orange-500/5 transition-all duration-300 h-full">

            {/* ── Header ── */}
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-white leading-tight">{serata.title}</h3>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CONFIG[serata.status].color}`}>
                            {STATUS_CONFIG[serata.status].label}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                        <span className="flex items-center gap-1"><Calendar size={13} /> {new Date(serata.date).toLocaleDateString('it-IT')}</span>
                        <span className="flex items-center gap-1"><Clock size={13} /> {serata.time}</span>
                        <span className="flex items-center gap-1"><Users size={13} /> {serata.participants}</span>
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                    <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
                        <Edit size={14} />
                    </button>
                    <button onClick={() => onDelete(serata.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* ── Mood ── */}
            <div className="mb-4">
                <span className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-300">{serata.mood}</span>
            </div>

            {/* ── Venues — fixed height area ── */}
            <div className="mb-4 flex-1 space-y-2">
                {serata.venues.length > 0 ? (
                    serata.venues.map((venue, idx) => (
                        <div key={venue.id} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/20">
                                    <span className="text-xs font-bold text-orange-300">{idx + 1}</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-white text-sm">{venue.name}</p>
                                    <p className="text-xs text-white/50">{venue.category}</p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2 text-xs text-white/50 ml-2">
                                <span>{venue.time}</span>
                                <span className="flex items-center gap-0.5">
                                    <Star size={11} className="fill-yellow-400 text-yellow-400" /> {venue.rating}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center rounded-xl bg-white/5 px-4 py-4 text-sm text-white/40">
                        Nessun locale aggiunto ancora
                    </div>
                )}
            </div>

            {/* ── Notes + Cost ── */}
            <div className="mb-4 flex items-end justify-between gap-4">
                <p className="flex-1 text-sm italic text-white/60 line-clamp-2">
                    {serata.notes ? `"${serata.notes}"` : ''}
                </p>
                <div className="shrink-0 text-right">
                    <p className="text-xs text-white/50">Costo stimato</p>
                    <p className="font-semibold text-white text-sm">{serata.totalCost || '—'}</p>
                </div>
            </div>

            {/* ── Rating (completed) ── */}
            {serata.status === 'completed' && serata.rating && (
                <div className="mb-4 flex items-center gap-2">
                    <span className="text-sm text-white/60">Valutazione:</span>
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < serata.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'} />
                        ))}
                    </div>
                </div>
            )}

            {/* ── Actions — always at bottom ── */}
            <div className="mt-auto flex gap-3 pt-2">
                <button onClick={() => navigate(serata.venues[0] ? `/venue/${serata.venues[0].id}` : '#')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-colors">
                    Vedi locali <ChevronRight size={15} />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Share2 size={17} />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Heart size={17} />
                </button>
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SerateList() {
    const [serate, setSerate] = useState(PLANNED_SERATE);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    const filtered = serate
        .filter(s => {
            const matchFilter = filter === 'all' || s.status === filter;
            const matchSearch =
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.mood.toLowerCase().includes(searchQuery.toLowerCase());
            return matchFilter && matchSearch;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const deleteSerata = id => {
        if (window.confirm('Sei sicuro di voler eliminare questa serata?')) {
            setSerate(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleNewSerata = newSerata => {
        setSerate(prev => [newSerata, ...prev]);
        setShowModal(false);
    };

    const FILTERS = [
        { value: 'all', label: 'Tutte', count: serate.length },
        { value: 'planned', label: 'Pianificate', count: serate.filter(s => s.status === 'planned').length },
        { value: 'completed', label: 'Completate', count: serate.filter(s => s.status === 'completed').length },
    ];

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <UserHeader />

            <section className="relative px-4 py-12">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-3">
                                <Calendar className="h-8 w-8 text-orange-400" />
                                <h1 className="text-3xl font-black text-white">Lista serate</h1>
                            </div>
                            <p className="text-white/60">{serate.length} serate pianificate • Organizza le tue uscite a Napoli</p>
                        </div>
                        <button onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors">
                            <Plus size={18} /> Pianifica serata
                        </button>
                    </div>

                    {/* Controls */}
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                            <input type="text" placeholder="Cerca serate…" value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none" />
                        </div>
                        <div className="flex items-center gap-3">
                            {FILTERS.map(f => (
                                <button key={f.value} onClick={() => setFilter(f.value)}
                                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors
                                        ${filter === f.value ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
                                    {f.label}
                                    <span className={`rounded-full px-2 py-0.5 text-xs ${filter === f.value ? 'bg-white/20 text-white' : 'bg-orange-500/20 text-orange-300'}`}>
                                        {f.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cards — equal-height grid via items-stretch */}
                    {filtered.length > 0 ? (
                        <div className="grid gap-6 items-stretch lg:grid-cols-2 xl:grid-cols-3">
                            {filtered.map(s => (
                                <SerataCard key={s.id} serata={s} onDelete={deleteSerata} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Calendar className="mx-auto mb-4 h-16 w-16 text-white/20" />
                            <h3 className="mb-2 text-xl font-bold text-white">
                                {searchQuery ? 'Nessuna serata trovata' : 'Nessuna serata pianificata'}
                            </h3>
                            <p className="mb-6 text-white/60">
                                {searchQuery ? 'Prova con termini diversi' : 'Inizia a pianificare le tue serate a Napoli'}
                            </p>
                            {!searchQuery && (
                                <button onClick={() => setShowModal(true)}
                                    className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors">
                                    Pianifica la tua prima serata
                                </button>
                            )}
                        </div>
                    )}

                    {/* Stats */}
                    {serate.length > 0 && (
                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            {[
                                { val: serate.filter(s => s.status === 'completed').length, label: 'Serate completate' },
                                { val: serate.filter(s => s.status === 'planned').length, label: 'Serate pianificate' },
                                { val: serate.reduce((sum, s) => sum + s.participants, 0), label: 'Partecipanti totali' },
                            ].map(s => (
                                <div key={s.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl text-center">
                                    <div className="mb-2 text-3xl font-black text-white">{s.val}</div>
                                    <div className="text-white/60">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />

            {showModal && (
                <PianificaModal
                    onClose={() => setShowModal(false)}
                    onSave={handleNewSerata}
                />
            )}
        </main>
    );
}
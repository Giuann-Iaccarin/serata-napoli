/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, Phone, MapPin, Crown, Star,
    Camera, Heart, Bookmark, Clock, Edit2, X,
    CheckCircle, AlertCircle, Save, Loader
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
    if (!toast.show) return null;
    return (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl
            ${toast.type === 'success'
                ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-300'
                : 'border-red-400/40 bg-red-500/20 text-red-300'}`}>
            {toast.type === 'success'
                ? <CheckCircle size={20} className="shrink-0" />
                : <AlertCircle size={20} className="shrink-0" />}
            <p className="font-semibold text-white">{toast.message}</p>
        </div>
    );
}

// ── Edit Field Modal ──────────────────────────────────────────────────────────
function EditModal({ field, label, type, currentValue, onClose, onSave }) {
    const [value, setValue] = useState(currentValue);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const validate = () => {
        if (!value.trim()) return `${label} non può essere vuoto`;
        if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return 'Inserisci un indirizzo email valido';
        if (field === 'phone' && !/^\+?[\d\s\-()+]{6,20}$/.test(value))
            return 'Inserisci un numero di telefono valido';
        return '';
    };

    const handleSave = async () => {
        const err = validate();
        if (err) { setError(err); return; }
        setSaving(true);
        await new Promise(r => setTimeout(r, 700));
        onSave(field, value.trim());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0c1224] p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Modifica {label}</h3>
                    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-white/20 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-white/70">{label}</label>
                        {type === 'textarea' ? (
                            <textarea
                                value={value}
                                onChange={e => { setValue(e.target.value); setError(''); }}
                                rows={4}
                                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                            />
                        ) : (
                            <input
                                type={type}
                                value={value}
                                onChange={e => { setValue(e.target.value); setError(''); }}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                            />
                        )}
                        {error && (
                            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400">
                                <AlertCircle size={13} /> {error}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-3 pt-1">
                        <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-white hover:bg-white/10 transition-colors">
                            Annulla
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-400 transition-colors disabled:opacity-60"
                        >
                            {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                            {saving ? 'Salvataggio…' : 'Salva'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Profile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: 'Marco Esposito',
        email: 'marco@email.it',
        phone: '+39 333 123 4567',
        location: 'Napoli, Italia',
        joinDate: 'Gennaio 2024',
        bio: 'Amante delle serate napoletane, sempre alla ricerca del locale perfetto per ogni mood.',
        preferences: ['Aperitivo + DJ', 'Live Music', 'Rooftop Bar'],
        stats: { venuesVisited: 24, favorites: 12, reviews: 8, seratePlanned: 5 }
    });

    const [modal, setModal] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3500);
    };

    const handleSave = (field, value) => {
        try {
            setProfile(prev => ({ ...prev, [field]: value }));
            const label = modal.label;
            setModal(null);
            showToast(`${label} aggiornato con successo!`, 'success');
        } catch {
            setModal(null);
            showToast('Errore durante il salvataggio. Riprova.', 'error');
        }
    };

    const FIELDS = [
        { field: 'name', label: 'Nome completo', Icon: User, type: 'text' },
        { field: 'email', label: 'Email', Icon: Mail, type: 'email' },
        { field: 'phone', label: 'Telefono', Icon: Phone, type: 'tel' },
        { field: 'location', label: 'Località', Icon: MapPin, type: 'text' },
    ];

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <UserHeader />

            <section className="relative px-4 py-12">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-black text-white">Il mio profilo</h1>
                        <p className="text-white/60">Gestisci le tue informazioni e preferenze</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <div className="text-center">
                                    <div className="relative mx-auto mb-4 h-24 w-24">
                                        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-lg shadow-orange-500/30 ring-4 ring-white/10">
                                            <User size={32} className="text-white" />
                                        </div>
                                        <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg hover:bg-orange-400 transition-colors">
                                            <Camera size={16} />
                                        </button>
                                    </div>
                                    <h2 className="mb-1 text-xl font-bold text-white">{profile.name}</h2>
                                    <p className="mb-4 text-sm text-white/60">{profile.email}</p>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1.5 text-sm text-orange-300">
                                        <Crown size={14} /> Free Plan
                                    </div>
                                </div>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    {[
                                        { val: profile.stats.venuesVisited, label: 'Locali visitati' },
                                        { val: profile.stats.favorites, label: 'Preferiti' },
                                        { val: profile.stats.reviews, label: 'Recensioni' },
                                        { val: profile.stats.seratePlanned, label: 'Serate pianificate' },
                                    ].map(s => (
                                        <div key={s.label} className="text-center">
                                            <div className="text-2xl font-black text-white">{s.val}</div>
                                            <div className="text-xs text-white/50">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="mb-4 text-lg font-bold text-white">Azioni rapide</h3>
                                <div className="space-y-2">
                                    {[
                                        { path: '/favorites', Icon: Heart, color: 'text-red-400', label: 'I miei preferiti' },
                                        { path: '/serate-list', Icon: Bookmark, color: 'text-blue-400', label: 'Lista serate' },
                                        { path: '/notifications', Icon: Clock, color: 'text-orange-400', label: 'Notifiche' },
                                    ].map(({ path, Icon, color, label }) => (
                                        <button key={path} onClick={() => navigate(path)}
                                            className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/10">
                                            <Icon size={18} className={color} />
                                            <span className="text-white/80">{label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="space-y-6">
                            {/* Personal info */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="mb-6 text-xl font-bold text-white">Informazioni personali</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {FIELDS.map(({ field, label, Icon, type }) => (
                                        <div key={field}>
                                            <p className="mb-2 text-sm font-medium text-white/70">{label}</p>
                                            <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <Icon size={17} className="shrink-0 text-white/40" />
                                                    <span className="truncate text-white">{profile[field]}</span>
                                                </div>
                                                <button
                                                    onClick={() => setModal({ field, label, type, currentValue: profile[field] })}
                                                    className="shrink-0 rounded-lg bg-white/10 p-1.5 text-white/50 hover:bg-orange-500/30 hover:text-orange-300 transition-colors"
                                                    title={`Modifica ${label}`}
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <p className="mb-2 text-sm font-medium text-white/70">Bio</p>
                                    <div className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                        <p className="flex-1 text-white/80">{profile.bio}</p>
                                        <button
                                            onClick={() => setModal({ field: 'bio', label: 'Bio', type: 'textarea', currentValue: profile.bio })}
                                            className="shrink-0 rounded-lg bg-white/10 p-1.5 text-white/50 hover:bg-orange-500/30 hover:text-orange-300 transition-colors"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Preferences */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="mb-4 text-xl font-bold text-white">Preferenze serate</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.preferences.map((pref, i) => (
                                        <span key={i} className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1.5 text-sm text-orange-300">
                                            <Star size={14} /> {pref}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Account info */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="mb-4 text-xl font-bold text-white">Informazioni account</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/70">Membro dal</span>
                                        <span className="text-white">{profile.joinDate}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/70">Piano attuale</span>
                                        <div className="flex items-center gap-2">
                                            <Crown size={16} className="text-orange-400" />
                                            <span className="text-orange-300">Free</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {modal && (
                <EditModal
                    {...modal}
                    onClose={() => setModal(null)}
                    onSave={handleSave}
                />
            )}
            <Toast toast={toast} />
        </main>
    );
}
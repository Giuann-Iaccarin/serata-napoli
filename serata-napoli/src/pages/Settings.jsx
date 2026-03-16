/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    Settings as SettingsIcon, Bell, Shield, User, Palette,
    Globe, Moon, Sun, Volume2, VolumeX, Mail, Smartphone,
    Save, ChevronRight, X, Check, AlertCircle, CheckCircle, Loader
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

const SECTIONS = [
    { id: 'account', title: 'Account', icon: User, description: 'Email, password, telefono' },
    { id: 'notifications', title: 'Notifiche', icon: Bell, description: 'Come e quando ricevere aggiornamenti' },
    { id: 'privacy', title: 'Privacy', icon: Shield, description: 'Visibilità e condivisione dati' },
    { id: 'appearance', title: 'Aspetto', icon: Palette, description: 'Tema, lingua, dimensioni' },
    { id: 'preferences', title: 'Preferenze', icon: Globe, description: 'Suoni, salvataggio, layout' },
];

const DEFAULT_SETTINGS = {
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    notificationFrequency: 'immediate',
    profileVisibility: 'friends',
    locationSharing: true,
    dataCollection: false,
    theme: 'dark',
    language: 'it',
    fontSize: 'medium',
    soundEnabled: true,
    autoSave: true,
    compactView: false,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function Toast({ toast }) {
    if (!toast.show) return null;
    return (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl
            ${toast.type === 'success'
                ? 'border-emerald-400/40 bg-emerald-500/20'
                : 'border-red-400/40 bg-red-500/20'}`}>
            {toast.type === 'success'
                ? <CheckCircle size={20} className="shrink-0 text-emerald-400" />
                : <AlertCircle size={20} className="shrink-0 text-red-400" />}
            <p className="font-semibold text-white">{toast.message}</p>
        </div>
    );
}

function Toggle({ enabled, onChange }) {
    return (
        <button onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-orange-500' : 'bg-white/20'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    );
}

// ── Edit Field Modal ──────────────────────────────────────────────────────────
function EditModal({ field, label, value: initialValue, onClose, onSave }) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const validate = () => {
        if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return 'Email non valida';
        if (field === 'phone' && !/^\+?[\d\s\-()+]{6,20}$/.test(value))
            return 'Numero non valido';
        if (field === 'password' && value.length < 8)
            return 'Minimo 8 caratteri';
        return '';
    };

    const handleSave = async () => {
        const err = validate();
        if (err) { setError(err); return; }
        setSaving(true);
        await new Promise(r => setTimeout(r, 700));
        onSave(value);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0c1224] p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Modifica {label}</h3>
                    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-white/20">
                        <X size={16} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-white/70">{field === 'password' ? 'Nuova password' : `Nuovo/a ${label.toLowerCase()}`}</label>
                        <input
                            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'password'}
                            value={value}
                            onChange={e => { setValue(e.target.value); setError(''); }}
                            placeholder={field === 'password' ? '••••••••' : ''}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                        />
                        {error && <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400"><AlertCircle size={13} /> {error}</p>}
                    </div>
                    <div className="flex gap-3 pt-1">
                        <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-white hover:bg-white/10 transition-colors">Annulla</button>
                        <button onClick={handleSave} disabled={saving}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-400 transition-colors disabled:opacity-60">
                            {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                            {saving ? 'Salvataggio…' : 'Salva'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Section components ────────────────────────────────────────────────────────
function AccountSection({ setEditModal, showToast }) {
    const [accountData, setAccountData] = useState({
        email: 'marco@email.it',
        phone: '+39 333 123 4567',
    });

    const handleEdit = (field, label) => {
        setEditModal({
            open: true, field, label,
            value: field === 'password' ? '' : accountData[field],
            onSave: (newVal) => {
                if (field !== 'password') setAccountData(prev => ({ ...prev, [field]: newVal }));
                showToast(`${label} aggiornato con successo!`, 'success');
            }
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Informazioni account</h3>
                <div className="space-y-3">
                    {[
                        { field: 'email', label: 'Email', value: accountData.email },
                        { field: 'phone', label: 'Telefono', value: accountData.phone },
                        { field: 'password', label: 'Password', value: '••••••••••', sub: 'Ultimo cambio: 3 mesi fa' },
                    ].map(({ field, label, value, sub }) => (
                        <div key={field} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                            <div>
                                <p className="font-semibold text-white">{label}</p>
                                <p className="text-sm text-white/50">{sub || value}</p>
                            </div>
                            <button onClick={() => handleEdit(field, label)}
                                className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors">
                                {field === 'password' ? 'Cambia' : 'Modifica'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Azioni account</h3>
                <div className="space-y-3">
                    <button className="flex w-full items-center justify-between rounded-xl bg-white/5 p-4 text-left hover:bg-white/10 transition-colors">
                        <span className="text-white">Esporta dati</span>
                        <ChevronRight size={18} className="text-white/60" />
                    </button>
                    <button className="flex w-full items-center justify-between rounded-xl bg-red-500/10 p-4 text-left hover:bg-red-500/20 transition-colors">
                        <span className="text-red-300">Elimina account</span>
                        <ChevronRight size={18} className="text-red-300/60" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function NotificationsSection({ settings, updateSetting }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Canali di notifica</h3>
                <div className="space-y-3">
                    {[
                        { key: 'emailNotifications', Icon: Mail, title: 'Email', desc: 'Aggiornamenti via email' },
                        { key: 'pushNotifications', Icon: Smartphone, title: 'Push', desc: 'Notifiche push nell\'app' },
                        { key: 'smsNotifications', Icon: Bell, title: 'SMS', desc: 'Messaggi importanti via SMS' },
                    ].map(({ key, Icon, title, desc }) => (
                        <div key={key} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                            <div className="flex items-center gap-3">
                                <Icon size={18} className="text-white/60" />
                                <div>
                                    <p className="font-semibold text-white">{title}</p>
                                    <p className="text-sm text-white/50">{desc}</p>
                                </div>
                            </div>
                            <Toggle enabled={settings[key]} onChange={v => updateSetting(key, v)} />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Frequenza</h3>
                <div className="space-y-2">
                    {[
                        { value: 'immediate', label: 'Immediatamente' },
                        { value: 'hourly', label: 'Ogni ora' },
                        { value: 'daily', label: 'Giornalmente' },
                        { value: 'never', label: 'Mai' },
                    ].map(opt => (
                        <label key={opt.value} className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/5 p-4 hover:bg-white/10 transition-colors">
                            <input type="radio" name="frequency" value={opt.value}
                                checked={settings.notificationFrequency === opt.value}
                                onChange={() => updateSetting('notificationFrequency', opt.value)}
                                className="text-orange-500 focus:ring-orange-500" />
                            <span className="text-white">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PrivacySection({ settings, updateSetting }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Visibilità profilo</h3>
                <div className="space-y-2">
                    {[
                        { value: 'public', label: 'Pubblico', desc: 'Chiunque può vedere il tuo profilo' },
                        { value: 'friends', label: 'Solo amici', desc: 'Visibile solo ai tuoi amici' },
                        { value: 'private', label: 'Privato', desc: 'Solo tu puoi vedere il profilo' },
                    ].map(opt => (
                        <label key={opt.value} className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/5 p-4 hover:bg-white/10 transition-colors">
                            <input type="radio" name="visibility" value={opt.value}
                                checked={settings.profileVisibility === opt.value}
                                onChange={() => updateSetting('profileVisibility', opt.value)}
                                className="text-orange-500 focus:ring-orange-500" />
                            <div>
                                <p className="font-semibold text-white">{opt.label}</p>
                                <p className="text-sm text-white/50">{opt.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Condivisione dati</h3>
                <div className="space-y-3">
                    {[
                        { key: 'locationSharing', title: 'Posizione', desc: 'Condividi per suggerimenti locali' },
                        { key: 'dataCollection', title: 'Analisi utilizzo', desc: 'Dati anonimi per migliorare l\'app' },
                    ].map(({ key, title, desc }) => (
                        <div key={key} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                            <div>
                                <p className="font-semibold text-white">{title}</p>
                                <p className="text-sm text-white/50">{desc}</p>
                            </div>
                            <Toggle enabled={settings[key]} onChange={v => updateSetting(key, v)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AppearanceSection({ settings, updateSetting }) {
    // Apply theme immediately to document
    useEffect(() => {
        document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    }, [settings.theme]);

    // Apply font size
    useEffect(() => {
        const sizeMap = { small: '14px', medium: '16px', large: '18px' };
        document.documentElement.style.fontSize = sizeMap[settings.fontSize] || '16px';
    }, [settings.fontSize]);

    // Apply language
    useEffect(() => {
        document.documentElement.lang = settings.language;
    }, [settings.language]);

    return (
        <div className="space-y-6">
            {/* Theme */}
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Tema</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { value: 'dark', Icon: Moon, label: 'Scuro' },
                        { value: 'light', Icon: Sun, label: 'Chiaro' },
                    ].map(({ value, Icon, label }) => (
                        <button key={value} onClick={() => updateSetting('theme', value)}
                            className={`rounded-xl border p-4 text-center transition-colors
                                ${settings.theme === value ? 'border-orange-400 bg-orange-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                            <Icon size={24} className="mx-auto mb-2 text-white" />
                            <p className="font-semibold text-white">{label}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Language */}
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Lingua</h3>
                <select value={settings.language} onChange={e => updateSetting('language', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none">
                    <option value="it" className="bg-[#050816]">Italiano</option>
                    <option value="en" className="bg-[#050816]">English</option>
                    <option value="es" className="bg-[#050816]">Español</option>
                    <option value="fr" className="bg-[#050816]">Français</option>
                </select>
            </div>

            {/* Font size */}
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Dimensione testo</h3>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { value: 'small', label: 'Piccolo' },
                        { value: 'medium', label: 'Medio' },
                        { value: 'large', label: 'Grande' },
                    ].map(({ value, label }) => (
                        <button key={value} onClick={() => updateSetting('fontSize', value)}
                            className={`rounded-xl border p-3 text-center transition-colors
                                ${settings.fontSize === value ? 'border-orange-400 bg-orange-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                            <p className="font-semibold text-white">{label}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PreferencesSection({ settings, updateSetting }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Generali</h3>
                <div className="space-y-3">
                    {[
                        {
                            key: 'soundEnabled',
                            title: 'Suoni',
                            desc: 'Effetti sonori e notifiche',
                            Icon: settings.soundEnabled ? Volume2 : VolumeX,
                        },
                        { key: 'autoSave', title: 'Salvataggio automatico', desc: 'Salva modifiche automaticamente', Icon: Save },
                        { key: 'compactView', title: 'Vista compatta', desc: 'Mostra più elementi nello stesso spazio', Icon: SettingsIcon },
                    ].map(({ key, title, desc, Icon }) => (
                        <div key={key} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                            <div className="flex items-center gap-3">
                                <Icon size={18} className="text-white/60" />
                                <div>
                                    <p className="font-semibold text-white">{title}</p>
                                    <p className="text-sm text-white/50">{desc}</p>
                                </div>
                            </div>
                            <Toggle enabled={settings[key]} onChange={v => updateSetting(key, v)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Settings() {
    const [activeSection, setActiveSection] = useState('account');
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem('noctis-settings');
            return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    const [editModal, setEditModal] = useState({ open: false });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [saving, setSaving] = useState(false);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3500);
    };

    const updateSetting = (key, value) => {
        const next = { ...settings, [key]: value };
        setSettings(next);
        try { localStorage.setItem('noctis-settings', JSON.stringify(next)); } catch { }
    };

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 800));
        try {
            localStorage.setItem('noctis-settings', JSON.stringify(settings));
            showToast('Impostazioni salvate con successo!', 'success');
        } catch {
            showToast('Errore durante il salvataggio.', 'error');
        }
        setSaving(false);
    };

    const renderSection = () => {
        const props = { settings, updateSetting };
        switch (activeSection) {
            case 'account': return <AccountSection setEditModal={setEditModal} showToast={showToast} />;
            case 'notifications': return <NotificationsSection {...props} />;
            case 'privacy': return <PrivacySection {...props} />;
            case 'appearance': return <AppearanceSection {...props} />;
            case 'preferences': return <PreferencesSection {...props} />;
            default: return null;
        }
    };

    return (
        <>
            <main className="min-h-screen bg-[#050816] text-white">
                <UserHeader />

                <section className="relative px-4 py-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8">
                            <div className="mb-2 flex items-center gap-3">
                                <SettingsIcon className="h-8 w-8 text-orange-400" />
                                <h1 className="text-3xl font-black text-white">Impostazioni</h1>
                            </div>
                            <p className="text-white/60">Personalizza la tua esperienza su Noctis</p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
                            {/* Sidebar */}
                            <div className="space-y-2">
                                {SECTIONS.map(s => (
                                    <button key={s.id} onClick={() => setActiveSection(s.id)}
                                        className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition-colors
                                            ${activeSection === s.id ? 'border border-orange-400/50 bg-orange-500/20' : 'bg-white/5 hover:bg-white/10'}`}>
                                        <s.icon size={20} className={activeSection === s.id ? 'text-orange-400' : 'text-white/60'} />
                                        <div>
                                            <p className={`font-semibold ${activeSection === s.id ? 'text-orange-300' : 'text-white'}`}>{s.title}</p>
                                            <p className="text-sm text-white/50">{s.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                                {renderSection()}

                                <div className="mt-8 border-t border-white/10 pt-6">
                                    <button onClick={handleSave} disabled={saving}
                                        className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors disabled:opacity-60">
                                        {saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                                        {saving ? 'Salvataggio…' : 'Salva modifiche'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>

            {editModal.open && (
                <EditModal
                    field={editModal.field}
                    label={editModal.label}
                    value={editModal.value}
                    onClose={() => setEditModal({ open: false })}
                    onSave={val => {
                        editModal.onSave(val);
                        setEditModal({ open: false });
                    }}
                />
            )}

            <Toast toast={toast} />
        </>
    );
}
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    Settings as SettingsIcon, Bell, Shield, User, Palette,
    Globe, Moon, Sun, Volume2, VolumeX, Mail, Smartphone,
    Save, ChevronRight, X, Check, AlertCircle, CheckCircle, Loader,
    Eye, Contrast
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
    accentColor: 'orange',
    soundEnabled: true,
    autoSave: true,
    compactView: false,
    reduceMotion: false,
    highContrast: false,
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

// ── Delete Account Modal ──────────────────────────────────────────────────────
function DeleteModal({ onClose, onConfirm }) {
    const [confirmText, setConfirmText] = useState('');
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirmText !== 'ELIMINA') return;
        setDeleting(true);
        await new Promise(r => setTimeout(r, 1500)); // Simulate deletion
        onConfirm();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0c1224] p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Elimina account</h3>
                    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-white/20">
                        <X size={16} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="rounded-xl bg-red-500/10 p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle size={20} className="shrink-0 text-red-400 mt-0.5" />
                            <div>
                                <p className="font-semibold text-red-300 mb-1">Azione irreversibile</p>
                                <p className="text-sm text-red-200/80">
                                    Eliminando l'account perderai tutti i dati, preferenze e serate salvate.
                                    Questa azione non può essere annullata.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-white/70">
                            Digita <strong>ELIMINA</strong> per confermare
                        </label>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={e => setConfirmText(e.target.value.toUpperCase())}
                            placeholder="ELIMINA"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-red-400/50 focus:outline-none"
                        />
                    </div>
                    <div className="flex gap-3 pt-1">
                        <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-white hover:bg-white/10 transition-colors">Annulla</button>
                        <button onClick={handleDelete} disabled={deleting || confirmText !== 'ELIMINA'}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                            {deleting ? <Loader size={16} className="animate-spin" /> : null}
                            {deleting ? 'Eliminazione…' : 'Elimina account'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Section components ────────────────────────────────────────────────────────
function AccountSection({ setEditModal, showToast, settings, onDeleteAccount }) {
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

    const exportData = () => {
        const data = {
            account: accountData,
            settings: settings,
            exportDate: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'noctis-data-export.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Dati esportati con successo!', 'success');
    };

    const handleDeleteAccount = () => {
        onDeleteAccount();
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
                    <button onClick={exportData}
                        className="flex w-full items-center justify-between rounded-xl bg-white/5 p-4 text-left hover:bg-white/10 transition-colors">
                        <span className="text-white">Esporta dati</span>
                        <ChevronRight size={18} className="text-white/60" />
                    </button>
                    <button onClick={handleDeleteAccount}
                        className="flex w-full items-center justify-between rounded-xl bg-red-500/10 p-4 text-left hover:bg-red-500/20 transition-colors">
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
    const [geoPermission, setGeoPermission] = useState('prompt');

    useEffect(() => {
        // Check current geolocation permission
        if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'geolocation' }).then(result => {
                setGeoPermission(result.state);
                // If permission is denied, disable location sharing
                if (result.state === 'denied' && settings.locationSharing) {
                    updateSetting('locationSharing', false);
                }
                // Listen for changes
                result.onchange = () => {
                    setGeoPermission(result.state);
                    if (result.state === 'denied' && settings.locationSharing) {
                        updateSetting('locationSharing', false);
                    }
                };
            });
        }
    }, [settings.locationSharing, updateSetting]);

    const handleLocationToggle = async (enabled) => {
        if (enabled) {
            // Request permission
            if ('geolocation' in navigator) {
                try {
                    await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
                    });
                    updateSetting('locationSharing', true);
                } catch (error) {
                    // Permission denied or error
                    updateSetting('locationSharing', false);
                    setGeoPermission('denied');
                }
            } else {
                // Geolocation not supported
                updateSetting('locationSharing', false);
            }
        } else {
            updateSetting('locationSharing', false);
        }
    };

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
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                        <div>
                            <p className="font-semibold text-white">Posizione</p>
                            <p className="text-sm text-white/50">Condividi per suggerimenti locali</p>
                            {geoPermission === 'denied' && (
                                <p className="text-xs text-red-400 mt-1">Permesso negato dal browser</p>
                            )}
                        </div>
                        <Toggle enabled={settings.locationSharing} onChange={handleLocationToggle} />
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                        <div>
                            <p className="font-semibold text-white">Analisi utilizzo</p>
                            <p className="text-sm text-white/50">Dati anonimi per migliorare l'app</p>
                        </div>
                        <Toggle enabled={settings.dataCollection} onChange={v => updateSetting('dataCollection', v)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AppearanceSection({ settings, updateSetting }) {
    // Apply theme immediately to document
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(settings.theme);
        // Apply theme-specific styles
        if (settings.theme === 'light') {
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f8fafc');
            root.style.setProperty('--text-primary', '#1e293b');
            root.style.setProperty('--text-secondary', '#64748b');
            root.style.setProperty('--border-color', '#e2e8f0');
        } else {
            root.style.setProperty('--bg-primary', '#050816');
            root.style.setProperty('--bg-secondary', '#0c1224');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#94a3b8');
            root.style.setProperty('--border-color', 'rgba(255,255,255,0.1)');
        }
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

    // Apply accent color
    useEffect(() => {
        const colorMap = {
            orange: '#f97316',
            blue: '#3b82f6',
            purple: '#8b5cf6',
            green: '#10b981'
        };
        document.documentElement.style.setProperty('--accent-color', colorMap[settings.accentColor] || colorMap.orange);
    }, [settings.accentColor]);

    // Apply accessibility settings
    useEffect(() => {
        document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion);
        document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    }, [settings.reduceMotion, settings.highContrast]);

    return (
        <div className="space-y-6">
            {/* Theme */}
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Tema</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { value: 'dark', Icon: Moon, label: 'Scuro', desc: 'Tema notturno ideale per la sera' },
                        { value: 'light', Icon: Sun, label: 'Chiaro', desc: 'Tema chiaro per uso diurno' },
                    ].map(({ value, Icon, label, desc }) => (
                        <button key={value} onClick={() => updateSetting('theme', value)}
                            className={`rounded-xl border p-4 text-center transition-all duration-300 hover:scale-105
                                ${settings.theme === value ? 'border-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                            <Icon size={24} className="mx-auto mb-2 text-white" />
                            <p className="font-semibold text-white">{label}</p>
                            <p className="text-xs text-white/60 mt-1">{desc}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Language */}
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Lingua</h3>
                <select value={settings.language} onChange={e => updateSetting('language', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none transition-colors">
                    <option value="it" className="bg-[#050816]">🇮🇹 Italiano</option>
                    <option value="en" className="bg-[#050816]">🇺🇸 English</option>
                    <option value="es" className="bg-[#050816]">🇪🇸 Español</option>
                    <option value="fr" className="bg-[#050816]">🇫🇷 Français</option>
                </select>
            </div>

            {/* Font size */}
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Dimensione testo</h3>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { value: 'small', label: 'Piccolo', size: 'text-sm' },
                        { value: 'medium', label: 'Medio', size: 'text-base' },
                        { value: 'large', label: 'Grande', size: 'text-lg' },
                    ].map(({ value, label, size }) => (
                        <button key={value} onClick={() => updateSetting('fontSize', value)}
                            className={`rounded-xl border p-3 text-center transition-all duration-300 hover:scale-105
                                ${settings.fontSize === value ? 'border-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                            <p className={`font-semibold text-white ${size}`}>{label}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Accent Color */}
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Colore accent</h3>
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { value: 'orange', color: 'bg-orange-500', label: 'Arancione' },
                        { value: 'blue', color: 'bg-blue-500', label: 'Blu' },
                        { value: 'purple', color: 'bg-purple-500', label: 'Viola' },
                        { value: 'green', color: 'bg-green-500', label: 'Verde' },
                    ].map(({ value, color, label }) => (
                        <button key={value} onClick={() => updateSetting('accentColor', value)}
                            className={`rounded-xl border p-4 text-center transition-all duration-300 hover:scale-105
                                ${settings.accentColor === value ? 'border-white/50 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                            <div className={`w-6 h-6 rounded-full ${color} mx-auto mb-2`}></div>
                            <p className="text-xs font-semibold text-white">{label}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PreferencesSection({ settings, updateSetting }) {
    const playSound = () => {
        if (settings.soundEnabled) {
            // Create a simple beep sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    };

    const handleSoundToggle = (enabled) => {
        updateSetting('soundEnabled', enabled);
        if (enabled) {
            playSound();
        }
    };

    const handleCompactViewToggle = (enabled) => {
        updateSetting('compactView', enabled);
        // Apply compact view styles
        document.documentElement.classList.toggle('compact-view', enabled);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Generali</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                            {settings.soundEnabled ? <Volume2 size={18} className="text-white/60" /> : <VolumeX size={18} className="text-white/60" />}
                            <div>
                                <p className="font-semibold text-white">Suoni</p>
                                <p className="text-sm text-white/50">Effetti sonori e notifiche</p>
                            </div>
                        </div>
                        <Toggle enabled={settings.soundEnabled} onChange={handleSoundToggle} />
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                            <Save size={18} className="text-white/60" />
                            <div>
                                <p className="font-semibold text-white">Salvataggio automatico</p>
                                <p className="text-sm text-white/50">Salva modifiche automaticamente</p>
                            </div>
                        </div>
                        <Toggle enabled={settings.autoSave} onChange={v => updateSetting('autoSave', v)} />
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                            <SettingsIcon size={18} className="text-white/60" />
                            <div>
                                <p className="font-semibold text-white">Vista compatta</p>
                                <p className="text-sm text-white/50">Mostra più elementi nello stesso spazio</p>
                            </div>
                        </div>
                        <Toggle enabled={settings.compactView} onChange={handleCompactViewToggle} />
                    </div>
                </div>
            </div>

            {/* Accessibility */}
            <div>
                <h3 className="mb-4 text-lg font-bold text-white">Accessibilità</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                            <Eye size={18} className="text-white/60" />
                            <div>
                                <p className="font-semibold text-white">Riduci movimento</p>
                                <p className="text-sm text-white/50">Riduci animazioni e transizioni</p>
                            </div>
                        </div>
                        <Toggle enabled={settings.reduceMotion} onChange={v => updateSetting('reduceMotion', v)} />
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                        <div className="flex items-center gap-3">
                            <Contrast size={18} className="text-white/60" />
                            <div>
                                <p className="font-semibold text-white">Alto contrasto</p>
                                <p className="text-sm text-white/50">Migliora la leggibilità</p>
                            </div>
                        </div>
                        <Toggle enabled={settings.highContrast} onChange={v => updateSetting('highContrast', v)} />
                    </div>
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
    const [deleteModal, setDeleteModal] = useState(false);
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

    const handleDeleteAccount = () => {
        setDeleteModal(true);
    };

    const confirmDeleteAccount = () => {
        // Simulate account deletion
        localStorage.removeItem('noctis-settings');
        showToast('Account eliminato con successo.', 'success');
        setDeleteModal(false);
        // In a real app, redirect to login or home
        setTimeout(() => window.location.href = '/', 2000);
    };

    const renderSection = () => {
        const props = { settings, updateSetting };
        switch (activeSection) {
            case 'account': return <AccountSection setEditModal={setEditModal} showToast={showToast} settings={settings} onDeleteAccount={handleDeleteAccount} />;
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

            {deleteModal && (
                <DeleteModal
                    onClose={() => setDeleteModal(false)}
                    onConfirm={confirmDeleteAccount}
                />
            )}
        </>
    );
}
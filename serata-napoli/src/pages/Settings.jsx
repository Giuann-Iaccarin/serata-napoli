import React, { useState } from 'react';
import {
    Settings as SettingsIcon, Bell, Shield, User, Palette,
    Globe, Moon, Sun, Volume2, VolumeX, Mail, Smartphone,
    Save, ChevronRight, ToggleLeft, ToggleRight
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

const SETTING_SECTIONS = [
    {
        id: 'account',
        title: 'Account',
        icon: User,
        description: 'Gestisci le informazioni del tuo account'
    },
    {
        id: 'notifications',
        title: 'Notifiche',
        icon: Bell,
        description: 'Controlla come ricevere gli aggiornamenti'
    },
    {
        id: 'privacy',
        title: 'Privacy',
        icon: Shield,
        description: 'Impostazioni di privacy e sicurezza'
    },
    {
        id: 'appearance',
        title: 'Aspetto',
        icon: Palette,
        description: 'Personalizza l\'aspetto dell\'app'
    },
    {
        id: 'preferences',
        title: 'Preferenze',
        icon: Globe,
        description: 'Impostazioni generali e preferenze'
    }
];

export default function Settings() {
    const [activeSection, setActiveSection] = useState('account');
    const [settings, setSettings] = useState({
        // Account
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,

        // Privacy
        profileVisibility: 'friends',
        locationSharing: true,
        dataCollection: false,

        // Appearance
        theme: 'dark',
        language: 'it',
        fontSize: 'medium',

        // Preferences
        soundEnabled: true,
        autoSave: true,
        compactView: false
    });

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const Toggle = ({ enabled, onChange }) => (
        <button
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-orange-500' : 'bg-white/20'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    );

    const AccountSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Informazioni account</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <p className="font-semibold text-white">Email</p>
                            <p className="text-sm text-white/60">marco@email.it</p>
                        </div>
                        <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                            Modifica
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <p className="font-semibold text-white">Password</p>
                            <p className="text-sm text-white/60">Ultimo cambio: 3 mesi fa</p>
                        </div>
                        <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                            Cambia
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <p className="font-semibold text-white">Telefono</p>
                            <p className="text-sm text-white/60">+39 333 123 4567</p>
                        </div>
                        <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                            Modifica
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-white mb-4">Azioni account</h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                        <span className="text-white">Esporta dati</span>
                        <ChevronRight size={18} className="text-white/60" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors text-left">
                        <span className="text-red-300">Elimina account</span>
                        <ChevronRight size={18} className="text-red-300/60" />
                    </button>
                </div>
            </div>
        </div>
    );

    const NotificationSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Tipi di notifica</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-white/60" />
                            <div>
                                <p className="font-semibold text-white">Email</p>
                                <p className="text-sm text-white/60">Ricevi aggiornamenti via email</p>
                            </div>
                        </div>
                        <Toggle
                            enabled={settings.emailNotifications}
                            onChange={(value) => updateSetting('emailNotifications', value)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                            <Smartphone size={18} className="text-white/60" />
                            <div>
                                <p className="font-semibold text-white">Push</p>
                                <p className="text-sm text-white/60">Notifiche push nell'app</p>
                            </div>
                        </div>
                        <Toggle
                            enabled={settings.pushNotifications}
                            onChange={(value) => updateSetting('pushNotifications', value)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                            <Bell size={18} className="text-white/60" />
                            <div>
                                <p className="font-semibold text-white">SMS</p>
                                <p className="text-sm text-white/60">Messaggi di testo importanti</p>
                            </div>
                        </div>
                        <Toggle
                            enabled={settings.smsNotifications}
                            onChange={(value) => updateSetting('smsNotifications', value)}
                        />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-white mb-4">Frequenza notifiche</h3>
                <div className="space-y-3">
                    {[
                        { label: 'Immediatamente', value: 'immediate' },
                        { label: 'Ogni ora', value: 'hourly' },
                        { label: 'Giornalmente', value: 'daily' },
                        { label: 'Mai', value: 'never' }
                    ].map(option => (
                        <label key={option.value} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
                            <input
                                type="radio"
                                name="frequency"
                                value={option.value}
                                defaultChecked={option.value === 'immediate'}
                                className="text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-white">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    const PrivacySettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Visibilità profilo</h3>
                <div className="space-y-3">
                    {[
                        { label: 'Pubblico', value: 'public', desc: 'Chiunque può vedere il tuo profilo' },
                        { label: 'Amici', value: 'friends', desc: 'Solo gli amici possono vedere' },
                        { label: 'Privato', value: 'private', desc: 'Solo tu puoi vedere il tuo profilo' }
                    ].map(option => (
                        <label key={option.value} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
                            <input
                                type="radio"
                                name="visibility"
                                value={option.value}
                                checked={settings.profileVisibility === option.value}
                                onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                                className="text-orange-500 focus:ring-orange-500"
                            />
                            <div>
                                <p className="font-semibold text-white">{option.label}</p>
                                <p className="text-sm text-white/60">{option.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-white mb-4">Condivisione dati</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <p className="font-semibold text-white">Posizione</p>
                            <p className="text-sm text-white/60">Condividi la tua posizione per suggerimenti locali</p>
                        </div>
                        <Toggle
                            enabled={settings.locationSharing}
                            onChange={(value) => updateSetting('locationSharing', value)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <p className="font-semibold text-white">Analisi utilizzo</p>
                            <p className="text-sm text-white/60">Aiutaci a migliorare l'app condividendo dati anonimi</p>
                        </div>
                        <Toggle
                            enabled={settings.dataCollection}
                            onChange={(value) => updateSetting('dataCollection', value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const AppearanceSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Tema</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => updateSetting('theme', 'dark')}
                        className={`p-4 rounded-xl border transition-colors ${settings.theme === 'dark'
                            ? 'border-orange-400 bg-orange-500/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                    >
                        <Moon size={24} className="text-white mb-2" />
                        <p className="font-semibold text-white">Scuro</p>
                    </button>

                    <button
                        onClick={() => updateSetting('theme', 'light')}
                        className={`p-4 rounded-xl border transition-colors ${settings.theme === 'light'
                            ? 'border-orange-400 bg-orange-500/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                    >
                        <Sun size={24} className="text-white mb-2" />
                        <p className="font-semibold text-white">Chiaro</p>
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-white mb-4">Lingua</h3>
                <select
                    value={settings.language}
                    onChange={(e) => updateSetting('language', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none"
                >
                    <option value="it">Italiano</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                </select>
            </div>

            <div>
                <h3 className="text-lg font-bold text-white mb-4">Dimensione testo</h3>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Piccolo', value: 'small' },
                        { label: 'Medio', value: 'medium' },
                        { label: 'Grande', value: 'large' }
                    ].map(size => (
                        <button
                            key={size.value}
                            onClick={() => updateSetting('fontSize', size.value)}
                            className={`p-3 rounded-xl border text-center transition-colors ${settings.fontSize === size.value
                                ? 'border-orange-400 bg-orange-500/10'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            <p className="text-white font-semibold">{size.label}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const PreferencesSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Generali</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                            {settings.soundEnabled ? (
                                <Volume2 size={18} className="text-white/60" />
                            ) : (
                                <VolumeX size={18} className="text-white/60" />
                            )}
                            <div>
                                <p className="font-semibold text-white">Suoni</p>
                                <p className="text-sm text-white/60">Effetti sonori e notifiche</p>
                            </div>
                        </div>
                        <Toggle
                            enabled={settings.soundEnabled}
                            onChange={(value) => updateSetting('soundEnabled', value)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <p className="font-semibold text-white">Salvataggio automatico</p>
                            <p className="text-sm text-white/60">Salva automaticamente le modifiche</p>
                        </div>
                        <Toggle
                            enabled={settings.autoSave}
                            onChange={(value) => updateSetting('autoSave', value)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div>
                            <p className="font-semibold text-white">Vista compatta</p>
                            <p className="text-sm text-white/60">Mostra più elementi in meno spazio</p>
                        </div>
                        <Toggle
                            enabled={settings.compactView}
                            onChange={(value) => updateSetting('compactView', value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'account':
                return <AccountSettings />;
            case 'notifications':
                return <NotificationSettings />;
            case 'privacy':
                return <PrivacySettings />;
            case 'appearance':
                return <AppearanceSettings />;
            case 'preferences':
                return <PreferencesSettings />;
            default:
                return <AccountSettings />;
        }
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <UserHeader />

            <section className="relative px-4 py-12">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <SettingsIcon className="w-8 h-8 text-orange-400" />
                            <h1 className="text-3xl font-black text-white">Impostazioni</h1>
                        </div>
                        <p className="text-white/60">Personalizza la tua esperienza su NapoliNights</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

                        {/* Sidebar */}
                        <div className="space-y-2">
                            {SETTING_SECTIONS.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 rounded-2xl p-4 text-left transition-colors ${activeSection === section.id
                                        ? 'bg-orange-500/20 border border-orange-400/50'
                                        : 'bg-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <section.icon
                                        size={20}
                                        className={activeSection === section.id ? 'text-orange-400' : 'text-white/60'}
                                    />
                                    <div>
                                        <p className={`font-semibold ${activeSection === section.id ? 'text-orange-300' : 'text-white'}`}>
                                            {section.title}
                                        </p>
                                        <p className="text-sm text-white/60">{section.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                            {renderActiveSection()}

                            {/* Save Button */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors">
                                    <Save size={18} />
                                    Salva modifiche
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    Bell, Heart, Star, Calendar, MapPin, Users,
    Clock, Check, X
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

const NOTIFICATIONS = [
    {
        id: 1,
        type: 'favorite',
        title: 'Nuovo locale nei preferiti',
        message: 'Il locale "Rooftop 45" è stato aggiunto ai tuoi preferiti da 3 amici',
        time: '2 ore fa',
        read: false,
        icon: Heart,
        color: 'text-red-400'
    },
    {
        id: 2,
        type: 'event',
        title: 'Evento speciale stasera',
        message: '"Notte Bianca" al Vomero - DJ set dalle 22:00',
        time: '4 ore fa',
        read: false,
        icon: Calendar,
        color: 'text-blue-400'
    },
    {
        id: 3,
        type: 'review',
        title: 'Nuova recensione',
        message: 'Marco ha recensito "Bar del Porto" con 5 stelle',
        time: '1 giorno fa',
        read: false,
        icon: Star,
        color: 'text-yellow-400'
    },
    {
        id: 4,
        type: 'friend',
        title: 'Amico online',
        message: 'Luca è online e sta guardando locali a Chiaia',
        time: '2 giorni fa',
        read: true,
        icon: Users,
        color: 'text-green-400'
    },
    {
        id: 5,
        type: 'location',
        title: 'Locale vicino',
        message: '"Caffè Gambrinus" è a soli 200m da te',
        time: '3 giorni fa',
        read: true,
        icon: MapPin,
        color: 'text-orange-400'
    }
];

// Which notification types to receive — always visible, no gear required
const PREF_OPTIONS = [
    { key: 'favorite', label: 'Preferiti', icon: Heart },
    { key: 'event', label: 'Eventi', icon: Calendar },
    { key: 'review', label: 'Recensioni', icon: Star },
    { key: 'friend', label: 'Amici', icon: Users },
    { key: 'location', label: 'Posizione', icon: MapPin },
];

const FILTER_TABS = [
    { id: 'all', label: 'Tutte' },
    { id: 'unread', label: 'Non lette' },
    { id: 'favorite', label: 'Preferiti' },
    { id: 'event', label: 'Eventi' },
    { id: 'review', label: 'Recensioni' },
];

export default function Notifications() {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const [filter, setFilter] = useState('all');
    // Track which types the user wants to receive
    const [enabledTypes, setEnabledTypes] = useState({
        favorite: true,
        event: true,
        review: true,
        friend: false,
        location: true,
    });

    const toggleType = key =>
        setEnabledTypes(prev => ({ ...prev, [key]: !prev[key] }));

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        if (filter !== 'all') return n.type === filter;
        return true;
    });

    const markAsRead = id =>
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

    const markAllAsRead = () =>
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    const deleteNotification = id =>
        setNotifications(prev => prev.filter(n => n.id !== id));

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <UserHeader />

            <section className="relative px-4 py-12">
                <div className="mx-auto max-w-4xl">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="mb-2 text-3xl font-black text-white">Notifiche</h1>
                            <p className="text-white/60">
                                {unreadCount > 0 ? `${unreadCount} nuove notifiche` : 'Nessuna nuova notifica'}
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400 transition-colors"
                            >
                                <Check size={16} /> Segna tutte come lette
                            </button>
                        )}
                    </div>

                    {/* ── Notification Preferences — always visible ── */}
                    <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                        <h3 className="mb-4 text-base font-bold text-white">Tipi di notifica attivi</h3>
                        <div className="flex flex-wrap gap-3">
                            {PREF_OPTIONS.map(({ key, label, icon: Icon }) => {
                                const active = enabledTypes[key];
                                return (
                                    <button
                                        key={key}
                                        onClick={() => toggleType(key)}
                                        className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all
                                            ${active
                                                ? 'border-orange-400/50 bg-orange-500/20 text-orange-300'
                                                : 'border-white/10 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'}`}
                                    >
                                        <Icon size={15} />
                                        {label}
                                        {/* toggle pill */}
                                        <span className={`ml-1 inline-block h-2.5 w-2.5 rounded-full transition-colors ${active ? 'bg-orange-400' : 'bg-white/20'}`} />
                                    </button>
                                );
                            })}
                        </div>
                        <p className="mt-3 text-xs text-white/40">Clicca su un tipo per attivarlo o disattivarlo</p>
                    </div>

                    {/* ── Filter Tabs ── */}
                    <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1">
                        {FILTER_TABS.map(tab => {
                            const count = tab.id === 'all'
                                ? notifications.length
                                : tab.id === 'unread'
                                    ? notifications.filter(n => !n.read).length
                                    : notifications.filter(n => n.type === tab.id).length;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setFilter(tab.id)}
                                    className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors
                                        ${filter === tab.id ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                                >
                                    {tab.label}
                                    {count > 0 && (
                                        <span className={`rounded-full px-2 py-0.5 text-xs ${filter === tab.id ? 'bg-white/20 text-white' : 'bg-orange-500/20 text-orange-300'}`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* ── Notifications List ── */}
                    <div className="space-y-4">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`rounded-3xl border backdrop-blur-xl p-6 transition-all
                                        ${notification.read
                                            ? 'border-white/5 bg-white/5'
                                            : 'border-orange-400/20 bg-orange-500/5 shadow-lg shadow-orange-500/10'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${notification.read ? 'bg-white/10' : 'bg-orange-500/20'}`}>
                                            <notification.icon className={`h-6 w-6 ${notification.color}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="mb-1 text-lg font-bold text-white">{notification.title}</h3>
                                                    <p className="mb-2 text-white/70">{notification.message}</p>
                                                    <div className="flex items-center gap-2 text-sm text-white/50">
                                                        <Clock size={14} /> {notification.time}
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-2">
                                                    {!notification.read && (
                                                        <div className="h-3 w-3 rounded-full bg-orange-400" />
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {!notification.read && (
                                                <div className="mt-4 flex justify-end">
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400 transition-colors"
                                                    >
                                                        <Check size={16} /> Segna come letta
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center">
                                <Bell className="mx-auto mb-4 h-16 w-16 text-white/20" />
                                <h3 className="mb-2 text-xl font-bold text-white">Nessuna notifica</h3>
                                <p className="text-white/60">
                                    {filter === 'all' ? 'Non hai ancora ricevuto notifiche' : `Nessuna notifica per questo filtro`}
                                </p>
                            </div>
                        )}
                    </div>

                    {filteredNotifications.length > 0 && (
                        <div className="mt-8 text-center">
                            <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-white hover:bg-white/10 transition-colors">
                                Carica altre notifiche
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
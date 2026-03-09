import React, { useState } from 'react';
import {
    Bell, Heart, Star, Calendar, MapPin, Users,
    Clock, Check, X, Settings, Filter
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

const NOTIFICATION_TYPES = [
    { id: 'all', label: 'Tutte', count: 5 },
    { id: 'unread', label: 'Non lette', count: 3 },
    { id: 'favorites', label: 'Preferiti', count: 1 },
    { id: 'events', label: 'Eventi', count: 1 },
    { id: 'reviews', label: 'Recensioni', count: 1 }
];

export default function Notifications() {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const [filter, setFilter] = useState('all');
    const [showSettings, setShowSettings] = useState(false);

    const filteredNotifications = notifications.filter(notification => {
        switch (filter) {
            case 'unread':
                return !notification.read;
            case 'favorites':
                return notification.type === 'favorite';
            case 'events':
                return notification.type === 'event';
            case 'reviews':
                return notification.type === 'review';
            default:
                return true;
        }
    });

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <UserHeader />

            <section className="relative px-4 py-12">
                <div className="mx-auto max-w-4xl">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-white mb-2">Notifiche</h1>
                            <p className="text-white/60">
                                {unreadCount > 0 ? `${unreadCount} nuove notifiche` : 'Nessuna nuova notifica'}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400 transition-colors"
                                >
                                    <Check size={16} />
                                    Segna tutte come lette
                                </button>
                            )}

                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                            >
                                <Settings size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    {showSettings && (
                        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                            <h3 className="text-lg font-bold text-white mb-4">Impostazioni notifiche</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/10" />
                                    <span className="text-white/80">Nuovi locali preferiti</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/10" />
                                    <span className="text-white/80">Eventi speciali</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/10" />
                                    <span className="text-white/80">Nuove recensioni</span>
                                </label>
                                <label className="flex items-center gap-3">
                                    <input type="checkbox" className="rounded border-white/20 bg-white/10" />
                                    <span className="text-white/80">Amici online</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Filters */}
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto">
                        {NOTIFICATION_TYPES.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setFilter(type.id)}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${filter === type.id
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                {type.label}
                                {type.count > 0 && (
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${filter === type.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-orange-500/20 text-orange-300'
                                        }`}>
                                        {type.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-4">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`rounded-3xl border backdrop-blur-xl p-6 transition-all hover:scale-[1.02] ${notification.read
                                        ? 'border-white/5 bg-white/5'
                                        : 'border-orange-400/20 bg-orange-500/5 shadow-lg shadow-orange-500/10'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${notification.read ? 'bg-white/10' : 'bg-orange-500/20'
                                            }`}>
                                            <notification.icon className={`w-6 h-6 ${notification.color}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white mb-1">
                                                        {notification.title}
                                                    </h3>
                                                    <p className="text-white/70 mb-2">
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm text-white/50">
                                                        <Clock size={14} />
                                                        {notification.time}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 shrink-0">
                                                    {!notification.read && (
                                                        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
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
                                                        <Check size={16} />
                                                        Segna come letta
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <Bell className="w-16 h-16 text-white/20 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Nessuna notifica</h3>
                                <p className="text-white/60">
                                    {filter === 'all'
                                        ? 'Non hai ancora ricevuto notifiche'
                                        : `Nessuna notifica per il filtro "${filter}"`
                                    }
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Load More */}
                    {filteredNotifications.length > 0 && (
                        <div className="text-center mt-8">
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
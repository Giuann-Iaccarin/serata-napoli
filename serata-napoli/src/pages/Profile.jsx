import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, Phone, MapPin, Calendar, Crown, Star,
    Edit, Save, X, Camera, Heart, Bookmark, Clock
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

export default function Profile() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Marco Esposito',
        email: 'marco@email.it',
        phone: '+39 333 123 4567',
        location: 'Napoli, Italia',
        joinDate: 'Gennaio 2024',
        bio: 'Amante delle serate napoletane, sempre alla ricerca del locale perfetto per ogni mood.',
        preferences: ['Aperitivo + DJ', 'Live Music', 'Rooftop Bar'],
        stats: {
            venuesVisited: 24,
            favorites: 12,
            reviews: 8,
            seratePlanned: 5
        }
    });

    const handleSave = () => {
        setIsEditing(false);
        // Qui si salverebbero i dati
    };

    const handleInputChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <UserHeader />

            <section className="relative px-4 py-12">
                <div className="mx-auto max-w-4xl">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-white mb-2">Il mio profilo</h1>
                        <p className="text-white/60">Gestisci le tue informazioni e preferenze</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

                        {/* Sidebar - Profile Card */}
                        <div className="space-y-6">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <div className="text-center">
                                    {/* Avatar */}
                                    <div className="relative mx-auto mb-4 w-24 h-24">
                                        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-linear-to-br from-orange-400 to-pink-500 shadow-lg shadow-orange-500/30 ring-4 ring-white/10">
                                            <User size={32} className="text-white" />
                                        </div>
                                        <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg hover:bg-orange-400 transition-colors">
                                            <Camera size={16} />
                                        </button>
                                    </div>

                                    <h2 className="text-xl font-bold text-white mb-1">{profile.name}</h2>
                                    <p className="text-white/60 text-sm mb-4">{profile.email}</p>

                                    {/* Premium Badge */}
                                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 text-sm text-orange-300">
                                        <Crown size={14} />
                                        Free Plan
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-white">{profile.stats.venuesVisited}</div>
                                        <div className="text-xs text-white/50">Locali visitati</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-white">{profile.stats.favorites}</div>
                                        <div className="text-xs text-white/50">Preferiti</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-white">{profile.stats.reviews}</div>
                                        <div className="text-xs text-white/50">Recensioni</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-white">{profile.stats.seratePlanned}</div>
                                        <div className="text-xs text-white/50">Serate pianificate</div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-lg font-bold text-white mb-4">Azioni rapide</h3>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => navigate('/favorites')}
                                        className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/10"
                                    >
                                        <Heart size={18} className="text-red-400" />
                                        <span className="text-white/80">I miei preferiti</span>
                                    </button>
                                    <button
                                        onClick={() => navigate('/serate-list')}
                                        className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/10"
                                    >
                                        <Bookmark size={18} className="text-blue-400" />
                                        <span className="text-white/80">Lista serate</span>
                                    </button>
                                    <button
                                        onClick={() => navigate('/notifications')}
                                        className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/10"
                                    >
                                        <Clock size={18} className="text-orange-400" />
                                        <span className="text-white/80">Notifiche</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-6">

                            {/* Personal Information */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white">Informazioni personali</h3>
                                    <button
                                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                        className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400 transition-colors"
                                    >
                                        {isEditing ? (
                                            <>
                                                <Save size={16} />
                                                Salva
                                            </>
                                        ) : (
                                            <>
                                                <Edit size={16} />
                                                Modifica
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Nome completo</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profile.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                                    <User size={18} className="text-white/40" />
                                                    <span className="text-white">{profile.name}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={profile.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                                    <Mail size={18} className="text-white/40" />
                                                    <span className="text-white">{profile.email}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Telefono</label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    value={profile.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                                    <Phone size={18} className="text-white/40" />
                                                    <span className="text-white">{profile.phone}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/70 mb-2">Località</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profile.location}
                                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                                    <MapPin size={18} className="text-white/40" />
                                                    <span className="text-white">{profile.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">Bio</label>
                                        {isEditing ? (
                                            <textarea
                                                value={profile.bio}
                                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                                rows={3}
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-orange-400/50 focus:outline-none resize-none"
                                            />
                                        ) : (
                                            <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">{profile.bio}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Preferences */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-bold text-white mb-4">Preferenze serate</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.preferences.map((pref, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 text-sm text-orange-300"
                                        >
                                            <Star size={14} />
                                            {pref}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Account Info */}
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-bold text-white mb-4">Informazioni account</h3>
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
        </main>
    );
}
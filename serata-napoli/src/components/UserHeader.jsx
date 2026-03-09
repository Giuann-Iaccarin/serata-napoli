import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    User, Crown, Bell, Heart, Bookmark, Settings, ArrowLeft,
    ChevronRight
} from 'lucide-react';

const userNavItems = [
    { icon: User, label: 'Profilo', route: '/profile' },
    { icon: Crown, label: 'Premium', route: '/premium' },
    { icon: Bell, label: 'Notifiche', route: '/notifications' },
    { icon: Heart, label: 'Preferiti', route: '/favorites' },
    { icon: Bookmark, label: 'Lista serate', route: '/serate-list' },
    { icon: Settings, label: 'Impostazioni', route: '/settings' },
];

export default function UserHeader() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPage = userNavItems.find(item => item.route === location.pathname);

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/95 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm font-medium">Torna alla home</span>
                    </button>

                    {/* Current Page Title */}
                    <div className="flex items-center gap-3">
                        {currentPage && (
                            <>
                                <currentPage.icon size={24} className="text-orange-400" />
                                <h1 className="text-xl font-bold text-white">{currentPage.label}</h1>
                            </>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="hidden md:flex items-center gap-1">
                        {userNavItems.map((item) => (
                            <button
                                key={item.route}
                                onClick={() => navigate(item.route)}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${location.pathname === item.route
                                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <item.icon size={16} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                            <span className="text-sm font-medium">Menu</span>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="mt-4 md:hidden">
                    <nav className="flex flex-wrap gap-2">
                        {userNavItems.map((item) => (
                            <button
                                key={item.route}
                                onClick={() => navigate(item.route)}
                                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${location.pathname === item.route
                                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <item.icon size={14} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}
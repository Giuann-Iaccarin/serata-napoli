/* eslint-disable react-hooks/purity */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, MapPin, Compass } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 overflow-hidden relative">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                {/* 404 Number */}
                <div className="mb-8 animate-in zoom-in duration-700">
                    <h1 className="text-[180px] md:text-[240px] font-black leading-none bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent select-none">
                        404
                    </h1>
                </div>

                {/* Icon Grid */}
                <div className="flex items-center justify-center gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '100ms' }}>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm animate-bounce" style={{ animationDelay: '0s' }}>
                        <MapPin size={32} className="text-orange-400" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.2s' }}>
                        <Search size={32} className="text-pink-400" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.4s' }}>
                        <Compass size={32} className="text-purple-400" />
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Ops! Locale non trovato
                    </h2>
                    <p className="text-xl text-white/60 max-w-md mx-auto leading-relaxed">
                        Sembra che questo locale non esista o sia stato spostato. Torna alla homepage per scoprire i migliori locali di Napoli!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '300ms' }}>
                    <button
                        onClick={() => navigate('/')}
                        className="group relative px-8 py-4 bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 transform hover:scale-105 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Home size={20} />
                            Torna alla Home
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-orange-600 via-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        Indietro
                    </button>
                </div>

                {/* Suggestions */}
                <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '400ms' }}>
                    <h3 className="text-white font-bold mb-4 text-lg">Suggerimenti:</h3>
                    <ul className="space-y-3 text-white/70 text-left max-w-md mx-auto">
                        <li className="flex items-start gap-3">
                            <span className="text-orange-400 font-bold">•</span>
                            <span>Verifica che l'URL sia corretto</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-400 font-bold">•</span>
                            <span>Il locale potrebbe essere stato rimosso o rinominato</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-400 font-bold">•</span>
                            <span>Usa la ricerca nella homepage per trovare altri locali</span>
                        </li>
                    </ul>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-0 -translate-x-1/2 w-32 h-32 border-4 border-orange-500/20 rounded-full"></div>
                <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-24 h-24 border-4 border-purple-500/20 rounded-full"></div>
            </div>

            {/* Animated Stars */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
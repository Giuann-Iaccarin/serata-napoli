import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        'Esplora': [
            'Napoli',
            'Roma',
            'Milano',
            'Firenze',
            'Tutte le città'
        ],
        'Categorie': [
            'Discoteche',
            'Aperitivi',
            'Live Music',
            'Food Experience',
            'Rooftop Bar'
        ],
        'Aiuto': [
            'Come funziona',
            'FAQ',
            'Contattaci',
            'Termini di servizio',
            'Privacy Policy'
        ]
    };

    return (
        <footer className="relative bg-linear-to-b from-slate-900 to-slate-950 border-t border-white/10 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-16">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <h2 className="text-4xl font-black bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                            NapoliNights
                        </h2>
                        <p className="text-white/60 leading-relaxed mb-6 max-w-md">
                            La piattaforma definitiva per scoprire i migliori locali e serate a Napoli e in tutta Italia.
                            Filtra per mood, trova il tuo posto perfetto.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <SocialButton icon={Instagram} href="#" color="from-pink-500 to-purple-600" />
                            <SocialButton icon={Facebook} href="#" color="from-blue-500 to-blue-600" />
                            <SocialButton icon={Twitter} href="#" color="from-cyan-500 to-blue-500" />
                            <SocialButton icon={Mail} href="#" color="from-orange-500 to-pink-500" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-white font-black text-lg mb-4">{category}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-white/60 hover:text-white transition-colors duration-300 font-medium"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="bg-linear-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-2xl font-black text-white mb-2">
                                Resta aggiornato 🎉
                            </h3>
                            <p className="text-white/60">
                                Ricevi le migliori serate della settimana direttamente nella tua inbox
                            </p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="tua@email.com"
                                className="flex-1 md:w-80 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                            />
                            <button className="px-6 py-3 bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50">
                                Iscriviti
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-white/60">
                            <span>Made with</span>
                            <Heart size={16} className="text-pink-500 fill-pink-500 animate-pulse" />
                            <span>in Napoli</span>
                        </div>

                        <p className="text-white/40 text-sm">
                            © {currentYear} NapoliNights. Tutti i diritti riservati.
                        </p>

                        <div className="flex gap-6 text-white/40 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Termini</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialButton({ icon: Icon, href, color }) {
    return (
        <a
            href={href}
            className={`group relative p-3 bg-white/5 hover:bg-linear-to-r ${color} border border-white/10 hover:border-transparent rounded-xl transition-all duration-300 transform hover:scale-110 overflow-hidden`}
        >
            <Icon size={20} className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-300" />
            <div className={`absolute inset-0 bg-linear-to-r ${color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
        </a>
    );
}

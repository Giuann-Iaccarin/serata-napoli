/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Crown, Star, Check, Sparkles, Zap, MapPin, Heart,
    Users, Calendar, Shield, ArrowRight, X
} from 'lucide-react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/Footer';

const PREMIUM_FEATURES = [
    {
        icon: MapPin,
        title: "Accesso illimitato",
        description: "Sblocca tutti i locali di Napoli senza limiti"
    },
    {
        icon: Star,
        title: "Recensioni prioritarie",
        description: "Le tue recensioni appaiono per prime"
    },
    {
        icon: Heart,
        title: "Lista preferiti estesa",
        description: "Salva fino a 100 locali preferiti"
    },
    {
        icon: Users,
        title: "Gruppi privati",
        description: "Crea e unisciti a gruppi di amici"
    },
    {
        icon: Calendar,
        title: "Pianificazione avanzata",
        description: "Strumenti per organizzare serate complesse"
    },
    {
        icon: Shield,
        title: "Supporto prioritario",
        description: "Assistenza dedicata 24/7"
    }
];

const PLANS = [
    {
        name: "Mensile",
        price: "€4.99",
        period: "al mese",
        popular: false,
        features: ["Accesso completo", "Lista preferiti estesa", "Supporto email"]
    },
    {
        name: "Annuale",
        price: "€49.99",
        period: "all'anno",
        originalPrice: "€59.88",
        popular: true,
        features: ["Tutto del piano mensile", "2 mesi gratis", "Supporto prioritario", "Gruppi privati"]
    },
    {
        name: "Premium+",
        price: "€9.99",
        period: "al mese",
        popular: false,
        features: ["Piano annuale +", "Recensioni prioritarie", "Pianificazione avanzata", "Badge esclusivo"]
    }
];

export default function Premium() {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState('Annuale');
    const [showModal, setShowModal] = useState(false);

    const handleSubscribe = (planName) => {
        // Qui si gestirebbe il pagamento
        setShowModal(true);
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <UserHeader />

            <section className="relative px-4 py-12">
                <div className="mx-auto max-w-6xl">

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <Crown className="w-4 h-4" />
                            Napoli Premium
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Sblocca tutto il potenziale
                            <span className="block bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                                delle serate napoletane
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Accedi a tutti i locali, funzioni esclusive e supporto prioritario.
                            La tua esperienza notturna a Napoli non sarà più la stessa.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
                        {PREMIUM_FEATURES.map((feature, index) => (
                            <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20">
                                        <feature.icon className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                                </div>
                                <p className="text-white/60">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid gap-6 md:grid-cols-3 mb-16">
                        {PLANS.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative rounded-3xl border backdrop-blur-xl p-8 transition-all ${plan.popular
                                    ? 'border-orange-400/50 bg-orange-500/10 shadow-2xl shadow-orange-500/20 scale-105'
                                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="rounded-full bg-orange-500 px-4 py-1 text-sm font-bold text-white">
                                            Più popolare
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                                    <div className="mb-2">
                                        <span className="text-4xl font-black text-white">{plan.price}</span>
                                        <span className="text-white/60"> {plan.period}</span>
                                    </div>
                                    {plan.originalPrice && (
                                        <div className="text-sm text-white/50 line-through">{plan.originalPrice}</div>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                                            <span className="text-white/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscribe(plan.name)}
                                    className={`w-full rounded-2xl py-4 font-bold transition-all ${plan.popular
                                        ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-lg shadow-orange-500/30'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    Scegli {plan.name}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="text-center rounded-3xl border border-white/10 bg-linear-to-r from-orange-500/10 via-pink-500/5 to-purple-500/10 p-12 backdrop-blur-xl">
                        <div className="max-w-2xl mx-auto">
                            <Sparkles className="w-12 h-12 text-orange-400 mx-auto mb-6" />
                            <h2 className="text-3xl font-black text-white mb-4">
                                Pronto a vivere Napoli
                                <span className="block text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-pink-500">
                                    senza limiti?
                                </span>
                            </h2>
                            <p className="text-white/70 mb-8">
                                Unisciti a migliaia di napoletani che hanno già scelto Napoli Premium
                                per vivere al meglio le serate in città.
                            </p>
                            <button
                                onClick={() => handleSubscribe('Annuale')}
                                className="inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-orange-500 to-pink-500 px-8 py-4 font-bold text-white shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/45 transition-all hover:scale-105"
                            >
                                <Crown className="w-5 h-5" />
                                Inizia ora con Premium
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />

            {/* Subscription Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0c1224] p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Conferma iscrizione</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-white/20"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="text-center mb-6">
                            <Crown className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                            <p className="text-white/80">
                                Stai per iscriverti al piano <span className="font-bold text-orange-300">{selectedPlan}</span>
                            </p>
                            <p className="text-white/60 text-sm mt-2">
                                Verrai reindirizzato al pagamento sicuro
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-white hover:bg-white/10 transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    // Qui si reindirizzerebbe al pagamento
                                    alert('Reindirizzamento al pagamento...');
                                }}
                                className="flex-1 rounded-xl bg-orange-500 py-3 font-bold text-white hover:bg-orange-400 transition-colors"
                            >
                                Conferma
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
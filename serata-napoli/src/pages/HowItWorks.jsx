import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, MapPin, Star, Heart, Calendar,
    ArrowRight, Sparkles, Users, TrendingUp, CheckCircle,
    Play, Target, Zap
} from 'lucide-react';
import NapoliHeader from '../components/Header';
import Footer from '../components/Footer';

const STEPS = [
    {
        step: 1,
        title: "Scegli il tuo mood",
        description: "Seleziona l'atmosfera che desideri: tranquillo, movimentato, romantico o alternativo.",
        icon: Sparkles,
        color: "from-orange-500 to-pink-500",
        details: [
            "6 preset di mood predefiniti",
            "Filtri personalizzati avanzati",
            "Suggerimenti basati sulle tue preferenze"
        ]
    },
    {
        step: 2,
        title: "Filtra i risultati",
        description: "Raffina la ricerca per zona, prezzo, tipo di locale e altre caratteristiche.",
        icon: Filter,
        color: "from-blue-500 to-cyan-500",
        details: [
            "Filtra per quartiere e distanza",
            "Seleziona fascia di prezzo",
            "Tipo di serata e formato"
        ]
    },
    {
        step: 3,
        title: "Esplora i locali",
        description: "Scopri i locali che corrispondono ai tuoi criteri con foto e recensioni.",
        icon: Search,
        color: "from-emerald-500 to-teal-500",
        details: [
            "Foto e descrizioni dettagliate",
            "Recensioni e valutazioni",
            "Informazioni su orari e contatti"
        ]
    },
    {
        step: 4,
        title: "Salva e pianifica",
        description: "Aggiungi ai preferiti e organizza le tue serate future.",
        icon: Heart,
        color: "from-purple-500 to-violet-500",
        details: [
            "Lista dei locali preferiti",
            "Pianificazione serate",
            "Condivisione con amici"
        ]
    }
];

const FEATURES = [
    {
        icon: MapPin,
        title: "Geolocalizzazione intelligente",
        description: "Trova locali vicino a te o in qualsiasi zona di Napoli"
    },
    {
        icon: Star,
        title: "Recensioni verificate",
        description: "Valutazioni e commenti da utenti reali della community"
    },
    {
        icon: Calendar,
        title: "Eventi e serate speciali",
        description: "Scopri eventi esclusivi e aperture speciali"
    },
    {
        icon: Users,
        title: "Community attiva",
        description: "Condividi esperienze e consigli con altri appassionati"
    },
    {
        icon: TrendingUp,
        title: "Trend e novità",
        description: "Rimani aggiornato sui locali più popolari del momento"
    },
    {
        icon: Target,
        title: "Match perfetto",
        description: "Algoritmi intelligenti per trovare il locale ideale"
    }
];

export default function HowItWorks() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <NapoliHeader />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-6xl">

                    {/* Hero */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <Play className="w-4 h-4" />
                            Come funziona
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Trova il tuo locale perfetto
                            <span className="block bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                                in 4 semplici passi
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Scopri come utilizzare al meglio NapoliNights per vivere
                            esperienze uniche nella città più bella del mondo
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid gap-8 md:grid-cols-2 mb-16">
                        {STEPS.map((step, index) => (
                            <div key={step.step} className="relative">
                                {/* Connector line */}
                                {index < STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-16 left-1/2 w-px h-32 bg-linear-to-b from-orange-400/50 to-transparent -translate-x-1/2" />
                                )}

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-orange-400/30 transition-colors">
                                    <div className="flex items-start gap-6">
                                        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${step.color} shadow-lg`}>
                                            <step.icon className="w-8 h-8 text-white" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-bold">
                                                    {step.step}
                                                </span>
                                                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                            </div>

                                            <p className="text-white/70 mb-4">{step.description}</p>

                                            <ul className="space-y-2">
                                                {step.details.map((detail, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                        <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-white mb-4">
                                Perché scegliere NapoliNights?
                            </h2>
                            <p className="text-white/70 max-w-2xl mx-auto">
                                Tutto quello che ti serve per vivere al meglio le serate napoletane
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {FEATURES.map((feature, index) => (
                                <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-orange-400/30 transition-colors">
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
                    </div>

                    {/* Demo Video Placeholder */}
                    <div className="mb-16">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center">
                            <div className="w-full max-w-2xl mx-auto">
                                <div className="aspect-video rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                    <div className="text-center">
                                        <Play className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                                        <p className="text-white/60">Video dimostrativo</p>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Guarda come funziona in pratica
                                </h3>
                                <p className="text-white/60">
                                    Un video tutorial di 2 minuti per scoprire tutte le funzionalità
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <div className="rounded-3xl border border-white/10 bg-linear-to-r from-orange-500/10 via-pink-500/5 to-purple-500/10 p-12 backdrop-blur-xl">
                            <Zap className="w-12 h-12 text-orange-400 mx-auto mb-6" />
                            <h2 className="text-3xl font-black text-white mb-4">
                                Pronto a iniziare?
                            </h2>
                            <p className="text-white/70 mb-8 max-w-xl mx-auto">
                                Crea il tuo account gratuito e inizia subito a scoprire i migliori locali di Napoli
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-400 transition-colors"
                                >
                                    Crea account gratis
                                    <ArrowRight size={18} />
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white hover:bg-white/10 transition-colors"
                                >
                                    Esplora senza registrarti
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
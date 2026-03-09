import React from 'react';
import { Shield, Eye, Lock, Database, Users, Cookie } from 'lucide-react';
import NapoliHeader from '../components/Header';
import Footer from '../components/Footer';

const PRIVACY_SECTIONS = [
    {
        icon: Shield,
        title: "Protezione dei dati",
        content: [
            "NapoliNights si impegna a proteggere la tua privacy e i tuoi dati personali.",
            "Utilizziamo tecnologie di crittografia avanzate per proteggere le tue informazioni.",
            "I tuoi dati sono archiviati in server sicuri con accesso limitato.",
            "Monitoriamo costantemente i nostri sistemi per prevenire violazioni della sicurezza."
        ]
    },
    {
        icon: Eye,
        title: "Dati che raccogliamo",
        content: [
            "Informazioni di registrazione: nome, email, password (crittografata).",
            "Dati di utilizzo: locali visitati, preferenze, ricerche effettuate.",
            "Informazioni di localizzazione: per suggerire locali vicini (con consenso).",
            "Dati di pagamento: elaborati da provider certificati, non memorizzati da noi."
        ]
    },
    {
        icon: Database,
        title: "Come utilizziamo i dati",
        content: [
            "Personalizzare le tue esperienze e suggerimenti.",
            "Migliorare il servizio e sviluppare nuove funzionalità.",
            "Comunicare aggiornamenti importanti e offerte speciali.",
            "Garantire la sicurezza della piattaforma e prevenire frodi."
        ]
    },
    {
        icon: Users,
        title: "Condivisione dei dati",
        content: [
            "Non vendiamo mai i tuoi dati personali a terze parti.",
            "Condividiamo dati solo con il tuo consenso esplicito.",
            "Collaboriamo con locali partner solo per gestire prenotazioni.",
            "Possiamo condividere dati se richiesto dalla legge."
        ]
    },
    {
        icon: Lock,
        title: "I tuoi diritti",
        content: [
            "Diritto di accesso: richiedi una copia dei tuoi dati.",
            "Diritto di rettifica: correggi informazioni inaccurate.",
            "Diritto alla cancellazione: elimina il tuo account e dati.",
            "Diritto alla portabilità: esporta i tuoi dati in formato leggibile."
        ]
    },
    {
        icon: Cookie,
        title: "Cookie e tracking",
        content: [
            "Utilizziamo cookie essenziali per il funzionamento del sito.",
            "Cookie analitici per migliorare l'esperienza utente.",
            "Cookie di marketing solo con il tuo consenso.",
            "Puoi gestire le preferenze cookie in qualsiasi momento."
        ]
    }
];

export default function Privacy() {
    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <NapoliHeader />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-4xl">

                    {/* Hero */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <Shield className="w-4 h-4" />
                            Privacy Policy
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            La tua privacy è importante
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Come proteggiamo e utilizziamo le tue informazioni personali
                        </p>
                    </div>

                    {/* Last Updated */}
                    <div className="text-center mb-8">
                        <p className="text-white/60">
                            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
                        </p>
                    </div>

                    {/* Privacy Content */}
                    <div className="space-y-8">
                        {PRIVACY_SECTIONS.map((section, index) => (
                            <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20">
                                        <section.icon className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                                </div>

                                <ul className="space-y-3">
                                    {section.content.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-3 text-white/70">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact for Privacy */}
                    <div className="mt-12 rounded-3xl border border-white/10 bg-linear-to-r from-orange-500/10 via-pink-500/5 to-purple-500/10 p-8 backdrop-blur-xl">
                        <div className="text-center">
                            <Shield className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Domande sulla privacy?
                            </h2>
                            <p className="text-white/70 mb-6">
                                Il nostro team privacy è sempre disponibile per rispondere alle tue domande
                            </p>
                            <div className="space-y-2 text-white/60">
                                <p>Email: privacy@napolinights.it</p>
                                <p>Telefono: +39 081 123 4567</p>
                                <p>Indirizzo: Via Toledo 156, 80132 Napoli</p>
                            </div>
                        </div>
                    </div>

                    {/* GDPR Compliance */}
                    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Conformità GDPR
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    Diritti dell'utente
                                </h3>
                                <ul className="space-y-2 text-white/70">
                                    <li>• Diritto all'accesso</li>
                                    <li>• Diritto di rettifica</li>
                                    <li>• Diritto alla cancellazione</li>
                                    <li>• Diritto alla limitazione</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    Base giuridica
                                </h3>
                                <ul className="space-y-2 text-white/70">
                                    <li>• Consenso dell'utente</li>
                                    <li>• Esecuzione del contratto</li>
                                    <li>• Interesse legittimo</li>
                                    <li>• Obbligo legale</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
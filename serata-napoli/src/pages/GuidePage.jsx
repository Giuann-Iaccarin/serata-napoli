/* eslint-disable no-unused-vars */
import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { MapPin, Clock, Users, Star, ArrowRight, CheckCircle, Lightbulb, Target } from "lucide-react";

export default function GuidePage() {
    return (
        <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
            <Navigation />

            <section className="relative z-20 px-4 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-black text-white mb-4">Guide per la Tua Serata Perfetta</h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Scopri come scegliere il locale ideale, organizzare eventi memorabili e vivere al meglio la notte napoletana
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
                        <GuideCard
                            icon={Target}
                            title="Scegli il Mood Giusto"
                            description="Usa i nostri filtri per trovare locali che corrispondono al tuo stato d'animo: dal tranquillo aperitivo al casino energetico."
                            tips={[
                                "Definisci il tuo mood prima di cercare",
                                "Considera l'orario e il giorno della settimana",
                                "Leggi le recensioni per confermare l'atmosfera"
                            ]}
                        />
                        <GuideCard
                            icon={MapPin}
                            title="Esplora i Quartieri"
                            description="Ogni zona di Napoli ha la sua personalità: Chiaia per l'eleganza, Centro per la vita notturna, Vomero per i rooftop."
                            tips={[
                                "Chiaia: elegante e raffinato",
                                "Centro Storico: tradizionale e vivace",
                                "Vomero: moderno e panoramico"
                            ]}
                        />
                        <GuideCard
                            icon={Clock}
                            title="Pianifica gli Orari"
                            description="I locali napoletani hanno orari flessibili. Gli aperitivi iniziano verso le 18:00, le discoteche aprono dopo le 23:00."
                            tips={[
                                "Aperitivo: 18:00-21:00",
                                "Cena: 20:00-23:00",
                                "Notte: 23:00-05:00"
                            ]}
                        />
                        <GuideCard
                            icon={Users}
                            title="Gruppi e Coppie"
                            description="Alcuni locali sono perfetti per gruppi numerosi, altri per incontri romantici. Scegli in base al tuo gruppo."
                            tips={[
                                "Gruppi: locali spaziosi con pista da ballo",
                                "Coppie: rooftop romantici o lounge intimi",
                                "Solo: bar accoglienti per socializzare"
                            ]}
                        />
                        <GuideCard
                            icon={Star}
                            title="Eventi Speciali"
                            description="Partecipa a eventi unici: serate a tema, concerti dal vivo, degustazioni. Controlla regolarmente gli aggiornamenti."
                            tips={[
                                "Segui i locali sui social",
                                "Iscriviti alle notifiche per eventi",
                                "Prenota in anticipo per eventi popolari"
                            ]}
                        />
                        <GuideCard
                            icon={Lightbulb}
                            title="Consigli Pratici"
                            description="Porta contanti per i locali più tradizionali, prenota per i ristoranti popolari, vestiti adeguatamente al dress code."
                            tips={[
                                "Controlla il dress code",
                                "Prenota per gruppi numerosi",
                                "Usa i mezzi pubblici o parcheggi sicuri"
                            ]}
                        />
                    </div>

                    <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Domande Frequenti</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <FAQItem
                                question="Come funziona il sistema di filtri?"
                                answer="I nostri filtri intelligenti analizzano oltre 120 locali basandosi su energia, affluenza, tipo di serata e preferenze personali."
                            />
                            <FAQItem
                                question="Posso prenotare direttamente dall'app?"
                                answer="Sì, molti locali partner offrono prenotazione diretta. Altri richiedono contatto telefonico o via WhatsApp."
                            />
                            <FAQItem
                                question="Quanto costano le serate?"
                                answer="I prezzi variano da €15 per un aperitivo a €80+ per cene con vista. La maggior parte delle serate è accessibile."
                            />
                            <FAQItem
                                question="È sicuro visitare i locali di notte?"
                                answer="Napoli è sicura nei quartieri turistici. Scegli locali ben recensiti e usa i mezzi pubblici o taxi affidabili."
                            />
                        </div>
                    </div>

                    <Footer />
                </div>
            </section>
        </main>
    );
}

function GuideCard({ icon: Icon, title, description, tips }) {
    return (
        <div className="bg-white/5 rounded-3xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20">
                    <Icon size={24} className="text-orange-300" />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="text-white/70 mb-4">{description}</p>
            <ul className="space-y-2">
                {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/60">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
                        <span>{tip}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function FAQItem({ question, answer }) {
    return (
        <div className="border-b border-white/10 pb-4 last:border-b-0">
            <h4 className="text-lg font-semibold text-white mb-2">{question}</h4>
            <p className="text-white/70">{answer}</p>
        </div>
    );
}
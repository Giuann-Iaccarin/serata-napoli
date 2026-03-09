import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronDown, ChevronUp, Search, HelpCircle, Star,
    MapPin, Filter, Heart, Calendar, Users, Shield,
    CreditCard, MessageCircle, ArrowRight
} from 'lucide-react';
import NapoliHeader from '../components/Header';
import Footer from '../components/Footer';

const FAQ_CATEGORIES = [
    { id: 'general', label: 'Generale', icon: HelpCircle },
    { id: 'search', label: 'Ricerca', icon: Search },
    { id: 'account', label: 'Account', icon: Users },
    { id: 'premium', label: 'Premium', icon: Star },
    { id: 'technical', label: 'Tecnico', icon: Shield },
    { id: 'payment', label: 'Pagamenti', icon: CreditCard }
];

const FAQ_DATA = {
    general: [
        {
            question: "Cos'è NapoliNights?",
            answer: "NapoliNights è la piattaforma definitiva per scoprire e prenotare esperienze uniche nei locali di Napoli. Ti aiutiamo a trovare il posto perfetto per ogni serata, dalla pizza tradizionale alle serate più esclusive."
        },
        {
            question: "Come funziona la ricerca dei locali?",
            answer: "Utilizza i nostri filtri intelligenti: seleziona il mood desiderato, la zona di Napoli, il budget e il tipo di serata. Il nostro algoritmo ti suggerisce i locali più adatti alle tue preferenze."
        },
        {
            question: "È gratuito utilizzare NapoliNights?",
            answer: "Sì! La ricerca e la visualizzazione dei locali è completamente gratuita. Puoi salvare i tuoi preferiti e pianificare serate senza costi. L'abbonamento Premium offre funzionalità aggiuntive come prenotazioni prioritarie e sconti esclusivi."
        },
        {
            question: "Posso utilizzare l'app senza registrazione?",
            answer: "Certo! Puoi esplorare tutti i locali e utilizzare le funzionalità base senza creare un account. Tuttavia, per salvare i preferiti, pianificare serate e accedere alle funzioni Premium, ti consigliamo di registrarti."
        }
    ],
    search: [
        {
            question: "Come funzionano i filtri per mood?",
            answer: "Abbiamo 6 preset di mood: Tranquillo (per serate rilassate), Movimentato (locali vivaci), Romantico (atmosfere intime), Alternativo (luoghi unici), Classico (tradizione napoletana) e Moderno (locali contemporanei)."
        },
        {
            question: "Posso cercare locali in zone specifiche?",
            answer: "Assolutamente! Puoi filtrare per quartiere (Centro Storico, Chiaia, Vomero, ecc.) o utilizzare la geolocalizzazione per trovare locali vicino alla tua posizione attuale."
        },
        {
            question: "Come vengono selezionati i locali sulla piattaforma?",
            answer: "Tutti i locali vengono verificati dal nostro team. Valutiamo qualità del servizio, autenticità dell'esperienza, recensioni degli utenti e rispetto degli standard di sicurezza."
        },
        {
            question: "Posso vedere le recensioni prima di scegliere?",
            answer: "Sì! Ogni locale ha recensioni verificate dagli utenti, con valutazioni dettagliate su cibo, servizio, atmosfera e rapporto qualità-prezzo."
        }
    ],
    account: [
        {
            question: "Come creo un account?",
            answer: "Clicca su 'Registrati' e compila il form con i tuoi dati. Puoi registrarti con email e password o utilizzare Google/Facebook per un accesso più rapido."
        },
        {
            question: "Cosa posso fare con un account?",
            answer: "Salvare locali preferiti, creare liste di serate pianificate, ricevere notifiche personalizzate, accedere a sconti esclusivi e condividere esperienze con la community."
        },
        {
            question: "Posso eliminare il mio account?",
            answer: "Sì, puoi richiedere la cancellazione del tuo account in qualsiasi momento dalle impostazioni del profilo. Tutti i tuoi dati verranno rimossi definitivamente."
        },
        {
            question: "Come resetto la password?",
            answer: "Nella pagina di login, clicca su 'Password dimenticata' e inserisci la tua email. Riceverai un link per reimpostare la password."
        }
    ],
    premium: [
        {
            question: "Cosa offre l'abbonamento Premium?",
            answer: "Prenotazioni prioritarie, sconti esclusivi fino al 30%, accesso anticipato agli eventi speciali, supporto prioritario e statistiche dettagliate sulle tue serate."
        },
        {
            question: "Quanto costa l'abbonamento Premium?",
            answer: "L'abbonamento mensile costa €4.99, quello annuale €49.99 (risparmi 2 mesi). Puoi cancellare in qualsiasi momento senza costi aggiuntivi."
        },
        {
            question: "Posso regalare un abbonamento Premium?",
            answer: "Sì! Puoi acquistare gift card digitali per regalare l'abbonamento Premium ai tuoi amici. Sono disponibili per periodi da 1 a 12 mesi."
        },
        {
            question: "C'è una prova gratuita del Premium?",
            answer: "Offriamo 7 giorni di prova gratuita per testare tutte le funzionalità Premium. Non richiede carta di credito e puoi cancellare in qualsiasi momento."
        }
    ],
    technical: [
        {
            question: "L'app funziona su tutti i dispositivi?",
            answer: "Sì! NapoliNights è ottimizzato per smartphone, tablet e desktop. È compatibile con iOS, Android e tutti i browser moderni."
        },
        {
            question: "I miei dati sono al sicuro?",
            answer: "Assolutamente. Utilizziamo crittografia end-to-end e non condividiamo mai i tuoi dati personali con terze parti. Leggi la nostra privacy policy per maggiori dettagli."
        },
        {
            question: "Cosa faccio se l'app non funziona correttamente?",
            answer: "Prova prima ad aggiornare la pagina o riavviare l'app. Se il problema persiste, contatta il nostro supporto tecnico tramite la sezione 'Contatti'."
        },
        {
            question: "Posso utilizzare l'app offline?",
            answer: "Alcune funzionalità base come visualizzare i locali salvati sono disponibili offline. Per ricerche in tempo reale e prenotazioni, è necessaria una connessione internet."
        }
    ],
    payment: [
        {
            question: "Quali metodi di pagamento accettate?",
            answer: "Accettiamo carte di credito/debito (Visa, Mastercard, American Express), PayPal, Apple Pay e Google Pay. Tutti i pagamenti sono protetti con crittografia SSL."
        },
        {
            question: "Come funziona il rimborso?",
            answer: "Per cancellazioni entro 24 ore dalla prenotazione, offriamo rimborso completo. Per cancellazioni successive, applichiamo una politica flessibile basata sul locale scelto."
        },
        {
            question: "Ricevo una ricevuta per i pagamenti?",
            answer: "Sì, inviamo automaticamente una ricevuta via email per ogni transazione. Puoi anche scaricare le ricevute dal tuo profilo in qualsiasi momento."
        },
        {
            question: "Posso modificare una prenotazione già pagata?",
            answer: "Dipende dalla politica del locale. Alcuni permettono modifiche gratuite fino a poche ore prima, altri applicano costi di cambio. Controlla sempre i termini specifici."
        }
    ]
};

export default function FAQ() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('general');
    const [openQuestions, setOpenQuestions] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    const toggleQuestion = (questionId) => {
        const newOpen = new Set(openQuestions);
        if (newOpen.has(questionId)) {
            newOpen.delete(questionId);
        } else {
            newOpen.add(questionId);
        }
        setOpenQuestions(newOpen);
    };

    const filteredFAQs = FAQ_DATA[activeCategory].filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <NapoliHeader />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-4xl">

                    {/* Hero */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <HelpCircle className="w-4 h-4" />
                            FAQ
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Domande frequenti
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Tutto quello che devi sapere su NapoliNights
                        </p>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                placeholder="Cerca nelle FAQ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-12 py-4 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {FAQ_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${activeCategory === category.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                                    }`}
                            >
                                <category.icon className="w-4 h-4" />
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {filteredFAQs.map((faq, index) => {
                            const questionId = `${activeCategory}-${index}`;
                            const isOpen = openQuestions.has(questionId);

                            return (
                                <div
                                    key={questionId}
                                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleQuestion(questionId)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                                    >
                                        <h3 className="text-lg font-semibold text-white pr-4">
                                            {faq.question}
                                        </h3>
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-orange-400 shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-white/40 shrink-0" />
                                        )}
                                    </button>

                                    {isOpen && (
                                        <div className="px-6 pb-4">
                                            <p className="text-white/70 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* No results */}
                    {filteredFAQs.length === 0 && searchTerm && (
                        <div className="text-center py-12">
                            <HelpCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Nessun risultato trovato
                            </h3>
                            <p className="text-white/60">
                                Prova a riformulare la tua ricerca o seleziona una categoria diversa
                            </p>
                        </div>
                    )}

                    {/* Contact CTA */}
                    <div className="mt-16 text-center">
                        <div className="rounded-3xl border border-white/10 bg-linear-to-r from-orange-500/10 via-pink-500/5 to-purple-500/10 p-8 backdrop-blur-xl">
                            <MessageCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Non hai trovato quello che cercavi?
                            </h2>
                            <p className="text-white/70 mb-6">
                                Il nostro team di supporto è sempre pronto ad aiutarti
                            </p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400 transition-colors"
                            >
                                Contattaci
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
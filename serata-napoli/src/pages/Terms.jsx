import React from 'react';
import { FileText, Shield, Users, CreditCard, AlertTriangle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TERMS_SECTIONS = [
    {
        icon: FileText,
        title: "Accettazione dei termini",
        content: [
            "Utilizzando NapoliNights, accetti questi termini di servizio. Se non sei d'accordo, non utilizzare la piattaforma.",
            "Questi termini possono essere aggiornati periodicamente. Continuando ad utilizzare il servizio, accetti le modifiche."
        ]
    },
    {
        icon: Users,
        title: "Uso del servizio",
        content: [
            "NapoliNights è una piattaforma per la ricerca e prenotazione di locali a Napoli.",
            "Gli utenti devono fornire informazioni accurate e aggiornate.",
            "È vietato utilizzare il servizio per attività illegali o dannose.",
            "Rispetta gli altri utenti e i locali partner."
        ]
    },
    {
        icon: Shield,
        title: "Privacy e dati",
        content: [
            "I tuoi dati sono protetti secondo la nostra Privacy Policy.",
            "Utilizziamo i dati per migliorare il servizio e personalizzare le esperienze.",
            "Non vendiamo i tuoi dati a terze parti senza consenso.",
            "Hai il diritto di accedere, modificare o eliminare i tuoi dati."
        ]
    },
    {
        icon: CreditCard,
        title: "Pagamenti e prenotazioni",
        content: [
            "Le prenotazioni sono soggette alla conferma del locale.",
            "I pagamenti sono processati in modo sicuro attraverso provider certificati.",
            "Le cancellazioni sono soggette alle politiche del singolo locale.",
            "NapoliNights non è responsabile per mancati pagamenti o rimborsi."
        ]
    },
    {
        icon: AlertTriangle,
        title: "Limitazione di responsabilità",
        content: [
            "NapoliNights non garantisce l'accuratezza delle informazioni sui locali.",
            "Non siamo responsabili per esperienze negative o danni derivanti dall'uso del servizio.",
            "L'uso del servizio è a tuo rischio.",
            "Il servizio è fornito 'così com'è' senza garanzie."
        ]
    }
];

export default function Terms() {
    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-4xl">

                    {/* Hero */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <FileText className="w-4 h-4" />
                            Termini di servizio
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Termini e condizioni
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Le regole per utilizzare NapoliNights in modo sicuro e responsabile
                        </p>
                    </div>

                    {/* Last Updated */}
                    <div className="text-center mb-8">
                        <p className="text-white/60">
                            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
                        </p>
                    </div>

                    {/* Terms Content */}
                    <div className="space-y-8">
                        {TERMS_SECTIONS.map((section, index) => (
                            <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20">
                                        <section.icon className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                                </div>

                                <div className="space-y-4">
                                    {section.content.map((paragraph, pIndex) => (
                                        <p key={pIndex} className="text-white/70 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Information */}
                    <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Informazioni aggiuntive
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    Contatti legali
                                </h3>
                                <div className="space-y-2 text-white/70">
                                    <p>NapoliNights S.r.l.</p>
                                    <p>Via Toledo 156, 80132 Napoli</p>
                                    <p>P.IVA: 12345678901</p>
                                    <p>Email: legal@napolinights.it</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    Giurisdizione
                                </h3>
                                <div className="space-y-2 text-white/70">
                                    <p>Questi termini sono regolati dal diritto italiano.</p>
                                    <p>Il foro competente è quello di Napoli.</p>
                                    <p>Per controversie è possibile ricorrere alla mediazione.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Acceptance */}
                    <div className="mt-8 text-center">
                        <p className="text-white/60">
                            Utilizzando NapoliNights, dichiari di aver letto e accettato questi termini di servizio.
                        </p>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
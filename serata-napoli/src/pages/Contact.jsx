import React, { useState } from 'react';
import {
    Mail, Phone, MapPin, Clock, Send, MessageCircle,
    Instagram, Facebook, Twitter, CheckCircle, AlertCircle
} from 'lucide-react';
import NapoliHeader from '../components/Header';
import Footer from '../components/Footer';

const CONTACT_METHODS = [
    {
        icon: Mail,
        title: "Email",
        description: "Risposta entro 24 ore",
        contact: "support@napolinights.it",
        action: "mailto:support@napolinights.it"
    },
    {
        icon: Phone,
        title: "Telefono",
        description: "Lun-Ven 9:00-18:00",
        contact: "+39 081 123 4567",
        action: "tel:+390811234567"
    },
    {
        icon: MessageCircle,
        title: "Chat Live",
        description: "Supporto immediato",
        contact: "Disponibile ora",
        action: "#chat"
    },
    {
        icon: MapPin,
        title: "Ufficio",
        description: "Vieni a trovarci",
        contact: "Via Toledo 156, Napoli",
        action: "#map"
    }
];

const SOCIAL_LINKS = [
    { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-400" },
    { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-400" },
    { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-sky-400" }
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setSubmitStatus('success');
        setIsSubmitting(false);

        // Reset form after success
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                category: 'general'
            });
            setSubmitStatus(null);
        }, 3000);
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <NapoliHeader />

            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-6xl">

                    {/* Hero */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-2 text-sm text-orange-300 mb-6">
                            <MessageCircle className="w-4 h-4" />
                            Contatti
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Siamo qui per aiutarti
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Hai domande su NapoliNights? Il nostro team è pronto a rispondere
                        </p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-2">

                        {/* Contact Methods */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-8">
                                Come possiamo aiutarti?
                            </h2>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {CONTACT_METHODS.map((method, index) => (
                                    <a
                                        key={index}
                                        href={method.action}
                                        className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-orange-400/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                                                <method.icon className="w-6 h-6 text-orange-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">{method.title}</h3>
                                        </div>
                                        <p className="text-white/60 text-sm mb-2">{method.description}</p>
                                        <p className="text-orange-400 font-medium">{method.contact}</p>
                                    </a>
                                ))}
                            </div>

                            {/* Business Hours */}
                            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-5 h-5 text-orange-400" />
                                    <h3 className="text-lg font-semibold text-white">Orari di lavoro</h3>
                                </div>
                                <div className="space-y-2 text-white/70">
                                    <div className="flex justify-between">
                                        <span>Lunedì - Venerdì</span>
                                        <span>9:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sabato</span>
                                        <span>10:00 - 16:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Domenica</span>
                                        <span>Chiuso</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-white mb-4">Seguici sui social</h3>
                                <div className="flex gap-4">
                                    {SOCIAL_LINKS.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors ${social.color}`}
                                            aria-label={social.label}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-8">
                                Inviaci un messaggio
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">
                                            Nome completo *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none"
                                            placeholder="Il tuo nome"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none"
                                            placeholder="tua@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">
                                        Categoria *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-orange-400/50 focus:outline-none"
                                    >
                                        <option value="general">Domanda generale</option>
                                        <option value="technical">Supporto tecnico</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="bug">Segnalazione bug</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">
                                        Oggetto *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none"
                                        placeholder="Di cosa hai bisogno?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">
                                        Messaggio *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none resize-none"
                                        placeholder="Descrivi la tua richiesta in dettaglio..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Invio in corso...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Invia messaggio
                                        </>
                                    )}
                                </button>

                                {/* Submit Status */}
                                {submitStatus === 'success' && (
                                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                                        <CheckCircle className="w-5 h-5 shrink-0" />
                                        <span>Messaggio inviato con successo! Ti risponderemo presto.</span>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <span>Errore nell'invio del messaggio. Riprova più tardi.</span>
                                    </div>
                                )}
                            </form>
                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
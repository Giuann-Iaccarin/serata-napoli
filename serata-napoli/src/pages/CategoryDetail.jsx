import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowLeft, Star, Users, TrendingUp } from 'lucide-react';
import { CATEGORIES_DATA } from './Categories';

export default function CategoryDetail() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const category = CATEGORIES_DATA.find(cat => cat.id === categoryId);

    if (!category) {
        return (
            <main className="min-h-screen bg-[#050816] text-white">
                <Navigation />
                <section className="mt-20 px-4 py-12 text-center">
                    <h1 className="text-3xl font-black mb-4">Categoria non trovata</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-6 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600"
                    >
                        <ArrowLeft className="inline w-4 h-4 mr-2" /> Torna indietro
                    </button>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />
            <section className="relative mt-20 px-4 py-12">
                <div className="mx-auto max-w-3xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 flex items-center gap-2 text-orange-300 hover:text-orange-400"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Torna alle categorie
                    </button>
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${category.color} shadow-lg`}>
                            <category.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black mb-1">{category.name}</h1>
                            <p className="text-white/70">{category.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white font-medium">{category.avgRating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-orange-400" />
                            <span className="text-white/70 text-sm">{category.venueCount} locali</span>
                        </div>
                        {category.trending && (
                            <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/30 rounded-full px-2 py-1">
                                <TrendingUp className="w-3 h-3 text-orange-400" />
                                <span className="text-xs text-orange-300 font-medium">Hot</span>
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-2">Sottocategorie</h2>
                        <div className="flex flex-wrap gap-2">
                            {category.subcategories.map((sub, idx) => (
                                <span key={idx} className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full">
                                    {sub}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-2">Locali popolari</h2>
                        <ul className="list-disc list-inside text-white/80">
                            {category.popularVenues.map((venue, idx) => (
                                <li key={idx}>{venue}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

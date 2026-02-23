import React, { useState, useRef, useEffect } from 'react';
import { Flame, Wine, Music, Sparkles, Users, ChevronDown, Search, X } from 'lucide-react';

export default function NapoliHeader() {
    const [activeSection, setActiveSection] = useState('casino');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('Napoli');
    const [selectedZone, setSelectedZone] = useState('Centro');
    const [step, setStep] = useState('city'); // 'city' or 'zone'
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);

    const cities = [
        'Napoli', 'Roma', 'Milano', 'Torino', 'Firenze', 'Bologna',
        'Venezia', 'Palermo', 'Genova', 'Bari'
    ];

    const zones = {
        'Napoli': ['Centro', 'Vomero', 'Chiaia', 'Posillipo', 'Mergellina', 'Fuorigrotta'],
        'Roma': ['Centro Storico', 'Trastevere', 'Testaccio', 'Monti', 'Prati'],
        'Milano': ['Centro', 'Navigli', 'Brera', 'Porta Romana', 'Isola'],
    };

    const sections = [
        { id: 'casino', label: 'Vogliamo casino' },
        { id: 'tranquillo', label: 'Tranquillo ma vivo' },
        { id: 'musica', label: 'Musica live' },
        { id: 'alternativo', label: 'Alternativo' },
        { id: 'persone', label: 'Conoscere persone' },
        { id: 'food', label: 'Esperienza food' }
    ];

    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredZones = zones[selectedCity]?.filter(zone =>
        zone.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setStep('city');
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setStep('zone');
        setSearchQuery('');
    };

    const handleZoneSelect = (zone) => {
        setSelectedZone(zone);
        setIsDropdownOpen(false);
        setStep('city');
        setSearchQuery('');
    };

    return (
        <div className="relative min-h-screen bg-slate-900">
            {/* Navigation Bar */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-5 bg-linear-to-b from-slate-900/95 to-transparent">
                <div className="flex items-center gap-8">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`relative text-base font-medium transition-colors pb-1 ${activeSection === section.id
                                ? 'text-white font-semibold'
                                : 'text-white/70 hover:text-white'
                                }`}
                        >
                            {section.label}
                            <span
                                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full transition-all duration-300 ${activeSection === section.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* City Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 text-white/90 font-medium text-base hover:text-white transition-colors"
                    >
                        <span>{selectedCity} - {selectedZone}</span>
                        <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-80 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                            {/* Header */}
                            <div className="p-4 border-b border-white/10">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-white font-semibold text-sm">
                                        {step === 'city' ? 'Seleziona città' : 'Seleziona zona'}
                                    </h3>
                                    {step === 'zone' && (
                                        <button
                                            onClick={() => {
                                                setStep('city');
                                                setSearchQuery('');
                                            }}
                                            className="text-white/60 hover:text-white text-xs font-medium transition-colors"
                                        >
                                            ← Indietro
                                        </button>
                                    )}
                                </div>

                                {/* Search Input */}
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={step === 'city' ? 'Cerca città...' : 'Cerca zona...'}
                                        className="w-full bg-slate-700/50 text-white pl-10 pr-8 py-2 rounded-lg text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* List */}
                            <div className="max-h-64 overflow-y-auto">
                                {step === 'city' ? (
                                    filteredCities.length > 0 ? (
                                        filteredCities.map((city) => (
                                            <button
                                                key={city}
                                                onClick={() => handleCitySelect(city)}
                                                className={`w-full text-left px-4 py-3 text-sm transition-colors ${city === selectedCity
                                                    ? 'bg-orange-500/20 text-orange-400 font-medium'
                                                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                                                    }`}
                                            >
                                                {city}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center text-white/40 text-sm">
                                            Nessuna città trovata
                                        </div>
                                    )
                                ) : (
                                    filteredZones.length > 0 ? (
                                        filteredZones.map((zone) => (
                                            <button
                                                key={zone}
                                                onClick={() => handleZoneSelect(zone)}
                                                className={`w-full text-left px-4 py-3 text-sm transition-colors ${zone === selectedZone
                                                    ? 'bg-orange-500/20 text-orange-400 font-medium'
                                                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                                                    }`}
                                            >
                                                {zone}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center text-white/40 text-sm">
                                            Nessuna zona trovata
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://media.istockphoto.com/id/140217615/photo/naples-italy.jpg?s=612x612&w=0&k=20&c=ZJLTpOIJ54EMuMKuqpgTpHqE_kItySnnYX4qq57g_Bk="
                    alt="Napoli di notte"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/50 to-slate-900/90" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-8 pt-32 pb-20">
                <h1 className="text-7xl font-black text-white text-center mb-6 tracking-tight leading-tight">
                    Dove vai stasera a Napoli?
                </h1>

                <p className="text-xl text-white/90 text-center mb-12 font-light">
                    Scegli il mood. Ti diciamo dove andare.
                </p>

                <button className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold px-12 py-5 rounded-xl shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300 transform hover:scale-105 mb-16">
                    Trova la tua serata
                </button>

                {/* Category Buttons */}
                <div className="flex gap-4 flex-wrap justify-center max-w-5xl">
                    <button className="group flex items-center gap-3 bg-linear-to-br from-red-600/90 to-red-700/90 hover:from-red-500 hover:to-red-600 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-red-400/30">
                        <Flame className="group-hover:scale-125 transition-transform" size={24} />
                        Vogliamo casino
                    </button>

                    <button className="group flex items-center gap-3 bg-linear-to-br from-emerald-600/90 to-emerald-700/90 hover:from-emerald-500 hover:to-emerald-600 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-emerald-400/30">
                        <Wine className="group-hover:scale-125 transition-transform" size={24} />
                        Tranquillo ma vivo
                    </button>

                    <button className="group flex items-center gap-3 bg-linear-to-br from-blue-600/90 to-blue-700/90 hover:from-blue-500 hover:to-blue-600 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-400/30">
                        <Music className="group-hover:scale-125 transition-transform" size={24} />
                        Musica live
                    </button>

                    <button className="group flex items-center gap-3 bg-linear-to-br from-purple-600/90 to-purple-700/90 hover:from-purple-500 hover:to-purple-600 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-400/30">
                        <Sparkles className="group-hover:scale-125 transition-transform" size={24} />
                        Alternativo
                    </button>

                    <button className="group flex items-center gap-3 bg-linear-to-br from-teal-600/90 to-teal-700/90 hover:from-teal-500 hover:to-teal-600 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-teal-400/30">
                        <Users className="group-hover:scale-125 transition-transform" size={24} />
                        Conoscere persone
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-900 to-transparent z-10" />
        </div>
    );
}
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ChevronDown, Flame, Users, TrendingUp, UserCircle, Home, Tent, Calendar, Heart, SlidersHorizontal, X } from 'lucide-react';

export default function NapoliFilters() {
    const [priceRange, setPriceRange] = useState(['€', '€€', '€€€']);
    const [selectedZone, setSelectedZone] = useState('Napoli città');
    const [selectedQuartiere, setSelectedQuartiere] = useState('Centro');
    const [selectedAge, setSelectedAge] = useState('23-26');
    const [selectedEnergy, setSelectedEnergy] = useState(5);
    const [selectedSocial, setSelectedSocial] = useState(4);
    const [selectedAffluenza, setSelectedAffluenza] = useState(3);
    const [selectedTipoSerata, setSelectedTipoSerata] = useState('Discoteca');
    const [selectedPubblico, setSelectedPubblico] = useState('Misto');
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Advanced filters
    const [selectedLocation, setSelectedLocation] = useState('Entrambi');
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedIdealFor, setSelectedIdealFor] = useState('Amici');

    const priceOptions = ['€', '€€', '€€€'];
    const ageRanges = ['18-22', '23-26', '27-30', '30+'];
    const tipoSerataOptions = ['Discoteca', 'Aperitivo', 'Live Music', 'Food & Drink', 'Rooftop', 'Beach Club', 'Lounge'];
    const pubblicoOptions = ['Misto', 'Giovane', 'Maturo', 'Internazionale', 'Locale', 'Alternativo'];
    const locationOptions = ['Entrambi', 'Indoor', 'Outdoor'];
    const formatOptions = ['DJ Set', 'Live Band', 'Karaoke', 'Dancing', 'Aperitivo', 'Cena', 'Brunch', 'After Party'];
    const daysOptions = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    const idealForOptions = ['Solo', 'Coppia', 'Amici', 'Gruppo', 'Networking', 'Date', 'Famiglia'];

    const togglePrice = (price) => {
        if (priceRange.includes(price)) {
            setPriceRange(priceRange.filter(p => p !== price));
        } else {
            setPriceRange([...priceRange, price].sort((a, b) => a.length - b.length));
        }
    };

    const toggleFormat = (format) => {
        if (selectedFormats.includes(format)) {
            setSelectedFormats(selectedFormats.filter(f => f !== format));
        } else {
            setSelectedFormats([...selectedFormats, format]);
        }
    };

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const resetFilters = () => {
        setPriceRange(['€', '€€', '€€€']);
        setSelectedEnergy(5);
        setSelectedSocial(4);
        setSelectedAffluenza(3);
        setSelectedLocation('Entrambi');
        setSelectedFormats([]);
        setSelectedDays([]);
        setSelectedIdealFor('Amici');
    };

    return (
        <div className="w-full bg-slate-900/70 backdrop-blur-xl border-y border-white/10 shadow-lg rounded-xl p-5 max-w-7xl mx-auto">
            {/* Main Filters */}
            <div className="flex flex-wrap gap-3 mb-4">
                {/* Price */}
                <FilterButtonGroup label="Prezzo" options={priceOptions} selected={priceRange} onToggle={togglePrice} color="orange" />

                {/* Zone */}
                <DropdownFilter label="Zona" value={selectedZone} options={['Napoli città', 'Vomero', 'Chiaia', 'Centro Storico', 'Posillipo']} onChange={setSelectedZone} />

                {/* Quartiere */}
                <DropdownFilter label="Quartiere" value={selectedQuartiere} options={['Centro', 'Vomero', 'Chiaia', 'Posillipo', 'Mergellina', 'Fuorigrotta']} onChange={setSelectedQuartiere} />

                {/* Age */}
                <DropdownFilter label="Età media" value={`${selectedAge} anni`} options={ageRanges.map(a => `${a} anni`)} onChange={(val) => setSelectedAge(val.replace(' anni', ''))} highlight={true} />

                {/* Tipo serata */}
                <DropdownFilter label="Tipo serata" value={selectedTipoSerata} options={tipoSerataOptions} onChange={setSelectedTipoSerata} icon={<Home size={14} />} />

                {/* Pubblico */}
                <DropdownFilter label="Pubblico" value={selectedPubblico} options={pubblicoOptions} onChange={setSelectedPubblico} icon={<UserCircle size={14} />} />
            </div>

            {/* Level Filters + Advanced Toggle */}
            <div className="flex flex-wrap gap-3 items-center">
                <LevelFilter label="Energia" value={selectedEnergy} onChange={setSelectedEnergy} icon={Flame} color="orange" />
                <LevelFilter label="Socialità" value={selectedSocial} onChange={setSelectedSocial} icon={Users} color="blue" />
                <LevelFilter label="Affluenza" value={selectedAffluenza} onChange={setSelectedAffluenza} icon={TrendingUp} color="purple" />

                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:border-orange-500 transition-all backdrop-blur-md text-white/80 font-semibold ${showAdvanced ? 'bg-orange-500/20 text-orange-400' : ''}`}
                >
                    <SlidersHorizontal size={16} /> Filtri avanzati
                    <ChevronDown size={14} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                    {(selectedFormats.length > 0 || selectedDays.length > 0 || selectedLocation !== 'Entrambi') && (
                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                    )}
                </button>

                <button onClick={resetFilters} className="ml-auto flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 text-white/70 hover:text-white transition-all border border-white/10">
                    <X size={16} /> Reset
                </button>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
                <div className="mt-4 p-4 bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                    <FilterButtonGroup label="Location" options={locationOptions} selected={[selectedLocation]} onToggle={setSelectedLocation} color="orange" single />
                    <FilterButtonGroup label="Ideale per" options={idealForOptions} selected={[selectedIdealFor]} onToggle={setSelectedIdealFor} color="orange" single />
                    <FilterButtonGroup label="Attività / Format" options={formatOptions} selected={selectedFormats} onToggle={toggleFormat} color="blue" />
                    <FilterButtonGroup label="Giorni migliori" options={daysOptions} selected={selectedDays} onToggle={toggleDay} color="green" />
                </div>
            )}
        </div>
    );
}

// ------------------- Helper Components -------------------

function FilterButtonGroup({ label, options, selected, onToggle, color, single = false }) {
    const colors = {
        orange: 'bg-orange-500 text-white shadow-md shadow-orange-500/30',
        blue: 'bg-blue-500 text-white shadow-md shadow-blue-500/30',
        green: 'bg-green-500 text-white shadow-md shadow-green-500/30'
    };

    return (
        <div className="flex flex-col gap-1">
            <span className="text-white/60 font-semibold text-xs uppercase">{label}</span>
            <div className="flex flex-wrap gap-2">
                {options.map((opt) => {
                    const isSelected = single ? selected[0] === opt : selected.includes(opt);
                    return (
                        <button
                            key={opt}
                            onClick={() => single ? onToggle(opt) : onToggle(opt)}
                            className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${isSelected ? colors[color] : 'bg-slate-800/50 text-white/70 hover:bg-slate-800/70 hover:text-white hover:scale-105'}`}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function LevelFilter({ label, value, onChange, icon: Icon, color }) {
    const colors = { orange: 'text-orange-500', blue: 'text-blue-500', purple: 'text-purple-500' };
    return (
        <div className="flex flex-col gap-1">
            <span className="text-white/60 text-xs uppercase font-semibold">{label}</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Icon
                        key={i}
                        size={18}
                        className={`cursor-pointer transition-transform hover:scale-125 ${i <= value ? colors[color] : 'text-white/30'}`}
                        onClick={() => onChange(i)}
                    />
                ))}
            </div>
        </div>
    );
}

function DropdownFilter({ label, value, options, onChange, highlight = false, icon = null }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-slate-800/50 text-white/70 hover:bg-slate-800/70 hover:text-white font-semibold transition-all"
            >
                {icon && <span>{icon}</span>}
                <span className="text-xs uppercase">{label}</span>
                <span className={`font-bold ${highlight ? 'text-orange-400' : 'text-white'}`}>{value}</span>
                <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900/70 backdrop-blur-md rounded-xl shadow-lg border border-white/10 z-20 overflow-hidden animate-in slide-in-from-top-2">
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setOpen(false); }}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${opt === value ? 'bg-slate-800/50 text-orange-400 font-bold' : 'text-white/70 hover:bg-slate-800/60 hover:text-white'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

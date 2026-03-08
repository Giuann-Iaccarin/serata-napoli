import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Euro, Users, Flame, Heart, Navigation, Bookmark, Sparkles } from 'lucide-react';

export default function VenueCard({ venue }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    slug,
    name = "Movida Club",
    zone = "Chiaia",
    mood = "casino",
    price = "€€",
    age = "22-25",
    energy = 5,
    social = 4,
    badges = ["DJ Set", "Indoor", "Gruppi"],
    highlight = false,
    image = null,
    googleAddress = ""
  } = venue || {};

  const moodConfig = {
    casino: {
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      bgGlow: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400',
      label: '🔥 Casino'
    },
    tranquillo: {
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      bgGlow: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      label: '🍹 Tranquillo'
    },
    musica: {
      gradient: 'from-blue-500 via-indigo-500 to-purple-600',
      bgGlow: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      label: '🎵 Live Music'
    },
    alternativo: {
      gradient: 'from-purple-500 via-fuchsia-500 to-pink-600',
      bgGlow: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      label: '🎨 Alternativo'
    },
    food: {
      gradient: 'from-amber-500 via-orange-500 to-red-600',
      bgGlow: 'bg-amber-500/20',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      label: '🍽 Food Experience'
    }
  };

  const config = moodConfig[mood] || moodConfig.casino;

  // Create URL-friendly path
  const venuePath = slug ? `/venue/${id}/${slug}` : `/venue/${id}`;

  return (
    <div
      className={`group relative bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] ${highlight ? 'ring-2 ring-orange-500/50 shadow-2xl shadow-orange-500/20' : 'border border-white/10 hover:border-white/20'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect on Hover */}
      <div className={`absolute inset-0 bg-linear-to-br ${config.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>

      {/* Highlight Badge */}
      {highlight && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-linear-to-r from-orange-500 to-pink-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg animate-pulse">
          <Sparkles size={12} />
          TOP PICK
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsSaved(!isSaved);
        }}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-xl transition-all duration-300 ${isSaved
          ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
          }`}
      >
        <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
      </button>

      {/* Link Wrapper */}
      <Link to={venuePath} className="block">
        {/* Image or Gradient Background */}
        <div className="relative h-48 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full bg-linear-to-br ${config.gradient} opacity-30`}></div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

          {/* Mood Badge */}
          <div className={`absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-linear-to-r ${config.gradient} text-white text-sm font-bold shadow-lg backdrop-blur-sm`}>
            {config.label}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-orange-400 group-hover:to-pink-500 transition-all duration-300">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-white/60">
              <MapPin size={14} />
              <span className="text-sm font-medium">{zone}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-black/20 rounded-2xl border border-white/5">
            <div className="flex flex-col">
              <span className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Prezzo</span>
              <div className="flex items-center gap-1">
                <Euro size={14} className="text-amber-400" />
                <span className="text-white font-bold">{price}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Età</span>
              <span className="text-white font-bold">{age}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Energia</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Flame
                    key={i}
                    size={14}
                    className={i < energy ? 'text-orange-500 fill-orange-500' : 'text-white/20'}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Social</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Users
                    key={i}
                    size={14}
                    className={i < social ? 'text-cyan-500 fill-cyan-500' : 'text-white/20'}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white/80 backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Handle directions - could open Google Maps
                window.open(googleAddress, '_blank');
              }}
              className="flex-1 group/btn relative overflow-hidden bg-linear-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Navigation size={16} />
                Indicazioni
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </Link>

      {/* Animated Border on Hover */}
      <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
        <div className={`absolute inset-0 rounded-3xl bg-linear-to-r ${config.gradient} opacity-20 blur-xl`}></div>
      </div>
    </div>
  );
}
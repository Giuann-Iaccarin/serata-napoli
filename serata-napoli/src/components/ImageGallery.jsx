import React from 'react';

export default function ImageGallery({ images, venueName, onImageClick }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, i) => (
                <button key={i} onClick={() => onImageClick(i)}
                    className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all duration-300">
                    <img src={src} alt={`${venueName} - ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
            ))}
        </div>
    );
}
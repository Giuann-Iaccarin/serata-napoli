import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageLightbox({ images, currentIndex, onClose, onNext, onPrev }) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, onNext, onPrev]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
            <button onClick={onClose} className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"><X size={24} /></button>
            <button onClick={onPrev} className="absolute left-4  p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"><ChevronLeft size={32} /></button>
            <button onClick={onNext} className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"><ChevronRight size={32} /></button>
            <img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} className="max-w-full max-h-full object-contain rounded-2xl" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-white font-semibold text-sm">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
}
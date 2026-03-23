import React from 'react';
import { Star } from 'lucide-react';

export default function StarRow({ rating, size = 16 }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={size} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} />
            ))}
        </div>
    );
}
import React, { useState } from "react";
import StarRow from "./StarRow";
import { ThumbsUp } from "lucide-react";

export default function ReviewCard({ review }) {
    const [isHelpful, setIsHelpful] = useState(false);
    return (
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-300 shrink-0 w-full">
            <div className="flex items-start gap-4">
                <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full border-2 border-white/20 shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white">{review.author}</h4>
                        <span className="text-white/40 text-xs">{new Date(review.date).toLocaleDateString("it-IT")}</span>
                    </div>
                    <StarRow rating={review.rating} />
                    <p className="text-white/80 leading-relaxed mt-3 mb-4">{review.comment}</p>
                    <button
                        onClick={() => setIsHelpful((p) => !p)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isHelpful
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                            }`}
                    >
                        <ThumbsUp size={14} fill={isHelpful ? "currentColor" : "none"} />
                        Utile ({review.helpful + (isHelpful ? 1 : 0)})
                    </button>
                </div>
            </div>
        </div>
    );
}

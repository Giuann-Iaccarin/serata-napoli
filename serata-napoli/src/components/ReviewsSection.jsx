import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import ExpandDrawer from "./ExpandDrawer";
import { Star, ChevronDown } from "lucide-react";

const REVIEWS_PREVIEW = 3;

export default function ReviewsSection({ reviews, rating, totalReviews }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const preview = reviews.slice(0, REVIEWS_PREVIEW);
    const hasMore = reviews.length > REVIEWS_PREVIEW;

    return (
        <>
            <div className="bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                        Recensioni
                    </h2>
                    <div className="flex items-center gap-2">
                        <Star size={20} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xl font-black text-white">{rating}</span>
                        <span className="text-white/50 text-sm">({totalReviews})</span>
                    </div>
                </div>
                <div className="space-y-4">
                    {preview.map((r) => <ReviewCard key={r.id} review={r} />)}
                </div>
                {hasMore && (
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300"
                    >
                        <ChevronDown size={16} />
                        Visualizza tutte le {reviews.length} recensioni
                    </button>
                )}
            </div>

            {drawerOpen && (
                <ExpandDrawer title={`Tutte le recensioni (${reviews.length})`} onClose={() => setDrawerOpen(false)}>
                    {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                </ExpandDrawer>
            )}
        </>
    );
}

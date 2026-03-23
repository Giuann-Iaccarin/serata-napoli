import React, { useState } from "react";

export default function CommentBox({ onAddComment }) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            setError("Il commento non può essere vuoto.");
            return;
        }
        onAddComment(comment.trim());
        setComment("");
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 mb-4">
            <textarea
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white resize-none focus:outline-none focus:border-orange-400 transition"
                rows={3}
                placeholder="Scrivi un commento..."
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            {error && <div className="text-red-400 text-xs mt-1">{error}</div>}
            <button
                type="submit"
                className="mt-2 px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition"
            >
                Invia commento
            </button>
        </form>
    );
}

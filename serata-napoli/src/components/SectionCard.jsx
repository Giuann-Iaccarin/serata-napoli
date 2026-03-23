import React from 'react';

export default function SectionCard({ children, className = "" }) {
    return (
        <div className={`bg-linear-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 ${className}`}>
            {children}
        </div>
    );
}
import React from "react";

export default function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Icon size={16} className={color} />
                <span className="text-white/40 text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-xl font-black text-white">{value}</p>
        </div>
    );
}

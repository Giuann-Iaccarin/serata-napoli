import React from "react";

export default function ShareAction({ icon: Icon, label, onClick, active = false }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`mb-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition
                ${active ? "bg-emerald-500/15 text-emerald-200" : "text-white/80 hover:bg-white/5 hover:text-white"}`}
        >
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${active ? "bg-emerald-500/15" : "bg-white/6"}`}>
                <Icon size={17} />
            </div>
            <span className="font-medium">{label}</span>
        </button>
    );
}

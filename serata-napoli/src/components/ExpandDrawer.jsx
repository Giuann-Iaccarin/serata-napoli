import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

export default function ExpandDrawer({ title, onClose, children }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-9000 flex items-end md:items-center justify-center" onClick={onClose}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
                className="relative z-10 w-full max-w-2xl max-h-[80vh] flex flex-col bg-slate-900 border border-white/10 rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                    <h3 className="text-lg font-black text-white">{title}</h3>
                    <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all">
                        <X size={18} />
                    </button>
                </div>
                <div className="overflow-y-auto flex-1 p-6 space-y-4">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
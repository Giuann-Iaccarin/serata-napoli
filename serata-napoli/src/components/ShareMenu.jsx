import React from "react";
import ShareAction from "./ShareAction";
import { X } from "lucide-react";
import ReactDOM from "react-dom";

export default function ShareMenu({ open, position, onClose, actions }) {
    if (!open) return null;
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-9999" onClick={onClose}>
            <div
                className="absolute w-72 overflow-hidden rounded-3xl border border-white/10 bg-[#0c1224]/95 shadow-2xl backdrop-blur-2xl"
                style={{ top: position.top, left: Math.max(16, position.left) }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <div>
                        <p className="text-sm font-bold text-white">Condividi locale</p>
                        <p className="text-xs text-white/45">Scegli come inviarlo</p>
                    </div>
                    <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white">
                        <X size={14} />
                    </button>
                </div>
                <div className="p-2">
                    {actions.map(({ icon, label, onClick, active }, i) => (
                        <ShareAction key={i} icon={icon} label={label} onClick={onClick} active={active} />
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}

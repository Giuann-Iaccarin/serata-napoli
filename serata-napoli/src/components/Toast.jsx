import React from 'react';
import ReactDOM from 'react-dom';
import { Check, AlertCircle } from 'lucide-react';

export default function Toast({ message, visible, toast }) {
    // Support both interfaces
    const isVisible = toast ? toast.show : visible;
    const toastMessage = toast ? toast.message : message;
    const type = toast ? toast.type : 'success';

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-10000 flex items-center gap-2 px-5 py-3 rounded-2xl
            bg-emerald-500/90 backdrop-blur-xl shadow-lg shadow-emerald-900/40 text-white font-semibold text-sm
            transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            {type === 'success' ? <Check size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
            {toastMessage}
        </div>,
        document.body
    );
}
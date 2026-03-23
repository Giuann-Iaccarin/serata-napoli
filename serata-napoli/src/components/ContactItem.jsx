import React from "react";

export default function ContactItem({ icon: Icon, text, href }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group">
            <Icon size={18} className="text-orange-400 group-hover:scale-110 transition-transform duration-300 shrink-0" />
            <span className="text-white/80 group-hover:text-white font-medium truncate">{text}</span>
        </a>
    );
}

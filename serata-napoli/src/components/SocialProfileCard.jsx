import React from "react";

export default function SocialProfileCard({ platform, handle }) {
    const Icon = platform.icon;
    return (
        <a
            href={platform.href(handle)}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-between p-4 rounded-2xl border ${platform.border} ${platform.hoverBorder} ${platform.bg} transition-all duration-300 hover:-translate-y-0.5`}
        >
            <div className="flex items-center gap-3">
                {/* Gradient icon bubble */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br{platform.color} bg-opacity-20`}>
                    <Icon size={18} className="text-white" />
                </div>
                <div>
                    <p className="text-white font-bold text-sm">{platform.label}</p>
                    <p className="text-white/45 text-xs mt-0.5">{handle}</p>
                </div>
            </div>
            <div className="flex items-center gap-1.5 text-white/35 group-hover:text-white/70 text-xs font-semibold transition-colors duration-200">
                {platform.cta}
                <span className="ml-1">→</span>
            </div>
        </a>
    );
}

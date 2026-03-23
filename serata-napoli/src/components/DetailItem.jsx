import React from "react";

export default function DetailItem({ icon: Icon, label, value }) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Icon size={18} className="text-orange-400" />
                <span className="text-white/50 text-sm font-bold uppercase tracking-wider">
                    {label}
                </span>
            </div>
            <p className="text-white font-bold text-lg">
                {value}
            </p>
        </div>
    );
}

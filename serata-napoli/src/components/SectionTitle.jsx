import React from 'react';

export default function SectionTitle({ icon: Icon, children, color = "text-white" }) {
    return (
        <h2 className={`text-2xl font-black ${color} mb-6 flex items-center gap-2`}>
            {Icon && <Icon size={22} className="text-orange-400" />}
            {children}
        </h2>
    );
}
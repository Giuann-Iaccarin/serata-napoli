import React from "react";
import { ExternalLink } from "lucide-react";

export default function SocialPostCard({ post, platform }) {
    const Icon = platform.icon;
    return (
        <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative block overflow-hidden rounded-2xl border ${platform.border} ${platform.hoverBorder} transition-all duration-300 hover:-translate-y-0.5`}
        >
            {/* Thumbnail */}
            {post.thumbnail ? (
                <div className="relative aspect-square overflow-hidden">
                    <img
                        src={post.thumbnail}
                        alt={post.caption ?? "Post"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                            <ExternalLink size={20} className="text-white" />
                        </div>
                    </div>
                    {/* Platform badge */}
                    <div className={`absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border ${platform.border}`}>
                        <Icon size={12} className="text-white/80" />
                        <span className="text-white/80 text-xs font-bold">{platform.label}</span>
                    </div>
                </div>
            ) : (
                /* No thumbnail — text-only card */
                <div className={`p-5 ${platform.bg}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <Icon size={16} className="text-white/60" />
                        <span className="text-white/50 text-xs font-bold uppercase tracking-wider">{platform.label}</span>
                    </div>
                    {post.caption && (
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{post.caption}</p>
                    )}
                    <div className="mt-4 flex items-center gap-1.5 text-white/40 text-xs font-semibold group-hover:text-white/60 transition-colors">
                        Apri <ExternalLink size={11} />
                    </div>
                </div>
            )}

            {/* Caption below thumbnail */}
            {post.thumbnail && post.caption && (
                <div className={`px-4 py-3 ${platform.bg}`}>
                    <p className="text-white/70 text-sm line-clamp-2 leading-snug">{post.caption}</p>
                </div>
            )}
        </a>
    );
}

import React from "react";
import SocialProfileCard from "./SocialProfileCard";
import SocialPostCard from "./SocialPostCard";
import SectionCard from "./SectionCard";
import SectionTitle from "./SectionTitle";
import { Instagram } from "lucide-react";

export default function SocialSection({ venue, SOCIAL_PLATFORMS }) {
    // Collect available social profiles
    const profiles = [
        venue.instagram && { key: "instagram", handle: venue.instagram },
        venue.tiktok && { key: "tiktok", handle: venue.tiktok },
        venue.facebook && { key: "facebook", handle: venue.facebook },
        venue.twitter && { key: "twitter", handle: venue.twitter },
    ].filter(Boolean);

    const posts = Array.isArray(venue.socialPosts) ? venue.socialPosts : [];

    if (profiles.length === 0 && posts.length === 0) return null;

    return (
        <SectionCard>
            <SectionTitle icon={Instagram}>Social</SectionTitle>

            {/* Profile links */}
            {profiles.length > 0 && (
                <div className="space-y-3 mb-6">
                    {profiles.map(({ key, handle }) => (
                        <SocialProfileCard key={key} platform={SOCIAL_PLATFORMS[key]} handle={handle} />
                    ))}
                </div>
            )}

            {/* Post previews */}
            {posts.length > 0 && (
                <>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-4">
                        Ultimi contenuti
                    </p>
                    <div className={`grid gap-4 ${posts.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                        {posts.map((post, i) => (
                            <SocialPostCard key={i} post={post} platform={SOCIAL_PLATFORMS[post.platform] ?? SOCIAL_PLATFORMS.instagram} />
                        ))}
                    </div>
                </>
            )}
        </SectionCard>
    );
}

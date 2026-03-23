import React, { useState, useEffect } from "react";

function getSocialEmbedUrl(platform, url) {
    try {
        if (!url) return null;
        if (platform === "instagram") {
            const trimmed = url.endsWith("/") ? url : `${url}/`;
            return `${trimmed}embed`;
        }
        if (platform === "tiktok") {
            const m = url.match(/tiktok.com\/.*\/video\/(\d+)/);
            if (m) return `https://www.tiktok.com/embed/v2/${m[1]}`;
            // fallback a url diretta in caso non parsabile
            return url;
        }
        if (platform === "facebook") {
            return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=500`;
        }
        return url;
    } catch {
        return url;
    }
}

function SocialEmbed({ platform, url }) {
    const [embedData, setEmbedData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchEmbed = async () => {
            try {
                let oembedUrl = null;
                if (platform === "tiktok") {
                    oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
                } else if (platform === "instagram") {
                    // Instagram richiede token, usiamo embed diretto
                    setEmbedData({ type: "iframe", url: getSocialEmbedUrl(platform, url) });
                    setLoading(false);
                    return;
                } else if (platform === "facebook") {
                    // Facebook embed diretto
                    setEmbedData({ type: "iframe", url: getSocialEmbedUrl(platform, url) });
                    setLoading(false);
                    return;
                }

                if (oembedUrl) {
                    const response = await fetch(oembedUrl);
                    const data = await response.json();
                    if (data.html) {
                        setEmbedData({ type: "html", html: data.html });
                    } else {
                        throw new Error("No HTML in oembed");
                    }
                } else {
                    setEmbedData({ type: "iframe", url: getSocialEmbedUrl(platform, url) });
                }
            } catch (err) {
                console.error("Error fetching embed:", err);
                setError(true);
                // Fallback to iframe
                setEmbedData({ type: "iframe", url: getSocialEmbedUrl(platform, url) });
            } finally {
                setLoading(false);
            }
        };

        fetchEmbed();
    }, [platform, url]);

    if (loading) {
        return (
            <div className="aspect-video bg-black/20 rounded-xl flex items-center justify-center">
                <div className="text-white/60">Caricamento...</div>
            </div>
        );
    }

    if (error && !embedData) {
        return (
            <div className="aspect-video bg-black/20 rounded-xl flex items-center justify-center">
                <div className="text-white/60">Errore caricamento</div>
            </div>
        );
    }

    if (embedData?.type === "html") {
        return (
            <div
                className="aspect-video bg-black/20 rounded-xl overflow-hidden"
                dangerouslySetInnerHTML={{ __html: embedData.html }}
            />
        );
    }

    if (embedData?.type === "iframe") {
        return (
            <div className="aspect-video bg-black/20 rounded-xl overflow-hidden">
                <iframe
                    src={embedData.url}
                    title={`${platform}-embed`}
                    className="h-full w-full"
                    frameBorder="0"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div className="aspect-video bg-black/20 rounded-xl flex items-center justify-center">
            <div className="text-white/60">Contenuto non disponibile</div>
        </div>
    );
}

export default SocialEmbed;
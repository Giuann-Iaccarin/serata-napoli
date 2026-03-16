import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── Fix icone default Leaflet in Vite/React ──────────────────────────────────
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// ─── Icona custom arancione ───────────────────────────────────────────────────
const orangeIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const NAPOLI_CENTER = [40.8518, 14.2681];

// Costruisce il link Google Maps per le indicazioni stradali verso le coordinate
function directionsUrl(lat, lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

// ─── Componente interno: aggiorna bounds/zoom al cambio venue ─────────────────
function FitBounds({ venues }) {
    const map = useMap();

    useEffect(() => {
        if (!venues.length) {
            map.setView(NAPOLI_CENTER, 12);
            return;
        }
        if (venues.length === 1) {
            map.setView([venues[0].lat, venues[0].lng], 15);
            return;
        }
        const bounds = L.latLngBounds(venues.map((v) => [v.lat, v.lng]));
        map.fitBounds(bounds, { padding: [48, 48] });
    }, [venues, map]);

    return null;
}

// ─── Componente principale ────────────────────────────────────────────────────
export default function LeafletMapVenues({ venues = [], onVenueClick }) {
    const validVenues = venues.filter(
        (v) =>
            typeof v.lat === "number" &&
            typeof v.lng === "number" &&
            !Number.isNaN(v.lat) &&
            !Number.isNaN(v.lng)
    );

    if (validVenues.length === 0) {
        return (
            <div className="flex h-130 w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <span className="mb-2 text-4xl">🗺️</span>
                <p className="text-base font-semibold text-white/80">Nessun locale trovato</p>
                <p className="mt-1 text-sm text-white/40">
                    Prova a selezionare una zona diversa
                </p>
            </div>
        );
    }

    return (
        <div className="h-130 w-full overflow-hidden rounded-2xl border border-white/10">
            <MapContainer
                center={NAPOLI_CENTER}
                zoom={12}
                scrollWheelZoom
                className="h-full w-full"
                style={{ zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds venues={validVenues} />

                {validVenues.map((venue) => (
                    <Marker
                        key={venue.id}
                        position={[venue.lat, venue.lng]}
                        icon={orangeIcon}
                    >
                        <Popup minWidth={230}>
                            <div style={{ fontFamily: "inherit" }}>
                                {/* Thumbnail */}
                                {venue.image && (
                                    <img
                                        src={venue.image}
                                        alt={venue.name}
                                        style={{
                                            width: "100%",
                                            height: "88px",
                                            objectFit: "cover",
                                            borderRadius: "6px",
                                            marginBottom: "8px",
                                            display: "block",
                                        }}
                                    />
                                )}

                                <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
                                    {venue.name}
                                </p>
                                <p style={{ margin: "0 0 2px", fontSize: "11px", color: "#475569" }}>
                                    {venue.quartiere} · {venue.address}
                                </p>
                                <p style={{ margin: "0 0 2px", fontSize: "11px", color: "#64748b" }}>
                                    {venue.tag} · {venue.price}
                                </p>
                                <p style={{ margin: "0 0 10px", fontSize: "11px", color: "#64748b" }}>
                                    ★ {venue.rating} ({venue.reviews} rec.)
                                </p>

                                {/* Bottoni affiancati */}
                                <div style={{ display: "flex", gap: "6px" }}>
                                    {/* Apri locale */}
                                    <button
                                        onClick={() => onVenueClick?.(venue)}
                                        style={{
                                            flex: 1,
                                            padding: "7px 0",
                                            borderRadius: "8px",
                                            background: "#f97316",
                                            color: "#fff",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#ea6c0a")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "#f97316")}
                                    >
                                        Apri locale
                                    </button>

                                    {/* Indicazioni */}
                                    <a
                                        href={directionsUrl(venue.lat, venue.lng)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "4px",
                                            padding: "7px 0",
                                            borderRadius: "8px",
                                            background: "#f1f5f9",
                                            color: "#334155",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            textDecoration: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#e2e8f0")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                                    >
                                        {/* Inline SVG freccia navigazione */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polygon points="3 11 22 2 13 21 11 13 3 11" />
                                        </svg>
                                        Indicazioni
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
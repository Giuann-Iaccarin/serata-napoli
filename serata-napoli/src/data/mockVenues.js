const makeAvatar = (name, bg = "ff6b35", color = "fff") =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${color}`;

// ─── Coordinate per quartiere ──────────────────────────────────────────────────
export const QUARTIERE_COORDS = {
    Chiaia: { lat: 40.8345, lng: 14.2265 },
    Vomero: { lat: 40.8517, lng: 14.2289 },
    Arenella: { lat: 40.8558, lng: 14.2347 },
    "Centro Storico": { lat: 40.8513, lng: 14.2681 },
    Centro: { lat: 40.8513, lng: 14.2681 },
    Decumani: { lat: 40.8502, lng: 14.2590 },
    "San Lorenzo": { lat: 40.8520, lng: 14.2720 },
    Posillipo: { lat: 40.8113, lng: 14.2067 },
    Marechiaro: { lat: 40.7997, lng: 14.1958 },
    Mergellina: { lat: 40.8280, lng: 14.2156 },
    Fuorigrotta: { lat: 40.8295, lng: 14.1906 },
};

/**
 * Aggiunge un offset deterministico (angolo aureo) alle coordinate base
 * di un quartiere per evitare marker sovrapposti.
 */
export function withOffset(coords, index) {
    const radius = 0.0018 + (index % 4) * 0.0009;
    const angle = (index * 137.508 * Math.PI) / 180; // angolo aureo
    return {
        lat: coords.lat + Math.cos(angle) * radius,
        lng: coords.lng + Math.sin(angle) * radius,
    };
}

// ─── Venue base con coordinate esplicite ───────────────────────────────────────
const BASE_VENUES = [
    {
        menuType: "bistrot",
        id: "1",
        slug: "luna-rooftop-chiaia",
        name: "Luna Rooftop",
        zone: "Chiaia",
        quartiere: "Chiaia",
        address: "Via Cavallerizza a Chiaia, 45",
        lat: 40.8342,
        lng: 14.2270,
        mood: ["Aperitivo", "Aperitivo + DJ", "Rooftop", "Food & Drink"],
        pubblico: ["Internazionale", "Maturo", "Misto"],
        tag: "Rooftop",
        price: "€€€",
        age: "27-30",
        energy: 2,
        social: 4,
        affluenza: 3,
        bestTime: "21:30 - 00:30",
        description:
            "Perfetto per un aperitivo premium che diventa serata glamour, con musica, atmosfera curata e pubblico internazionale.",
        bestDays: ["Gio", "Ven", "Sab", "Dom"],
        idealFor: ["Coppia", "Date", "Gruppo", "Networking"],
        formats: ["Aperitivo", "DJ Set", "Cocktail", "Cena"],
        location: ["Outdoor"],
        phone: "+39 081 123 4567",
        whatsapp: "+39 081 123 4567",
        website: "www.lunarooftop.it",
        instagram: "@luna_rooftop_napoli",
        facebook: "lunarooftopnapoli",
        twitter: "@lunarooftop_na",
        googleAddress:
            "https://www.google.com/maps/search/?api=1&query=Luna+Rooftop+Chiaia+Napoli",
        rating: 4.9,
        reviews: 487,
        badges: ["Vista mare", "Cocktail bar", "DJ set"],
        highlight: true,
        image:
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
        hours: { "Lun - Mar": "Chiuso", "Mer - Dom": "18:00 - 01:00" },
        gallery: [
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        ],
        userReviews: [
            {
                id: 1,
                author: "Maria R.",
                avatar: makeAvatar("Maria R"),
                rating: 5,
                date: "2024-03-01",
                comment: "Vista incredibile, cocktail ottimi e atmosfera perfetta.",
                helpful: 23,
            },
            {
                id: 1,
                author: "Maria R.",
                avatar: makeAvatar("Maria R"),
                rating: 5,
                date: "2024-03-01",
                comment: "Vista incredibile, cocktail ottimi e atmosfera perfetta.",
                helpful: 23,
            },
            {
                id: 1,
                author: "Maria R.",
                avatar: makeAvatar("Maria R"),
                rating: 5,
                date: "2024-03-01",
                comment: "Vista incredibile, cocktail ottimi e atmosfera perfetta.",
                helpful: 23,
            },
            {
                id: 1,
                author: "Maria R.",
                avatar: makeAvatar("Maria R"),
                rating: 5,
                date: "2024-03-01",
                comment: "Vista incredibile, cocktail ottimi e atmosfera perfetta.",
                helpful: 23,
            },
            {
                id: 1,
                author: "Maria R.",
                avatar: makeAvatar("Maria R"),
                rating: 5,
                date: "2024-03-01",
                comment: "Vista incredibile, cocktail ottimi e atmosfera perfetta.",
                helpful: 23,
            }
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Sunset Session",
                date: "2024-03-15",
                time: "19:00 - 23:00",
                description: "Aperitivo al tramonto con DJ set e cocktail speciali",
                type: "DJ Set",
                price: "Ingresso libero",
            },
        ],
        menu: [
            {
                id: 1,
                name: "Spritz Signature",
                price: "€12",
                description: "Versione citrus con basilico e arancia rossa.",
                image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 2,
                name: "Bocconcini di mozzarella affumicata",
                price: "€15",
                description: "Con miele di castagno e noci.",
                image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 3,
                name: "Tagliere gourmet",
                price: "€24",
                description: "Formaggi locali e salumi d'alta qualità."
                // Nessuna immagine per testare il caso senza
            },
        ],
        menuUrl: "https://www.lunarooftop.it/menu.pdf",
        socialPosts: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/CIvX1_foo/', caption: 'Sunset vibes at Luna Rooftop! 🍸✨', thumbnail: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80' },
            { platform: 'tiktok', url: 'https://www.tiktok.com/@lunarooftop/video/7212345678912345678', caption: 'Dance night! 🎶', thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80' },
            { platform: 'facebook', url: 'https://www.facebook.com/lunarooftopnapoli/posts/123456789', caption: 'New cocktail menu out now!', thumbnail: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80' },
        ],
    },
    {
        menuType: "elegante",
        id: "2",
        slug: "vicolo-vivo-centro",
        name: "Vicolo Vivo",
        zone: "Centro Storico",
        quartiere: "Centro",
        address: "Via dei Tribunali, 289",
        lat: 40.8513,
        lng: 14.2700,
        mood: ["Live Music", "Lounge"],
        pubblico: ["Locale", "Alternativo", "Giovane"],
        tag: "Live Music",
        price: "€€",
        age: "23-26",
        energy: 4,
        social: 5,
        affluenza: 4,
        bestTime: "22:00 - 01:00",
        description:
            "Un posto caldo, pieno di vibrazioni vere, perfetto per chi vuole cantare, bere bene e stare dentro il cuore pulsante della città.",
        bestDays: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
        idealFor: ["Amici", "Gruppo", "Solo"],
        formats: ["Live Band", "Jam Session", "Karaoke"],
        location: ["Indoor"],
        phone: "+39 081 234 5678",
        whatsapp: "+39 081 234 5678",
        website: "www.vicolovivo.it",
        instagram: "@vicolovivo_napoli",
        facebook: "vicolovivo.napoli",
        twitter: "@vicolovivo_na",
        googleAddress:
            "https://www.google.com/maps/search/?api=1&query=Vicolo+Vivo+Via+dei+Tribunali+Napoli",
        rating: 4.7,
        reviews: 356,
        badges: ["Live band", "Gruppi", "Locale"],
        highlight: true,
        image:
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
        hours: { "Lun - Dom": "19:00 - 02:00" },
        gallery: [
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
        ],
        menu: [
            { id: 1, name: "Trancio di tonno scottato", price: "€16", description: "Servito con crostini al rosmarino" },
            { id: 2, name: "Calamarata alla marinara", price: "€19", description: "Frutti di mare freschi, sapore autentico." },
        ],
        userReviews: [
            {
                id: 1,
                author: "Luca M.",
                avatar: makeAvatar("Luca M"),
                rating: 4,
                date: "2024-02-20",
                comment: "Musica live fantastica, atmosfera unica.",
                helpful: 15,
            },
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Jam Session",
                date: "2024-03-20",
                time: "21:00 - 00:00",
                description: "Sessione improvvisata con musicisti locali",
                type: "Jam Session",
                price: "Ingresso libero",
            },
        ],
        socialPosts: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/CIvX3_foo/', caption: 'Live music night! 🎸', thumbnail: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=400&q=80' },
        ],
    },
    {
        menuType: "street",
        id: "3",
        slug: "aura-club-vomero",
        name: "Aura Club",
        zone: "Vomero",
        quartiere: "Vomero",
        address: "Via Morghen, 45",
        lat: 40.8495,
        lng: 14.2310,
        mood: ["Discoteca", "Aperitivo + DJ"],
        pubblico: ["Giovane", "Internazionale", "Misto"],
        tag: "Night Club",
        price: "€€€",
        age: "23-26",
        energy: 5,
        social: 4,
        affluenza: 5,
        bestTime: "23:30 - 03:00",
        description:
            "Per chi vuole una notte intensa, luci forti, selezione musicale clubbing e crowd giovane.",
        bestDays: ["Gio", "Ven", "Sab"],
        idealFor: ["Gruppo", "Amici", "Solo"],
        formats: ["DJ Set", "Dancing", "After Party"],
        location: ["Indoor"],
        phone: "+39 081 345 6789",
        whatsapp: "+39 081 345 6789",
        website: "www.auraclub.it",
        instagram: "@aura_club_napoli",
        facebook: "auraclub.napoli",
        twitter: "@auraclub_na",
        googleAddress:
            "https://www.google.com/maps/search/?api=1&query=Aura+Club+Via+Morghen+Napoli",
        rating: 4.8,
        reviews: 612,
        badges: ["Dancefloor", "Premium", "Weekend"],
        highlight: true,
        image:
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
        hours: {
            "Lun - Mer": "Chiuso",
            Gio: "23:00 - 03:00",
            "Ven - Sab": "23:00 - 05:00",
            Dom: "Chiuso",
        },
        gallery: [
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
        ],
        userReviews: [
            {
                id: 1,
                author: "Giulia P.",
                avatar: makeAvatar("Giulia P"),
                rating: 5,
                date: "2024-02-15",
                comment: "Club incredibile, energia pazzesca!",
                helpful: 30,
            },
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Techno Night",
                date: "2024-03-22",
                time: "23:00 - 05:00",
                description: "Notte techno con DJ internazionali",
                type: "DJ Set",
                price: "€20",
            },
        ],
        menu: [
            { id: 1, name: "Cocktail Energy", price: "€10", description: "Drink energizzante per la pista" },
            { id: 2, name: "Shots Party", price: "€8", description: "Shots vari per il gruppo" },
        ],
        socialPosts: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/CIvX4_foo/', caption: 'Club night! 💃🕺', thumbnail: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=400&q=80' },
        ],
    },
    {
        menuType: "bistrot",
        id: "4",
        slug: "brezza-garden-posillipo",
        name: "Brezza Garden",
        zone: "Posillipo",
        quartiere: "Posillipo",
        address: "Via Posillipo, 123",
        lat: 40.8120,
        lng: 14.2050,
        mood: ["Aperitivo", "Food & Drink", "Lounge"],
        pubblico: ["Maturo", "Misto", "Internazionale"],
        tag: "Outdoor",
        price: "€€€",
        age: "27-30",
        energy: 2,
        social: 3,
        affluenza: 2,
        bestTime: "20:00 - 23:30",
        description:
            "Location panoramica e rilassata, ideale per una serata elegante ma non fredda.",
        bestDays: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
        idealFor: ["Coppia", "Date", "Famiglia"],
        formats: ["Cena", "Aperitivo", "Cocktail"],
        location: ["Outdoor"],
        phone: "+39 081 456 7890",
        whatsapp: "+39 081 456 7890",
        website: "www.brezzagarden.it",
        instagram: "@brezza_garden",
        facebook: "brezzagarden.napoli",
        twitter: "@brezza_garden",
        googleAddress:
            "https://www.google.com/maps/search/?api=1&query=Brezza+Garden+Via+Posillipo+Napoli",
        rating: 4.6,
        reviews: 289,
        badges: ["Garden", "Sunset", "Couple vibes"],
        highlight: true,
        image:
            "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=1200&q=80",
        hours: { "Lun - Dom": "18:00 - 00:00" },
        gallery: [
            "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=1200&q=80",
        ],
        userReviews: [
            {
                id: 1,
                author: "Marco L.",
                avatar: makeAvatar("Marco L"),
                rating: 4,
                date: "2024-02-10",
                comment: "Perfetto per una serata romantica al tramonto.",
                helpful: 12,
            },
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Sunset Aperitivo",
                date: "2024-03-25",
                time: "18:00 - 22:00",
                description: "Aperitivo con vista mare",
                type: "Aperitivo",
                price: "Ingresso libero",
            },
        ],
        menu: [
            { id: 1, name: "Insalata di mare", price: "€18", description: "Fresca e leggera" },
            { id: 2, name: "Grigliata mista", price: "€25", description: "Pesce fresco alla griglia" },
        ],
        socialPosts: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/CIvX5_foo/', caption: 'Sunset garden! 🌅', thumbnail: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=400&q=80' },
        ],
    },
    {
        menuType: "elegante",
        id: "5",
        slug: "neon-harbor-mergellina",
        name: "Neon Harbor",
        zone: "Mergellina",
        quartiere: "Mergellina",
        address: "Via Caracciolo, 78",
        lat: 40.8275,
        lng: 14.2130,
        mood: ["Aperitivo + DJ", "Lounge", "Food & Drink"],
        pubblico: ["Alternativo", "Internazionale", "Giovane"],
        tag: "Cocktail Bar",
        price: "€€",
        age: "23-26",
        energy: 3,
        social: 4,
        affluenza: 3,
        bestTime: "21:00 - 00:00",
        description:
            "Design contemporaneo, drink fotografabili e atmosfera perfetta per iniziare bene la serata.",
        bestDays: ["Mer", "Gio", "Ven", "Sab"],
        idealFor: ["Amici", "Gruppo", "Networking", "Date"],
        formats: ["Cocktail", "Aperitivo", "DJ Set"],
        location: ["Indoor"],
        phone: "+39 081 567 8901",
        whatsapp: "+39 081 567 8901",
        website: "www.neonharbor.it",
        instagram: "@neon_harbor_napoli",
        facebook: "neonharbor.napoli",
        twitter: "@neonharbor_na",
        googleAddress:
            "https://www.google.com/maps/search/?api=1&query=Neon+Harbor+Via+Caracciolo+Napoli",
        rating: 4.8,
        reviews: 421,
        badges: ["Signature drink", "Scenografico", "Friends"],
        highlight: true,
        image:
            "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=1200&q=80",
        hours: { "Lun - Mar": "Chiuso", "Mer - Sab": "19:00 - 02:00", Dom: "19:00 - 00:00" },
        gallery: [
            "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=1200&q=80",
        ],
        userReviews: [
            {
                id: 1,
                author: "Anna S.",
                avatar: makeAvatar("Anna S"),
                rating: 5,
                date: "2024-02-05",
                comment: "Cocktail spettacolari e design moderno.",
                helpful: 20,
            },
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Cocktail Workshop",
                date: "2024-03-28",
                time: "20:00 - 22:00",
                description: "Impara a fare cocktail con il barman",
                type: "Workshop",
                price: "€15",
            },
        ],
        menu: [
            { id: 1, name: "Neon Spritz", price: "€12", description: "Spritz con twist fluorescente" },
            { id: 2, name: "Signature Martini", price: "€14", description: "Martini personalizzato" },
        ],
        socialPosts: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/CIvX6_foo/', caption: 'Neon cocktails! 🍸', thumbnail: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=400&q=80' },
        ],
    },
    {
        menuType: "street",
        id: "6",
        slug: "casa-ritmo-fuorigrotta",
        name: "Casa Ritmo",
        zone: "Fuorigrotta",
        quartiere: "Fuorigrotta",
        address: "Via Terracina, 234",
        lat: 40.8283,
        lng: 14.1920,
        mood: ["Discoteca", "Aperitivo + DJ"],
        pubblico: ["Giovane", "Locale", "Misto"],
        tag: "Urban Mood",
        price: "€",
        age: "18-22",
        energy: 4,
        social: 5,
        affluenza: 4,
        bestTime: "22:30 - 02:00",
        description:
            "Più accessibile ma super vivo, perfetto per chi cerca una serata spontanea e divertente.",
        bestDays: ["Ven", "Sab"],
        idealFor: ["Gruppo", "Amici", "Solo"],
        formats: ["DJ Set", "Hip-hop", "Dancing"],
        location: ["Indoor"],
        phone: "+39 081 678 9012",
        whatsapp: "+39 081 678 9012",
        website: "www.casaritmo.it",
        instagram: "@casa_ritmo_napoli",
        facebook: "casaritmo.napoli",
        twitter: "@casaritmo_na",
        googleAddress:
            "https://www.google.com/maps/search/?api=1&query=Casa+Ritmo+Via+Terracina+Napoli",
        rating: 4.5,
        reviews: 378,
        badges: ["Easy price", "Hip-hop", "Gruppi"],
        highlight: false,
        image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
        hours: { "Lun - Gio": "Chiuso", "Ven - Sab": "22:00 - 04:00", Dom: "Chiuso" },
        gallery: [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
        ],
        userReviews: [
            {
                id: 1,
                author: "Roberto D.",
                avatar: makeAvatar("Roberto D"),
                rating: 4,
                date: "2024-01-30",
                comment: "Posto divertente, musica hip-hop top!",
                helpful: 18,
            },
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Hip-Hop Battle",
                date: "2024-03-30",
                time: "22:00 - 02:00",
                description: "Battaglia di freestyle hip-hop",
                type: "Event",
                price: "Ingresso libero",
            },
        ],
        menu: [
            { id: 1, name: "Birra artigianale", price: "€5", description: "Birra locale in bottiglia" },
            { id: 2, name: "Nachos", price: "€8", description: "Con salsa piccante" },
        ],
        socialPosts: [
            { platform: 'instagram', url: 'https://www.instagram.com/p/CIvX7_foo/', caption: 'Hip-hop night! 🎤', thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80' },
        ],
    },
];

// ─── Mappa zona → quartieri ────────────────────────────────────────────────────
const ZONE_QUARTIERE_MAP = [
    { zone: "Napoli città", quartiere: "Chiaia" },
    { zone: "Napoli città", quartiere: "Vomero" },
    { zone: "Napoli città", quartiere: "Centro Storico" },
    { zone: "Napoli città", quartiere: "Posillipo" },
    { zone: "Napoli città", quartiere: "Mergellina" },
    { zone: "Napoli città", quartiere: "Fuorigrotta" },
    { zone: "Vomero", quartiere: "Vomero" },
    { zone: "Vomero", quartiere: "Arenella" },
    { zone: "Chiaia", quartiere: "Chiaia" },
    { zone: "Chiaia", quartiere: "Mergellina" },
    { zone: "Centro Storico", quartiere: "Centro" },
    { zone: "Centro Storico", quartiere: "Decumani" },
    { zone: "Centro Storico", quartiere: "San Lorenzo" },
    { zone: "Posillipo", quartiere: "Posillipo" },
    { zone: "Posillipo", quartiere: "Marechiaro" },
];

// ─── Archetipi venue generate ──────────────────────────────────────────────────
const archetypes = [
    {
        key: "party",
        namePrefix: "Pulse",
        mood: ["Discoteca", "Aperitivo + DJ"],
        pubblico: ["Giovane", "Misto", "Internazionale"],
        price: "€€",
        age: "18-22",
        energy: 4,
        social: 5,
        affluenza: 4,
        bestDays: ["Ven", "Sab"],
        idealFor: ["Gruppo", "Amici", "Solo"],
        formats: ["DJ Set", "Dancing", "After Party"],
        location: ["Indoor"],
        tag: "Party Club",
        bestTime: "23:00 - 03:00",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    },
    {
        key: "chill",
        namePrefix: "Sera",
        mood: ["Aperitivo", "Food & Drink", "Lounge"],
        pubblico: ["Misto", "Maturo", "Internazionale"],
        price: "€€€",
        age: "27-30",
        energy: 2,
        social: 3,
        affluenza: 2,
        bestDays: ["Gio", "Ven", "Sab", "Dom"],
        idealFor: ["Coppia", "Date", "Famiglia"],
        formats: ["Aperitivo", "Cena", "Cocktail"],
        location: ["Outdoor", "Indoor"],
        tag: "Lounge Bar",
        bestTime: "20:00 - 23:30",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    },
    {
        key: "live",
        namePrefix: "Echo",
        mood: ["Live Music", "Lounge"],
        pubblico: ["Locale", "Alternativo", "Misto"],
        price: "€€",
        age: "23-26",
        energy: 3,
        social: 4,
        affluenza: 3,
        bestDays: ["Mer", "Gio", "Ven", "Sab"],
        idealFor: ["Amici", "Gruppo", "Networking"],
        formats: ["Live Band", "Karaoke", "Jam Session"],
        location: ["Indoor"],
        tag: "Live Room",
        bestTime: "21:30 - 00:30",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
    },
    {
        key: "alt",
        namePrefix: "Nova",
        mood: ["Lounge", "Food & Drink", "Aperitivo + DJ"],
        pubblico: ["Alternativo", "Internazionale", "Giovane"],
        price: "€€",
        age: "23-26",
        energy: 3,
        social: 4,
        affluenza: 3,
        bestDays: ["Gio", "Ven", "Sab"],
        idealFor: ["Date", "Networking", "Amici"],
        formats: ["Cocktail", "DJ Set", "Aperitivo"],
        location: ["Indoor", "Outdoor"],
        tag: "Concept Bar",
        bestTime: "21:00 - 00:30",
        image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=1200&q=80",
    },
    {
        key: "food",
        namePrefix: "Terra",
        mood: ["Food & Drink", "Brunch", "Aperitivo"],
        pubblico: ["Misto", "Maturo", "Locale"],
        price: "€€",
        age: "27-30",
        energy: 1,
        social: 2,
        affluenza: 2,
        bestDays: ["Sab", "Dom"],
        idealFor: ["Famiglia", "Coppia", "Date"],
        formats: ["Cena", "Brunch", "Aperitivo"],
        location: ["Indoor", "Outdoor"],
        tag: "Food Spot",
        bestTime: "13:00 - 15:30",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    },
];

// ─── Helper interni ────────────────────────────────────────────────────────────
function quartiereSlug(value) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
}

function zoneLabelForName(zone) {
    return zone === "Napoli città" ? "Napoli" : zone;
}

// ─── Builder venue generate con coordinate ────────────────────────────────────
function buildGeneratedVenue({ zone, quartiere }, archetype, index) {
    const slugBase = `${archetype.namePrefix}-${quartiereSlug(quartiere)}-${quartiereSlug(zoneLabelForName(zone))}`;
    const displayName = `${archetype.namePrefix} ${quartiere}`;
    const accentBg = ["ff6b35", "00d4ff", "9d4edd", "ffd60a", "22c55e"][index % 5];

    // Calcola coordinate: usa i coord del quartiere + offset deterministico
    const baseCoords = QUARTIERE_COORDS[quartiere] ?? { lat: 40.8518, lng: 14.2681 };
    const { lat, lng } = withOffset(baseCoords, index);

    return {
        id: `g-${index + 1}`,
        slug: slugBase,
        name: displayName,
        zone,
        quartiere,
        address: `Via ${quartiere}, ${20 + index}`,
        lat,
        lng,
        mood: archetype.mood,
        pubblico: archetype.pubblico,
        tag: archetype.tag,
        price: archetype.price,
        age: archetype.age,
        energy: archetype.energy,
        social: archetype.social,
        affluenza: archetype.affluenza,
        bestTime: archetype.bestTime,
        description: `${displayName} è un locale studiato per coprire il mood ${archetype.key} nella zona ${zone}. Atmosfera coerente, format chiari e filtro perfetto per combinazioni realistiche.`,
        bestDays: archetype.bestDays,
        idealFor: archetype.idealFor,
        formats: archetype.formats,
        location: archetype.location,
        phone: `+39 081 ${7000000 + index}`,
        whatsapp: `+39 081 ${7000000 + index}`,
        website: `www.${slugBase}.it`,
        instagram: `@${slugBase}`,
        facebook: slugBase,
        twitter: `@${slugBase}`,
        googleAddress: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayName + " " + quartiere + " Napoli")}`,
        rating: Number((4.2 + (index % 7) * 0.1).toFixed(1)),
        reviews: 90 + index * 7,
        badges: archetype.formats.slice(0, 3),
        highlight: index % 5 === 0,
        image: archetype.image,
        hours: {
            "Lun - Gio": archetype.key === "party" ? "Chiuso" : "18:00 - 00:00",
            Ven: "19:00 - 02:00",
            Sab: "19:00 - 03:00",
            Dom: archetype.key === "food" ? "12:00 - 18:00" : "19:00 - 00:00",
        },
        gallery: [archetype.image],
        userReviews: [
            {
                id: 1,
                author: "Utente Demo",
                avatar: makeAvatar("Utente Demo", accentBg),
                rating: 5,
                date: "2024-03-01",
                comment: "Ottimo locale, coerente con il mood e molto utile per testare il filtraggio.",
                helpful: 10 + index,
            },
        ],
        upcomingEvents: [],
    };
}

// ─── Generazione venue dinamiche ──────────────────────────────────────────────
const GENERATED_VENUES = ZONE_QUARTIERE_MAP.flatMap((entry, entryIndex) =>
    archetypes.map((archetype, archetypeIndex) =>
        buildGeneratedVenue(entry, archetype, entryIndex * archetypes.length + archetypeIndex)
    )
);

const baseSlugs = new Set(BASE_VENUES.map((v) => v.slug));
const SAFE_GENERATED_VENUES = GENERATED_VENUES.filter((v) => !baseSlugs.has(v.slug));

// ─── Export principale ─────────────────────────────────────────────────────────
export const MOCK_VENUES = [...BASE_VENUES, ...SAFE_GENERATED_VENUES];

export const getVenueById = (id) => MOCK_VENUES.find((v) => v.id === id);
export const getVenueBySlug = (slug) => MOCK_VENUES.find((v) => v.slug === slug);
export const getVenuesByMood = (mood) =>
    MOCK_VENUES.filter((v) => Array.isArray(v.mood) && v.mood.includes(mood));
export const getVenuesByZone = (zone) => MOCK_VENUES.filter((v) => v.zone === zone);
export const getTopVenues = (count = 3) =>
    MOCK_VENUES.filter((v) => v.highlight).sort((a, b) => b.rating - a.rating).slice(0, count);

export const searchVenues = (query) => {
    const q = query.toLowerCase();
    return MOCK_VENUES.filter(
        (v) =>
            v.name.toLowerCase().includes(q) ||
            v.zone.toLowerCase().includes(q) ||
            v.quartiere.toLowerCase().includes(q) ||
            v.description.toLowerCase().includes(q) ||
            v.tag.toLowerCase().includes(q)
    );
};

export default MOCK_VENUES;

// ─── Mock Events ───────────────────────────────────────────────────────────────
export const MOCK_EVENTS = [
    {
        id: 1,
        title: "Serata Jazz al Tramonto",
        description: "Una serata magica con i migliori jazzisti napoletani sul rooftop con vista mozzafiato. Cocktail speciali e atmosfera unica.",
        date: "2024-03-15",
        time: "19:00 - 23:00",
        price: "€25",
        type: "Musica Live",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
        venueId: "1",
        capacity: 150,
        ageRestriction: "18+",
        dressCode: "Smart Casual",
        includes: ["Cocktail di benvenuto", "Musica dal vivo", "Vista panoramica"],
        tags: ["Jazz", "Rooftop", "Cocktail", "Live Music"],
    },
    {
        id: 2,
        title: "Aperitivo con DJ Set",
        description: "Inizia la serata con il meglio dell'aperitivo napoletano accompagnato da selezioni musicali d'eccezione.",
        date: "2024-03-16",
        time: "18:30 - 21:30",
        price: "€15",
        type: "Aperitivo + DJ",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
        venueId: "2",
        capacity: 80,
        ageRestriction: "16+",
        dressCode: "Casual",
        includes: ["Aperitivo completo", "DJ Set", "Finger food"],
        tags: ["Aperitivo", "DJ", "Finger Food"],
    },
    {
        id: 3,
        title: "Notte Latina al Club",
        description: "Una notte di passione con ritmi latini, salsa e bachata. Ballerini professionisti guideranno le danze.",
        date: "2024-03-20",
        time: "22:00 - 04:00",
        price: "€20",
        type: "Discoteca",
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80",
        venueId: "3",
        capacity: 200,
        ageRestriction: "18+",
        dressCode: "Festivo",
        includes: ["Lezioni di ballo gratuite", "DJ Latino", "Bar completo"],
        tags: ["Latino", "Salsa", "Dancing", "Night Club"],
    },
    {
        id: 4,
        title: "Cena Romantica al Garden",
        description: "Una serata speciale per coppie con menu degustazione, candele e vista mozzafiato sul golfo.",
        date: "2024-03-18",
        time: "20:00 - 23:00",
        price: "€80",
        type: "Cena",
        image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
        venueId: "4",
        capacity: 40,
        ageRestriction: "Nessuna restrizione",
        dressCode: "Elegante",
        includes: ["Menu degustazione", "Vino selezionato", "Vista mare"],
        tags: ["Romantico", "Cena", "Vista mare", "Degustazione"],
    },
    {
        id: 5,
        title: "Cocktail Night al Neon",
        description: "Serata dedicata ai cocktail signature con bartender professionisti. Degustazioni e lezioni di mixology.",
        date: "2024-03-22",
        time: "21:00 - 01:00",
        price: "€30",
        type: "Cocktail Bar",
        image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=800&q=80",
        venueId: "5",
        capacity: 60,
        ageRestriction: "21+",
        dressCode: "Chic",
        includes: ["Cocktail signature", "Lezioni mixology", "Foto professionale"],
        tags: ["Cocktail", "Mixology", "Signature drinks", "Fotografico"],
    },
    {
        id: 6,
        title: "Hip-Hop Night Underground",
        description: "La migliore selezione hip-hop della città con DJ locali e ospiti speciali. Atmosfera underground unica.",
        date: "2024-03-25",
        time: "23:00 - 05:00",
        price: "€10",
        type: "Discoteca",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
        venueId: "6",
        capacity: 120,
        ageRestriction: "18+",
        dressCode: "Streetwear",
        includes: ["DJ Hip-Hop", "Ospiti speciali", "Bar economico"],
        tags: ["Hip-Hop", "Underground", "DJ", "Street"],
    },
];

export const getEventById = (id) => MOCK_EVENTS.find((event) => event.id === parseInt(id));
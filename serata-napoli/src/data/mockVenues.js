// mockVenues.js - Complete data structure with reviews, gallery, events

export const MOCK_VENUES = [
    {
        id: "1",
        slug: "luna-rooftop-chiaia",
        name: "Luna Rooftop",
        zone: "Chiaia",
        address: "Via Cavallerizza a Chiaia, 45",
        mood: "tranquillo",
        tag: "Rooftop",
        price: "€€€",
        age: "24-27",
        energy: 2,
        social: 4,
        affluenza: 3,
        bestTime: "21:30 - 00:30",
        description: "Perfetto per un aperitivo premium che diventa serata glamour, con musica, atmosfera curata e pubblico internazionale. Luna Rooftop offre una vista mozzafiato sul Golfo di Napoli, cocktail d'autore preparati da bartender professionisti e un'atmosfera elegante ma non eccessivamente formale.",
        bestDays: ["Giovedì", "Venerdì", "Sabato", "Domenica"],
        idealFor: ["Coppie", "Date", "Gruppo", "Networking"],
        formats: ["Aperitivo", "DJ Set", "Cocktail"],
        location: "Outdoor",
        phone: "+39 081 123 4567",
        website: "www.lunarooftop.it",
        instagram: "@luna_rooftop_napoli",
        rating: 4.9,
        reviews: 487,
        badges: ["Vista mare", "Cocktail bar", "DJ set"],
        highlight: true,
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
        hours: {
            "Lun - Mar": "Chiuso",
            "Mer - Dom": "18:00 - 01:00"
        },
        gallery: [
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80"
        ],
        userReviews: [
            {
                id: 1,
                author: "Maria R.",
                avatar: "https://ui-avatars.com/api/?name=Maria+R&background=ff6b35&color=fff",
                rating: 5,
                date: "2024-03-01",
                comment: "Vista incredibile! Perfetto per un aperitivo romantico. I cocktail sono eccellenti e il personale molto professionale. Consiglio di prenotare in anticipo, soprattutto nel weekend.",
                helpful: 23
            },
            {
                id: 2,
                author: "Luca M.",
                avatar: "https://ui-avatars.com/api/?name=Luca+M&background=00d4ff&color=fff",
                rating: 5,
                date: "2024-02-28",
                comment: "Atmosfera top, musica giusta e panorama mozzafiato. Ci torno sempre volentieri con amici. Prezzi un po' alti ma ne vale la pena.",
                helpful: 18
            },
            {
                id: 3,
                author: "Sofia T.",
                avatar: "https://ui-avatars.com/api/?name=Sofia+T&background=9d4edd&color=fff",
                rating: 4,
                date: "2024-02-25",
                comment: "Bellissimo locale, vista stupenda e cocktail buonissimi. L'unica pecca è che a volte c'è troppa gente e si fa fatica a trovare posto.",
                helpful: 12
            },
            {
                id: 4,
                author: "Alessandro P.",
                avatar: "https://ui-avatars.com/api/?name=Alessandro+P&background=ffd60a&color=000",
                rating: 5,
                date: "2024-02-20",
                comment: "Location da sogno! Ho festeggiato qui il mio compleanno e tutto è stato perfetto. Staff attento e preparato. Consigliatissimo!",
                helpful: 15
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
                price: "Ingresso libero"
            },
            {
                id: 2,
                title: "Jazz Night",
                date: "2024-03-22",
                time: "20:00 - 00:00",
                description: "Serata jazz con band dal vivo e menu degustazione",
                type: "Live Music",
                price: "€20 con consumazione"
            },
            {
                id: 3,
                title: "Weekend Brunch",
                date: "2024-03-24",
                time: "12:00 - 16:00",
                description: "Brunch domenicale con vista golfo",
                type: "Food & Drink",
                price: "€35 per persona"
            }
        ]
    },
    {
        id: "2",
        slug: "vicolo-vivo-centro",
        name: "Vicolo Vivo",
        zone: "Centro Storico",
        address: "Via dei Tribunali, 289",
        mood: "musica",
        tag: "Live Music",
        price: "€€",
        age: "23-26",
        energy: 4,
        social: 5,
        affluenza: 4,
        bestTime: "22:00 - 01:00",
        description: "Un posto caldo, pieno di vibrazioni vere, perfetto per chi vuole cantare, bere bene e stare dentro il cuore pulsante della città. Locale storico del centro con live music ogni sera e atmosfera autentica napoletana.",
        bestDays: ["Tutti i giorni"],
        idealFor: ["Amici", "Gruppi", "Conoscere persone", "Single"],
        formats: ["Live Band", "Jam Session", "Karaoke"],
        location: "Indoor",
        phone: "+39 081 234 5678",
        website: "www.vicolovivo.it",
        instagram: "@vicolovivo_napoli",
        rating: 4.7,
        reviews: 356,
        badges: ["Live band", "Gruppi", "Locale"],
        highlight: true,
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
        hours: {
            "Lun - Dom": "19:00 - 02:00"
        },
        gallery: [
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80"
        ],
        userReviews: [
            {
                id: 1,
                author: "Giovanni B.",
                avatar: "https://ui-avatars.com/api/?name=Giovanni+B&background=00d4ff&color=fff",
                rating: 5,
                date: "2024-03-02",
                comment: "La vera anima di Napoli! Band pazzesca, atmosfera unica. Ci vengo almeno una volta a settimana. Consigliatissimo!",
                helpful: 31
            },
            {
                id: 2,
                author: "Chiara D.",
                avatar: "https://ui-avatars.com/api/?name=Chiara+D&background=ff6b35&color=fff",
                rating: 4,
                date: "2024-02-27",
                comment: "Locale piccolo ma con grande cuore. Musica live fantastica e prezzi onesti. A volte un po' affollato.",
                helpful: 19
            },
            {
                id: 3,
                author: "Marco F.",
                avatar: "https://ui-avatars.com/api/?name=Marco+F&background=9d4edd&color=fff",
                rating: 5,
                date: "2024-02-22",
                comment: "Ogni sera un'esperienza diversa. I musicisti sono bravissimi e l'atmosfera è sempre elettrica!",
                helpful: 24
            }
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Notte della Canzone Napoletana",
                date: "2024-03-18",
                time: "21:00 - 01:00",
                description: "Serata speciale dedicata alla tradizione musicale napoletana",
                type: "Live Music",
                price: "Ingresso libero"
            },
            {
                id: 2,
                title: "Open Mic Night",
                date: "2024-03-21",
                time: "22:00 - 02:00",
                description: "Microfono aperto per artisti emergenti",
                type: "Live Music",
                price: "€5"
            }
        ]
    },
    {
        id: "3",
        slug: "aura-club-vomero",
        name: "Aura Club",
        zone: "Vomero",
        address: "Via Morghen, 45",
        mood: "casino",
        tag: "Night Club",
        price: "€€€",
        age: "22-25",
        energy: 5,
        social: 4,
        affluenza: 5,
        bestTime: "23:30 - 03:00",
        description: "Per chi vuole una notte intensa, luci forti, selezione musicale clubbing e un'estetica molto più fashion. Il club più esclusivo del Vomero con DJ internazionali e una crowd giovane e trendy.",
        bestDays: ["Giovedì", "Venerdì", "Sabato"],
        idealFor: ["Gruppi", "Amici", "Single", "Conoscere persone"],
        formats: ["DJ Set", "Dancing", "After Party"],
        location: "Indoor",
        phone: "+39 081 345 6789",
        website: "www.auraclub.it",
        instagram: "@aura_club_napoli",
        rating: 4.8,
        reviews: 612,
        badges: ["Dancefloor", "Premium", "Weekend"],
        highlight: true,
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
        hours: {
            "Lun - Mer": "Chiuso",
            "Gio": "23:00 - 03:00",
            "Ven - Sab": "23:00 - 05:00",
            "Dom": "Chiuso"
        },
        gallery: [
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1571266028243-d220c6c0b98b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80"
        ],
        userReviews: [
            {
                id: 1,
                author: "Valentina S.",
                avatar: "https://ui-avatars.com/api/?name=Valentina+S&background=ff5e78&color=fff",
                rating: 5,
                date: "2024-03-03",
                comment: "Il club più bello di Napoli! DJ incredibili, luci pazzeschemusica sempre top. Imperdibile!",
                helpful: 42
            },
            {
                id: 2,
                author: "Roberto L.",
                avatar: "https://ui-avatars.com/api/?name=Roberto+L&background=00d4ff&color=fff",
                rating: 4,
                date: "2024-02-29",
                comment: "Locale top, musica ottima e ambiente giovane. Prezzi un po' alti ma ne vale la pena. Consiglio di andare dopo mezzanotte.",
                helpful: 27
            },
            {
                id: 3,
                author: "Elena M.",
                avatar: "https://ui-avatars.com/api/?name=Elena+M&background=9d4edd&color=fff",
                rating: 5,
                date: "2024-02-26",
                comment: "Esperienza incredibile! Staff cortese, sicurezza presente, pista sempre piena di energia. Ci torno ogni weekend!",
                helpful: 35
            }
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "International DJ Night",
                date: "2024-03-16",
                time: "23:00 - 05:00",
                description: "Special guest DJ from Ibiza",
                type: "DJ Set",
                price: "€20 + drink"
            },
            {
                id: 2,
                title: "Neon Party",
                date: "2024-03-23",
                time: "23:00 - 05:00",
                description: "Festa a tema neon con gadget e drink fluorescenti",
                type: "Themed Party",
                price: "€15"
            },
            {
                id: 3,
                title: "Ladies Night",
                date: "2024-03-20",
                time: "23:00 - 03:00",
                description: "Ingresso gratuito per le donne fino all'1:00",
                type: "Special Event",
                price: "Free per donne"
            }
        ]
    },
    {
        id: "4",
        slug: "brezza-garden-posillipo",
        name: "Brezza Garden",
        zone: "Posillipo",
        address: "Via Posillipo, 123",
        mood: "tranquillo",
        tag: "Outdoor",
        price: "€€€",
        age: "25-28",
        energy: 2,
        social: 3,
        affluenza: 2,
        bestTime: "20:00 - 23:30",
        description: "Location panoramica e più rilassata, ideale per una serata bella da vedere, raffinata ma non fredda. Giardino elegante con vista sul golfo, perfetto per cene romantiche e aperitivi al tramonto.",
        bestDays: ["Tutti i giorni"],
        idealFor: ["Coppie", "Date", "Primo appuntamento", "Famiglia"],
        formats: ["Cena", "Aperitivo", "Cocktail"],
        location: "Outdoor",
        phone: "+39 081 456 7890",
        website: "www.brezzagarden.it",
        instagram: "@brezza_garden",
        rating: 4.6,
        reviews: 289,
        badges: ["Garden", "Sunset", "Couple vibes"],
        highlight: true,
        image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=1200&q=80",
        hours: {
            "Lun - Dom": "18:00 - 00:00"
        },
        gallery: [
            "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80"
        ],
        userReviews: [
            {
                id: 1,
                author: "Anna G.",
                avatar: "https://ui-avatars.com/api/?name=Anna+G&background=ff6b35&color=fff",
                rating: 5,
                date: "2024-03-01",
                comment: "Posto magico per una cena romantica. Vista mozzafiato, cibo ottimo e personale attento. Prezzi giustificati dalla qualità.",
                helpful: 28
            },
            {
                id: 2,
                author: "Paolo N.",
                avatar: "https://ui-avatars.com/api/?name=Paolo+N&background=00d4ff&color=fff",
                rating: 4,
                date: "2024-02-24",
                comment: "Bellissimo giardino e atmosfera rilassante. Ideale per una serata tranquilla. Consiglio di prenotare un tavolo vicino alla balaustra.",
                helpful: 16
            }
        ],
        upcomingEvents: null
    },
    {
        id: "5",
        slug: "neon-harbor-mergellina",
        name: "Neon Harbor",
        zone: "Mergellina",
        address: "Via Caracciolo, 78",
        mood: "alternativo",
        tag: "Cocktail Bar",
        price: "€€",
        age: "23-26",
        energy: 3,
        social: 4,
        affluenza: 3,
        bestTime: "21:00 - 00:00",
        description: "Design contemporaneo, drink fotografabili e atmosfera perfetta per iniziare bene la serata con il gruppo giusto. Cocktail bar trendy con mixologist creativi e ambiente instagrammabile.",
        bestDays: ["Mercoledì", "Giovedì", "Venerdì", "Sabato"],
        idealFor: ["Amici", "Gruppo", "Networking", "Date"],
        formats: ["Cocktail", "Aperitivo", "DJ Set"],
        location: "Indoor",
        phone: "+39 081 567 8901",
        website: "www.neonharbor.it",
        instagram: "@neon_harbor_napoli",
        rating: 4.8,
        reviews: 421,
        badges: ["Signature drink", "Scenografico", "Friends"],
        highlight: true,
        image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=1200&q=80",
        hours: {
            "Lun - Mar": "Chiuso",
            "Mer - Sab": "19:00 - 02:00",
            "Dom": "19:00 - 00:00"
        },
        gallery: [
            "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
        ],
        userReviews: [
            {
                id: 1,
                author: "Francesca R.",
                avatar: "https://ui-avatars.com/api/?name=Francesca+R&background=9d4edd&color=fff",
                rating: 5,
                date: "2024-03-04",
                comment: "Cocktail incredibili e ambiente super cool! I bartender sono veri artisti. Ogni drink è una sorpresa!",
                helpful: 33
            },
            {
                id: 2,
                author: "Davide C.",
                avatar: "https://ui-avatars.com/api/?name=Davide+C&background=00d4ff&color=fff",
                rating: 5,
                date: "2024-02-28",
                comment: "Il mio cocktail bar preferito a Napoli. Design pazzesco, musica giusta e drink top. Ci torno sempre!",
                helpful: 29
            },
            {
                id: 3,
                author: "Giulia P.",
                avatar: "https://ui-avatars.com/api/?name=Giulia+P&background=ff5e78&color=fff",
                rating: 4,
                date: "2024-02-23",
                comment: "Locale molto carino e instagram-friendly. Drink buoni ma un po' cari. Atmosfera comunque fantastica!",
                helpful: 18
            }
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Mixology Workshop",
                date: "2024-03-19",
                time: "20:00 - 22:00",
                description: "Impara a preparare cocktail d'autore con i nostri mixologist",
                type: "Workshop",
                price: "€35 con 3 drink"
            },
            {
                id: 2,
                title: "Neon Nights",
                date: "2024-03-23",
                time: "22:00 - 02:00",
                description: "Serata a tema neon con DJ set e drink fluorescenti",
                type: "Themed Party",
                price: "Ingresso libero"
            }
        ]
    },
    {
        id: "6",
        slug: "casa-ritmo-fuorigrotta",
        name: "Casa Ritmo",
        zone: "Fuorigrotta",
        address: "Via Terracina, 234",
        mood: "casino",
        tag: "Urban Mood",
        price: "€",
        age: "20-24",
        energy: 4,
        social: 5,
        affluenza: 4,
        bestTime: "22:30 - 02:00",
        description: "Più accessibile ma super vivo, perfetto per chi cerca una serata senza troppi filtri, spontanea e divertente. Locale urban con musica hip-hop, trap e reggaeton. Atmosfera giovane e informale.",
        bestDays: ["Venerdì", "Sabato"],
        idealFor: ["Gruppi", "Amici", "Conoscere persone", "Single"],
        formats: ["DJ Set", "Hip-hop", "Dancing"],
        location: "Indoor",
        phone: "+39 081 678 9012",
        website: "www.casaritmo.it",
        instagram: "@casa_ritmo_napoli",
        rating: 4.5,
        reviews: 378,
        badges: ["Easy price", "Hip-hop", "Gruppi"],
        highlight: false,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
        hours: {
            "Lun - Gio": "Chiuso",
            "Ven - Sab": "22:00 - 04:00",
            "Dom": "Chiuso"
        },
        gallery: [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80"
        ],
        userReviews: [
            {
                id: 1,
                author: "Michele T.",
                avatar: "https://ui-avatars.com/api/?name=Michele+T&background=ffd60a&color=000",
                rating: 5,
                date: "2024-03-02",
                comment: "Locale super! Prezzi onesti, musica pazzesca e tanta gente giovane. Ideale per una serata senza pensieri!",
                helpful: 26
            },
            {
                id: 2,
                author: "Sara B.",
                avatar: "https://ui-avatars.com/api/?name=Sara+B&background=ff6b35&color=fff",
                rating: 4,
                date: "2024-02-27",
                comment: "Atmosfera super casual e divertente. Musica trap e hip-hop sempre al top. Lo consiglio!",
                helpful: 21
            }
        ],
        upcomingEvents: [
            {
                id: 1,
                title: "Trap Night",
                date: "2024-03-17",
                time: "23:00 - 04:00",
                description: "Serata dedicata alla trap italiana e internazionale",
                type: "DJ Set",
                price: "€8"
            },
            {
                id: 2,
                title: "Open Bar Friday",
                date: "2024-03-22",
                time: "22:00 - 00:00",
                description: "Open bar per 2 ore con ingresso",
                type: "Special Offer",
                price: "€15"
            }
        ]
    }
];

// Helper functions
export const getVenueById = (id) => {
    return MOCK_VENUES.find(venue => venue.id === id);
};

export const getVenueBySlug = (slug) => {
    return MOCK_VENUES.find(venue => venue.slug === slug);
};

export const getVenuesByMood = (mood) => {
    return MOCK_VENUES.filter(venue => venue.mood === mood);
};

export const getVenuesByZone = (zone) => {
    return MOCK_VENUES.filter(venue => venue.zone === zone);
};

export const getTopVenues = (count = 3) => {
    return MOCK_VENUES
        .filter(venue => venue.highlight)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, count);
};

export const searchVenues = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return MOCK_VENUES.filter(venue =>
        venue.name.toLowerCase().includes(lowercaseQuery) ||
        venue.zone.toLowerCase().includes(lowercaseQuery) ||
        venue.description.toLowerCase().includes(lowercaseQuery) ||
        venue.tag.toLowerCase().includes(lowercaseQuery)
    );
};

export default MOCK_VENUES;
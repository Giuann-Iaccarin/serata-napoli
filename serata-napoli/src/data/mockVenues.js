// mockVenues.js - Mock data per i locali di Napoli

export const MOCK_VENUES = [
    {
        id: "1",
        slug: "movida-club-chiaia",
        name: "Movida Club",
        zone: "Chiaia",
        address: "Via Cavallerizza a Chiaia, 45",
        mood: "casino",
        price: "€€",
        age: "22-25",
        energy: 5,
        social: 4,
        affluenza: 4,
        description: "Il Movida è il punto di riferimento per chi cerca una serata ad alta energia nel cuore di Chiaia. DJ set di qualità, atmosfera elettrica e una crowd giovane e vivace. Perfetto per chi vuole ballare fino all'alba e fare nuove amicizie. Il weekend il locale è sempre sold out, quindi meglio prenotare.",
        bestDays: ["Venerdì", "Sabato"],
        idealFor: ["Gruppi", "Single", "Conoscere persone"],
        formats: ["DJ Set", "Dancing"],
        location: "Indoor",
        phone: "+39 081 123 4567",
        website: "www.movidaclub.it",
        instagram: "@movidaclub",
        rating: 4.7,
        reviews: 328,
        badges: ["DJ Set", "Indoor", "Ven-Sab"],
        highlight: true,
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
        hours: {
            "Lun - Mer": "Chiuso",
            "Gio": "22:00 - 03:00",
            "Ven - Sab": "22:00 - 05:00",
            "Dom": "Chiuso"
        }
    },
    {
        id: "2",
        slug: "bohemien-vomero",
        name: "Bohémien",
        zone: "Vomero",
        address: "Via Alessandro Scarlatti, 112",
        mood: "musica",
        price: "€",
        age: "24-27",
        energy: 3,
        social: 5,
        affluenza: 3,
        description: "Un locale alternativo che celebra la musica live. Ogni sera artisti emergenti e band locali si esibiscono in un'atmosfera intima e accogliente. L'aperitivo è ottimo e i prezzi sono accessibili. Ideale per chi ama scoprire nuova musica e fare conversazioni interessanti.",
        bestDays: ["Giovedì", "Venerdì", "Sabato"],
        idealFor: ["Coppie", "Amici", "Networking", "Single"],
        formats: ["Live Band", "Aperitivo", "Concerti"],
        location: "Indoor/Outdoor",
        phone: "+39 081 234 5678",
        website: "www.bohemiennapoli.it",
        instagram: "@bohemien_napoli",
        rating: 4.8,
        reviews: 256,
        badges: ["Live Band", "Outdoor", "Unico"],
        highlight: true,
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
        hours: {
            "Lun - Mar": "Chiuso",
            "Mer - Gio": "19:00 - 01:00",
            "Ven - Sab": "19:00 - 02:00",
            "Dom": "19:00 - 00:00"
        }
    },
    {
        id: "3",
        slug: "sottosopra-centro",
        name: "Sottosopra",
        zone: "Centro Storico",
        address: "Via dei Tribunali, 289",
        mood: "alternativo",
        price: "€€",
        age: "23-26",
        energy: 3,
        social: 3,
        affluenza: 3,
        description: "Locale alternativo nel cuore del centro storico. Quiz night il mercoledì, aperitivi creativi e un pubblico eclettico. Perfetto per networking e per chi cerca un'atmosfera diversa dal solito. L'arredamento vintage e le luci soffuse creano un ambiente unico.",
        bestDays: ["Mercoledì", "Venerdì", "Sabato"],
        idealFor: ["Networking", "Amici", "Date"],
        formats: ["Quiz Night", "Aperitivo", "DJ Set"],
        location: "Indoor",
        phone: "+39 081 345 6789",
        website: "www.sottosopranapoli.com",
        instagram: "@sottosopra_napoli",
        rating: 4.5,
        reviews: 189,
        badges: ["Quiz Night", "Indoor", "Networking"],
        highlight: true,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        hours: {
            "Lun - Mar": "Chiuso",
            "Mer": "18:00 - 01:00",
            "Gio": "18:00 - 01:00",
            "Ven - Sab": "18:00 - 02:00",
            "Dom": "Chiuso"
        }
    },
    {
        id: "4",
        slug: "la-terrazza-posillipo",
        name: "La Terrazza",
        zone: "Posillipo",
        address: "Via Posillipo, 123",
        mood: "tranquillo",
        price: "€€€",
        age: "24-27",
        energy: 2,
        social: 3,
        affluenza: 2,
        description: "Vista mozzafiato sul Golfo di Napoli, cocktail ricercati e atmosfera elegante. La Terrazza è il posto perfetto per un aperitivo romantico o per festeggiare occasioni speciali. Il dress code è smart casual e la clientela è raffinata.",
        bestDays: ["Giovedì", "Venerdì", "Sabato", "Domenica"],
        idealFor: ["Coppie", "Date", "Gruppo"],
        formats: ["Aperitivo", "Cena", "Cocktail"],
        location: "Outdoor",
        phone: "+39 081 456 7890",
        website: "www.laterrazzanapoli.it",
        instagram: "@laterrazza_posillipo",
        rating: 4.9,
        reviews: 421,
        badges: ["Outdoor", "Vista mare", "Coppie"],
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        hours: {
            "Lun - Mar": "Chiuso",
            "Mer - Dom": "18:00 - 00:00"
        }
    },
    {
        id: "5",
        slug: "ex-fadda-vomero",
        name: "Ex Fadda",
        zone: "Vomero",
        address: "Via Morghen, 45",
        mood: "casino",
        price: "€€",
        age: "20-24",
        energy: 4,
        social: 5,
        affluenza: 5,
        description: "Storico locale del Vomero che attira una folla giovane e festaiola. DJ set ogni weekend, spazio sia indoor che outdoor, e una delle crowd più vivaci di Napoli. Ottimo per gruppi di amici che vogliono divertirsi senza pensieri.",
        bestDays: ["Giovedì", "Venerdì", "Sabato"],
        idealFor: ["Gruppi", "Amici", "Conoscere persone"],
        formats: ["DJ Set", "Dancing", "Aperitivo"],
        location: "Indoor/Outdoor",
        phone: "+39 081 567 8901",
        website: "www.exfadda.it",
        instagram: "@exfadda_napoli",
        rating: 4.6,
        reviews: 512,
        badges: ["DJ Set", "Indoor/Outdoor", "Gruppi"],
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
        hours: {
            "Lun - Mer": "Chiuso",
            "Gio": "21:00 - 02:00",
            "Ven - Sab": "21:00 - 04:00",
            "Dom": "Chiuso"
        }
    },
    {
        id: "6",
        slug: "keste-chiaia",
        name: "Kestè",
        zone: "Chiaia",
        address: "Largo della Carità, 12",
        mood: "food",
        price: "€",
        age: "22-26",
        energy: 3,
        social: 4,
        affluenza: 4,
        description: "Street food napoletano rivisitato in chiave moderna. Kestè offre un'esperienza culinaria unica con piatti tradizionali preparati con ingredienti di qualità. Atmosfera informale e prezzi accessibili. Perfetto per una cena diversa dal solito.",
        bestDays: ["Tutti i giorni"],
        idealFor: ["Amici", "Coppie", "Gruppo", "Solo"],
        formats: ["Food Experience", "Aperitivo"],
        location: "Outdoor",
        phone: "+39 081 678 9012",
        website: "www.keste.it",
        instagram: "@keste_napoli",
        rating: 4.7,
        reviews: 645,
        badges: ["Street Food", "Outdoor", "Esperienza unica"],
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
        hours: {
            "Lun - Dom": "12:00 - 23:00"
        }
    },
    {
        id: "7",
        slug: "lanificio-25-bagnoli",
        name: "Lanificio 25",
        zone: "Bagnoli",
        address: "Via Coroglio, 104",
        mood: "musica",
        price: "€€",
        age: "23-27",
        energy: 4,
        social: 4,
        affluenza: 4,
        description: "Spazio polifunzionale che ospita concerti, eventi culturali e serate a tema. La programmazione è sempre interessante con artisti nazionali e internazionali. Un punto di riferimento per la scena musicale napoletana.",
        bestDays: ["Venerdì", "Sabato"],
        idealFor: ["Single", "Amici", "Networking"],
        formats: ["Concerti", "Live Band", "DJ Set"],
        location: "Indoor",
        phone: "+39 081 789 0123",
        website: "www.lanificio25.it",
        instagram: "@lanificio25",
        rating: 4.8,
        reviews: 387,
        badges: ["Concerti", "Indoor", "Single"],
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
        hours: {
            "Lun - Gio": "Chiuso",
            "Ven - Sab": "21:00 - 03:00",
            "Dom": "Varia per eventi"
        }
    },
    {
        id: "8",
        slug: "nabilah-chiaia",
        name: "Nabilah",
        zone: "Chiaia",
        address: "Vico Belledonne a Chiaia, 18",
        mood: "tranquillo",
        price: "€€",
        age: "25-28",
        energy: 2,
        social: 3,
        affluenza: 2,
        description: "Cocktail bar elegante con atmosfera lounge. Bartender professionisti che creano cocktail d'autore. Musica ambient e design ricercato. Ideale per un primo appuntamento o per una serata rilassante con amici.",
        bestDays: ["Mercoledì", "Giovedì", "Venerdì", "Sabato"],
        idealFor: ["Coppie", "Date", "Primo appuntamento"],
        formats: ["Cocktail", "Aperitivo"],
        location: "Indoor",
        phone: "+39 081 890 1234",
        website: "www.nabilahbar.it",
        instagram: "@nabilah_napoli",
        rating: 4.6,
        reviews: 278,
        badges: ["Cocktail bar", "Indoor", "Primo appuntamento"],
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
        hours: {
            "Lun - Mar": "Chiuso",
            "Mer - Sab": "19:00 - 02:00",
            "Dom": "Chiuso"
        }
    },
    {
        id: "9",
        slug: "doppiozeroo-centro",
        name: "Doppiozeroo",
        zone: "Centro",
        address: "Piazza Bellini, 70",
        mood: "alternativo",
        price: "€",
        age: "21-25",
        energy: 3,
        social: 5,
        affluenza: 3,
        description: "Hub culturale nel cuore del centro storico. Mostre d'arte, eventi letterari, aperitivi creativi e una community giovane e dinamica. Perfetto per fare networking e scoprire la scena artistica napoletana.",
        bestDays: ["Tutti i giorni"],
        idealFor: ["Networking", "Amici", "Solo", "Conoscere persone"],
        formats: ["Eventi culturali", "Aperitivo", "Arte"],
        location: "Indoor/Outdoor",
        phone: "+39 081 901 2345",
        website: "www.doppiozeroo.it",
        instagram: "@doppiozeroo",
        rating: 4.7,
        reviews: 423,
        badges: ["Arte", "Eventi speciali", "Networking"],
        image: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800",
        hours: {
            "Lun - Dom": "10:00 - 01:00"
        }
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
        venue.description.toLowerCase().includes(lowercaseQuery)
    );
};

export default MOCK_VENUES;
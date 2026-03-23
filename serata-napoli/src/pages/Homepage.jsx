import React, { useMemo, useState, useRef, useEffect } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import NapoliFilters, { DEFAULT_FILTERS } from "../components/Filters";
import VenueGrid from "../components/VenueGrid";
import { MOCK_VENUES } from "../data/mockVenues";
import Footer from "../components/Footer";
import { applyVenueFilters } from "../utils/applyVenueFilters";

const HOMEPAGE_FILTERS_KEY = "serataNapoli.homepageFilters";

function loadHomepageFilters() {
    if (typeof window === "undefined") return DEFAULT_FILTERS;

    try {
        const raw = localStorage.getItem(HOMEPAGE_FILTERS_KEY);
        if (!raw) return DEFAULT_FILTERS;
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_FILTERS, ...parsed };
    } catch (error) {
        console.error("Error loading homepage filters", error);
        return DEFAULT_FILTERS;
    }
}

export default function Homepage() {
    const [filters, setFilters] = useState(loadHomepageFilters);
    const filtersRef = useRef(null);
    const venuesRef = useRef(null);

    useEffect(() => {
        try {
            localStorage.setItem(HOMEPAGE_FILTERS_KEY, JSON.stringify(filters));
        } catch (error) {
            console.error("Error saving homepage filters", error);
        }
    }, [filters]);

    const filteredVenues = useMemo(() => {
        return applyVenueFilters(MOCK_VENUES, filters, DEFAULT_FILTERS);
    }, [filters]);

    const handleApplyMoodPreset = (preset) => {
        setFilters({
            ...DEFAULT_FILTERS,
            ...preset,
        });
    };

    const scrollToFilters = () => {
        filtersRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToVenues = () => {
        venuesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />
            <HeroSection onApplyMoodPreset={handleApplyMoodPreset} onScrollToFilters={scrollToFilters} onScrollToVenues={scrollToVenues} />

            <section className="relative mt-20 z-20 px-4">
                <div className="mx-auto max-w-7xl space-y-8">
                    <div ref={filtersRef}>
                        <NapoliFilters
                            value={filters}
                            onChange={setFilters}
                            resultsCount={filteredVenues.length}
                        />
                    </div>

                    <div ref={venuesRef}>
                        <VenueGrid
                            venues={filteredVenues}
                            total={MOCK_VENUES.length}
                        />
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
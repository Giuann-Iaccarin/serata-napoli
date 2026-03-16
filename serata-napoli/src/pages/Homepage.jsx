import React, { useMemo, useState, useRef } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import NapoliFilters, { DEFAULT_FILTERS } from "../components/Filters";
import VenueGrid from "../components/VenueGrid";
import { MOCK_VENUES } from "../data/mockVenues";
import Footer from "../components/Footer";
import { applyVenueFilters } from "../utils/applyVenueFilters";

export default function Homepage() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const filtersRef = useRef(null);
    const venuesRef = useRef(null);

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
import React, { useMemo, useState } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import NapoliFilters, { DEFAULT_FILTERS } from "../components/Filters";
import VenueGrid from "../components/VenueGrid";
import { MOCK_VENUES } from "../data/mockVenues";
import Footer from "../components/Footer";
import { applyVenueFilters } from "../utils/applyVenueFilters";

export default function Homepage() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const filteredVenues = useMemo(() => {
        return applyVenueFilters(MOCK_VENUES, filters, DEFAULT_FILTERS);
    }, [filters]);

    const handleApplyMoodPreset = (preset) => {
        setFilters({
            ...DEFAULT_FILTERS,
            ...preset,
        });
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <Navigation />
            <HeroSection onApplyMoodPreset={handleApplyMoodPreset} />

            <section className="relative mt-20 z-20 px-4">
                <div className="mx-auto max-w-7xl space-y-8">
                    <NapoliFilters
                        value={filters}
                        onChange={setFilters}
                        resultsCount={filteredVenues.length}
                    />

                    <VenueGrid
                        venues={filteredVenues}
                        total={MOCK_VENUES.length}
                    />

                </div>
            </section>

            <Footer />
        </main>
    );
}
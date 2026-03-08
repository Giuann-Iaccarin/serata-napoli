import NapoliHeader from "../components/Header";
import NapoliFilters from "../components/Filters";
import VenueGrid from "../components/VenueGrid";
import BottomCTA from "../components/BottomCTA";
import { MOCK_VENUES } from "../data/mockVenues";
import Footer from "../components/Footer";

export default function Homepage() {
    return (
        <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
            <NapoliHeader />

            <section className="relative mt-20 z-20 px-4">
                <div className="mx-auto max-w-7xl space-y-8">
                    <NapoliFilters />
                    <VenueGrid venues={MOCK_VENUES} />
                    <Footer />
                </div>
            </section>
        </main>
    );
}
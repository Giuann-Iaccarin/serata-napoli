export function applyVenueFilters(venues = [], filters, defaults = {}) {
    return venues.filter((venue) => {
        const {
            priceRange = [],
            selectedZone,
            selectedQuartiere,
            selectedAge,
            selectedEnergy,
            selectedSocial,
            selectedAffluenza,
            selectedTipoSerata,
            selectedPubblico,
            selectedLocation,
            selectedFormats = [],
            selectedDays = [],
            selectedIdealFor,
        } = filters;

        const {
            selectedZone: defaultZone,
            selectedQuartiere: defaultQuartiere,
            selectedAge: defaultAge,
            selectedEnergy: defaultEnergy,
            selectedSocial: defaultSocial,
            selectedAffluenza: defaultAffluenza,
            selectedTipoSerata: defaultTipoSerata,
            selectedPubblico: defaultPubblico,
            selectedLocation: defaultLocation,
            selectedIdealFor: defaultIdealFor,
            selectedFormats: defaultFormats = [],
            selectedDays: defaultDays = [],
            priceRange: defaultPrices = [],
        } = defaults;

        const venueZone = venue.zone || "";
        const venueQuartiere = venue.quartiere || venue.zone || "";
        const venuePrice = venue.price || "";
        const venueAge = venue.age || "";
        const venueEnergy = Number(venue.energy || 0);
        const venueSocial = Number(venue.social || 0);
        const venueAffluenza = Number(venue.affluenza || 0);
        const venueMood = venue.mood || "";
        const venuePubblico = venue.pubblico || "";
        const venueLocation = venue.location || "";
        const venueFormats = venue.formats || [];
        const venueBestDays = venue.bestDays || [];
        const venueIdealFor = venue.idealFor || [];

        const normalize = (value) => String(value).toLowerCase().trim();

        const isDefaultZone = selectedZone === defaultZone;
        const isDefaultQuartiere = selectedQuartiere === defaultQuartiere;
        const isDefaultAge = selectedAge === defaultAge;
        const isDefaultEnergy = selectedEnergy === defaultEnergy;
        const isDefaultSocial = selectedSocial === defaultSocial;
        const isDefaultAffluenza = selectedAffluenza === defaultAffluenza;
        const isDefaultTipoSerata = selectedTipoSerata === defaultTipoSerata;
        const isDefaultPubblico = selectedPubblico === defaultPubblico;
        const isDefaultLocation = selectedLocation === defaultLocation;
        const isDefaultIdealFor = selectedIdealFor === defaultIdealFor;
        const isDefaultFormats =
            JSON.stringify([...selectedFormats].sort()) === JSON.stringify([...defaultFormats].sort());
        const isDefaultDays =
            JSON.stringify([...selectedDays].sort()) === JSON.stringify([...defaultDays].sort());
        const isDefaultPrices =
            JSON.stringify([...priceRange].sort()) === JSON.stringify([...defaultPrices].sort());

        if (!isDefaultPrices && priceRange.length > 0 && !priceRange.includes(venuePrice)) {
            return false;
        }

        if (!isDefaultZone && normalize(selectedZone) !== normalize(venueZone)) {
            return false;
        }

        const isAllQuartieri = normalize(selectedQuartiere) === normalize("Tutti i quartieri");

        if (!isDefaultQuartiere && !isAllQuartieri) {
            if (normalize(selectedQuartiere) !== normalize(venueQuartiere)) {
                return false;
            }
        }

        if (!isDefaultAge && normalize(selectedAge) !== normalize(venueAge)) {
            return false;
        }

        if (!isDefaultEnergy && venueEnergy < selectedEnergy) {
            return false;
        }

        if (!isDefaultSocial && venueSocial < selectedSocial) {
            return false;
        }

        if (!isDefaultAffluenza && venueAffluenza < selectedAffluenza) {
            return false;
        }

        if (!isDefaultTipoSerata) {
            const moodMatch = normalize(venueMood).includes(normalize(selectedTipoSerata));
            const formatMatch = venueFormats.some((item) =>
                normalize(item).includes(normalize(selectedTipoSerata))
            );

            if (!moodMatch && !formatMatch) {
                return false;
            }
        }

        if (!isDefaultPubblico && normalize(selectedPubblico) !== normalize(venuePubblico)) {
            return false;
        }

        if (!isDefaultLocation && normalize(selectedLocation) !== normalize(venueLocation)) {
            return false;
        }

        if (!isDefaultFormats) {
            const hasAtLeastOneFormat = selectedFormats.some((selected) =>
                venueFormats.some((item) => normalize(item) === normalize(selected))
            );

            if (!hasAtLeastOneFormat) {
                return false;
            }
        }

        if (!isDefaultDays) {
            const hasAtLeastOneDay = selectedDays.some((selected) =>
                venueBestDays.some((day) => normalize(day) === normalize(selected))
            );

            if (!hasAtLeastOneDay) {
                return false;
            }
        }

        if (!isDefaultIdealFor) {
            const idealForMatch = venueIdealFor.some(
                (item) => normalize(item) === normalize(selectedIdealFor)
            );

            if (!idealForMatch) {
                return false;
            }
        }

        return true;
    });
}
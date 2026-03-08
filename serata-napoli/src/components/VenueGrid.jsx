import VenueCard from "./VenueCard";

export default function VenueGrid({ venues = [] }) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">risultati selezionati</p>
          <h2 className="text-3xl font-black text-white sm:text-4xl">Locali che sembrano fatti per te</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/60 sm:text-right sm:text-base">
          Card molto più curate, immagini grandi, badge premium e CTA più eleganti per rendere la homepage davvero wow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </section>
  );
}

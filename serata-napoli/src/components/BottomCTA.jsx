import { ArrowRight, Sparkles } from "lucide-react";

export default function BottomCTA() {
  return (
    <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/8 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(249,115,22,0.16),transparent_20%),radial-gradient(circle_at_right,rgba(168,85,247,0.14),transparent_22%)]" />
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-white/60">
            <Sparkles size={14} /> curated nightlife
          </div>
          <h3 className="mt-4 text-3xl font-black text-white sm:text-4xl">
            Vuoi anche suggerimenti personalizzati in base al tuo mood?
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
            Aggiungi onboarding, preferiti, pagina dettaglio locale e animazioni per portare il progetto a un livello molto più alto.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 to-pink-500 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-orange-500/25 transition hover:scale-[1.02]">
          Continua il redesign
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

const offers = [
  {
    title: "Urban Move Specialists",
    perk: "5% back via AWIN",
    details: "Full-pack service for 1-3 bedroom homes, insurance included",
  },
  {
    title: "Rapid Van + Driver",
    perk: "£20 referral credit",
    details: "Same-day van hire with driver and helper, ideal for studio/1 bed",
  },
  {
    title: "Storage + Move Bundle",
    perk: "First month £1",
    details: "Combine removal team with short-term storage for flexible moves",
  },
];

const steps = [
  {
    label: "Tell us about the move",
    detail: "Route, property size, access quirks",
  },
  {
    label: "Pick the winning quote",
    detail: "We surface the best 3 options with promo stacking",
  },
  {
    label: "Lock perks + reminders",
    detail: "Tracking IDs + hand-off to movers and offers",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-6xl px-6 py-16 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              movingcost.co.uk
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Găsim mutări mai ieftine, cu tot cu promoții și cash-back
            </h1>
            <p className="text-lg text-slate-300">
              Completezi detaliile în 60 de secunde, noi îți aducem 3 oferte
              verificate, plus perk-uri AWIN (cash-back, vouchere, storage
              deals). Totul transparent, gata de rezervare.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-emerald-500/30 shadow-lg transition hover:bg-emerald-300">
                Start quote flow
              </button>
              <button className="rounded-full border border-slate-400/40 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-slate-200">
                Vezi ghidul de mutare →
              </button>
            </div>
            <div className="flex flex-wrap gap-8 border-t border-slate-800 pt-6">
              <div>
                <p className="text-3xl font-semibold text-emerald-300">2.8k</p>
                <p className="text-sm text-slate-400">lead-uri procesate</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-emerald-300">£312</p>
                <p className="text-sm text-slate-400">economii medii / mutare</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-emerald-300">48h</p>
                <p className="text-sm text-slate-400">timp mediu până la ofertă</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-slate-900/80">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              quote rapid
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              3 pași până la mutarea corectă
            </h2>
            <ol className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <li key={step.label} className="flex gap-4">
                  <span className="mt-1 h-8 w-8 rounded-full border border-emerald-400/60 text-center text-sm font-semibold text-emerald-200">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{step.label}</p>
                    <p className="text-sm text-slate-400">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Ofertă AWIN live</h3>
              <p className="text-sm text-slate-400">
                Actualizăm feed-ul zilnic. Tracking IDs sunt adăugate automat
                pentru fiecare lead.
              </p>
            </div>
            <button className="w-max rounded-full border border-emerald-300/30 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-200">
              Descarcă feed CSV
            </button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {offers.map((offer) => (
              <article
                key={offer.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                  {offer.perk}
                </p>
                <h4 className="mt-2 text-lg font-semibold text-white">
                  {offer.title}
                </h4>
                <p className="mt-1 text-sm text-slate-400">{offer.details}</p>
                <button className="mt-4 text-sm font-semibold text-emerald-200">
                  Vezi detalii →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              checklists
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Ghidul complet: UK → UK, UK → EU, relocare corporate
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              De la notificarea proprietarului până la furnizori și storage,
              checklist-urile includ timeline și template-uri de email.
            </p>
            <button className="mt-5 rounded-full border border-slate-500/40 px-5 py-2 text-sm font-semibold text-slate-100">
              Descarcă PDF
            </button>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              automations
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Workflow-uri: remindere, storage alerts, cash-back tracking
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Declanșăm e-mail/SMS pentru AWIN, confirmăm mutarea cu echipa și
              actualizăm dashboard-ul MovingCost pentru follow-up.
            </p>
            <button className="mt-5 rounded-full border border-slate-500/40 px-5 py-2 text-sm font-semibold text-slate-100">
              Vezi roadmap-ul
            </button>
          </article>
        </section>
      </main>
    </div>
  );
}

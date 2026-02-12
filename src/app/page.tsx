"use client";

import { useMemo, useState } from "react";

const steps = [
  {
    label: "Tell us about the move",
    detail: "Route, property size, special access, budget ceiling",
  },
  {
    label: "We source the cheap winners",
    detail: "AnyVan + vetted man & van partners with promo stacking",
  },
  {
    label: "Lock perks & reminders",
    detail: "We attach tracking IDs, prep reminders, and hand off cleanly",
  },
];

const articles = [
  {
    title: "9 ways to shave £300 off your move",
    stat: "Avg. saving £312",
    summary:
      "From mid-week slots to DIY packing, these quick wins make a difference in London, Manchester, and Birmingham moves.",
  },
  {
    title: "Cheap man & van checklist for renters",
    stat: "Lead time: 5 days",
    summary:
      "All the emails, meter readings, overlap plans, and deposit tips in one printable sheet.",
  },
  {
    title: "How AnyVan cash-back really works",
    stat: "AnyVan only",
    summary:
      "Stack the referral credit, cashback window, and storage bundle without breaking the T&Cs.",
  },
];

const cities = [
  "London",
  "Manchester",
  "Birmingham",
  "Liverpool",
  "Leeds",
  "Glasgow",
  "Edinburgh",
  "Bristol",
  "Cardiff",
  "Nottingham",
  "Sheffield",
  "Leicester",
];

const propertyPresets: Record<string, number> = {
  "Studio": 0.8,
  "1 bed flat": 1,
  "2 bed flat": 1.35,
  "3 bed house": 1.8,
  "4+ bed house": 2.4,
};

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [route, setRoute] = useState("London → Manchester");
  const [distance, setDistance] = useState(210);
  const [property, setProperty] = useState("2 bed flat");
  const [extras, setExtras] = useState({
    packing: true,
    storage: false,
    assembly: false,
  });

  const estimatedCost = useMemo(() => {
    const base = 120;
    const perMile = 1.2;
    const propertyWeight = propertyPresets[property] ?? 1;
    const extrasFee =
      (extras.packing ? 85 : 0) + (extras.storage ? 60 : 0) + (extras.assembly ? 45 : 0);
    return Math.round(base + distance * perMile * propertyWeight + extrasFee);
  }, [distance, property, extras]);

  const containerClass =
    theme === "dark"
      ? "bg-slate-950 text-slate-100"
      : "bg-slate-50 text-slate-900";

  return (
    <div className={`min-h-screen transition-colors ${containerClass}`}>
      <main className="mx-auto max-w-6xl px-6 py-16 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">
            movingcost.co.uk
          </p>
          <button
            className="rounded-full border border-slate-400/40 px-4 py-2 text-sm font-semibold"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Switch to light" : "Switch to dark"}
          </button>
        </div>

        <section className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              We find cheaper moves, with AnyVan perks and cashback baked in
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-300">
              Drop your move details in under a minute. We line up AnyVan (the only
              AWIN advertiser we care about) plus trusted man & van crews in each UK
              city, stack every promo, and brief them for you.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-emerald-500/30 shadow-lg transition hover:bg-emerald-300">
                Start quote flow
              </button>
              <button className="rounded-full border border-slate-400/40 px-6 py-3 text-base font-semibold transition hover:border-slate-600">
                Download renter checklist →
              </button>
            </div>
            <div className="flex flex-wrap gap-8 border-t border-slate-200/60 pt-6 dark:border-slate-800">
              <div>
                <p className="text-3xl font-semibold text-emerald-400">2.8k</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">leads routed via MovingCost</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-emerald-400">£312</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">average saving per move</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-emerald-400">48h</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">median time to firm offer</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/60 bg-white/70 p-6 shadow-2xl shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Quote flow</p>
            <h2 className="mt-2 text-2xl font-semibold">3 steps to the right mover</h2>
            <ol className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <li key={step.label} className="flex gap-4">
                  <span className="mt-1 h-9 w-9 rounded-full border border-emerald-400/60 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-200">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{step.label}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Move cost calculator</p>
                <h3 className="text-2xl font-semibold">Rough numbers now, precise inputs later</h3>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                Placeholder logic – replace with your params
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                Route
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-300/70 bg-transparent px-4 py-3 text-base outline-none focus:border-emerald-400 dark:border-slate-700"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                />
              </label>
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                Distance (miles)
                <input
                  type="number"
                  min={10}
                  className="mt-2 w-full rounded-2xl border border-slate-300/70 bg-transparent px-4 py-3 text-base outline-none focus:border-emerald-400 dark:border-slate-700"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value) || 0)}
                />
              </label>
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                Property type
                <select
                  className="mt-2 w-full rounded-2xl border border-slate-300/70 bg-transparent px-4 py-3 text-base outline-none focus:border-emerald-400 dark:border-slate-700"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                >
                  {Object.keys(propertyPresets).map((preset) => (
                    <option key={preset} value={preset} className="text-slate-900">
                      {preset}
                    </option>
                  ))}
                </select>
              </label>
              <div className="space-y-2 rounded-2xl border border-slate-300/70 px-4 py-3 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">Extras</p>
                {Object.entries(extras).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2 text-sm capitalize">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() =>
                        setExtras((prev) => ({
                          ...prev,
                          [key]: !prev[key as keyof typeof extras],
                        }))
                      }
                    />
                    {key}
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-100 px-6 py-4 text-slate-800 dark:bg-slate-800 dark:text-slate-50">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Estimated cost
              </p>
              <p className="mt-2 text-4xl font-semibold">£{estimatedCost}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Based on placeholder logic. Swap the parameters with your data when ready.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200/60 bg-emerald-50/60 p-6 dark:border-emerald-500/40 dark:bg-slate-900/60">
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-500">AnyVan spotlight</p>
            <h3 className="mt-2 text-2xl font-semibold text-emerald-900 dark:text-emerald-200">
              The only AWIN advertiser we care about right now
            </h3>
            <article className="mt-6 rounded-2xl border border-emerald-200 bg-white p-4 dark:border-emerald-500/20 dark:bg-slate-950/60">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
                AnyVan – core partner
              </p>
              <h4 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                One integration, multiple perks
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>• Cashback + referral credit stacking</li>
                <li>• Storage + move bundle triggers</li>
                <li>• Automated tracking IDs for every MovingCost lead</li>
              </ul>
              <button className="mt-4 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                View AnyVan integration docs →
              </button>
            </article>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-200/70 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Cheap move intel</p>
              <h3 className="text-2xl font-semibold">Articles we’re writing first</h3>
            </div>
            <button className="rounded-full border border-slate-400/40 px-5 py-2 text-sm font-semibold">
              View all playbooks
            </button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/60"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                  {article.stat}
                </p>
                <h4 className="mt-2 text-lg font-semibold">{article.title}</h4>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {article.summary}
                </p>
                <button className="mt-4 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                  Draft outline →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-200/70 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Man & van directory</p>
              <h3 className="text-2xl font-semibold">Every UK city gets a local page</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                We’re drafting city-specific templates (SEO + lead capture) focused on “cheap man and van” searches.
              </p>
            </div>
            <button className="rounded-full border border-slate-400/40 px-5 py-2 text-sm font-semibold">
              Add another city
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {cities.map((city) => (
              <span
                key={city}
                className="rounded-full border border-slate-300/70 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                {city}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

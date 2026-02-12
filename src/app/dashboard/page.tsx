"use client";

const metrics = [
  { label: "Leads today", value: "36", delta: "+12% vs. yesterday" },
  { label: "Conversion to booking", value: "41%", delta: "Target: 38%" },
  { label: "Avg. saving", value: "£298", delta: "+£22 vs. last week" },
  { label: "Open tasks", value: "11", delta: "3 overdue" },
];

const leads = [
  {
    id: "MC-1024",
    city: "London",
    size: "2 bed flat",
    stage: "Quote sent",
    owner: "Ava",
    eta: "3h",
  },
  {
    id: "MC-1023",
    city: "Manchester",
    size: "Studio",
    stage: "Needs AnyVan call",
    owner: "Liam",
    eta: "1h",
  },
  {
    id: "MC-1022",
    city: "Birmingham",
    size: "3 bed house",
    stage: "Awaiting docs",
    owner: "Ivy",
    eta: "18h",
  },
  {
    id: "MC-1021",
    city: "Leeds",
    size: "1 bed flat",
    stage: "Archived",
    owner: "Noah",
    eta: "--",
  },
];

const tasks = [
  {
    title: "Upload renter checklist PDF",
    owner: "Ava",
    due: "Today 15:00",
  },
  {
    title: "Sync Airtable ↔ AnyVan IDs",
    owner: "DevOps",
    due: "Today 17:30",
  },
  {
    title: "Draft Liverpool man & van page",
    owner: "Content",
    due: "Tomorrow",
  },
];

const campaigns = [
  {
    name: "AnyVan cashback",
    status: "Active",
    clicks: 187,
    ctr: "3.4%",
  },
  {
    name: "Storage + move bundle",
    status: "Paused",
    clicks: 42,
    ctr: "1.1%",
  },
  {
    name: "Man & Van city drip",
    status: "Draft",
    clicks: 0,
    ctr: "--",
  },
];

export default function DashboardPage() {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              movingcost admin
            </p>
            <h1 className="text-3xl font-semibold">Operations dashboard</h1>
            <p className="text-sm text-slate-500">
              Live snapshot of leads, AnyVan promos, and automations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">
              Export CSV
            </button>
            <button className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200">
              New workflow
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-500 hover:border-slate-500"
            >
              Log out
            </button>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
              <p className="text-xs text-emerald-500">{metric.delta}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Lead pipeline</h2>
                <p className="text-sm text-slate-500">Newest submissions first</p>
              </div>
              <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">
                View all
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400">
                    <th className="pb-2 pr-4">Lead</th>
                    <th className="pb-2 pr-4">City</th>
                    <th className="pb-2 pr-4">Size</th>
                    <th className="pb-2 pr-4">Stage</th>
                    <th className="pb-2 pr-4">Owner</th>
                    <th className="pb-2">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-slate-100 text-slate-700">
                      <td className="py-3 pr-4 font-semibold text-slate-900">
                        {lead.id}
                      </td>
                      <td className="py-3 pr-4">{lead.city}</td>
                      <td className="py-3 pr-4">{lead.size}</td>
                      <td className="py-3 pr-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                          {lead.stage}
                        </span>
                      </td>
                      <td className="py-3 pr-4">{lead.owner}</td>
                      <td className="py-3">{lead.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold">Team tasks</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {tasks.map((task) => (
                  <li
                    key={task.title}
                    className="rounded-2xl border border-slate-100 px-4 py-3"
                  >
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <p className="text-slate-500">
                      Owner: {task.owner} · Due {task.due}
                    </p>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">AnyVan campaigns</h2>
                <button className="text-sm font-semibold text-emerald-600">
                  Manage →
                </button>
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {campaigns.map((campaign) => (
                  <li
                    key={campaign.name}
                    className="rounded-2xl border border-slate-100 px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{campaign.name}</p>
                        <p className="text-slate-500">
                          Clicks {campaign.clicks} · CTR {campaign.ctr}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          campaign.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : campaign.status === "Paused"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

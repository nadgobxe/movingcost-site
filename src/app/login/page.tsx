"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-emerald-500/20">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">
            movingcost admin
          </p>
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-slate-400">
            Only provisioned admin accounts can access the ops dashboard.
          </p>
        </div>
        <form action={handleSubmit} className="space-y-5">
          <label className="block text-sm font-semibold text-slate-300">
            Email
            <input
              name="email"
              type="email"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-transparent px-4 py-3 text-base outline-none focus:border-emerald-400"
              placeholder="you@movingcost.co.uk"
              required
            />
          </label>
          <label className="block text-sm font-semibold text-slate-300">
            Password
            <input
              name="password"
              type="password"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-transparent px-4 py-3 text-base outline-none focus:border-emerald-400"
              placeholder="••••••••"
              required
            />
          </label>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400">
              <input type="checkbox" className="accent-emerald-400" /> Keep me signed in
            </label>
            <button
              type="button"
              className="font-semibold text-emerald-300"
              onClick={() => setError("Reset links are managed manually for now")}
            >
              Forgot password?
            </button>
          </div>
          <button
            className="w-full rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
          {error && <p className="text-center text-sm text-rose-400">{error}</p>}
        </form>
        <div className="text-center text-sm text-slate-500">
          Need access? Ping the ops lead—self-service sign-ups are disabled.
        </div>
      </div>
    </div>
  );
}

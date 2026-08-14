import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  LogOut,
  Mail,
  MousePointerClick,
  RefreshCw,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TOKEN_KEY = "mojo_token";

function formatTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString();
}

function LoginForm({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/mojo/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      sessionStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dg-surface safe-px safe-pb">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-dg-border bg-white p-5 shadow-sm sm:p-6"
      >
        <h1 className="text-xl font-bold text-dg-text">Mojo Admin</h1>
        <p className="mt-1 text-sm text-dg-muted">Visitor analytics for discountglitch</p>

        <label className="mt-6 block text-left text-sm font-medium text-dg-text">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dg-border px-3 py-3 text-base outline-none focus:border-dg-blue focus:ring-2 focus:ring-dg-blue/20"
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <Button type="submit" size="full" className="mt-5 touch-manipulation" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-xl border border-dg-border bg-white p-3.5 shadow-sm sm:p-4">
      <div className="flex items-center gap-2 text-dg-muted">
        <Icon className={`h-4 w-4 shrink-0 ${accent}`} strokeWidth={2} />
        <span className="truncate text-[11px] font-medium uppercase tracking-wide sm:text-xs">
          {label}
        </span>
      </div>
      <p className="mt-2 text-xl font-bold tabular-nums text-dg-text sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

function VisitorCard({ v }) {
  return (
    <article className="rounded-xl border border-dg-border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-dg-text">
            {v.email || "No email yet"}
          </p>
          <p className="mt-0.5 text-xs text-dg-muted">{formatTime(v.last_seen)}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            v.cta_clicked
              ? "bg-emerald-100 text-emerald-700"
              : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {v.cta_clicked ? "Clicked" : "No click"}
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <div>
          <dt className="text-dg-muted">Age</dt>
          <dd className="font-medium text-dg-text">{v.age ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-dg-muted">Views</dt>
          <dd className="font-medium tabular-nums text-dg-text">{v.page_views}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-dg-muted">Location</dt>
          <dd className="font-medium text-dg-text">
            {v.city}, {v.region} · {v.country}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-dg-muted">IP · Device</dt>
          <dd className="font-medium text-dg-text">
            <span className="font-mono text-[11px]">{v.ip}</span>
            <span className="text-dg-muted"> · </span>
            {v.device} · {v.browser}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-dg-muted">Referrer</dt>
          <dd className="truncate font-medium text-dg-text">{v.referrer || "Direct"}</dd>
        </div>
      </dl>
    </article>
  );
}

function Dashboard({ token, onLogout }) {
  const [stats, setStats] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = useCallback(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [statsRes, visitorsRes] = await Promise.all([
        fetch("/api/mojo/stats", { headers: headers() }),
        fetch("/api/mojo/visitors", { headers: headers() }),
      ]);

      if (statsRes.status === 401 || visitorsRes.status === 401) {
        onLogout();
        return;
      }

      if (!statsRes.ok || !visitorsRes.ok) {
        throw new Error("Failed to load data");
      }

      const statsData = await statsRes.json();
      const visitorsData = await visitorsRes.json();

      setStats(statsData);
      setVisitors(visitorsData.visitors || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [headers, onLogout]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, [load]);

  const clearData = async () => {
    if (!confirm("Delete all visitor data? This cannot be undone.")) return;

    const res = await fetch("/api/mojo/visitors", {
      method: "DELETE",
      headers: headers(),
    });

    if (res.ok) load();
  };

  return (
    <div className="min-h-screen bg-dg-surface safe-pb">
      <header className="sticky top-0 z-20 border-b border-dg-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 py-3 safe-px sm:py-4">
          <div className="min-w-0">
            <h1 className="text-base font-bold text-dg-text sm:text-lg">Mojo Admin</h1>
            <p className="truncate text-xs text-dg-muted sm:text-sm">
              Visitor tracking · discountglitch.online
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={load}
              disabled={loading}
              className="touch-manipulation px-3 sm:px-5"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onLogout}
              className="touch-manipulation px-3 sm:px-5"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl py-5 safe-px sm:py-6">
        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          <StatCard
            icon={Users}
            label="Visitors"
            value={stats?.totalVisitors ?? "—"}
            accent="text-dg-blue"
          />
          <StatCard
            icon={Mail}
            label="Leads"
            value={stats?.leads ?? "—"}
            accent="text-sky-600"
          />
          <StatCard
            icon={MousePointerClick}
            label="CTA clicks"
            value={stats?.ctaClicks ?? "—"}
            accent="text-emerald-600"
          />
          <StatCard
            icon={BarChart3}
            label="Click rate"
            value={stats ? `${stats.clickRate}%` : "—"}
            accent="text-violet-600"
          />
          <StatCard
            icon={BarChart3}
            label="Page views"
            value={stats?.totalPageViews ?? "—"}
            accent="text-orange-600"
          />
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-dg-border bg-white shadow-sm sm:mt-6">
          <div className="flex items-center justify-between gap-3 border-b border-dg-border px-4 py-3">
            <h2 className="font-semibold text-dg-text">Visitor log</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearData}
              className="touch-manipulation text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear all</span>
            </Button>
          </div>

          {/* Mobile / tablet cards */}
          <div className="space-y-3 p-3 lg:hidden">
            {visitors.length === 0 ? (
              <p className="py-8 text-center text-sm text-dg-muted">
                {loading ? "Loading…" : "No visitors yet"}
              </p>
            ) : (
              visitors.map((v) => <VisitorCard key={v.id} v={v} />)
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-dg-surface text-xs uppercase tracking-wide text-dg-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Last seen</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Age</th>
                  <th className="px-4 py-3 font-semibold">IP</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Device</th>
                  <th className="px-4 py-3 font-semibold">Views</th>
                  <th className="px-4 py-3 font-semibold">Clicked CTA</th>
                  <th className="px-4 py-3 font-semibold">Referrer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dg-border">
                {visitors.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-dg-muted">
                      {loading ? "Loading…" : "No visitors yet"}
                    </td>
                  </tr>
                )}
                {visitors.map((v) => (
                  <tr key={v.id} className="hover:bg-dg-surface/60">
                    <td className="whitespace-nowrap px-4 py-3 text-dg-text">
                      {formatTime(v.last_seen)}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-dg-text">
                      {v.email || <span className="text-dg-muted">—</span>}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-dg-text">
                      {v.age ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-dg-text">
                      {v.ip}
                    </td>
                    <td className="px-4 py-3 text-dg-text">
                      {v.city}, {v.region}
                      <span className="block text-xs text-dg-muted">{v.country}</span>
                    </td>
                    <td className="px-4 py-3 text-dg-text">
                      {v.device}
                      <span className="block text-xs text-dg-muted">
                        {v.browser} · {v.os}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-dg-text">{v.page_views}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          v.cta_clicked
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        {v.cta_clicked ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3 text-xs text-dg-muted">
                      {v.referrer || "Direct"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Mojo() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    navigate("/mojo");
  };

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}

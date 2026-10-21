import { useCallback, useEffect, useState } from "react";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  ArrowRight,
  MapPin,
  RefreshCw,
  AlertTriangle,
  Inbox,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../../services/adminServices";

/* -------------------------------------------------------------------------- */
/*  Status styling                                                            */
/* -------------------------------------------------------------------------- */

const STATUS = {
  Delivered: {
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
    tile: "bg-emerald-50 text-emerald-600",
  },
  "In Transit": {
    pill: "bg-sky-50 text-sky-700 ring-sky-600/20",
    dot: "bg-sky-500",
    bar: "bg-sky-500",
    tile: "bg-sky-50 text-sky-600",
  },
  Pending: {
    pill: "bg-amber-50 text-amber-800 ring-amber-600/20",
    dot: "bg-amber-500",
    bar: "bg-amber-400",
    tile: "bg-amber-50 text-amber-600",
  },
  default: {
    pill: "bg-slate-50 text-slate-600 ring-slate-500/20",
    dot: "bg-slate-400",
    bar: "bg-slate-400",
    tile: "bg-slate-100 text-slate-600",
  },
};

const getStatus = (status) => STATUS[status] || STATUS.default;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

/**
 * Converts raw counts into whole-number percentages that always add up to
 * 100 (largest-remainder method), so the labels never read 99% or 101%.
 */
const toPercentages = (values) => {
  const total = values.reduce((sum, v) => sum + v, 0);
  if (total === 0) return values.map(() => 0);

  const raw = values.map((v) => (v / total) * 100);
  const floored = raw.map(Math.floor);
  let remainder = 100 - floored.reduce((sum, v) => sum + v, 0);

  raw
    .map((value, index) => ({ index, diff: value - Math.floor(value) }))
    .sort((a, b) => b.diff - a.diff)
    .forEach(({ index }) => {
      if (remainder > 0) {
        floored[index] += 1;
        remainder -= 1;
      }
    });

  return floored;
};

const normalizeShipment = (shipment) => ({
  id: shipment._id || shipment.id || shipment.trackingNumber,
  trackingNumber: shipment.trackingNumber || "N/A",
  customer: shipment.customer?.name || shipment.customerName || "Unknown",
  destination: shipment.receiver?.city || shipment.destination || "N/A",
  status: shipment.status === "Booked" ? "Pending" : shipment.status,
  date: formatDate(shipment.createdAt),
});

const TH = "px-6 py-3 text-xs font-medium text-slate-500";

/* -------------------------------------------------------------------------- */
/*  Loading + error states                                                    */
/* -------------------------------------------------------------------------- */

const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-md bg-slate-200/70 motion-reduce:animate-none ${className}`}
  />
);

const DashboardSkeleton = () => (
  <div
    className="space-y-6"
    role="status"
    aria-live="polite"
    aria-label="Loading dashboard"
  >
    <div className="space-y-2">
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-4 w-64" />
    </div>

    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 bg-white p-6">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
      <div className="space-y-3 border-t border-slate-200 px-6 py-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-2.5 w-full rounded-full" />
      </div>
    </div>

    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
    <span className="sr-only">Loading dashboard…</span>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div
      role="alert"
      className="max-w-sm rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm"
    >
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertTriangle size={20} />
      </div>
      <h2 className="mt-4 text-base font-semibold text-slate-900">
        Dashboard failed to load
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        We couldn’t reach the server. Check your connection and try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchDashboard = useCallback(async ({ silent = false } = {}) => {
    silent ? setRefreshing(true) : setLoading(true);
    setError(false);

    try {
      const response = await getAdminDashboard();
      setDashboard(response.data);
    } catch (err) {
      console.error("Failed to fetch admin dashboard:", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading) return <DashboardSkeleton />;
  if (error && !dashboard) return <ErrorState onRetry={() => fetchDashboard()} />;

  /* ----------------------------- Derived data ----------------------------- */

  const total = Number(dashboard?.totalShipments) || 0;
  const pending = Number(dashboard?.pendingShipments) || 0;
  const inTransit = Number(dashboard?.inTransitShipments) || 0;
  const delivered = Number(dashboard?.deliveredShipments) || 0;

  const stats = [
    { title: "Total shipments", value: total, icon: Package, tone: "default" },
    { title: "Pending", value: pending, icon: Clock, tone: "Pending" },
    { title: "In transit", value: inTransit, icon: Truck, tone: "In Transit" },
    { title: "Delivered", value: delivered, icon: CheckCircle, tone: "Delivered" },
  ];

  const breakdownBase = stats.slice(1);
  const shares = toPercentages(breakdownBase.map((s) => s.value));
  const breakdown = breakdownBase.map((s, i) => ({ ...s, share: shares[i] }));
  const visibleSegments = breakdown.filter((b) => b.value > 0);

  const recentShipments = (dashboard?.recentShipments || []).map(
    normalizeShipment
  );

  /* -------------------------------- Render -------------------------------- */

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of your courier operations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchDashboard({ silent: true })}
          disabled={refreshing}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin motion-reduce:animate-none" : ""}
          />
          {refreshing ? "Refreshing" : "Refresh"}
        </button>
      </header>

      {/* Inline error when a refresh fails but old data is still shown */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertTriangle size={16} className="shrink-0" />
          Couldn’t refresh the data. Showing the last loaded results.
        </div>
      )}

      {/* Overview */}
      <section
        aria-label="Shipment overview"
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <dl className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isTotal = stat.tone === "default";
            const tone = getStatus(stat.tone);
            const share = isTotal
              ? null
              : breakdown.find((b) => b.title === stat.title)?.share ?? 0;

            return (
              <div key={stat.title} className="bg-white p-6">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isTotal ? "bg-slate-900 text-white" : tone.tile
                    }`}
                  >
                    <Icon size={20} strokeWidth={2} aria-hidden="true" />
                  </div>

                  {!isTotal && (
                    <span className="text-xs font-medium tabular-nums text-slate-500">
                      {share}% of total
                    </span>
                  )}
                </div>

                <dd className="mt-5 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                  {formatNumber(stat.value)}
                </dd>
                <dt className="mt-1 text-sm text-slate-500">{stat.title}</dt>
              </div>
            );
          })}
        </dl>

        {/* Status split */}
        <div className="border-t border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-900">Status split</h2>
            <p className="text-xs text-slate-500">
              {formatNumber(total)} {total === 1 ? "shipment" : "shipments"}
            </p>
          </div>

          <div
            className="mt-3 flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full bg-slate-100"
            role="img"
            aria-label={
              total > 0
                ? breakdown.map((b) => `${b.title} ${b.share}%`).join(", ")
                : "No shipments yet"
            }
          >
            {visibleSegments.map((b) => (
              <div
                key={b.title}
                className={`${getStatus(b.tone).bar} first:rounded-l-full last:rounded-r-full`}
                style={{ width: `${(b.value / total) * 100}%` }}
              />
            ))}
          </div>

          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
            {breakdown.map((b) => (
              <li
                key={b.title}
                className="flex items-center gap-2 text-xs text-slate-600"
              >
                <span
                  className={`h-2 w-2 rounded-full ${getStatus(b.tone).dot}`}
                  aria-hidden="true"
                />
                {b.title}
                <span className="font-medium tabular-nums text-slate-900">
                  {b.share}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent shipments */}
      <section
        aria-label="Recent shipments"
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Recent shipments
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Latest shipment activity.
            </p>
          </div>

          <Link
            to="/admin/shipments"
            className="group inline-flex w-fit items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            View all
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <caption className="sr-only">Most recent shipments</caption>

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th scope="col" className={TH}>Tracking number</th>
                <th scope="col" className={TH}>Customer</th>
                <th scope="col" className={TH}>Destination</th>
                <th scope="col" className={TH}>Status</th>
                <th scope="col" className={`${TH} text-right`}>Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentShipments.length > 0 ? (
                recentShipments.map((shipment, index) => {
                  const tone = getStatus(shipment.status);

                  return (
                    <tr
                      key={shipment.id || index}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4 text-sm font-medium tabular-nums text-slate-900">
                        {shipment.trackingNumber}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600"
                          >
                            {getInitials(shipment.customer)}
                          </span>
                          <span className="text-sm text-slate-700">
                            {shipment.customer}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin
                            size={14}
                            aria-hidden="true"
                            className="text-slate-400"
                          />
                          {shipment.destination}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${tone.pill}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-full ${tone.dot}`}
                          />
                          {shipment.status || "Unknown"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right text-sm tabular-nums text-slate-500">
                        {shipment.date}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <Inbox size={20} aria-hidden="true" />
                      </div>
                      <p className="mt-3 text-sm font-medium text-slate-900">
                        No shipments yet
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        New shipments will appear here as they’re booked.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-3">
          <p className="text-xs text-slate-500">
            Showing {formatNumber(recentShipments.length)} of{" "}
            {formatNumber(total)} shipments
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
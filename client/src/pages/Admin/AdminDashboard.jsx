import { useEffect, useState } from "react";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../../services/adminServices";

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
    pill: "bg-amber-50 text-amber-700 ring-amber-600/20",
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

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getAdminDashboard();

        console.log("ADMIN DASHBOARD:", response);

        setDashboard(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch admin dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // Dashboard counts from backend
  const totalShipments = dashboard?.totalShipments || 0;

  const pendingShipments =
    dashboard?.pendingShipments || 0;

  const inTransitShipments =
    dashboard?.inTransitShipments || 0;

  const deliveredShipments =
    dashboard?.deliveredShipments || 0;

  const stats = [
    {
      title: "Total shipments",
      value: totalShipments,
      icon: Package,
      tone: "default",
    },
    {
      title: "Pending",
      value: pendingShipments,
      icon: Clock,
      tone: "Pending",
    },
    {
      title: "In transit",
      value: inTransitShipments,
      icon: Truck,
      tone: "In Transit",
    },
    {
      title: "Delivered",
      value: deliveredShipments,
      icon: CheckCircle,
      tone: "Delivered",
    },
  ];

  const total = stats[0].value;

  const breakdown = stats.slice(1).map((s) => ({
    ...s,
    share:
      total > 0
        ? (s.value / total) * 100
        : 0,
  }));

  /*
   * Recent shipments from backend
   *
   * Backend should return:
   * dashboard.recentShipments
   */

  const recentShipments = (
    dashboard?.recentShipments || []
  ).map((shipment) => ({
    trackingNumber:
      shipment.trackingNumber || "N/A",

    customer:
      shipment.customer?.name ||
      shipment.customerName ||
      "Unknown",

    destination:
      shipment.receiver?.city ||
      shipment.destination ||
      "N/A",

    status:
      shipment.status === "Booked"
        ? "Pending"
        : shipment.status,

    date: shipment.createdAt
      ? new Date(
          shipment.createdAt
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A",
  }));

  const th =
    "px-6 py-3 text-xs font-medium text-slate-500";

  return (
    <div className="space-y-6">

      {/* Page heading */}
      <header>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your courier operations.
        </p>
      </header>

      {/* Overview */}
      <section
        aria-label="Shipment overview"
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            const tone = getStatus(
              stat.tone
            );

            const share =
              total > 0
                ? Math.round(
                    (stat.value / total) * 100
                  )
                : 0;

            return (
              <div
                key={stat.title}
                className="bg-white p-6"
              >
                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      stat.tone === "default"
                        ? "bg-slate-900 text-white"
                        : tone.tile
                    }`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={2}
                    />
                  </div>

                  {stat.tone !== "default" && (
                    <span className="text-xs font-medium tabular-nums text-slate-500">
                      {share}% of total
                    </span>
                  )}

                </div>

                <p className="mt-5 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                  {stat.value.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {stat.title}
                </p>
              </div>
            );
          })}

        </div>

        {/* Status split */}
        <div className="border-t border-slate-200 px-6 py-5">

          <div className="flex items-center justify-between">

            <h3 className="text-sm font-medium text-slate-900">
              Status split
            </h3>

            <p className="text-xs text-slate-500">
              {total.toLocaleString("en-IN")} shipments
            </p>

          </div>

          <div
            className="mt-3 flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full bg-slate-100"
            role="img"
            aria-label={breakdown
              .map(
                (b) =>
                  `${b.title} ${Math.round(
                    b.share
                  )}%`
              )
              .join(", ")}
          >
            {breakdown.map((b) => (
              <div
                key={b.title}
                className={`${getStatus(
                  b.tone
                ).bar} first:rounded-l-full last:rounded-r-full`}
                style={{
                  width: `${b.share}%`,
                }}
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
                  className={`h-2 w-2 rounded-full ${
                    getStatus(b.tone).dot
                  }`}
                />

                {b.title}

                <span className="font-medium tabular-nums text-slate-900">
                  {Math.round(b.share)}%
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

            <h3 className="text-base font-semibold text-slate-900">
              Recent shipments
            </h3>

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
              className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[720px] text-left">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50/70">

                <th
                  scope="col"
                  className={th}
                >
                  Tracking number
                </th>

                <th
                  scope="col"
                  className={th}
                >
                  Customer
                </th>

                <th
                  scope="col"
                  className={th}
                >
                  Destination
                </th>

                <th
                  scope="col"
                  className={th}
                >
                  Status
                </th>

                <th
                  scope="col"
                  className={`${th} text-right`}
                >
                  Date
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {recentShipments.length > 0 ? (
                recentShipments.map(
                  (shipment) => {

                    const tone = getStatus(
                      shipment.status
                    );

                    return (
                      <tr
                        key={
                          shipment.trackingNumber
                        }
                        className="transition-colors hover:bg-slate-50/70"
                      >

                        <td className="px-6 py-4 text-sm font-medium tabular-nums text-slate-900">
                          {shipment.trackingNumber}
                        </td>

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                              {getInitials(
                                shipment.customer
                              )}
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
                              className="text-slate-400"
                            />

                            {
                              shipment.destination
                            }

                          </span>

                        </td>

                        <td className="px-6 py-4">

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${tone.pill}`}
                          >

                            <span
                              className={`h-1.5 w-1.5 rounded-full ${tone.dot}`}
                            />

                            {shipment.status}

                          </span>

                        </td>

                        <td className="px-6 py-4 text-right text-sm tabular-nums text-slate-500">
                          {shipment.date}
                        </td>

                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No recent shipments found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-3">

          <p className="text-xs text-slate-500">
            Showing{" "}
            {recentShipments.length} of{" "}
            {total.toLocaleString("en-IN")}{" "}
            shipments
          </p>

        </div>

      </section>

    </div>
  );
};

export default AdminDashboard;
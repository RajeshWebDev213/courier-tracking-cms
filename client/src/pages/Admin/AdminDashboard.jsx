import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Shipments",
      value: "1,248",
      icon: Package,
    },
    {
      title: "Pending",
      value: "86",
      icon: Clock,
    },
    {
      title: "In Transit",
      value: "324",
      icon: Truck,
    },
    {
      title: "Delivered",
      value: "838",
      icon: CheckCircle,
    },
  ];

  const recentShipments = [
    {
      trackingNumber: "CR102458",
      customer: "Rahul Kumar",
      destination: "Hyderabad",
      status: "Delivered",
      date: "05 Oct 2026",
    },
    {
      trackingNumber: "CR102459",
      customer: "Priya Sharma",
      destination: "Bangalore",
      status: "In Transit",
      date: "05 Oct 2026",
    },
    {
      trackingNumber: "CR102460",
      customer: "Arjun Reddy",
      destination: "Chennai",
      status: "Pending",
      date: "04 Oct 2026",
    },
    {
      trackingNumber: "CR102461",
      customer: "Sneha Patel",
      destination: "Mumbai",
      status: "Delivered",
      date: "04 Oct 2026",
    },
    {
      trackingNumber: "CR102462",
      customer: "Vikram Singh",
      destination: "Delhi",
      status: "In Transit",
      date: "03 Oct 2026",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-600";

      case "In Transit":
        return "bg-blue-50 text-blue-600";

      case "Pending":
        return "bg-yellow-50 text-yellow-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your courier operations.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-[5px] border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                </div>

                <div className="rounded-[5px] bg-gray-100 p-3 text-gray-700">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Shipments */}
      <div className="rounded-[5px] border border-gray-200 bg-white">

        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Shipments
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Latest shipment activity.
            </p>
          </div>

          <Link
            to="/admin/shipments"
            className="inline-flex w-fit items-center gap-2 rounded-[5px] bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">

            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Tracking Number
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Destination
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {recentShipments.map((shipment) => (
                <tr
                  key={shipment.trackingNumber}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    {shipment.trackingNumber}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {shipment.customer}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {shipment.destination}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        shipment.status
                      )}`}
                    >
                      {shipment.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {shipment.date}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
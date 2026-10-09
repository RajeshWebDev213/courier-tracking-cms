import { Link } from "react-router-dom";
import {
  Search,
  Package,
  Eye,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useShipments from "../../hooks/useShipments";

const Shipment = () => {
  const { isAuthenticated } = useAuth();

  const {
    shipments,
    loading,
    error,
  } = useShipments();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ==============================
  // Filter Shipments
  // ==============================

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = shipment.trackingNumber
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      shipment.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // ==============================
  // Guest User
  // ==============================

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
          <div className="w-full max-w-md text-center">

            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
              <Package size={28} className="text-black" />
            </div>

            {/* Content */}
            <p className="mt-6 text-sm uppercase tracking-widest text-gray-500">
              Shipments
            </p>

            <h1 className="mt-2 text-3xl font-bold text-black">
              Create a Shipment
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Want to create a shipment? Please login to your account first
              to create and manage your shipments.
            </p>

            {/* Actions */}
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 rounded-[5px] bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Login
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/"
                className="rounded-[5px] border border-gray-300 px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
              >
                Go Home
              </Link>

            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading shipments...
          </p>
        </div>
      </main>
    );
  }

  // ==============================
  // Logged-in User
  // ==============================

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Shipments
            </p>

            <h1 className="mt-2 text-3xl font-bold text-black">
              My Shipments
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              View and manage all your shipments.
            </p>
          </div>

          <Link
            to="/create-shipment"
            className="w-fit rounded-[5px] bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Create Shipment
          </Link>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Search & Filter */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by tracking number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-[5px] border border-gray-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-black"
            />

          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-[5px] border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
          >
            <option value="">All Status</option>
            <option value="Booked">Booked</option>
            <option value="Picked Up">Picked Up</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">
              Out for Delivery
            </option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>

        {/* No Shipments */}
        {!error && filteredShipments.length === 0 && (
          <div className="mt-10 rounded-[5px] border border-gray-200 px-6 py-16 text-center">
            <Package
              size={40}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 text-lg font-semibold text-black">
              No shipments found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {shipments.length === 0
                ? "You haven't created any shipments yet."
                : "No shipments match your search or filter."}
            </p>

            {shipments.length === 0 && (
              <Link
                to="/create-shipment"
                className="mt-5 inline-block rounded-[5px] bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Create Shipment
              </Link>
            )}
          </div>
        )}

        {/* ==============================
            Desktop Table
        ============================== */}

        {filteredShipments.length > 0 && (
          <div className="mt-6 hidden overflow-hidden rounded-[5px] border border-gray-200 md:block">

            <table className="w-full text-left">

              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>

                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Tracking Number
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Receiver
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Destination
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Date
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredShipments.map((shipment) => (
                  <tr
                    key={shipment._id || shipment.trackingNumber}
                    className="border-b border-gray-100 last:border-0"
                  >

                    {/* Tracking Number */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">

                        <Package size={17} />

                        <span className="font-medium text-black">
                          {shipment.trackingNumber}
                        </span>

                      </div>
                    </td>

                    {/* Receiver */}
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {shipment.receiver?.name || "-"}
                    </td>

                    {/* Destination */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={15} />

                        <span>
                          {shipment.receiver?.city || "-"}
                          {shipment.receiver?.state
                            ? `, ${shipment.receiver.state}`
                            : ""}
                        </span>
                      </div>

                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {shipment.createdAt
                        ? new Date(
                            shipment.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <span className="rounded-[5px] border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-black">
                        {shipment.status || "Booked"}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <Link
                          to={`/shipments/${shipment.trackingNumber}`}
                          className="flex items-center gap-1.5 text-sm font-medium text-black hover:underline"
                        >
                          <Eye size={16} />
                          View
                        </Link>

                        <Link
                          to={`/track-parcel?tracking=${shipment.trackingNumber}`}
                          className="rounded-[5px] bg-black px-3 py-2 text-xs font-medium text-white hover:bg-gray-800"
                        >
                          Track
                        </Link>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* ==============================
            Mobile Cards
        ============================== */}

        {filteredShipments.length > 0 && (
          <div className="mt-6 space-y-4 md:hidden">

            {filteredShipments.map((shipment) => (
              <div
                key={shipment._id || shipment.trackingNumber}
                className="rounded-[5px] border border-gray-200 p-5"
              >

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">

                  <div>
                    <p className="text-xs text-gray-500">
                      Tracking Number
                    </p>

                    <h3 className="mt-1 font-semibold text-black">
                      {shipment.trackingNumber}
                    </h3>
                  </div>

                  <span className="rounded-[5px] border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-black">
                    {shipment.status || "Booked"}
                  </span>

                </div>

                {/* Shipment Details */}
                <div className="mt-5 space-y-3 text-sm">

                  {/* Receiver */}
                  <p className="text-gray-600">
                    <span className="font-medium text-black">
                      Receiver:
                    </span>{" "}
                    {shipment.receiver?.name || "-"}
                  </p>

                  {/* Destination */}
                  <p className="text-gray-600">
                    <span className="font-medium text-black">
                      Destination:
                    </span>{" "}
                    {shipment.receiver?.city || "-"}
                    {shipment.receiver?.state
                      ? `, ${shipment.receiver.state}`
                      : ""}
                  </p>

                  {/* Date */}
                  <p className="text-gray-600">
                    <span className="font-medium text-black">
                      Date:
                    </span>{" "}
                    {shipment.createdAt
                      ? new Date(
                          shipment.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </p>

                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">

                  <Link
                    to={`/shipments/${shipment.trackingNumber}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-[5px] border border-gray-300 px-4 py-2.5 text-sm font-medium text-black"
                  >
                    <Eye size={16} />
                    View
                  </Link>

                  <Link
                    to={`/track-parcel?tracking=${shipment.trackingNumber}`}
                    className="flex flex-1 items-center justify-center rounded-[5px] bg-black px-4 py-2.5 text-sm font-medium text-white"
                  >
                    Track
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
};

export default Shipment;
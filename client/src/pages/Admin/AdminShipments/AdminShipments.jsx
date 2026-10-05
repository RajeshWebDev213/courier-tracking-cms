import { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminShipments = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [deleteShipment, setDeleteShipment] = useState(null);

  const [shipments, setShipments] = useState([
    {
      id: 1,
      trackingNumber: "CR102458",
      customer: "Rahul Kumar",
      origin: "Hyderabad",
      destination: "Mumbai",
      status: "Delivered",
      date: "05 Oct 2026",
    },
    {
      id: 2,
      trackingNumber: "CR102459",
      customer: "Priya Sharma",
      origin: "Bangalore",
      destination: "Delhi",
      status: "In Transit",
      date: "05 Oct 2026",
    },
    {
      id: 3,
      trackingNumber: "CR102460",
      customer: "Arjun Reddy",
      origin: "Chennai",
      destination: "Hyderabad",
      status: "Pending",
      date: "04 Oct 2026",
    },
    {
      id: 4,
      trackingNumber: "CR102461",
      customer: "Sneha Patel",
      origin: "Mumbai",
      destination: "Pune",
      status: "Delivered",
      date: "04 Oct 2026",
    },
    {
      id: 5,
      trackingNumber: "CR102462",
      customer: "Vikram Singh",
      origin: "Delhi",
      destination: "Bangalore",
      status: "In Transit",
      date: "03 Oct 2026",
    },
  ]);

  // Status Colors
  const getStatusStyle = (shipmentStatus) => {
    switch (shipmentStatus) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "In Transit":
        return "bg-blue-100 text-blue-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Search and Status Filter
  const filteredShipments = shipments.filter((shipment) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      shipment.trackingNumber
        .toLowerCase()
        .includes(searchValue) ||
      shipment.customer
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      status === "All" || shipment.status === status;

    return matchesSearch && matchesStatus;
  });

  // Delete Shipment
  const handleDelete = () => {
    if (!deleteShipment) return;

    setShipments((currentShipments) =>
      currentShipments.filter(
        (shipment) => shipment.id !== deleteShipment.id
      )
    );

    setDeleteShipment(null);
  };

  return (
    <div className="space-y-6 bg-white">

      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-black">
          Shipments
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage and track all shipments.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-[5px] border border-gray-200 bg-white p-4 sm:flex-row">

        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search tracking number or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[5px] border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-black"
          />
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-[5px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none transition focus:border-black sm:w-auto"
        >
          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Transit">
            In Transit
          </option>

          <option value="Delivered">
            Delivered
          </option>
        </select>
      </div>

      {/* Shipments Table */}
      <div className="overflow-hidden rounded-[5px] border border-gray-200 bg-white">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">

            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Tracking Number
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Route
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>

              </tr>
            </thead>

            {/* Table Body */}
            <tbody>

              {filteredShipments.length > 0 ? (
                filteredShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >

                    {/* Tracking Number */}
                    <td className="px-6 py-4 text-sm font-semibold text-black">
                      {shipment.trackingNumber}
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {shipment.customer}
                    </td>

                    {/* Route */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span>
                        {shipment.origin}
                      </span>

                      <span className="mx-2 text-gray-400">
                        →
                      </span>

                      <span>
                        {shipment.destination}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-[5px] px-3 py-1 text-xs font-medium ${getStatusStyle(
                          shipment.status
                        )}`}
                      >
                        {shipment.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {shipment.date}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">

                        {/* View */}
                        <Link
                          to={`/admin/shipments/${shipment.id}`}
                          className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                          title="View"
                        >
                          <Eye size={17} />
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/admin/shipments/${shipment.id}/edit`}
                          className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                          title="Edit"
                        >
                          <Edit size={17} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            setDeleteShipment(shipment)
                          }
                          className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (

                /* No Results */
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No shipments found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>
        </div>

      </div>

      {/* Result Count */}
      <p className="text-sm text-gray-500">
        Showing {filteredShipments.length} of{" "}
        {shipments.length} shipments
      </p>

      {/* Delete Confirmation Modal */}
      {deleteShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-sm rounded-[5px] bg-white p-5 shadow-xl sm:p-6">

            {/* Modal Header */}
            <div className="flex items-start justify-between">

              <div>
                <h3 className="text-lg font-semibold text-black">
                  Delete Shipment?
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Are you sure you want to delete this shipment?
                </p>
              </div>

              <button
                onClick={() => setDeleteShipment(null)}
                className="rounded-[5px] p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
                aria-label="Close"
              >
                <X size={20} />
              </button>

            </div>

            {/* Shipment Information */}
            <div className="mt-5 rounded-[5px] bg-gray-50 p-4">

              <p className="text-sm font-semibold text-black">
                {deleteShipment.trackingNumber}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {deleteShipment.customer}
              </p>

            </div>

            {/* Modal Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              {/* Cancel */}
              <button
                onClick={() => setDeleteShipment(null)}
                className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto"
              >
                Cancel
              </button>

              {/* Delete */}
              <button
                onClick={handleDelete}
                className="w-full rounded-[5px] bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminShipments;
import { useEffect, useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getAllShipments,
  deleteShipment as deleteShipmentApi,
} from "../../../services/ShipmentServices";

const AdminShipments = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");


  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all shipments
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllShipments();

        console.log("SHIPMENTS RESPONSE:", response);

        /*
          Handles common backend response formats:

          {
            success: true,
            shipments: [...]
          }

          OR

          {
            success: true,
            data: [...]
          }
        */

        const shipmentData =
          response?.shipments ||
          response?.data ||
          [];

        setShipments(
          Array.isArray(shipmentData) ? shipmentData : []
        );
      } catch (error) {
        console.error("Failed to fetch shipments:", error);

        setError(
          error?.response?.data?.message ||
            "Failed to fetch shipments"
        );

        setShipments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

  // Convert backend status to UI status
  const getDisplayStatus = (shipmentStatus) => {
    if (shipmentStatus === "Booked") {
      return "Pending";
    }

    return shipmentStatus || "Unknown";
  };

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

  // Format Date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Prepare shipments for UI
  const formattedShipments = shipments.map((shipment) => ({
    ...shipment,

    id: shipment._id || shipment.id,

    trackingNumber:
      shipment.trackingNumber || "N/A",

    customer:
      shipment.customer?.name ||
      shipment.customerName ||
      "Unknown",

    origin:
      shipment.sender?.city ||
      shipment.origin ||
      "N/A",

    destination:
      shipment.receiver?.city ||
      shipment.destination ||
      "N/A",

    status: getDisplayStatus(shipment.status),

    date: formatDate(
      shipment.createdAt || shipment.date
    ),
  }));

  // Search and Status Filter
  const filteredShipments = formattedShipments.filter(
    (shipment) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        shipment.trackingNumber
          .toLowerCase()
          .includes(searchValue) ||
        shipment.customer
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "All" ||
        shipment.status === status;

      return matchesSearch && matchesStatus;
    }
  );



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
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-[5px] border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-black"
          />
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
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

      {/* Error Message */}
      {error && (
        <div className="rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

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

              {/* Loading */}
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    Loading shipments...
                  </td>
                </tr>
              ) : filteredShipments.length > 0 ? (

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
     

    </div>
  );
};

export default AdminShipments;
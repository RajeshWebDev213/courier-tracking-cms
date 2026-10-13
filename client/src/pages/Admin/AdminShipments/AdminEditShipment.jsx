import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import { updateShipment ,getShipmentById } from "../../../services/ShipmentServices";
import { updateTracking } from "../../../services/TrackingServices";

const AdminEditShipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const statusFlow = [
    "Booked",
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];

  // Fetch shipment
useEffect(() => {
  const fetchShipment = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getShipmentById(id);

      console.log("SHIPMENT RESPONSE:", response);

      const shipmentData = response?.shipment;

      if (!shipmentData) {
        setError("Shipment not found.");
        return;
      }

      setShipment(shipmentData);
      setStatus(shipmentData.status || "Booked");
    } catch (error) {
      console.error("FETCH SHIPMENT ERROR:", error);
      console.error("ERROR RESPONSE:", error.response?.data);

      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch shipment."
      );
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchShipment();
  }
}, [id]);

  // Current status position
  const currentStatusIndex =
    statusFlow.indexOf(
      shipment?.status
    );

  // Only future statuses
  const nextStatuses =
    currentStatusIndex >= 0
      ? statusFlow.slice(
          currentStatusIndex + 1
        )
      : statusFlow;

  // Update status
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setUpdating(true);
    setError("");

    console.log("UPDATE BUTTON CLICKED");
    console.log("Shipment ID:", id);
    console.log("Current DB Status:", shipment.status);
    console.log("Selected Status:", status);

    const response = await updateShipment(id, {
      status: status,
    });

    console.log("UPDATE RESPONSE:", response);

    navigate(`/admin/shipments/${id}`);
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    console.error("SERVER RESPONSE:", error.response?.data);

    setError(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to update shipment status."
    );
  } finally {
    setUpdating(false);
  }
};

  // Loading
  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 bg-white">
        <div className="flex items-center gap-3">

          <Link
            to={`/admin/shipments/${id}`}
            className="rounded-[5px] border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-black"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h2 className="text-2xl font-bold text-black">
              Update Shipment Status
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the current status of this shipment.
            </p>
          </div>

        </div>

        <div className="rounded-[5px] border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">
            Loading shipment...
          </p>
        </div>
      </div>
    );
  }

  // Shipment not found
  if (!shipment) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 bg-white">

        <div className="flex items-center gap-3">

          <Link
            to="/admin/shipments"
            className="rounded-[5px] border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-black"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h2 className="text-2xl font-bold text-black">
              Update Shipment Status
            </h2>

            <p className="mt-1 text-sm text-red-500">
              {error || "Shipment not found."}
            </p>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-white">

      {/* Header */}
      <div className="flex items-center gap-3">

        <Link
          to={`/admin/shipments/${id}`}
          className="rounded-[5px] border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-black"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h2 className="text-2xl font-bold text-black">
            Update Shipment Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the current status of this shipment.
          </p>
        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="rounded-[5px] border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Shipment Details */}
      <div className="rounded-[5px] border border-gray-200 bg-white">

        <div className="border-b border-gray-200 p-6">

          <h3 className="text-lg font-semibold text-black">
            Shipment Information
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Shipment details cannot be changed by the admin.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">

          {/* Tracking Number */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Tracking Number
            </p>

            <p className="mt-1 text-sm font-semibold text-black">
              {shipment.trackingNumber || "N/A"}
            </p>
          </div>

          {/* Customer */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Customer
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.customer?.name ||
                shipment.customerName ||
                "N/A"}
            </p>
          </div>

          {/* Origin */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Origin
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.sender?.city ||
                shipment.origin ||
                "N/A"}
            </p>
          </div>

          {/* Destination */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Destination
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.receiver?.city ||
                shipment.destination ||
                "N/A"}
            </p>
          </div>

          {/* Package Type */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Package Type
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.packageType || "N/A"}
            </p>
          </div>

          {/* Weight */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Weight
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.weight
                ? `${shipment.weight} kg`
                : "N/A"}
            </p>
          </div>

        </div>

      </div>

      {/* Status Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-[5px] border border-gray-200 bg-white"
      >

        <div className="p-6">

          <h3 className="text-lg font-semibold text-black">
            Shipment Status
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Select the current status of the shipment.
          </p>

          <div className="mt-5">

            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Current Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              disabled={
                shipment.status === "Delivered" ||
                shipment.status === "Cancelled"
              }
              className="mt-2 w-full rounded-[5px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-gray-50"
            >

              {/* Current status */}
              <option value={shipment.status}>
                {shipment.status}
              </option>

              {/* Next statuses only */}
              {nextStatuses.map(
                (nextStatus) => (
                  <option
                    key={nextStatus}
                    value={nextStatus}
                  >
                    {nextStatus}
                  </option>
                )
              )}

              {/* Cancel */}
              {shipment.status !== "Delivered" &&
                shipment.status !== "Cancelled" && (
                  <option value="Cancelled">
                    Cancelled
                  </option>
                )}

            </select>

          </div>

          {/* Status Preview */}
          <div className="mt-5">

            <p className="text-xs font-medium uppercase text-gray-400">
              Selected Status
            </p>

            <span
              className={`mt-2 inline-flex rounded-[5px] px-3 py-1 text-xs font-medium ${
                status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : status === "In Transit"
                  ? "bg-blue-100 text-blue-700"
                  : status === "Out for Delivery"
                  ? "bg-purple-100 text-purple-700"
                  : status === "Picked Up"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {status}
            </span>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 p-6 sm:flex-row sm:justify-end">

          <Link
            to={`/admin/shipments/${id}`}
            className="w-full rounded-[5px] border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-black sm:w-auto"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={
              updating ||
              status === shipment.status ||
              shipment.status === "Delivered" ||
              shipment.status === "Cancelled"
            }
            className="w-full rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {updating
              ? "Updating..."
              : "Update Status"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AdminEditShipment;
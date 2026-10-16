import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  updateShipment,
  getShipmentById,
} from "../../../services/ShipmentServices";

const AdminEditShipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [shipment, setShipment] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Payment confirmation popup
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const statusFlow = [
    "Booked",
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];

  // =====================================================
  // FETCH SHIPMENT
  // =====================================================

  useEffect(() => {
 const fetchShipment = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await getShipmentById(id);

    console.log("Admin Edit Shipment Response:", response);

    const shipmentData =
      response?.shipment ||
      response?.data?.shipment;

    if (!shipmentData) {
      setError("Shipment not found.");
      return;
    }

    setShipment(shipmentData);
    setStatus(shipmentData.status || "Booked");
  } catch (error) {
    console.error("Admin edit shipment error:", error);

    setError(
      error.response?.data?.message ||
        "Failed to fetch shipment details."
    );
  } finally {
    setLoading(false);
  }
};

    if (id) {
      fetchShipment();
    }
  }, [id]);

  // =====================================================
  // CURRENT STATUS POSITION
  // =====================================================

  const currentStatusIndex = statusFlow.indexOf(shipment?.status);

  // =====================================================
  // ONLY FUTURE STATUSES
  // =====================================================

  const nextStatuses =
    currentStatusIndex >= 0
      ? statusFlow.slice(currentStatusIndex + 1)
      : statusFlow;

  // =====================================================
  // ACTUAL STATUS UPDATE
  // =====================================================

  const updateStatus = async (paymentSuccessful = false) => {
    try {
      setUpdating(true);
      setError("");

      console.log("UPDATING SHIPMENT");
      console.log("Shipment ID:", id);
      console.log("Selected Status:", status);
      console.log("Payment Successful:", paymentSuccessful);

      const updateData = {
        status: status,
      };

      // Only add payment status when shipment is Delivered
      if (status === "Delivered") {
        updateData.paymentStatus = paymentSuccessful
          ? "Successful"
          : "Pending";
      }

      const response = await updateShipment(id, updateData);

      console.log("UPDATE RESPONSE:", response);

      setShowPaymentPopup(false);

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

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // If admin selected Delivered,
    // ask about payment first.
    if (status === "Delivered") {
      setShowPaymentPopup(true);
      return;
    }

    // Normal status update
    await updateStatus();
  };

  // =====================================================
  // PAYMENT SUCCESSFUL
  // =====================================================

  const handlePaymentSuccessful = async () => {
    await updateStatus(true);
  };

  // =====================================================
  // PAYMENT NOT SUCCESSFUL
  // =====================================================

  const handlePaymentNotSuccessful = () => {
    setShowPaymentPopup(false);

    // Restore previous shipment status
    setStatus(shipment.status);

    setError(
      "Shipment cannot be marked as Delivered because payment is not successful."
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

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

  // =====================================================
  // SHIPMENT NOT FOUND
  // =====================================================

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

      {/* =====================================================
          HEADER
      ===================================================== */}

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

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="rounded-[5px] border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* =====================================================
          SHIPMENT DETAILS
      ===================================================== */}

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

          {/* TRACKING NUMBER */}

          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Tracking Number
            </p>

            <p className="mt-1 text-sm font-semibold text-black">
              {shipment.trackingNumber || "N/A"}
            </p>
          </div>

          {/* CUSTOMER */}

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

          {/* ORIGIN */}

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

          {/* DESTINATION */}

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

          {/* PACKAGE TYPE */}

          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Package Type
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.packageType || "N/A"}
            </p>
          </div>

          {/* WEIGHT */}

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

          {/* SERVICE */}

          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Service
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.service?.name || "N/A"}
            </p>
          </div>

          {/* SERVICE PRICE */}

          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Service Price
            </p>

            <p className="mt-1 text-sm font-semibold text-green-600">
              {shipment.service?.price !== undefined &&
              shipment.service?.price !== null
                ? `₹${Number(
                    shipment.service.price
                  ).toFixed(2)}`
                : "N/A"}
            </p>
          </div>

          {/* PAYMENT STATUS */}

          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Payment Status
            </p>

            <p
              className={`mt-1 text-sm font-semibold ${
                shipment.paymentStatus === "Successful"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {shipment.paymentStatus || "Pending"}
            </p>
          </div>

        </div>
      </div>

      {/* =====================================================
          STATUS FORM
      ===================================================== */}

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

              {/* CURRENT STATUS */}

              <option value={shipment.status}>
                {shipment.status}
              </option>

              {/* NEXT STATUSES */}

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

              {/* CANCEL */}

              {shipment.status !== "Delivered" &&
                shipment.status !== "Cancelled" && (
                  <option value="Cancelled">
                    Cancelled
                  </option>
                )}

            </select>
          </div>

          {/* STATUS PREVIEW */}

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

        {/* BUTTONS */}

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

      {/* =====================================================
          PAYMENT CONFIRMATION POPUP
      ===================================================== */}

      {showPaymentPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-[8px] bg-white shadow-xl">

            {/* POPUP HEADER */}

            <div className="border-b border-gray-200 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50">
                  <CreditCard
                    size={21}
                    className="text-yellow-600"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black">
                    Confirm Payment
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Payment verification required
                  </p>
                </div>

              </div>

            </div>

            {/* POPUP CONTENT */}

            <div className="p-6">

              <p className="text-sm leading-6 text-gray-700">
                Is the payment for this shipment
                successful?
              </p>

              <div className="mt-4 rounded-[5px] border border-gray-200 bg-gray-50 p-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Service
                  </span>

                  <span className="text-sm font-medium text-gray-900">
                    {shipment.service?.name || "N/A"}
                  </span>

                </div>

                <div className="mt-2 flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Amount
                  </span>

                  <span className="text-sm font-semibold text-black">
                    {shipment.service?.price !== undefined &&
                    shipment.service?.price !== null
                      ? `₹${Number(
                          shipment.service.price
                        ).toFixed(2)}`
                      : "N/A"}
                  </span>

                </div>

              </div>

            </div>

            {/* POPUP BUTTONS */}

            <div className="flex flex-col gap-3 border-t border-gray-200 p-6 sm:flex-row sm:justify-end">

              {/* PAYMENT NOT SUCCESSFUL */}

              <button
                type="button"
                onClick={handlePaymentNotSuccessful}
                disabled={updating}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[5px] border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 sm:w-auto"
              >
                <XCircle size={17} />

                No, Payment Pending
              </button>

              {/* PAYMENT SUCCESSFUL */}

              <button
                type="button"
                onClick={handlePaymentSuccessful}
                disabled={updating}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 sm:w-auto"
              >
                <CheckCircle size={17} />

                {updating
                  ? "Updating..."
                  : "Yes, Payment Successful"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminEditShipment;
import { useState } from "react";
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";

import { getTrackingDetails } from "../../../services/TrackingServices";

const AdminTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trackingSteps = [
    "Booked",
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];

  // --------------------------------
  // FORMAT DATE
  // --------------------------------
  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------
  // FORMAT TIME
  // --------------------------------
  const formatTime = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --------------------------------
  // ESTIMATED DELIVERY
  // --------------------------------
  const getEstimatedDelivery = (data) => {
    /*
     * First use the value returned by backend
     * if it exists.
     */
    if (data?.estimatedDelivery) {
      return data.estimatedDelivery;
    }

    if (data?.estimatedDeliveryDate) {
      return formatDate(data.estimatedDeliveryDate);
    }

    if (data?.deliveryDate) {
      return formatDate(data.deliveryDate);
    }

    /*
     * If backend doesn't send estimated delivery,
     * calculate it from shipment creation date.
     */
    if (data?.createdAt) {
      const date = new Date(data.createdAt);

      if (!Number.isNaN(date.getTime())) {
        date.setDate(date.getDate() + 3);

        return formatDate(date);
      }
    }

    return "-";
  };

  // --------------------------------
  // GET STATUS INDEX
  // --------------------------------
  const getStatusIndex = (status) => {
    return trackingSteps.findIndex(
      (step) =>
        step.toLowerCase() ===
        status?.trim().toLowerCase()
    );
  };

  // --------------------------------
  // SEARCH SHIPMENT
  // --------------------------------
  const handleSearch = async (e) => {
    e.preventDefault();

    const tracking = trackingNumber.trim();

    if (!tracking) {
      setError("Please enter your tracking number.");
      setShipment(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setShipment(null);

      const response = await getTrackingDetails(
        tracking
      );

      console.log("TRACKING RESPONSE:", response);

      /*
       * Your working user-side tracking uses
       * response.shipment.
       */
      const shipmentData = response?.shipment;

      if (!shipmentData) {
        setError(
          response?.message ||
            "Shipment not found."
        );
        return;
      }

      console.log(
        "ADMIN SHIPMENT DATA:",
        shipmentData
      );

      console.log(
        "TRACKING HISTORY:",
        shipmentData.trackingHistory
      );

      setShipment(shipmentData);
    } catch (error) {
      console.error(
        "TRACKING ERROR:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to track shipment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // STATUS STYLE
  // --------------------------------
  const getStatusStyle = (status) => {
    switch (status) {
      case "Booked":
        return "bg-yellow-100 text-yellow-700";

      case "Picked Up":
        return "bg-yellow-100 text-yellow-700";

      case "In Transit":
        return "bg-blue-100 text-blue-700";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // --------------------------------
  // CUSTOMER NAME
  // --------------------------------
  const getCustomerName = () => {
    return (
      shipment?.customer?.name ||
      shipment?.customer?.fullName ||
      shipment?.customerName ||
      shipment?.user?.name ||
      shipment?.user?.fullName ||
      "-"
    );
  };

  // --------------------------------
  // ORIGIN
  // --------------------------------
  const getOrigin = () => {
    return (
      shipment?.sender?.city ||
      shipment?.origin ||
      "-"
    );
  };

  // --------------------------------
  // DESTINATION
  // --------------------------------
  const getDestination = () => {
    return (
      shipment?.destination ||
      shipment?.receiver?.city ||
      "-"
    );
  };

  return (
    <div className="space-y-6 bg-white">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Tracking
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Search and monitor shipment tracking information
        </p>
      </div>

      {/* Search */}
      <div className="rounded-[5px] border border-gray-200 bg-white p-4 sm:p-6">

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => {
                setTrackingNumber(e.target.value);
                setError("");
              }}
              placeholder="Enter tracking number..."
              className="w-full rounded-[5px] border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-[5px] bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Tracking..."
              : "Track Shipment"}
          </button>

        </form>

        {error && (
          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-[5px] border border-gray-200 bg-white p-6 text-center">
          <p className="text-sm text-gray-500">
            Loading shipment details...
          </p>
        </div>
      )}

      {/* Shipment */}
      {shipment && !loading && (
        <>

          {/* Shipment Details */}
          <div className="rounded-[5px] border border-gray-200 bg-white p-4 sm:p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[5px] bg-gray-100 text-gray-700">
                  <Package size={24} />
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Tracking Number
                  </p>

                  <h2 className="text-lg font-bold text-gray-900">
                    {shipment.trackingNumber}
                  </h2>

                </div>

              </div>

              <span
                className={`w-fit rounded-[5px] px-4 py-2 text-sm font-medium ${getStatusStyle(
                  shipment.status
                )}`}
              >
                {shipment.status || "Booked"}
              </span>

            </div>

            {/* Information */}
            <div className="mt-6 grid grid-cols-1 gap-5 border-t border-gray-100 pt-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* Customer */}
              <div>
                <p className="text-xs text-gray-500">
                  Customer
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {getCustomerName()}
                </p>
              </div>

              {/* Origin */}
              <div>
                <p className="text-xs text-gray-500">
                  Origin
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {getOrigin()}
                </p>
              </div>

              {/* Destination */}
              <div>
                <p className="text-xs text-gray-500">
                  Destination
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {getDestination()}
                </p>
              </div>

            </div>

          </div>

          {/* Shipment Route */}
          <div className="rounded-[5px] border border-gray-200 bg-white p-4 sm:p-6">

            <div className="flex items-center gap-2">

              <MapPin
                size={20}
                className="text-gray-700"
              />

              <h2 className="font-semibold text-gray-900">
                Shipment Route
              </h2>

            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">

              <div>

                <p className="text-xs text-gray-500">
                  From
                </p>

                <p className="font-semibold text-gray-900">
                  {getOrigin()}
                </p>

              </div>

              <div className="hidden flex-1 border-t border-dashed border-gray-300 sm:block" />

              <Truck
                size={20}
                className="hidden text-gray-400 sm:block"
              />

              <div>

                <p className="text-xs text-gray-500">
                  To
                </p>

                <p className="font-semibold text-gray-900">
                  {getDestination()}
                </p>

              </div>

            </div>

          </div>

          {/* Tracking History */}
          <div className="rounded-[5px] border border-gray-200 bg-white p-4 sm:p-6">

            <div className="flex items-center gap-2">

              <Clock
                size={20}
                className="text-gray-700"
              />

              <h2 className="font-semibold text-gray-900">
                Tracking History
              </h2>

            </div>

            <div className="mt-6">

              {(() => {
                const currentIndex =
                  getStatusIndex(
                    shipment.status
                  );

                const trackingHistory =
                  shipment.trackingHistory || [];

                return trackingSteps.map(
                  (step, index) => {

                    const completed =
                      currentIndex >= 0 &&
                      index <= currentIndex;

                    const current =
                      index === currentIndex;

                    /*
                     * Find the real database
                     * tracking record.
                     */
                    const historyItem =
                      trackingHistory.find(
                        (item) =>
                          item.status
                            ?.trim()
                            .toLowerCase() ===
                          step.toLowerCase()
                      );

                    return (
                      <div
                        key={step}
                        className="relative flex gap-4 pb-7 last:pb-0"
                      >

                        {/* Timeline Line */}
                        {index !==
                          trackingSteps.length -
                            1 && (
                          <div
                            className={`absolute left-[11px] top-7 h-full w-px ${
                              index <
                              currentIndex
                                ? "bg-blue-500"
                                : "bg-gray-200"
                            }`}
                          />
                        )}

                        {/* Icon */}
                        <div
                          className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                            completed
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-400"
                          } ${
                            current
                              ? "ring-4 ring-blue-100"
                              : ""
                          }`}
                        >
                          <CheckCircle
                            size={15}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1">

                          <div className="flex flex-col justify-between gap-1 sm:flex-row">

                            <div>

                              <p
                                className={`text-sm font-semibold ${
                                  completed
                                    ? "text-gray-900"
                                    : "text-gray-400"
                                }`}
                              >
                                {step}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                {historyItem?.location ||
                                  (completed
                                    ? "Location unavailable"
                                    : "Pending")}
                              </p>

                            </div>

                            <div className="text-left sm:text-right">

                              {historyItem?.createdAt ? (
                                <>
                                  <p className="text-sm text-gray-600">
                                    {formatDate(
                                      historyItem.createdAt
                                    )}
                                  </p>

                                  <p className="text-xs text-gray-400">
                                    {formatTime(
                                      historyItem.createdAt
                                    )}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="text-sm text-gray-400">
                                    -
                                  </p>

                                  <p className="text-xs text-gray-400">
                                    -
                                  </p>
                                </>
                              )}

                            </div>

                          </div>

                          {historyItem?.remarks && (
                            <p className="mt-2 text-sm text-gray-500">
                              {historyItem.remarks}
                            </p>
                          )}

                        </div>

                      </div>
                    );
                  }
                );
              })()}

            </div>

          </div>

          {/* Estimated Delivery */}
          <div className="rounded-[5px] border border-gray-200 bg-gray-50 p-5">

            <p className="text-sm text-gray-500">
              Estimated Delivery
            </p>

            <p className="mt-1 text-lg font-semibold text-gray-900">
              {getEstimatedDelivery(shipment)}
            </p>

          </div>

        </>
      )}

      {/* Empty State */}
      {!shipment && !loading && !error && (
        <div className="rounded-[5px] border border-gray-200 bg-white p-10 text-center">

          <Package
            size={35}
            className="mx-auto text-gray-400"
          />

          <p className="mt-4 text-sm text-gray-500">
            Enter a tracking number to view
            shipment details.
          </p>

        </div>
      )}

    </div>
  );
};

export default AdminTracking;
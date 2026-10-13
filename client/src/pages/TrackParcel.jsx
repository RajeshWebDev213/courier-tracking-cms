import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Package,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";

import { getTrackingDetails } from "../services/TrackingServices";

const TrackParcel = () => {
  const [searchParams] = useSearchParams();

  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get tracking number from URL
  const urlTrackingNumber = searchParams.get("trackingNumber");

  // =====================================================
  // TRACK SHIPMENT
  // =====================================================
  const fetchTracking = async (number) => {
    const tracking = number?.trim();

    if (!tracking) {
      setError("Please enter your tracking number.");
      setShipment(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setShipment(null);

      console.log("Tracking Number:", tracking);

      const response = await getTrackingDetails(tracking);

      console.log("Tracking API Response:", response);

      if (!response?.shipment) {
        setError("Shipment not found.");
        return;
      }

      setShipment(response.shipment);
    } catch (error) {
      console.error("Tracking API Error:", error);

      setShipment(null);

      setError(
        error.response?.data?.message ||
          "Unable to track shipment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // AUTO TRACK FROM URL
  // =====================================================
  useEffect(() => {
    if (urlTrackingNumber) {
      setTrackingNumber(urlTrackingNumber);

      fetchTracking(urlTrackingNumber);
    }
  }, [urlTrackingNumber]);

  // =====================================================
  // FORM SUBMIT
  // =====================================================
  const handleSubmit = (e) => {
    e.preventDefault();

    fetchTracking(trackingNumber);
  };

  // =====================================================
  // STATUS COLORS
  // =====================================================
  const getStatusStyle = (status) => {
    const styles = {
      booked:
        "border-gray-300 bg-gray-100 text-gray-700",

      "picked up":
        "border-yellow-300 bg-yellow-100 text-yellow-700",

      "in transit":
        "border-blue-300 bg-blue-100 text-blue-700",

      "out for delivery":
        "border-purple-300 bg-purple-100 text-purple-700",

      delivered:
        "border-green-300 bg-green-100 text-green-700",

      cancelled:
        "border-red-300 bg-red-100 text-red-700",
    };

    return (
      styles[status?.trim().toLowerCase()] ||
      "border-gray-300 bg-gray-100 text-gray-700"
    );
  };


  // =====================================================
  // SERVICE TYPE COLORS
  // =====================================================
  const getServiceTypeStyle = (type) => {
    const styles = {
      domestic:
        "border-green-300 bg-green-100 text-green-700",

      express:
        "border-orange-300 bg-orange-100 text-orange-700",

      business:
        "border-blue-300 bg-blue-100 text-blue-700",
    };

    return (
      styles[type?.trim().toLowerCase()] ||
      "border-gray-300 bg-gray-100 text-gray-700"
    );
  };
  const trackingSteps = [
  "Booked",
  "Picked Up",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

const getStatusIndex = (status) => {
  return trackingSteps.findIndex(
    (step) => step.toLowerCase() === status?.trim().toLowerCase()
  );
};

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="border-b border-gray-100 px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="mb-3 text-sm font-medium uppercase tracking-widest">
              Shipment Tracking
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Track Your Parcel
            </h1>

            <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
              Enter your tracking number to check the current
              status and latest updates of your shipment.
            </p>

          </div>

          {/* SEARCH */}
          <div className="mx-auto mt-10 max-w-2xl">

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >

              <div className="relative flex-1">

                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => {
                    setTrackingNumber(e.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="Enter tracking number"
                  className="w-full rounded-[5px] border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-[5px] bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Tracking..."
                  : "Track Parcel"}
              </button>

            </form>

            {/* ERROR */}
            {error && (
              <div className="mt-4 rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 text-center">
                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm text-gray-500">
              Loading shipment details...
            </p>
          </div>
        </section>
      )}

      {/* SHIPMENT */}
      {shipment && !loading && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-7xl">

            {/* TRACKING NUMBER */}
            <div className="rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                <div>
                  <p className="text-sm text-gray-500">
                    Tracking Number
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-black">
                    {shipment.trackingNumber}
                  </h2>
                </div>

                <span
                  className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyle(
                    shipment.status
                  )}`}
                >
                  ● {shipment.status || "Booked"}
                </span>

              </div>

            </div>

            {/* SHIPMENT INFO */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* STATUS */}
              <div className="rounded-[5px] border border-gray-200 bg-white p-5 shadow-sm">

                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[5px] ${getStatusStyle(
                    shipment.status
                  )}`}
                >
                  <Package size={19} />
                </div>

                <p className="text-sm text-gray-500">
                  Shipment Status
                </p>

                <p className="mt-1 font-medium">
                  {shipment.status || "Booked"}
                </p>

              </div>

              {/* CURRENT LOCATION */}
              <div className="rounded-[5px] border border-gray-200 bg-white p-5 shadow-sm">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[5px] bg-blue-50">
                  <MapPin
                    size={19}
                    className="text-blue-600"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Current Location
                </p>

                <p className="mt-1 font-medium text-blue-600">
                  {shipment.currentLocation ||
                    shipment.trackingHistory?.[
                      shipment.trackingHistory.length - 1
                    ]?.location ||
                    "Not available"}
                </p>

              </div>

              {/* DESTINATION */}
              <div className="rounded-[5px] border border-gray-200 bg-white p-5 shadow-sm">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[5px] bg-purple-50">
                  <MapPin
                    size={19}
                    className="text-purple-600"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Destination
                </p>

                <p className="mt-1 font-medium text-purple-600">
                  {shipment.destination ||
                    shipment.receiver?.city ||
                    "Not available"}
                </p>

              </div>

              {/* CREATED DATE */}
              <div className="rounded-[5px] border border-gray-200 bg-white p-5 shadow-sm">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[5px] bg-orange-50">
                  <Calendar
                    size={19}
                    className="text-orange-600"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Created Date
                </p>

                <p className="mt-1 font-medium text-orange-600">
                  {shipment.createdAt
                    ? new Date(
                        shipment.createdAt
                      ).toLocaleDateString()
                    : "Not available"}
                </p>

              </div>

            </div>

            {/* SERVICE DETAILS */}
            <div className="mt-6 rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold text-black">
                Service Details
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                <div>
                  <p className="text-sm text-gray-500">
                    Service
                  </p>

                  <p className="mt-1 font-medium text-gray-800">
                    {shipment.service?.name || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Service Type
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-[5px] border px-3 py-1.5 text-xs font-semibold ${getServiceTypeStyle(
                      shipment.service?.type
                    )}`}
                  >
                    {shipment.service?.type || "Standard"}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Service Price
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {shipment.service?.price !== undefined
                      ? `₹${shipment.service.price}`
                      : "-"}
                  </p>
                </div>

              </div>

            </div>

            {/* SENDER / RECEIVER */}
            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* SENDER */}
              <div className="rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-black">
                  Sender
                </h2>

                <div className="mt-5 space-y-3 text-sm">

                  <p>
                    <span className="font-medium">
                      Name:
                    </span>{" "}
                    {shipment.sender?.name || "N/A"}
                  </p>

                  <p>
                    <span className="font-medium">
                      Phone:
                    </span>{" "}
                    {shipment.sender?.phone || "N/A"}
                  </p>

                  <p>
                    <span className="font-medium">
                      Address:
                    </span>{" "}
                    {shipment.sender?.address || "N/A"}
                  </p>

                  <p>
                    <span className="font-medium">
                      Location:
                    </span>{" "}
                    {shipment.sender?.city || "N/A"},{" "}
                    {shipment.sender?.state || ""}
                  </p>

                </div>

              </div>

              {/* RECEIVER */}
              <div className="rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-black">
                  Receiver
                </h2>

                <div className="mt-5 space-y-3 text-sm">

                  <p>
                    <span className="font-medium">
                      Name:
                    </span>{" "}
                    {shipment.receiver?.name || "N/A"}
                  </p>

                  <p>
                    <span className="font-medium">
                      Phone:
                    </span>{" "}
                    {shipment.receiver?.phone || "N/A"}
                  </p>

                  <p>
                    <span className="font-medium">
                      Address:
                    </span>{" "}
                    {shipment.receiver?.address || "N/A"}
                  </p>

                  <p>
                    <span className="font-medium">
                      Location:
                    </span>{" "}
                    {shipment.receiver?.city || "N/A"},{" "}
                    {shipment.receiver?.state || ""}
                  </p>

                </div>

              </div>

            </div>

          {/* TRACKING HISTORY */}
<div className="mt-6 rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

  <div>
    <h2 className="text-xl font-semibold text-black">
      Tracking History
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Latest updates for your shipment
    </p>
  </div>

  <div className="mt-8">

    {shipment.trackingHistory?.length > 0 ? (

      (() => {
        const currentIndex = getStatusIndex(shipment.status);

        return trackingSteps.map((step, index) => {

          const completed = index <= currentIndex;
          const current = index === currentIndex;

          const historyItem = shipment.trackingHistory.find(
            (item) =>
              item.status?.trim().toLowerCase() ===
              step.toLowerCase()
          );

          return (
            <div
              key={step}
              className="relative flex gap-4 pb-8 last:pb-0"
            >

              {/* CONNECTING LINE */}
              {index < trackingSteps.length - 1 && (
                <div
                  className={`absolute left-[15px] top-8 h-full w-px ${
                    index < currentIndex
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}

              {/* STATUS CIRCLE */}
              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                  completed
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                } ${
                  current
                    ? "ring-4 ring-green-100"
                    : ""
                }`}
              >
                <CheckCircle size={16} />
              </div>

              {/* DETAILS */}
              <div className="flex-1">

                <div className="flex flex-col justify-between gap-1 sm:flex-row">

                  <h3
                    className={`font-medium ${
                      completed
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </h3>

                  {historyItem && (
                    <span className="text-sm text-gray-500">
                      {historyItem.dateTime
                        ? new Date(
                            historyItem.dateTime
                          ).toLocaleString()
                        : "Date unavailable"}
                    </span>
                  )}

                </div>

                {historyItem ? (
                  <>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">

                      <MapPin
                        size={14}
                        className={
                          completed
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                      />

                      <span>
                        {historyItem.location ||
                          "Location unavailable"}
                      </span>

                    </div>

                    {historyItem.remarks && (
                      <p className="mt-2 text-sm text-gray-500">
                        {historyItem.remarks}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-sm text-gray-400">
                    {completed
                      ? "Completed"
                      : "Pending"}
                  </p>
                )}

              </div>
            </div>
          );
        });
      })()

    ) : (

      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-sm text-gray-500">
          No tracking updates available.
        </p>
      </div>

    )}

  </div>
</div>
          </div>
        </section>
      )}

      {/* INITIAL STATE */}
      {!shipment && !error && !loading && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-xl text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[5px] bg-blue-50">
              <Package
                size={25}
                className="text-black"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-black">
              Track Your Shipment
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter your tracking number above to view your
              shipment details and tracking updates.
            </p>

          </div>
        </section>
      )}

    </main>
  );
};

export default TrackParcel;
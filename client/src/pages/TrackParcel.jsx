import { useState } from "react";
import {
  Search,
  Package,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";

const TrackParcel = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      setError("Please enter your tracking number.");
      setShipment(null);
      return;
    }

    setError("");

    // Temporary tracking data
    if (trackingNumber.trim().toUpperCase() === "CR123456") {
      setShipment({
        trackingNumber: "CR123456",
        status: "In Transit",
        currentLocation: "Hyderabad",
        destination: "Chennai",
        estimatedDelivery: "03 Oct 2026",

        trackingHistory: [
          {
            status: "Shipment Created",
            location: "Hyderabad",
            timestamp: "2026-10-01T09:30:00",
          },
          {
            status: "Picked Up",
            location: "Hyderabad",
            timestamp: "2026-10-01T11:15:00",
          },
          {
            status: "In Transit",
            location: "Hyderabad",
            timestamp: "2026-10-01T15:45:00",
          },
        ],
      });
    } else {
      setShipment(null);
      setError("Shipment not found. Please check your tracking number.");
    }
  };

  return (
    <main className="min-h-screen bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="border-b border-gray-100 px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="mb-3 text-sm font-medium uppercase tracking-widest ">
              Shipment Tracking
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Track Your Parcel
            </h1>

            <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
              Enter your tracking number to check the current status
              and latest updates of your shipment.
            </p>

          </div>

          {/* ================= SEARCH ================= */}
          <div className="mx-auto mt-10 max-w-2xl">

            <form
              onSubmit={handleTrack}
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
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="w-full rounded-[5px] border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black "
                />

              </div>

              <button
                type="submit"
                className="rounded-[5px] bg-black px-7 py-3 text-sm font-medium text-white transition "
              >
                Track Parcel
              </button>

            </form>

            {/* Error */}
            {error && (
              <p className="mt-3 text-center text-sm text-red-500">
                {error}
              </p>
            )}

          </div>
        </div>
      </section>

      {/* ================= SHIPMENT RESULT ================= */}
      {shipment && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-7xl">

            {/* ================= TRACKING NUMBER ================= */}
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

                {/* Status */}
                <span className="w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  <span className="mr-1">●</span>
                  {shipment.status}
                </span>

              </div>

            </div>

            {/* ================= SHIPMENT INFO ================= */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* Status */}
              <div className="rounded-[5px] border border-gray-200 bg-white p-5 shadow-sm">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[5px] bg-green-50">
                  <Package
                    size={19}
                    className="text-green-600"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Shipment Status
                </p>

                <p className="mt-1 font-medium text-green-600">
                  {shipment.status}
                </p>

              </div>

              {/* Current Location */}
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
                  {shipment.currentLocation}
                </p>

              </div>

              {/* Destination */}
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
                  {shipment.destination}
                </p>

              </div>

              {/* Estimated Delivery */}
              <div className="rounded-[5px] border border-gray-200 bg-white p-5 shadow-sm">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[5px] bg-orange-50">
                  <Calendar
                    size={19}
                    className="text-orange-600"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Estimated Delivery
                </p>

                <p className="mt-1 font-medium text-orange-600">
                  {shipment.estimatedDelivery}
                </p>

              </div>

            </div>

            {/* ================= TRACKING HISTORY ================= */}
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

                {shipment.trackingHistory.length > 0 ? (

                  shipment.trackingHistory.map((item, index) => {

                    const isLast =
                      index === shipment.trackingHistory.length - 1;

                    return (
                      <div
                        key={index}
                        className="relative flex gap-4 pb-8 last:pb-0"
                      >

                        {/* Vertical Line */}
                        {!isLast && (
                          <div className="absolute left-[15px] top-8 h-full w-px bg-green-200" />
                        )}

                        {/* Status Icon */}
                        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
                          <CheckCircle size={16} />
                        </div>

                        {/* Tracking Information */}
                        <div className="flex-1">

                          <div className="flex flex-col justify-between gap-1 sm:flex-row">

                            <h3 className="font-medium text-black">
                              {item.status}
                            </h3>

                            <span className="text-sm text-gray-500">
                              {new Date(
                                item.timestamp
                              ).toLocaleString()}
                            </span>

                          </div>

                          <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">

                            <MapPin
                              size={14}
                              className="text-blue-500"
                            />

                            <span>
                              {item.location}
                            </span>

                          </div>

                        </div>

                      </div>
                    );
                  })

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

      {/* ================= INITIAL STATE ================= */}
      {!shipment && !error && (
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
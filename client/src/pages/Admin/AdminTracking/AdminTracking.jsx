import { useState } from "react";
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";

const AdminTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!trackingNumber.trim()) return;

    // Temporary tracking data
    setShipment({
      trackingNumber: trackingNumber.toUpperCase(),
      status: "In Transit",
      customer: "Rahul Kumar",
      origin: "Hyderabad",
      destination: "Mumbai",
      estimatedDelivery: "07 Oct 2026",

      history: [
        {
          title: "Shipment Picked Up",
          location: "Hyderabad",
          date: "05 Oct 2026",
          time: "09:30 AM",
          completed: true,
        },
        {
          title: "In Transit",
          location: "Hyderabad Hub",
          date: "05 Oct 2026",
          time: "01:15 PM",
          completed: true,
        },
        {
          title: "Arrived at Mumbai Hub",
          location: "Mumbai",
          date: "06 Oct 2026",
          time: "08:30 AM",
          completed: false,
        },
        {
          title: "Out for Delivery",
          location: "Mumbai",
          date: "-",
          time: "-",
          completed: false,
        },
        {
          title: "Delivered",
          location: "Mumbai",
          date: "-",
          time: "-",
          completed: false,
        },
      ],
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
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

      {/* Search Section */}
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
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number..."
              className="w-full rounded-[5px] border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
            />
          </div>

          <button
            type="submit"
            className="rounded-[5px] bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Track Shipment
          </button>
        </form>
      </div>

      {/* Shipment Details */}
      {shipment && (
        <>
          {/* Summary */}
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
                {shipment.status}
              </span>
            </div>

            {/* Shipment Information */}
            <div className="mt-6 grid grid-cols-1 gap-5 border-t border-gray-100 pt-6 sm:grid-cols-2 lg:grid-cols-3">

              <div>
                <p className="text-xs text-gray-500">
                  Customer
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {shipment.customer}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Origin
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {shipment.origin}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Destination
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {shipment.destination}
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
                  {shipment.origin}
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
                  {shipment.destination}
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

              {shipment.history.map((item, index) => (
                <div
                  key={index}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >

                  {/* Timeline Line */}
                  {index !== shipment.history.length - 1 && (
                    <div
                      className={`absolute left-[11px] top-7 h-full w-px ${
                        item.completed
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                  {/* Timeline Icon */}
                  <div
                    className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      item.completed
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <CheckCircle size={15} />
                  </div>

                  {/* History Details */}
                  <div className="flex-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">

                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            item.completed
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.location}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-sm text-gray-600">
                          {item.date}
                        </p>

                        <p className="text-xs text-gray-400">
                          {item.time}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="rounded-[5px] border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Estimated Delivery
            </p>

            <p className="mt-1 text-lg font-semibold text-gray-900">
              {shipment.estimatedDelivery}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminTracking;
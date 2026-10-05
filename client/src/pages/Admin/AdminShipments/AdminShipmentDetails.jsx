import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  Calendar,
  Weight,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";

const AdminShipmentDetails = () => {
  const { id } = useParams();

  // Temporary data - replace with API data later
  const shipment = {
    trackingNumber: "CR102458",
    status: "In Transit",

    customer: {
      name: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
    },

    origin: "Hyderabad",
    destination: "Mumbai",

    packageType: "Document",
    weight: "2.5 kg",
    createdAt: "05 Oct 2026",

    trackingHistory: [
      {
        status: "Shipment Picked Up",
        location: "Hyderabad",
        date: "05 Oct 2026",
        time: "09:30 AM",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Hyderabad Hub",
        date: "05 Oct 2026",
        time: "01:15 PM",
        completed: true,
      },
      {
        status: "Arrived at Mumbai Hub",
        location: "Mumbai",
        date: "06 Oct 2026",
        time: "08:30 AM",
        completed: false,
      },
      {
        status: "Out for Delivery",
        location: "Mumbai",
        date: "-",
        time: "-",
        completed: false,
      },
      {
        status: "Delivered",
        location: "Mumbai",
        date: "-",
        time: "-",
        completed: false,
      },
    ],
  };

  // Status colors
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

  return (
    <div className="space-y-6 bg-white">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <Link
            to="/admin/shipments"
            className="rounded-[5px] border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-black"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h2 className="text-2xl font-bold text-black">
              Shipment Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View complete shipment information.
            </p>
          </div>

        </div>

        {/* Status */}
        <span
          className={`inline-flex w-fit rounded-[5px] px-4 py-2 text-sm font-medium ${getStatusStyle(
            shipment.status
          )}`}
        >
          {shipment.status}
        </span>

      </div>

      {/* Tracking Number */}
      <div className="rounded-[5px] border border-gray-200 bg-white p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Tracking Number
            </p>

            <h3 className="mt-1 text-xl font-bold text-black">
              {shipment.trackingNumber}
            </h3>
          </div>

          <div className="rounded-[5px] bg-gray-100 p-3 text-gray-600">
            <Package size={25} />
          </div>

        </div>

      </div>

      {/* Shipment Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Customer Information */}
        <div className="rounded-[5px] border border-gray-200 bg-white p-6">

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-[5px] bg-gray-100 p-2">
              <User
                size={20}
                className="text-gray-600"
              />
            </div>

            <h3 className="text-lg font-semibold text-black">
              Customer Information
            </h3>

          </div>

          <div className="space-y-4">

            {/* Name */}
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Name
              </p>

              <p className="mt-1 text-sm font-medium text-black">
                {shipment.customer.name}
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">

              <Mail
                size={17}
                className="text-gray-400"
              />

              <span className="text-sm text-gray-600">
                {shipment.customer.email}
              </span>

            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">

              <Phone
                size={17}
                className="text-gray-400"
              />

              <span className="text-sm text-gray-600">
                {shipment.customer.phone}
              </span>

            </div>

          </div>

        </div>

        {/* Package Information */}
        <div className="rounded-[5px] border border-gray-200 bg-white p-6">

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-[5px] bg-gray-100 p-2">
              <Package
                size={20}
                className="text-gray-600"
              />
            </div>

            <h3 className="text-lg font-semibold text-black">
              Package Information
            </h3>

          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Package Type */}
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Package Type
              </p>

              <p className="mt-1 text-sm font-medium text-black">
                {shipment.packageType}
              </p>
            </div>

            {/* Weight */}
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Weight
              </p>

              <div className="mt-1 flex items-center gap-2">

                <Weight
                  size={16}
                  className="text-gray-400"
                />

                <p className="text-sm font-medium text-black">
                  {shipment.weight}
                </p>

              </div>
            </div>

            {/* Created Date */}
            <div>
              <p className="text-xs font-medium uppercase text-gray-400">
                Created Date
              </p>

              <div className="mt-1 flex items-center gap-2">

                <Calendar
                  size={16}
                  className="text-gray-400"
                />

                <p className="text-sm font-medium text-black">
                  {shipment.createdAt}
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Route */}
      <div className="rounded-[5px] border border-gray-200 bg-white p-6">

        <h3 className="mb-6 text-lg font-semibold text-black">
          Shipment Route
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Origin */}
          <div className="flex items-start gap-4">

            <div className="rounded-full bg-green-50 p-3 text-green-600">
              <MapPin size={20} />
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Origin
              </p>

              <p className="mt-1 font-semibold text-black">
                {shipment.origin}
              </p>
            </div>

          </div>

          {/* Destination */}
          <div className="flex items-start gap-4">

            <div className="rounded-full bg-blue-50 p-3 text-blue-600">
              <MapPin size={20} />
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Destination
              </p>

              <p className="mt-1 font-semibold text-black">
                {shipment.destination}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Tracking History */}
      <div className="rounded-[5px] border border-gray-200 bg-white p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-[5px] bg-gray-100 p-2 text-gray-600">
            <Truck size={20} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black">
              Tracking History
            </h3>

            <p className="text-sm text-gray-500">
              Shipment movement and status updates.
            </p>
          </div>

        </div>

        {/* Timeline */}
        <div className="relative space-y-6">

          {shipment.trackingHistory.map((item, index) => (
            <div
              key={index}
              className="relative flex gap-4"
            >

              {/* Timeline Icon */}
              <div className="flex flex-col items-center">

                <div
                  className={`rounded-full p-2 ${
                    item.completed
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle size={18} />
                  ) : (
                    <Clock size={18} />
                  )}
                </div>

                {/* Timeline Line */}
                {index !==
                  shipment.trackingHistory.length - 1 && (
                  <div className="mt-2 h-full w-px bg-gray-200" />
                )}

              </div>

              {/* Timeline Details */}
              <div className="pb-2">

                <h4
                  className={`text-sm font-semibold ${
                    item.completed
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                >
                  {item.status}
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  {item.location}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {item.date}{" "}
                  {item.time !== "-" && `• ${item.time}`}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default AdminShipmentDetails;
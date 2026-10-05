import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Phone,
  Calendar,
} from "lucide-react";

const ShipmentDetails = () => {
  const { id } = useParams();

  // Temporary shipment data
  // Later replace this with GET /api/shipments/:id
  const shipment = {
    trackingNumber: "CR123456",
    status: "In Transit",
    createdAt: "01 Oct 2026",

    sender: {
      name: "Rahul Kumar",
      phone: "9876543210",
      address: "Madhapur",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
    },

    receiver: {
      name: "Arjun Kumar",
      phone: "9876543211",
      address: "T Nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600017",
    },

    package: {
      type: "Parcel",
      weight: "2.5 kg",
      description: "Electronic accessories",
    },
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8">

          <Link
            to="/shipments"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to Shipments
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                Shipment Details
              </p>

              <h1 className="mt-2 text-3xl font-bold text-black">
                {shipment.trackingNumber}
              </h1>
            </div>

            <span className="w-fit rounded-[5px] border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-black">
              {shipment.status}
            </span>

          </div>

        </div>

        {/* ================= BASIC INFORMATION ================= */}
        <div className="rounded-[5px] border border-gray-200 p-6 sm:p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
              <Package size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-black">
                Shipment Information
              </h2>

              <p className="text-sm text-gray-500">
                Basic information about this shipment.
              </p>
            </div>

          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">

            <div>
              <p className="text-sm text-gray-500">
                Tracking Number
              </p>

              <p className="mt-1 font-medium text-black">
                {shipment.trackingNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="mt-1 font-medium text-black">
                {shipment.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Shipment Date
              </p>

              <p className="mt-1 flex items-center gap-2 font-medium text-black">
                <Calendar size={16} />
                {shipment.createdAt}
              </p>
            </div>

          </div>

        </div>

        {/* ================= SENDER ================= */}
        <div className="mt-6 rounded-[5px] border border-gray-200 p-6 sm:p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
              <User size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-black">
                Sender Information
              </h2>

              <p className="text-sm text-gray-500">
                Pickup information.
              </p>
            </div>

          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="mt-1 font-medium text-black">
                {shipment.sender.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="mt-1 flex items-center gap-2 font-medium text-black">
                <Phone size={16} />
                {shipment.sender.phone}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">
                Address
              </p>

              <p className="mt-1 flex items-start gap-2 font-medium text-black">
                <MapPin size={16} className="mt-0.5 shrink-0" />

                <span>
                  {shipment.sender.address},{" "}
                  {shipment.sender.city},{" "}
                  {shipment.sender.state} -{" "}
                  {shipment.sender.pincode}
                </span>
              </p>
            </div>

          </div>

        </div>

        {/* ================= RECEIVER ================= */}
        <div className="mt-6 rounded-[5px] border border-gray-200 p-6 sm:p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
              <MapPin size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-black">
                Receiver Information
              </h2>

              <p className="text-sm text-gray-500">
                Delivery information.
              </p>
            </div>

          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="mt-1 font-medium text-black">
                {shipment.receiver.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="mt-1 flex items-center gap-2 font-medium text-black">
                <Phone size={16} />
                {shipment.receiver.phone}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">
                Address
              </p>

              <p className="mt-1 flex items-start gap-2 font-medium text-black">
                <MapPin size={16} className="mt-0.5 shrink-0" />

                <span>
                  {shipment.receiver.address},{" "}
                  {shipment.receiver.city},{" "}
                  {shipment.receiver.state} -{" "}
                  {shipment.receiver.pincode}
                </span>
              </p>
            </div>

          </div>

        </div>

        {/* ================= PACKAGE ================= */}
        <div className="mt-6 rounded-[5px] border border-gray-200 p-6 sm:p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
              <Package size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-black">
                Package Information
              </h2>

              <p className="text-sm text-gray-500">
                Details about the package.
              </p>
            </div>

          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">

            <div>
              <p className="text-sm text-gray-500">
                Package Type
              </p>

              <p className="mt-1 font-medium text-black">
                {shipment.package.type}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Weight
              </p>

              <p className="mt-1 font-medium text-black">
                {shipment.package.weight}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Description
              </p>

              <p className="mt-1 font-medium text-black">
                {shipment.package.description}
              </p>
            </div>

          </div>

        </div>

        {/* ================= ACTIONS ================= */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

          <Link
            to="/shipments"
            className="rounded-[5px] border border-gray-300 px-6 py-3 text-center text-sm font-medium text-black hover:bg-gray-50"
          >
            Back to Shipments
          </Link>

          <Link
            to={`/track-parcel?tracking=${shipment.trackingNumber}`}
            className="rounded-[5px] bg-black px-6 py-3 text-center text-sm font-medium text-white hover:bg-gray-800"
          >
            Track Shipment
          </Link>

        </div>

      </div>
    </main>
  );
};

export default ShipmentDetails;
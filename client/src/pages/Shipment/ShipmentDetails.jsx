import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  User,
  Phone,
  MapPin,
  Calendar,
  Weight,
} from "lucide-react";
import { getShipmentById } from "../../services/ShipmentServices";

const ShipmentDetails = () => {
  const { trackingNumber } = useParams();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getShipmentById(trackingNumber);

        setShipment(response.shipment);
      } catch (error) {
        console.error("Shipment details error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch shipment details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (trackingNumber) {
      fetchShipment();
    } else {
      setLoading(false);
      setError("Tracking Number is missing");
    }
  }, [trackingNumber]);

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading shipment details...
          </p>
        </div>
      </main>
    );
  }

  // Error
  if (error) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center">
          <Package size={40} className="text-gray-400" />

          <p className="mt-4 text-sm text-red-500">
            {error}
          </p>

          <Link
            to="/shipments"
            className="mt-5 rounded-[5px] bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Back to Shipments
          </Link>
        </div>
      </main>
    );
  }

  // Shipment not found
  if (!shipment) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto flex min-h-[70vh] items-center justify-center">
          <p className="text-sm text-gray-500">
            Shipment not found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          to="/shipments"
          className="mb-8 flex w-fit items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Shipments
        </Link>

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Shipment
            </p>

            <h1 className="mt-2 text-3xl font-bold text-black">
              Shipment Details
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <Package size={16} />
              <span>{shipment.trackingNumber}</span>
            </div>
          </div>

          {/* Status */}
          <span className="w-fit rounded-[5px] border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-black">
            {shipment.status || "Booked"}
          </span>
        </div>

        {/* Main Content */}
        <div className="mt-10 space-y-6">

          {/* Sender & Receiver */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Sender */}
            <div className="rounded-[5px] border border-gray-200 p-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">
                  <User size={17} />
                </div>

                <div>
                  <h2 className="font-semibold text-black">
                    Sender
                  </h2>

                  <p className="text-xs text-gray-500">
                    Pickup details
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm">

                <div>
                  <p className="text-xs text-gray-400">
                    Name
                  </p>
                  <p className="mt-1 text-gray-700">
                    {shipment.sender?.name || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-gray-700">
                    <Phone size={14} />
                    {shipment.sender?.phone || "-"}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Address
                  </p>

                  <div className="mt-1 flex items-start gap-2 text-gray-700">
                    <MapPin size={14} className="mt-0.5 shrink-0" />

                    <span>
                      {shipment.sender?.address || "-"},{" "}
                      {shipment.sender?.city || "-"},{" "}
                      {shipment.sender?.state || "-"}{" "}
                      {shipment.sender?.pincode || ""}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Receiver */}
            <div className="rounded-[5px] border border-gray-200 p-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">
                  <User size={17} />
                </div>

                <div>
                  <h2 className="font-semibold text-black">
                    Receiver
                  </h2>

                  <p className="text-xs text-gray-500">
                    Delivery details
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm">

                <div>
                  <p className="text-xs text-gray-400">
                    Name
                  </p>

                  <p className="mt-1 text-gray-700">
                    {shipment.receiver?.name || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-gray-700">
                    <Phone size={14} />
                    {shipment.receiver?.phone || "-"}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Address
                  </p>

                  <div className="mt-1 flex items-start gap-2 text-gray-700">
                    <MapPin size={14} className="mt-0.5 shrink-0" />

                    <span>
                      {shipment.receiver?.address || "-"},{" "}
                      {shipment.receiver?.city || "-"},{" "}
                      {shipment.receiver?.state || "-"}{" "}
                      {shipment.receiver?.pincode || ""}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Package Details */}
          <div className="rounded-[5px] border border-gray-200 p-6">

            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">
                <Package size={17} />
              </div>

              <div>
                <h2 className="font-semibold text-black">
                  Package Details
                </h2>

                <p className="text-xs text-gray-500">
                  Shipment information
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              <div>
                <p className="text-xs text-gray-400">
                  Package Type
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {shipment.packageType || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Weight
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Weight size={14} />
                  {shipment.weight || "-"} kg
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Created Date
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar size={14} />

                  {shipment.createdAt
                    ? new Date(
                        shipment.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Status
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  {shipment.status || "Booked"}
                </p>
              </div>

            </div>

            {/* Description */}
            <div className="mt-6 border-t border-gray-100 pt-5">
              <p className="text-xs text-gray-400">
                Description
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                {shipment.description || "No description provided."}
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
};

export default ShipmentDetails;
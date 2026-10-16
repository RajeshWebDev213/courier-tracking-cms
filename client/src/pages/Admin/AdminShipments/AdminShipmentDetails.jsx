import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  Phone,
  CheckCircle,
  Loader2,
  IndianRupee,
} from "lucide-react";

import {
  getShipmentById,
} from "../../../services/ShipmentServices";

import {
  getTrackingDetails,
} from "../../../services/TrackingServices";

const AdminShipmentDetails = () => {
  const { id } = useParams();

  const [shipment, setShipment] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // TRACKING STEPS
  // =====================================================

  const trackingSteps = [
    "Booked",
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];

  // =====================================================
  // STATUS STYLE
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
  // STATUS INDEX
  // =====================================================

  const getStatusIndex = (status) => {
    return trackingSteps.findIndex(
      (step) =>
        step.toLowerCase() ===
        status?.trim().toLowerCase()
    );
  };

  // =====================================================
  // FETCH SHIPMENT
  // =====================================================

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getShipmentById(id);

        const shipmentData =
          response?.shipment ||
          response?.data?.shipment;

        if (!shipmentData) {
          setError("Shipment not found.");
          return;
        }

        setShipment(shipmentData);

        // Fetch tracking history
        if (shipmentData.trackingNumber) {
          fetchTrackingHistory(
            shipmentData.trackingNumber
          );
        }
      } catch (error) {
        console.error(
          "Admin shipment details error:",
          error
        );

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
  // FETCH TRACKING HISTORY
  // =====================================================

  const fetchTrackingHistory = async (trackingNumber) => {
    try {
      setTrackingLoading(true);

      const response =
        await getTrackingDetails(trackingNumber);

      console.log(
        "Admin Tracking Response:",
        response
      );

      const history =
        response?.trackingHistory ||
        response?.data?.trackingHistory ||
        response?.tracking ||
        response?.data?.tracking ||
        response?.updates ||
        [];

      setTrackingHistory(
        Array.isArray(history) ? history : []
      );
    } catch (error) {
      console.error(
        "Tracking history error:",
        error
      );

      setTrackingHistory([]);
    } finally {
      setTrackingLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2
            size={18}
            className="animate-spin"
          />

          Loading shipment details...
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !shipment) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <p className="text-sm text-red-500">
          {error || "Shipment not found."}
        </p>

        <Link
          to="/admin/shipments"
          className="mt-4 rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white"
        >
          Back to Shipments
        </Link>
      </div>
    );
  }

  const currentIndex = getStatusIndex(
    shipment.status
  );

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <Link
            to="/admin/shipments"
            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            <ArrowLeft size={16} />

            Back to Shipments
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-black">
            Shipment Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View shipment information and tracking history.
          </p>
        </div>

        {/* TRACKING NUMBER */}

        <div className="rounded-[5px] border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Tracking Number
          </p>

          <p className="mt-1 font-semibold text-black">
            {shipment.trackingNumber || "N/A"}
          </p>
        </div>

      </div>

      {/* =====================================================
          CURRENT STATUS
      ===================================================== */}

      <div className="mb-6 rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div className="flex items-center gap-4">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-[5px] ${getStatusStyle(
                shipment.status
              )}`}
            >
              <Package size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Current Shipment Status
              </p>

              <h2 className="mt-1 text-lg font-semibold text-black">
                {shipment.status || "Booked"}
              </h2>
            </div>

          </div>

          <span
            className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyle(
              shipment.status
            )}`}
          >
            {shipment.status || "Booked"}
          </span>

        </div>

      </div>

      {/* =====================================================
          SENDER / RECEIVER
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* SENDER */}

        <div className="rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-blue-50">
              <User
                size={19}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-black">
                Sender
              </h2>

              <p className="text-sm text-gray-500">
                Sender information
              </p>
            </div>

          </div>

          <div className="mt-6 space-y-4 text-sm">

            <div>
              <p className="text-gray-500">
                Name
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {shipment.sender?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Phone
              </p>

              <div className="mt-1 flex items-center gap-2 font-medium text-gray-800">
                <Phone size={15} />

                {shipment.sender?.phone || "N/A"}
              </div>
            </div>

            <div>
              <p className="text-gray-500">
                Address
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {shipment.sender?.address || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Location
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {shipment.sender?.city || "N/A"}

                {shipment.sender?.state
                  ? `, ${shipment.sender.state}`
                  : ""}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Pincode
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {shipment.sender?.pincode || "N/A"}
              </p>
            </div>

          </div>
        </div>

        {/* RECEIVER */}

        <div className="rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-purple-50">
              <User
                size={19}
                className="text-purple-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-black">
                Receiver
              </h2>

              <p className="text-sm text-gray-500">
                Receiver information
              </p>
            </div>

          </div>

          <div className="mt-6 space-y-4 text-sm">

            <div>
              <p className="text-gray-500">
                Name
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {shipment.receiver?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Phone
              </p>

              <div className="mt-1 flex items-center gap-2 font-medium text-gray-800">
                <Phone size={15} />

                {shipment.receiver?.phone || "N/A"}
              </div>
            </div>

            <div>
              <p className="text-gray-500">
                Address
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {shipment.receiver?.address || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Location
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {shipment.receiver?.city || "N/A"}

                {shipment.receiver?.state
                  ? `, ${shipment.receiver.state}`
                  : ""}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Pincode
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {shipment.receiver?.pincode || "N/A"}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* =====================================================
          PACKAGE DETAILS
      ===================================================== */}

      <div className="mt-6 rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
            <Package
              size={19}
              className="text-black"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-black">
              Package Details
            </h2>

            <p className="text-sm text-gray-500">
              Information about the shipment package
            </p>
          </div>

        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* PACKAGE TYPE */}

          <div>
            <p className="text-sm text-gray-500">
              Package Type
            </p>

            <p className="mt-1 font-medium text-gray-800">
              {shipment.packageType || "N/A"}
            </p>
          </div>

          {/* WEIGHT */}

          <div>
            <p className="text-sm text-gray-500">
              Weight
            </p>

            <p className="mt-1 font-medium text-gray-800">
              {shipment.weight
                ? `${shipment.weight} kg`
                : "N/A"}
            </p>
          </div>

          {/* TRACKING NUMBER */}

          <div>
            <p className="text-sm text-gray-500">
              Tracking Number
            </p>

            <p className="mt-1 font-medium text-gray-800">
              {shipment.trackingNumber || "N/A"}
            </p>
          </div>

          {/* DESCRIPTION */}

          <div className="sm:col-span-2 lg:col-span-3">

            <p className="text-sm text-gray-500">
              Description
            </p>

            <p className="mt-1 font-medium text-gray-800">
              {shipment.description ||
                "No description provided."}
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          SERVICE DETAILS
      ===================================================== */}

      <div className="mt-6 rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-green-50">
            <IndianRupee
              size={19}
              className="text-green-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-black">
              Service Details
            </h2>

            <p className="text-sm text-gray-500">
              Courier service selected for this shipment
            </p>
          </div>

        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* SERVICE TYPE */}

          <div>
            <p className="text-sm text-gray-500">
              Service Type
            </p>

            <p className="mt-1 font-medium text-gray-800">
              {shipment.service?.name || "N/A"}
            </p>
          </div>

          {/* SERVICE PRICE */}

          <div>
            <p className="text-sm text-gray-500">
              Service Price
            </p>

            <div className="mt-1 flex items-center gap-1 font-semibold text-green-600">

              <IndianRupee size={16} />

              <span>
                {shipment.service?.price !== undefined &&
                shipment.service?.price !== null
                  ? Number(
                      shipment.service.price
                    ).toFixed(2)
                  : "N/A"}
              </span>

            </div>
          </div>

        

        </div>

      </div>


      <div className="mt-6 rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

        <div>
          <h2 className="text-xl font-semibold text-black">
            Tracking History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Shipment progress from booking to delivery
          </p>
        </div>

        <div className="mt-8">

          {trackingLoading ? (

            <div className="flex items-center justify-center py-10">

              <div className="flex items-center gap-2 text-sm text-gray-500">

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Loading tracking history...

              </div>

            </div>

          ) : (

            trackingSteps.map((step, index) => {

              /*
               * Find this status in backend tracking history
               */

              const historyItem =
                trackingHistory.find(
                  (item) =>
                    item.status
                      ?.trim()
                      .toLowerCase() ===
                    step.toLowerCase()
                );

              /*
               * Current shipment status
               */

              const currentIndex =
                getStatusIndex(
                  shipment.status
                );

              /*
               * Step is completed if it is before
               * or equal to current shipment status
               */

              const completed =
                currentIndex >= 0 &&
                index <= currentIndex;

              /*
               * Current active status
               */

              const current =
                currentIndex === index;

              return (
                <div
                  key={step}
                  className="relative flex gap-4 pb-8 last:pb-0"
                >

                  {/* CONNECTING LINE */}

                  {index <
                    trackingSteps.length - 1 && (

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

                  {/* STATUS DETAILS */}

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

                      {/* Show date only when backend has this update */}

                      {historyItem && (
                        <span className="text-sm text-gray-500">

                          {historyItem.createdAt
                            ? new Date(
                                historyItem.createdAt
                              ).toLocaleString()
                            : historyItem.dateTime
                            ? new Date(
                                historyItem.dateTime
                              ).toLocaleString()
                            : "Date unavailable"}

                        </span>
                      )}

                    </div>

                    {/* IF UPDATE EXISTS */}

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

                      /*
                       * If backend doesn't have the update yet,
                       * still show the step as Pending.
                       */

                      <p className="mt-1 text-sm text-gray-400">
                        {completed
                          ? "Completed"
                          : "Pending"}
                      </p>

                    )}

                  </div>

                </div>
              );
            })

          )}

        </div>

      </div>

    </div>
  );
};

export default AdminShipmentDetails;
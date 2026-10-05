import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const AdminEditShipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary data - replace with API data later
  const [status, setStatus] = useState("In Transit");

  const shipment = {
    trackingNumber: "CR102458",
    customerName: "Rahul Kumar",
    origin: "Hyderabad",
    destination: "Mumbai",
    packageType: "Document",
    weight: "2.5 kg",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updating shipment:", id);
    console.log("New status:", status);

    // API PUT/PATCH request will be added here later

    navigate(`/admin/shipments/${id}`);
  };

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
              {shipment.trackingNumber}
            </p>
          </div>

          {/* Customer */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Customer
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.customerName}
            </p>
          </div>

          {/* Origin */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Origin
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.origin}
            </p>
          </div>

          {/* Destination */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Destination
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.destination}
            </p>
          </div>

          {/* Package Type */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Package Type
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.packageType}
            </p>
          </div>

          {/* Weight */}
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">
              Weight
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {shipment.weight}
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
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-[5px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-black"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="In Transit">
                In Transit
              </option>

              <option value="Delivered">
                Delivered
              </option>
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
                  : "bg-yellow-100 text-yellow-700"
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
            className="w-full rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
          >
            Update Status
          </button>

        </div>

      </form>

    </div>
  );
};

export default AdminEditShipment;
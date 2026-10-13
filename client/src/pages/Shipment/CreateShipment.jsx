import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Send,
  User,
  MapPin,
} from "lucide-react";

import { createShipment } from "../../services/ShipmentServices";
import { getActiveServices } from "../../services/ServiceServices";

const CreateShipment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Sender
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderPincode: "",

    // Receiver
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverPincode: "",

    // Package
    packageType: "",
    weight: "",
    description: "",

    // Service
    serviceId: "",
  });

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH SERVICES =================

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getActiveServices();

        setServices(response.service || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setError("Failed to load services");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SELECTED SERVICE =================

  const selectedService = services.find(
    (service) => service._id === formData.serviceId
  );

  // ================= CREATE SHIPMENT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!formData.serviceId) {
        setError("Please select a service");
        setLoading(false);
        return;
      }

      await createShipment(formData);

      // Show success animation
      setSuccess(true);

      // Redirect after animation
      setTimeout(() => {
        navigate("/shipments");
      }, 2500);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create shipment"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= INPUT STYLE =================

  const inputClass =
    "w-full rounded-[5px] border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black";

  return (
    <>
      {/* ================================================= */}
      {/* SUCCESS ANIMATION */}
      {/* ================================================= */}

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-md rounded-xl bg-white p-8 text-center">

            {/* Truck Animation */}
            <div className="relative mx-auto mb-6 h-24 w-full overflow-hidden">

              {/* Road */}
              <div className="absolute bottom-3 left-0 w-full border-b-4 border-gray-300">
                <div className="border-b-2 border-dashed border-gray-500" />
              </div>

              {/* Truck */}
              <div className="absolute bottom-5 animate-[truckMove_2s_ease-in-out_infinite] text-5xl">
                🚚
              </div>
            </div>

            {/* Success Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl font-bold text-green-600">
                ✓
              </span>
            </div>

            {/* Success Message */}
            <h2 className="text-xl font-bold text-green-600">
              Shipment Created Successfully!
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your shipment has been created successfully.
            </p>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MAIN PAGE */}
      {/* ================================================= */}

      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto max-w-5xl">

          {/* ================= HEADER ================= */}

          <div className="mb-8">

            <Link
              to="/shipments"
              className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
            >
              <ArrowLeft size={16} />
              Back to Shipments
            </Link>

            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              Shipment
            </p>

            <h1 className="mt-2 text-3xl font-bold text-black">
              Create Shipment
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Enter sender, receiver and package details to create
              your shipment.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* ================================================= */}
            {/* SENDER INFORMATION */}
            {/* ================================================= */}

            <div className="rounded-[5px] border border-gray-200 p-6 sm:p-8">

              <div className="mb-7 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
                  <User size={19} className="text-black" />
                </div>

                <div>
                  <h2 className="font-semibold text-black">
                    Sender Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Enter the sender's contact and address details.
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Sender Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Sender Name
                  </label>

                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    placeholder="Enter sender name"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Sender Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Sender Phone
                  </label>

                  <input
                    type="tel"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Sender Address */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black">
                    Pickup Address
                  </label>

                  <textarea
                    name="senderAddress"
                    value={formData.senderAddress}
                    onChange={handleChange}
                    placeholder="Enter complete pickup address"
                    rows="3"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Sender City */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    City
                  </label>

                  <input
                    type="text"
                    name="senderCity"
                    value={formData.senderCity}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Sender State */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    State
                  </label>

                  <input
                    type="text"
                    name="senderState"
                    value={formData.senderState}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Sender Pincode */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="senderPincode"
                    value={formData.senderPincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    required
                    className={inputClass}
                  />
                </div>

              </div>
            </div>

            {/* ================================================= */}
            {/* RECEIVER INFORMATION */}
            {/* ================================================= */}

            <div className="mt-6 rounded-[5px] border border-gray-200 p-6 sm:p-8">

              <div className="mb-7 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
                  <MapPin size={19} className="text-black" />
                </div>

                <div>
                  <h2 className="font-semibold text-black">
                    Receiver Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Enter the receiver's contact and delivery details.
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Receiver Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Receiver Name
                  </label>

                  <input
                    type="text"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleChange}
                    placeholder="Enter receiver name"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Receiver Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Receiver Phone
                  </label>

                  <input
                    type="tel"
                    name="receiverPhone"
                    value={formData.receiverPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Receiver Address */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black">
                    Delivery Address
                  </label>

                  <textarea
                    name="receiverAddress"
                    value={formData.receiverAddress}
                    onChange={handleChange}
                    placeholder="Enter complete delivery address"
                    rows="3"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Receiver City */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    City
                  </label>

                  <input
                    type="text"
                    name="receiverCity"
                    value={formData.receiverCity}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Receiver State */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    State
                  </label>

                  <input
                    type="text"
                    name="receiverState"
                    value={formData.receiverState}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Receiver Pincode */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="receiverPincode"
                    value={formData.receiverPincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    required
                    className={inputClass}
                  />
                </div>

              </div>
            </div>

            {/* ================================================= */}
            {/* PACKAGE INFORMATION */}
            {/* ================================================= */}

            <div className="mt-6 rounded-[5px] border border-gray-200 p-6 sm:p-8">

              <div className="mb-7 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
                  <Package size={19} className="text-black" />
                </div>

                <div>
                  <h2 className="font-semibold text-black">
                    Package Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Enter the details of the package.
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Package Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Package Type
                  </label>

                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">
                      Select package type
                    </option>

                    <option value="Document">
                      Document
                    </option>

                    <option value="Parcel">
                      Parcel
                    </option>

                    <option value="Box">
                      Box
                    </option>
                  </select>
                </div>

                {/* Weight */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Weight (kg)
                  </label>

                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter package weight"
                    min="0"
                    step="0.1"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-black">
                    Package Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the package contents"
                    rows="3"
                    className={inputClass}
                  />
                </div>

              </div>
            </div>

            {/* ================================================= */}
            {/* DELIVERY SERVICE */}
            {/* ================================================= */}

            <div className="mt-6 rounded-[5px] border border-gray-200 p-6 sm:p-8">

              <div className="mb-7 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
                  <Send size={19} className="text-black" />
                </div>

                <div>
                  <h2 className="font-semibold text-black">
                    Delivery Service
                  </h2>

                  <p className="text-sm text-gray-500">
                    Select a delivery service for your shipment.
                  </p>
                </div>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Service */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Select Service
                  </label>

                  <select
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    required
                    disabled={loadingServices}
                    className={inputClass}
                  >
                    <option value="">
                      {loadingServices
                        ? "Loading services..."
                        : "Select delivery service"}
                    </option>

                    {services.map((service) => (
                      <option
                        key={service._id}
                        value={service._id}
                      >
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Price
                  </label>

                  <div className={inputClass}>
                    {selectedService
                      ? `₹${selectedService.price}`
                      : "Select a service"}
                  </div>
                </div>

                {/* Estimated Delivery */}
                {selectedService && (
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-black">
                      Estimated Delivery
                    </label>

                    <div className={inputClass}>
                      {selectedService.estimatedDelivery}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <div className="mt-5 rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* ================================================= */}
            {/* ACTION BUTTONS */}
            {/* ================================================= */}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <Link
                to="/shipments"
                className="rounded-[5px] border border-gray-300 px-6 py-3 text-center text-sm font-medium text-black transition hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading || success}
                className="rounded-[5px] bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Shipment"}
              </button>

            </div>

          </form>
        </div>
      </main>

      {/* ================================================= */}
      {/* TRUCK ANIMATION CSS */}
      {/* ================================================= */}

      <style>
        {`
          @keyframes truckMove {
            0% {
              left: -20%;
            }

            100% {
              left: 110%;
            }
          }
        `}
      </style>
    </>
  );
};

export default CreateShipment;
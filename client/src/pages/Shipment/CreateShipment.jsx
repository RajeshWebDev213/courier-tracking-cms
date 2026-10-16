import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShipment } from "../../services/ShipmentServices";
import { getActiveServices } from "../../services/ServiceServices";

const CreateShipment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderPincode: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverPincode: "",
    packageType: "",
    weight: "",
    description: "",
    serviceId: "",
  });

  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        setError("");

        const response = await getActiveServices();

        const serviceList =
          response?.services ||
          response?.service ||
          response?.data ||
          [];

        setServices(Array.isArray(serviceList) ? serviceList : []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices([]);
        setError("Failed to load services");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // After success, let the truck animation play, then go to the shipments page
  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      navigate("/shipments");
    }, 2500);

    return () => clearTimeout(timer);
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.senderName.trim()) {
      newErrors.senderName = "Sender name is required";
    }

    if (!formData.senderPhone.trim()) {
      newErrors.senderPhone = "Sender phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.senderPhone)) {
      newErrors.senderPhone = "Enter a valid 10-digit phone number";
    }

    if (!formData.senderAddress.trim()) {
      newErrors.senderAddress = "Sender address is required";
    }

    if (!formData.senderCity.trim()) {
      newErrors.senderCity = "Sender city is required";
    }

    if (!formData.senderState.trim()) {
      newErrors.senderState = "Sender state is required";
    }

    if (!formData.senderPincode.trim()) {
      newErrors.senderPincode = "Sender pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.senderPincode)) {
      newErrors.senderPincode = "Enter a valid 6-digit pincode";
    }

    if (!formData.receiverName.trim()) {
      newErrors.receiverName = "Receiver name is required";
    }

    if (!formData.receiverPhone.trim()) {
      newErrors.receiverPhone = "Receiver phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.receiverPhone)) {
      newErrors.receiverPhone = "Enter a valid 10-digit phone number";
    }

    if (!formData.receiverAddress.trim()) {
      newErrors.receiverAddress = "Receiver address is required";
    }

    if (!formData.receiverCity.trim()) {
      newErrors.receiverCity = "Receiver city is required";
    }

    if (!formData.receiverState.trim()) {
      newErrors.receiverState = "Receiver state is required";
    }

    if (!formData.receiverPincode.trim()) {
      newErrors.receiverPincode = "Receiver pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.receiverPincode)) {
      newErrors.receiverPincode = "Enter a valid 6-digit pincode";
    }

    if (!formData.packageType) {
      newErrors.packageType = "Package type is required";
    }

    if (!formData.weight) {
      newErrors.weight = "Weight is required";
    } else if (Number(formData.weight) <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    }

    if (!formData.serviceId) {
      newErrors.serviceId = "Please select a delivery service";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const selectedService = services.find(
    (service) => service._id === formData.serviceId
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      const shipmentData = {
        sender: {
          name: formData.senderName,
          phone: formData.senderPhone,
          address: formData.senderAddress,
          city: formData.senderCity,
          state: formData.senderState,
          pincode: formData.senderPincode,
        },

        receiver: {
          name: formData.receiverName,
          phone: formData.receiverPhone,
          address: formData.receiverAddress,
          city: formData.receiverCity,
          state: formData.receiverState,
          pincode: formData.receiverPincode,
        },

        packageType: formData.packageType,
        weight: Number(formData.weight),
        description: formData.description,
        serviceId: formData.serviceId,
      };

      await createShipment(shipmentData);

      setSuccess(true);
    } catch (error) {
      console.error("Failed to create shipment:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create shipment"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-[5px] border bg-white px-4 py-3 text-sm text-black outline-none transition focus:outline-none ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-gray-300 focus:border-black"
    }`;

  const sectionClass =
    "rounded-[5px] border border-gray-200 bg-white p-6 sm:p-8";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black">
            Create Shipment
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new shipment by entering the required details.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <section className={sectionClass}>
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-lg font-semibold text-black">
                Sender Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the sender's contact and address information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sender Name
                </label>

                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  className={inputClass("senderName")}
                  placeholder="Enter sender name"
                />

                {errors.senderName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.senderName}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sender Phone
                </label>

                <input
                  type="tel"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  maxLength="10"
                  inputMode="numeric"
                  className={inputClass("senderPhone")}
                  placeholder="Enter sender phone"
                />

                {errors.senderPhone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.senderPhone}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sender Address
                </label>

                <textarea
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleChange}
                  rows="3"
                  className={inputClass("senderAddress")}
                  placeholder="Enter sender address"
                />

                {errors.senderAddress && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.senderAddress}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sender City
                </label>

                <input
                  type="text"
                  name="senderCity"
                  value={formData.senderCity}
                  onChange={handleChange}
                  className={inputClass("senderCity")}
                  placeholder="Enter sender city"
                />

                {errors.senderCity && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.senderCity}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sender State
                </label>

                <input
                  type="text"
                  name="senderState"
                  value={formData.senderState}
                  onChange={handleChange}
                  className={inputClass("senderState")}
                  placeholder="Enter sender state"
                />

                {errors.senderState && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.senderState}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sender Pincode
                </label>

                <input
                  type="text"
                  name="senderPincode"
                  value={formData.senderPincode}
                  onChange={handleChange}
                  maxLength="6"
                  inputMode="numeric"
                  className={inputClass("senderPincode")}
                  placeholder="Enter sender pincode"
                />

                {errors.senderPincode && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.senderPincode}
                  </p>
                )}
              </div>

            </div>
          </section>

          <section className={sectionClass}>
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-lg font-semibold text-black">
                Receiver Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the receiver's contact and delivery information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Receiver Name
                </label>

                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  className={inputClass("receiverName")}
                  placeholder="Enter receiver name"
                />

                {errors.receiverName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.receiverName}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Receiver Phone
                </label>

                <input
                  type="tel"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleChange}
                  maxLength="10"
                  inputMode="numeric"
                  className={inputClass("receiverPhone")}
                  placeholder="Enter receiver phone"
                />

                {errors.receiverPhone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.receiverPhone}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Receiver Address
                </label>

                <textarea
                  name="receiverAddress"
                  value={formData.receiverAddress}
                  onChange={handleChange}
                  rows="3"
                  className={inputClass("receiverAddress")}
                  placeholder="Enter receiver address"
                />

                {errors.receiverAddress && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.receiverAddress}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Receiver City
                </label>

                <input
                  type="text"
                  name="receiverCity"
                  value={formData.receiverCity}
                  onChange={handleChange}
                  className={inputClass("receiverCity")}
                  placeholder="Enter receiver city"
                />

                {errors.receiverCity && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.receiverCity}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Receiver State
                </label>

                <input
                  type="text"
                  name="receiverState"
                  value={formData.receiverState}
                  onChange={handleChange}
                  className={inputClass("receiverState")}
                  placeholder="Enter receiver state"
                />

                {errors.receiverState && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.receiverState}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Receiver Pincode
                </label>

                <input
                  type="text"
                  name="receiverPincode"
                  value={formData.receiverPincode}
                  onChange={handleChange}
                  maxLength="6"
                  inputMode="numeric"
                  className={inputClass("receiverPincode")}
                  placeholder="Enter receiver pincode"
                />

                {errors.receiverPincode && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.receiverPincode}
                  </p>
                )}
              </div>

            </div>
          </section>

          <section className={sectionClass}>
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-lg font-semibold text-black">
                Package Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Provide information about the package being shipped.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Package Type
                </label>

                <select
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  className={inputClass("packageType")}
                >
                  <option value="">Select package type</option>
                  <option value="Document">Document</option>
                  <option value="Parcel">Parcel</option>
                  <option value="Fragile">Fragile</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Other">Other</option>
                </select>

                {errors.packageType && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.packageType}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Weight
                </label>

                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  className={inputClass("weight")}
                  placeholder="Enter weight"
                />

                {errors.weight && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.weight}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={inputClass("description")}
                  placeholder="Enter package description"
                />
              </div>

            </div>
          </section>

          <section className={sectionClass}>
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-lg font-semibold text-black">
                Delivery Service
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select the courier service for this shipment.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Service
              </label>

              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                disabled={loadingServices}
                className={inputClass("serviceId")}
              >
                <option value="">
                  {loadingServices
                    ? "Loading services..."
                    : services.length === 0
                    ? "No services available"
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

              {errors.serviceId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.serviceId}
                </p>
              )}
            </div>

            {selectedService && (
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                <div className="rounded-[5px] border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">
                    Service Price
                  </p>

                  <p className="mt-2 text-lg font-semibold text-black">
                    ₹{selectedService.price}
                  </p>
                </div>

                <div className="rounded-[5px] border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">
                    Estimated Delivery
                  </p>

                  <p className="mt-2 text-lg font-semibold text-black">
                    {selectedService.deliveryTime}
                  </p>
                </div>

              </div>
            )}
          </section>

          <section className="rounded-[5px] border border-gray-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-[5px] border border-black bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || success}
                className="rounded-[5px] border border-black bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Shipment"}
              </button>

            </div>
          </section>

        </form>
      </div>

      {/* Success popup with colorful truck animation */}
      {success && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
        >
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white text-center shadow-xl">

            {/* Scene */}
            <div
              className="relative h-40 w-full overflow-hidden"
              style={{
                background:
                  "linear-gradient(to bottom, #38bdf8 0%, #bae6fd 70%, #e0f2fe 100%)",
              }}
            >
              {/* Sun */}
              <div className="absolute right-6 top-4 h-10 w-10 rounded-full bg-yellow-300 shadow-[0_0_24px_8px_rgba(253,224,71,0.6)]" />

              {/* Clouds */}
              <div className="ship-cloud absolute top-5 h-5 w-14 rounded-full bg-white/90" style={{ animationDuration: "9s" }} />
              <div className="ship-cloud absolute top-12 h-4 w-10 rounded-full bg-white/80" style={{ animationDuration: "13s", animationDelay: "-5s" }} />

              {/* Hills */}
              <svg
                className="absolute bottom-6 left-0 w-full"
                viewBox="0 0 400 60"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 60 L0 35 Q60 5 120 32 T250 28 T400 30 L400 60 Z" fill="#4ade80" />
                <path d="M0 60 L0 48 Q80 28 160 46 T320 42 T400 46 L400 60 Z" fill="#22c55e" />
              </svg>

              {/* Road */}
              <div className="absolute bottom-0 left-0 h-6 w-full bg-gray-700">
                <div className="ship-road absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2" />
              </div>

              {/* Truck */}
              <div className="ship-truck absolute bottom-3">
                <div className="ship-bounce">
                  <svg width="130" height="66" viewBox="0 0 140 70" aria-hidden="true">
                    {/* speed lines */}
                    <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
                      <line x1="-14" y1="20" x2="-2" y2="20" />
                      <line x1="-22" y1="30" x2="-6" y2="30" />
                      <line x1="-12" y1="40" x2="-2" y2="40" />
                    </g>

                    {/* cargo box */}
                    <rect x="2" y="6" width="84" height="46" rx="4" fill="#3b82f6" />
                    <rect x="2" y="36" width="84" height="7" fill="#fbbf24" />
                    <rect x="2" y="6" width="84" height="6" rx="3" fill="#2563eb" />
                    <text
                      x="44"
                      y="29"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="800"
                      fill="#ffffff"
                      fontFamily="system-ui, sans-serif"
                    >
                      EXPRESS
                    </text>

                    {/* cab */}
                    <path d="M88 18 H116 L132 34 V52 H88 Z" fill="#ef4444" />
                    <path d="M104 22 H114 L126 34 H104 Z" fill="#bae6fd" />
                    <rect x="88" y="48" width="46" height="6" rx="2" fill="#b91c1c" />
                    <circle cx="130" cy="42" r="3" fill="#fde047" />

                    {/* chassis */}
                    <rect x="2" y="52" width="132" height="6" rx="2" fill="#1f2937" />

                    {/* wheels */}
                    {[24, 66, 112].map((cx) => (
                      <g key={cx}>
                        <circle cx={cx} cy="60" r="9" fill="#111827" />
                        <g className="ship-wheel" style={{ transformOrigin: `${cx}px 60px` }}>
                          <circle cx={cx} cy="60" r="5" fill="#d1d5db" />
                          <line x1={cx - 5} y1="60" x2={cx + 5} y2="60" stroke="#6b7280" strokeWidth="1.5" />
                          <line x1={cx} y1="55" x2={cx} y2="65" stroke="#6b7280" strokeWidth="1.5" />
                        </g>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="p-8">
              <div className="ship-pop mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl font-bold text-green-600">✓</span>
              </div>

              <h2 className="text-xl font-bold text-green-600">
                Shipment Created Successfully!
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Your shipment is on its way. Taking you to your shipments...
              </p>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes shipTruckMove {
            0%   { left: -40%; }
            100% { left: 110%; }
          }
          @keyframes shipBounce {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-2px); }
          }
          @keyframes shipWheel {
            to { transform: rotate(360deg); }
          }
          @keyframes shipRoad {
            to { background-position: -40px 0; }
          }
          @keyframes shipCloud {
            0%   { left: 110%; }
            100% { left: -25%; }
          }
          @keyframes shipPop {
            0%   { transform: scale(0); opacity: 0; }
            70%  { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); }
          }

          .ship-truck  { animation: shipTruckMove 2.4s ease-in-out infinite; }
          .ship-bounce { animation: shipBounce 0.3s ease-in-out infinite; }
          .ship-wheel  { animation: shipWheel 0.5s linear infinite; }
          .ship-road {
            background-image: repeating-linear-gradient(
              to right, #facc15 0 20px, transparent 20px 40px
            );
            background-size: 40px 3px;
            animation: shipRoad 0.5s linear infinite;
          }
          .ship-cloud { animation-name: shipCloud; animation-timing-function: linear; animation-iteration-count: infinite; }
          .ship-pop   { animation: shipPop 0.5s ease-out both; }

          @media (prefers-reduced-motion: reduce) {
            .ship-truck  { animation: none; left: 35%; }
            .ship-bounce, .ship-wheel, .ship-road, .ship-cloud { animation: none; }
            .ship-cloud  { left: 20%; }
          }
        `}
      </style>
    </div>
  );
};

export default CreateShipment;
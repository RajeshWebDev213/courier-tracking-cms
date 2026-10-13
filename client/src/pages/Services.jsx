import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Package } from "lucide-react";

import { getAllServices } from "../services/ServiceServices";

const ServiceCard = ({ service, index }) => {
  const isActive = service.status === "active";

  return (
    <Link
      to="/create-shipment"
      className="
        group
        relative
        flex
        min-h-[390px]
        flex-col
        rounded-[5px]
        border
        border-gray-200
        bg-gray-50
        p-7
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-gray-300
        hover:bg-white
        hover:shadow-lg
      "
    >
      {/* ================= TOP ================= */}
      <div className="flex items-start justify-between">
        {/* Service Number */}
        <span
          className="
            text-5xl
            font-light
            tracking-tight
            text-gray-300
            transition
            duration-300
            group-hover:text-gray-500
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Arrow */}
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-gray-200
            text-gray-600
            transition-all
            duration-300
            group-hover:bg-black
            group-hover:text-white
          "
        >
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="mt-10">
        {/* Status */}
        <span
          className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            px-3
            py-1.5
            text-xs
            font-semibold
            ${
              isActive
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }
          `}
        >
          <span
            className={`
              h-2
              w-2
              rounded-full
              ${isActive ? "bg-green-500" : "bg-red-500"}
            `}
          />

          {isActive ? "Active" : "Inactive"}
        </span>

        {/* Service Name */}
        <h2 className="mt-5 text-xl font-semibold tracking-tight text-black">
          {service.name}
        </h2>

        {/* Description */}
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-600">
          {service.description}
        </p>
      </div>

      {/* ================= PRICE + DELIVERY ================= */}
      <div
        className="
          mt-auto
          flex
          items-end
          justify-between
          gap-5
          border-t
          border-gray-200
          pt-5
        "
      >
        {/* Price */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Price
          </p>

          <p className="mt-1 text-lg font-semibold text-black">
            ₹{service.price}
          </p>
        </div>

        {/* Delivery Time */}
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Delivery
          </p>

          <p className="mt-1 text-sm font-semibold text-black">
            {service.deliveryTime}
          </p>
        </div>
      </div>

      {/* ================= BOTTOM LINK ================= */}
      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          text-sm
          font-semibold
          text-black
        "
      >
        <span>Choose service</span>

        <span
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        >
          →
        </span>
      </div>
    </Link>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllServices();

        const list = response?.services || response?.data || [];

        setServices(list);
      } catch (err) {
        console.error("Failed to fetch services:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load services. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="border-b border-gray-200 bg-white">
        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            py-5
            sm:py-20
            lg:px-8
            lg:py-5
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* Hero Content */}
            <div className="max-w-3xl">
              {/* Small Label */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-gray-200
                  bg-gray-50
                  px-3
                  py-1.5
                "
              >
                <Package size={14} className="text-gray-500" />

                <span
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-widest
                    text-gray-500
                  "
                >
                  ParcelFlow Services
                </span>
              </div>

              {/* Heading */}
              <h1
                className="
                  mt-6
                  text-4xl
                  font-bold
                  tracking-[-0.04em]
                  text-black
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Delivery made
                <span className="text-gray-400"> simple.</span>
              </h1>

              {/* Description */}
              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-7
                  text-gray-500
                  sm:text-lg
                "
              >
                Choose the right delivery service for your
                package. Compare pricing and delivery times
                before creating your shipment.
              </p>
            </div>

            {/* Service Count */}
            <div className="border-l-2 border-black pl-5">
              <p className="text-3xl font-bold tracking-tight text-black">
                {services.length}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                delivery services available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SERVICES */}
      {/* ===================================================== */}

      <section className="bg-white px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div
            className="
              mb-8
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-gray-400
                "
              >
                Available Services
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  tracking-tight
                  text-black
                  sm:text-3xl
                "
              >
                Choose what works for you.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-gray-500">
              Reliable delivery options for everyday,
              urgent, and long-distance shipments.
            </p>
          </div>

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="
                    min-h-[390px]
                    animate-pulse
                    rounded-[5px]
                    border
                    border-gray-200
                    bg-gray-50
                    p-7
                  "
                >
                  {/* Number */}
                  <div className="h-12 w-16 rounded bg-gray-200" />

                  {/* Arrow */}
                  <div className="ml-auto -mt-10 h-10 w-10 rounded-full bg-gray-200" />

                  {/* Status */}
                  <div className="mt-10 h-7 w-20 rounded-full bg-gray-200" />

                  {/* Title */}
                  <div className="mt-5 h-6 w-40 rounded bg-gray-200" />

                  {/* Description */}
                  <div className="mt-4 h-3 w-full rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-4/5 rounded bg-gray-200" />

                  {/* Bottom */}
                  <div className="mt-16 border-t border-gray-200 pt-5">
                    <div className="flex justify-between">
                      <div className="h-8 w-20 rounded bg-gray-200" />
                      <div className="h-8 w-24 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {!loading && error && (
            <div
              className="
                rounded-[5px]
                border
                border-red-200
                bg-red-50
                px-6
                py-16
                text-center
              "
            >
              <p className="text-sm font-semibold text-red-700">
                {error}
              </p>

              <p className="mt-2 text-sm text-red-600">
                Please refresh the page and try again.
              </p>
            </div>
          )}

          {/* ================================================= */}
          {/* SERVICES GRID */}
          {/* ================================================= */}

          {!loading && !error && services.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* ================================================= */}
          {/* EMPTY */}
          {/* ================================================= */}

          {!loading && !error && services.length === 0 && (
            <div
              className="
                rounded-[5px]
                border
                border-dashed
                border-gray-300
                bg-gray-50
                px-6
                py-20
                text-center
              "
            >
              <Package
                size={32}
                className="mx-auto text-gray-400"
              />

              <p className="mt-4 text-sm font-semibold text-black">
                No services available
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================== */}
      {/* CTA */}
      {/* ===================================================== */}

      <section className="bg-white px-6 pb-16 lg:px-8 lg:pb-20">
        <div
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[5px]
            bg-black
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8
              px-6
              py-10
              sm:px-10
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:px-14
              lg:py-12
            "
          >
            {/* CTA Content */}
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-gray-500
                "
              >
                Get Started
              </p>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-3xl
                "
              >
                Ready to send your package?
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
                Select a service and create your shipment
                in just a few steps.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              to="/create-shipment"
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-[5px]
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-gray-200
              "
            >
              Create Shipment
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { getAllServices } from "../../services/ServiceServices";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();

        const list = response?.services || response?.data || [];

        // Show only first 3 services on Home page
        setServices(list.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="w-full bg-white px-6 py-5 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Our Services
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              Delivery solutions made simple.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              Choose the right delivery service for your package and
              destination.
            </p>
          </div>

          <Link
            to="/services"
            className="
              inline-flex
              w-fit
              items-center
              gap-1
              text-sm
              font-semibold
              text-black
              underline
              underline-offset-4
              transition
              hover:text-gray-500
            "
          >
            View all services
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* ================= SERVICES ================= */}
        {loading ? (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  min-h-[330px]
                  animate-pulse
                  rounded-[5px]
                  border
                  border-gray-200
                  bg-gray-50
                  p-7
                "
              >
                <div className="h-12 w-16 rounded bg-gray-200" />

                <div className="mt-10 h-6 w-40 rounded bg-gray-200" />

                <div className="mt-4 h-3 w-full rounded bg-gray-200" />
                <div className="mt-2 h-3 w-4/5 rounded bg-gray-200" />

                <div className="mt-12 border-t border-gray-200 pt-5">
                  <div className="h-3 w-12 rounded bg-gray-200" />
                  <div className="mt-2 h-5 w-20 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {services.map((service, index) => (
              <Link
                key={service._id}
                to="/services"
                className="
                  group
                  relative
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

                  {/* Number */}
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
                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-black">
                    {service.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </div>

                {/* ================= BOTTOM ================= */}
                <div
                  className="
                    mt-8
                    flex
                    items-end
                    justify-between
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

                    <p className="mt-1 text-base font-semibold text-black">
                      ₹{service.price}
                    </p>
                  </div>

                  {/* Delivery */}
                  <div className="text-right">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Delivery
                    </p>

                    <p className="mt-1 text-sm font-semibold text-black">
                      {service.deliveryTime}
                    </p>
                  </div>

                  {/* Learn More */}
                  <span
                    className="
                      absolute
                      bottom-2
                      left-7
                      text-sm
                      font-semibold
                      text-black
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:opacity-100
                    "
                  >
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="
              mt-12
              rounded-[5px]
              border
              border-gray-200
              bg-gray-50
              px-6
              py-16
              text-center
            "
          >
            <p className="text-sm font-medium text-gray-600">
              No services available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
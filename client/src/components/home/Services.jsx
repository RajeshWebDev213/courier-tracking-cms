import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Express Delivery",
    description:
      "Fast and reliable delivery for packages that need to reach their destination quickly.",
    price: "Starting from ₹149",
    path: "/services#express-delivery",
  },
  {
    number: "02",
    title: "Standard Delivery",
    description:
      "Affordable and dependable courier delivery for your everyday shipments.",
    price: "Starting from ₹99",
    path: "/services#standard-delivery",
  },
  {
    number: "03",
    title: "International Shipping",
    description:
      "Send packages across borders with reliable international courier services.",
    price: "Starting from ₹999",
    path: "/services#international-shipping",
  },
];

const Services = () => {
  return (
    <section className="w-full bg-white px-6 pt-8 pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
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
            className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-black underline underline-offset-4 transition hover:text-gray-500"
          >
            View all services
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Service Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.number}
              to={service.path}
              className="group rounded-[5px] border border-gray-300 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-black hover:shadow-md"
            >
              {/* Number */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-400">
                  {service.number}
                </p>

                <ArrowUpRight
                  size={20}
                  className="text-gray-400 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black"
                />
              </div>

              {/* Title */}
              <h3 className="mt-8 text-xl font-semibold text-black">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {service.description}
              </p>

              {/* Price */}
              <div className="mt-7 border-t border-gray-200 pt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Price
                </p>

                <p className="mt-1 text-lg font-semibold text-black">
                  {service.price}
                </p>
              </div>

              {/* Learn More */}
              <div className="mt-6 text-sm font-semibold text-black">
                Learn more →
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
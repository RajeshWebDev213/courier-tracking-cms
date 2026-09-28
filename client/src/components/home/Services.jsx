import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Express Delivery",
    description:
      "Fast and reliable delivery for packages that need to reach their destination quickly.",
  },
  {
    number: "02",
    title: "Standard Delivery",
    description:
      "Affordable and dependable courier delivery for your everyday shipments.",
  },
  {
    number: "03",
    title: "International Shipping",
    description:
      "Send packages across borders with reliable international courier services.",
  },
];

const Services = () => {
  return (
    <section className="w-full bg-white px-6 pt-8 pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
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
              text-sm
              font-semibold
              text-black
              underline
              underline-offset-4
              transition
              hover:text-gray-600
            "
          >
            View all services →
          </Link>

        </div>

        {/* Services Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

          {services.map((service) => (
            <div
              key={service.number}
              className="
                group
                rounded-[5px]
                border
                border-gray-300
                bg-white
                p-7
                transition
                duration-300
                hover:border-black
              "
            >
              {/* Number */}
              <p className="text-sm font-medium text-gray-400">
                {service.number}
              </p>

              {/* Title */}
              <h3 className="mt-8 text-xl font-semibold text-black">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="mt-8 text-lg text-black transition-transform duration-300 group-hover:translate-x-1">
                →
              </div>
            </div>

          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;
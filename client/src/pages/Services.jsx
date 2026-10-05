import { Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Clock,
  ShieldCheck,
  MapPin,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "express-delivery",
      number: "01",
      title: "Express Delivery",
      description:
        "Fast and reliable delivery for packages that need to reach their destination quickly.",
      details:
        "Express Delivery is designed for urgent shipments that need priority handling and faster delivery. It is suitable for important documents, business packages, and time-sensitive deliveries.",
      price: "₹149",
      priceText: "Starting from",
      features: [
        "Priority shipment handling",
        "Faster delivery",
        "Real-time shipment tracking",
        "Secure package handling",
      ],
    },

    {
      id: "standard-delivery",
      number: "02",
      title: "Standard Delivery",
      description:
        "Affordable and dependable courier delivery for your everyday shipments.",
      details:
        "Standard Delivery is a cost-effective option for regular shipments. It provides reliable package handling and tracking for everyday deliveries.",
      price: "₹99",
      priceText: "Starting from",
      features: [
        "Affordable delivery",
        "Reliable shipment handling",
        "Shipment tracking",
        "Secure package delivery",
      ],
    },

    {
      id: "international-shipping",
      number: "03",
      title: "International Shipping",
      description:
        "Send packages across borders with reliable international courier services.",
      details:
        "International Shipping allows you to send packages to destinations outside the country. Your shipment can be tracked throughout its international journey.",
      price: "₹999",
      priceText: "Starting from",
      features: [
        "International shipment handling",
        "Cross-border delivery",
        "International tracking",
        "Secure package handling",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">

      {/* ================= HERO ================= */}
      <section className="border-b border-gray-100 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              Our Services
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Courier services built
              <br />
              around your needs.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              Choose the delivery service that fits your shipment. From
              urgent deliveries to international shipping, we provide
              reliable solutions for your packages.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">

          <div className="space-y-20">

            {services.map((service) => (
              <section
                key={service.id}
                id={service.id}
                className="scroll-mt-24 border-b border-gray-200 pb-20 last:border-b-0"
              >
                {/* Service Content */}
                <div>

                  {/* Number */}
                  <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
                    Service {service.number}
                  </p>

                  {/* Title */}
                  <h2 className="mt-3 text-3xl font-bold text-black sm:text-4xl">
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-4 text-base font-medium leading-7 text-gray-700">
                    {service.description}
                  </p>

                  {/* Details */}
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
                    {service.details}
                  </p>

                  {/* Price */}
                  <div className="mt-6 inline-flex items-center gap-5 rounded-[5px] border border-gray-200 bg-white px-5 py-4">
                    <div>
                      <p className="text-xs text-gray-500">
                        {service.priceText}
                      </p>

                      <p className="mt-1 text-2xl font-bold text-black">
                        {service.price}
                      </p>
                    </div>

                    <div className="h-10 w-px bg-gray-200" />

                    <p className="max-w-[180px] text-xs leading-5 text-gray-500">
                      Final price may vary based on package weight,
                      destination and delivery requirements.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle
                          size={18}
                          className="mt-0.5 shrink-0 text-gray-700"
                        />

                        <span className="text-sm text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={17} className="text-gray-500" />
                      Reliable Service
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ShieldCheck size={17} className="text-gray-500" />
                      Secure Handling
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={17} className="text-gray-500" />
                      Track Shipment
                    </div>

                  </div>

                  {/* CTA */}
                  <Link
                    to="/create-shipment"
                    className="mt-8 inline-flex items-center gap-2 rounded-[5px] bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Create Shipment
                    <ArrowRight size={16} />
                  </Link>

                </div>
              </section>
            ))}

          </div>

        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="border-t border-gray-100 bg-black px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm uppercase tracking-widest text-gray-400">
            Get Started
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Ready to send your package?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400">
            Choose the service that fits your needs and create your
            shipment today.
          </p>

          <Link
            to="/create-shipment"
            className="mt-7 inline-flex items-center gap-2 rounded-[5px] bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-100"
          >
            Create Shipment
            <ArrowRight size={16} />
          </Link>

        </div>
      </section>

    </main>
  );
};

export default Services;
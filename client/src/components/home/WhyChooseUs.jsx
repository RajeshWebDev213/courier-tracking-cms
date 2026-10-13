import { ArrowUpRight } from "lucide-react";

const reasons = [
  {
    number: "01",
    title: "Real-Time Tracking",
    description:
      "Track your shipment and stay updated throughout its entire journey.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "02",
    title: "Reliable Delivery",
    description:
      "Get dependable delivery with clear and timely shipment updates.",
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "03",
    title: "Secure Handling",
    description:
      "Your package is handled carefully from pickup to final delivery.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "04",
    title: "Easy Management",
    description:
      "Create and manage your shipments easily from one simple platform.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-white px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Why Choose Us
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Everything you need for a simpler delivery experience.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            ParcelFlow makes it easier to create, manage, and track your
            shipments from pickup to delivery.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {reasons.map((reason) => (
            /* CHANGED: cards are now visible at rest.
               bg-white -> bg-gray-50, shadow-sm added
               hover: turns white, darker border (gray-300 instead of black), bigger shadow, lifts up */
            <div
              key={reason.number}
              className="group overflow-hidden rounded-[5px] border border-gray-200 bg-gray-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:bg-white hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={reason.image}
                  alt={reason.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Number */}
                <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-black shadow-sm">
                  {reason.number}
                </div>

                {/* Arrow */}
                <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm transition duration-300 group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Content */}
              {/* CHANGED: added border-t so the image and text area are clearly separated */}
              <div className="border-t border-gray-200 p-7">
                <h3 className="text-xl font-semibold text-black">
                  {reason.title}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
                  {reason.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-black">
                  Learn more →
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
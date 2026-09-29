const reasons = [
  {
    number: "01",
    title: "Real-Time Tracking",
    description:
      "Track your shipment and stay updated throughout its entire journey.",
  },
  {
    number: "02",
    title: "Reliable Delivery",
    description:
      "Get dependable delivery with clear and timely shipment updates.",
  },
  {
    number: "03",
    title: "Secure Handling",
    description:
      "Your package is handled carefully from pickup to final delivery.",
  },
  {
    number: "04",
    title: "Easy Management",
    description:
      "Create and manage your shipments easily from one simple platform.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-white px-6 py-16 lg:px-8">
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
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">

          {reasons.map((reason) => (
            <div
              key={reason.number}
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
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-400">
                  {reason.number}
                </span>

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    text-sm
                    text-black
                    transition
                    duration-300
                    group-hover:border-black
                    group-hover:bg-black
                    group-hover:text-white
                  "
                >
                  →
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-10 text-xl font-semibold text-black">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
                {reason.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
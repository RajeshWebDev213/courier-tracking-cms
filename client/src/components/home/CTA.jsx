import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="w-full bg-white px-6 py-16 lg:px-8">
      <div
        className="
          mx-auto
          max-w-7xl
          rounded-[5px]
          border
          border-black
          bg-black
          px-6
          py-12
          text-white
          sm:px-10
          lg:px-16
          lg:py-14
        "
      >
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

          {/* Content */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Get Started
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to send your package?
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-300">
              Create your shipment and stay connected with your package from
              pickup to delivery.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

            <Link
              to="/signup"
              className="
                inline-flex
                items-center
                justify-center
                rounded-[5px]
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-black
                transition
                duration-300
                hover:bg-gray-200
              "
            >
              Create Shipment
              <span className="ml-2">→</span>
            </Link>

            <Link
              to="/track"
              className="
                inline-flex
                items-center
                justify-center
                rounded-[5px]
                border
                border-gray-600
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition
                duration-300
                hover:border-white
              "
            >
              Track Parcel
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
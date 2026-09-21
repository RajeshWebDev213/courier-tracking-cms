import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.jpg"

const Hero = () => {
  return (
    <section className="min-h-screen w-full bg-white text-black">
      <div className="max-w-7xl mx-auto min-h-screen px-6 lg:px-8 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-24 pb-16">

          {/* Left Content */}
          <div className="w-full">

            {/* Heading */}
            <p
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
    
                leading-tight
                tracking-tight
              "
            >
              Track Every{" "}
              <span className="text-black">
                Parcel.
              </span>{" "}
              Anywhere.
            </p>

            {/* Description */}
            <p
              className="
                mt-6
                max-w-2xl
                text-base
                sm:text-lg
                md:text-xl
                leading-relaxed
                text-gray-600
              "
            >
              Track shipments in real time, manage deliveries, and stay
              connected from pickup to doorstep.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <Link
                to="/track"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-[5px]
                  bg-black
                  px-7
                  py-3.5
                  font-semibold
                  text-white
                  transition
                  duration-300
                  hover:bg-gray-800
                "
              >
                Track Your Parcel
                <span className="ml-2">
                  →
                </span>
              </Link>

              <Link
                to="/signup"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-[5px]
                  border
                  border-gray-300
                  bg-white
                  px-7
                  py-3.5
                  font-medium
                  text-black
                  transition
                  duration-300
                  hover:bg-gray-100
                "
              >
                Get Started
              </Link>

            </div>

            {/* Stats */}
            <div
              className="
                mt-12
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-6
                sm:gap-0
                sm:divide-x
                sm:divide-gray-200
                border-t
                border-gray-200
                pt-8
              "
            >

              {/* Stat 1 */}
              <div className="sm:pr-8">
                <h3 className="text-2xl md:text-3xl font-bold">
                  500K+
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Parcels Delivered
                </p>
              </div>

              {/* Stat 2 */}
              <div className="sm:px-8">
                <h3 className="text-2xl md:text-3xl font-bold">
                  10K+
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Customers
                </p>
              </div>

              {/* Stat 3 */}
              <div className="sm:pl-8">
                <h3 className="text-2xl md:text-3xl font-bold">
                  50+
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Cities
                </p>
              </div>

            </div>
          </div>

          {/* Right Hero Image */}
          <div className="w-full flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-xl">
              <img
                src={heroImage}
                alt="Courier parcel tracking"
                className="
                  w-full
                  h-auto
                  object-contain
                "
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;


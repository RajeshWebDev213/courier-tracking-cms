import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.jpg";
import useAuth from "../../hooks/useAuth";

const Hero = () => {
  const { user, isAuthenticated } = useAuth();

  const userName =
    user?.name || user?.username || user?.fullName || "User";

  return (
    
    <section className="flex min-h-[calc(100dvh-81px)] w-full items-center bg-white text-black ">
      <div className="mx-auto flex w-full max-w-7xl items-center px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-8 py-8 lg:grid-cols-2 lg:gap-12 lg:py-6">

          {/* Left Content */}
          <div className="w-full">

            {/* Welcome Message */}
            {isAuthenticated && (
              <p className="mb-4 text-xl font-semibold text-gray-600 md:text-2xl">
                Welcome back, {userName.split(" ")[0]}
              </p>
            )}

            {/* Main Heading */}
            <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl md:text-5xl lg:text-6xl">
              Track Every{" "}
              <span className="font-semibold">Parcel.</span>{" "}
              Anywhere.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-base md:text-lg">
              Track shipments in real time, manage deliveries, and stay
              connected from pickup to doorstep.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              {/* Track Parcel */}
              <Link
                to="/track-parcel"
                className="inline-flex items-center justify-center rounded-[5px] bg-black px-7 py-3.5 font-semibold text-white transition duration-300 hover:bg-gray-800"
              >
                Track Your Parcel
                <span className="ml-2">→</span>
              </Link>

              {/* Create Shipment / Get Started */}
              {isAuthenticated ? (
                <Link
                  to="/create-shipment"
                  className="inline-flex items-center justify-center rounded-[5px] border border-gray-300 bg-white px-7 py-3.5 font-medium text-black transition duration-300 hover:bg-gray-100"
                >
                  Create Shipment
                  <span className="ml-2">→</span>
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-[5px] border border-gray-300 bg-white px-7 py-3.5 font-medium text-black transition duration-300 hover:bg-gray-100"
                >
                  Get Started
                  <span className="ml-2">→</span>
                </Link>
              )}

            </div>
          </div>

          {/* Right Hero Image */}
          <div className="flex w-full items-center justify-center lg:justify-end">
            {/* CHANGED: max-w-xl -> lg:max-w-2xl so the image is bigger and fills the empty space */}
            <div className="w-full max-w-xl lg:max-w-2xl">
              {/* CHANGED: max-h-[60vh] -> max-h-[72vh] */}
              <img
                src={heroImage}
                alt="Courier parcel tracking"
                className="h-auto max-h-[72vh] w-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
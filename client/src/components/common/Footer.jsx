import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.png";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <img
                src={logo}
                alt="ParcelFlow Logo"
                className="h-12 w-12 object-contain"
              />

              <div>
                <p
                  className="text-lg tracking-[0.12em] text-black"
                  style={{ fontFamily: "Michroma, sans-serif" }}
                >
                  PERCELFLOW
                </p>

                <p className="mt-0.5 text-[6px] font-medium tracking-[0.25em] text-gray-500">
                  COURIER TRACKING SYSTEM
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-600">
              Simple and reliable courier tracking from pickup to delivery.
              Manage your shipments and stay updated every step of the way.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-black">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/"
                className="text-sm text-gray-600 transition hover:text-black"
              >
                Home
              </Link>

              <Link
                to="/track"
                className="text-sm text-gray-600 transition hover:text-black"
              >
                Track Parcel
              </Link>

              <Link
                to="/shipments"
                className="text-sm text-gray-600 transition hover:text-black"
              >
                Shipments
              </Link>

              <Link
                to="/about"
                className="text-sm text-gray-600 transition hover:text-black"
              >
                About
              </Link>

            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-black">
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/login"
                className="text-sm text-gray-600 transition hover:text-black"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="text-sm text-gray-600 transition hover:text-black"
              >
                Get Started
              </Link>

              <Link
                to="/services"
                className="text-sm text-gray-600 transition hover:text-black"
              >
                Services
              </Link>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div
          className="
            mt-12
            flex
            flex-col
            gap-4
            border-t
            border-gray-200
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ParcelFlow. All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <Link
              to="/privacy"
              className="text-xs text-gray-500 transition hover:text-black"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-gray-500 transition hover:text-black"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
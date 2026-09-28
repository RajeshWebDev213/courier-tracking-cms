import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky left-0 top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:h-20
          sm:px-6
          lg:px-8
        "
      >

        {/* Logo */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-1.5 sm:gap-2"
        >
          {/* Logo Image */}
          <img
            src={logo}
            alt="PercelFlow Logo"
            className="
              h-11
              w-11
              shrink-0
              object-contain
              sm:h-16
              sm:w-16
              md:h-20
              md:w-20
            "
          />

          {/* Brand Name */}
          <div className="flex min-w-0 flex-col items-start">
            <span
              className="
                whitespace-nowrap
                text-[15px]
                tracking-[0.10em]
                text-black
                sm:text-xl
                sm:tracking-[0.14em]
                md:text-2xl
                md:tracking-[0.18em]
              "
              style={{ fontFamily: "Michroma, sans-serif" }}
            >
              PERCELFLOW
            </span>

            <span
              className="
                mt-0.5
                whitespace-nowrap
                pl-0.5
                text-[5px]
                font-medium
                tracking-[0.18em]
                text-gray-500
                sm:mt-1
                sm:text-[7px]
                sm:tracking-[0.3em]
              "
            >
              COURIER TRACKING SYSTEM
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/track"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Track Parcel
          </Link>

          <Link
            to="/shipments"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Shipments
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            About
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-5 md:flex">

          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="
              rounded-[5px]
              bg-black
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-gray-800
            "
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-[5px]
            border
            border-gray-200
            bg-white
            text-black
            md:hidden
          "
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="space-y-1 px-4 py-4">

            <Link
              to="/"
              onClick={closeMenu}
              className="
                block
                rounded-[5px]
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                hover:text-black
              "
            >
              Home
            </Link>

            <Link
              to="/track"
              onClick={closeMenu}
              className="
                block
                rounded-[5px]
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                hover:text-black
              "
            >
              Track Parcel
            </Link>

            <Link
              to="/shipments"
              onClick={closeMenu}
              className="
                block
                rounded-[5px]
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                hover:text-black
              "
            >
              Shipments
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="
                block
                rounded-[5px]
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                hover:text-black
              "
            >
              About
            </Link>

            <Link
              to="/login"
              onClick={closeMenu}
              className="
                block
                rounded-[5px]
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
                hover:text-black
              "
            >
              Login
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
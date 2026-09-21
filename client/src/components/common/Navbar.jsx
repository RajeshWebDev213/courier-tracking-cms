import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
       <Link
  to="/"
  className="flex flex-col items-start"
>
  <span
    className="text-xl md:text-2xl tracking-[0.18em] text-black"
    style={{ fontFamily: "Michroma, sans-serif" }}
  >
    PERCELFLOW
  </span>

  <span className="mt-1 text-[7px] font-medium tracking-[0.3em] text-gray-500 ml-1">
    COURIER TRACKING SYSTEM
  </span>
</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
          >
            Home
          </Link>

          <Link
            to="/track"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
          >
            Track Parcel
          </Link>

          <Link
            to="/shipments"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
          >
            Shipments
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
          >
            About
          </Link>

        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-5">

          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
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
            md:hidden
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            bg-white
            text-black
          "
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            /* X */
            <svg
              className="h-5 w-5"
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
            /* Hamburger */
            <svg
              className="h-5 w-5"
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
        <div className="md:hidden border-t border-gray-100 bg-white">

          <div className="px-6 py-5 space-y-1">

            <Link
              to="/"
              onClick={closeMenu}
              className="
                block
                rounded-lg
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
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
                rounded-lg
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
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
                rounded-lg
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
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
                rounded-lg
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
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
                rounded-lg
                px-4
                py-3
                text-sm
                font-medium
                text-gray-700
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
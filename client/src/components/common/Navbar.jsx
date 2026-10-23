import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../../assets/icons/logo.png";
import useAuth from "../../hooks/useAuth";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label : "Services"},
  { to: "/track-parcel", label: "Track Parcel" },
  { to: "/shipments", label: "Shipments" },
  { to: "/gallery", label: "Gallery" },

];

const PROFILE_LINKS = [
  { to: "/shipments", label: "My Shipments" },
  { to: "/track-parcel", label: "Track Parcel" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    user,
    isAuthenticated,
    loading: authLoading,
    logout,
  } = useAuth();

  // Close menus when page changes
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Soft shadow once page is scrolled
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const userName =
    user?.name ||
    user?.username ||
    user?.fullName ||
    "User";

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  // CHANGED: show "My Shipments" instead of "Shipments" after login
  const navLinks = NAV_LINKS.map((l) =>
    l.to === "/shipments" && isAuthenticated && !authLoading
      ? { ...l, label: "My Shipments" }
      : l
  );

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur transition-shadow ${
        scrolled
          ? "border-gray-200 shadow-sm"
          : "border-gray-100"
      }`}
    >
      <div className="mx-auto flex h-16 w-full items-center px-4 sm:h-20 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="-ml-2 flex shrink-0 items-center gap-2"
        >
          <img
            src={logo}
            alt="PercelFlow Logo"
            className="h-11 w-11 shrink-0 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
          />

          <div className="flex flex-col items-start">
            <span
              className="whitespace-nowrap text-[15px] tracking-[0.10em] text-black sm:text-xl sm:tracking-[0.14em] md:text-2xl md:tracking-[0.18em]"
              style={{
                fontFamily: "Michroma, sans-serif",
              }}
            >
              PARCELFLOW
            </span>

            <span className="mt-0.5 whitespace-nowrap pl-0.5 text-[6px] font-medium tracking-[0.18em] text-gray-500 sm:mt-1 sm:text-[8px] sm:tracking-[0.3em]">
              COURIER TRACKING SYSTEM
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="ml-24 hidden items-center gap-8 md:flex lg:ml-28">
          {/* CHANGED: NAV_LINKS.map -> navLinks.map */}
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={
                isActive(l.to) ? "page" : undefined
              }
              className={`relative py-1 text-sm font-medium transition hover:text-black ${
                isActive(l.to)
                  ? "text-black"
                  : "text-gray-500"
              }`}
            >
              {l.label}

              {/* Active marker */}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${
                  isActive(l.to)
                    ? "w-full"
                    : "w-0"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="ml-auto hidden items-center gap-6 md:flex">

          {/* IMPORTANT:
              Don't show Login/Get Started while
              AuthContext is checking the session.
          */}
          {authLoading ? null : !isAuthenticated ? (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="text-sm font-medium text-gray-500 transition hover:text-black"
              >
                Login
              </Link>

              {/* Get Started */}
              <Link
                to="/signup"
                className="rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-black/20"
              >
                Get Started
              </Link>
            </>
          ) : (
            /* Logged In Profile */
            <div
              className="relative"
              ref={profileRef}
            >
              <button
                onClick={() =>
                  setProfileOpen((o) => !o)
                }
                aria-expanded={profileOpen}
                className="flex items-center gap-2 rounded-[5px] border border-gray-200 py-1.5 pl-1.5 pr-3 text-sm font-medium text-black transition hover:border-black"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-black text-xs font-semibold text-white">
                  {userName
                    .charAt(0)
                    .toUpperCase()}
                </span>

                Hi, {userName.split(" ")[0]}

                <ChevronDown
                  size={16}
                  className={`transition ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-[5px] border border-gray-200 bg-white shadow-xl">

                  {/* User Info */}
                  <div className="bg-black px-4 py-4">
                    <p className="text-sm font-semibold text-white">
                      {userName}
                    </p>

                    {user?.email && (
                      <p className="mt-1 truncate text-xs text-gray-400">
                        {user.email}
                      </p>
                    )}
                  </div>

                  {/* Profile Links */}
                  {PROFILE_LINKS.map((l) => (
                    <Link
                      key={l.label}
                      to={l.to}
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="block px-4 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-black"
                    >
                      {l.label}
                    </Link>
                  ))}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="block w-full border-t border-gray-100 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() =>
            setMenuOpen((o) => !o)
          }
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] border border-gray-200 bg-white text-black md:hidden"
        >
          {menuOpen ? (
            <X size={18} />
          ) : (
            <Menu size={18} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="space-y-1 px-4 py-4">

            {/* Mobile Navigation Links */}
            {/* CHANGED: NAV_LINKS.map -> navLinks.map */}
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() =>
                  setMenuOpen(false)
                }
                className={`block rounded-[5px] px-4 py-3 text-sm font-medium transition ${
                  isActive(l.to)
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div className="my-2 border-t border-gray-100 pt-3">

              {/* Wait for authentication check */}
              {authLoading ? null : isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-black">
                      {userName}
                    </p>

                    {user?.email && (
                      <p className="mt-1 text-xs text-gray-500">
                        {user.email}
                      </p>
                    )}
                  </div>

                  {/* Profile */}
                  <Link
                    to="/profile"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="block rounded-[5px] px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-black"
                  >
                    Profile
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-[5px] px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-gray-50 hover:text-black"
                  >
                    Logout
                  </button>
                </>
              ) : (
                /* Guest Mobile Buttons */
                <div className="flex gap-3 px-1">

                  <Link
                    to="/login"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="flex-1 rounded-[5px] border border-gray-300 py-3 text-center text-sm font-medium text-black transition hover:border-black"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="flex-1 rounded-[5px] bg-black py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Get Started
                  </Link>

                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
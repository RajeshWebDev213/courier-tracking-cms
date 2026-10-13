import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import logo from "../../assets/icons/logo.png";

// Brand icons
const createIcon = (children) =>
  function BrandIcon({ size = 18, ...props }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {children}
      </svg>
    );
  };

const Facebook = createIcon(
  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
);

const Instagram = createIcon(
  <>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </>
);

const Twitter = createIcon(
  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
);

const Linkedin = createIcon(
  <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </>
);

const Youtube = createIcon(
  <>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </>
);

const SOCIALS = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Twitter", icon: Twitter, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
];

const QUICK_LINKS = [
  
  { to: "/", label: "Home" },
   { to: "/about", label: "About" },
  { to: "/track-parcel", label: "Track Parcel" },
  { to: "/shipments", label: "Shipments" },
  { to: "/gallery", label: "Gallery" },
  
];

const ACCOUNT_LINKS = [
  { to: "/login", label: "Login" },
  { to: "/signup", label: "Get Started" },
  { to: "/services", label: "Services" },
];

const linkClass =
  "text-sm text-gray-400 transition hover:text-white";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-8 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand */}
          <div className="min-w-0 lg:col-span-5">
            <Link
              to="/"
              className="inline-flex max-w-full items-center gap-3"
            >
              <img
                src={logo}
                alt="ParcelFlow Logo"
                className="h-14 w-14 shrink-0 object-contain brightness-0 invert sm:h-16 sm:w-16"
              />

              <div className="min-w-0">
                <p
                  className="whitespace-nowrap text-xl tracking-[0.12em] text-white sm:text-2xl"
                  style={{ fontFamily: "Michroma, sans-serif" }}
                >
                  PERCELFLOW
                </p>

                <p className="mt-1 text-[7px] font-medium tracking-[0.28em] text-gray-400 sm:text-[8px]">
                  COURIER TRACKING SYSTEM
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-400">
              Simple and reliable courier tracking from pickup to delivery.
              Manage your shipments and stay updated every step of the way.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-[5px]
                    border
                    border-white/20
                    text-gray-300
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-white
                    hover:bg-white
                    hover:text-black
                  "
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {ACCOUNT_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">
              Contact Us
            </h3>

            <ul className="mt-5 flex flex-col gap-4">

              {/* Email */}
              <li>
                <a
                  href="mailto:support@parcelflow.com"
                  className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-white"
                >
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="break-all">
                    support@parcelflow.com
                  </span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-white"
                >
                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    +91 98765 43210
                  </span>
                </a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  123 Logistics Street,
                  <br />
                  Srikakulam, Andhra Pradesh, India
                </span>
              </li>

              {/* Working Hours */}
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Clock
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  Mon - Sat: 9:00 AM - 6:00 PM
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ParcelFlow. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Courier Tracking System
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
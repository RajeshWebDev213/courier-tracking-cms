import { useEffect, useRef, useState } from "react";
import {
  Package,
  Truck,
  ShieldCheck,
  Clock3,
  Users,
  MapPin,
  Check,
  PackageCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/* Counts up once when scrolled into view */
const CountUp = ({ to, suffix = "" }) => {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      setN(to);
      return;
    }

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;

      io.disconnect();

      const start = performance.now();

      const tick = (t) => {
        const p = Math.min((t - start) / 1400, 1);

        setN(
          Math.round(
            to * (1 - Math.pow(1 - p, 3))
          )
        );

        if (p < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    });

    if (el) {
      io.observe(el);
    }

    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
};

const About = () => {
  // Get login status from AuthContext
  const { isAuthenticated } = useAuth();

  const journey = [
    {
      icon: Package,
      title: "You create it",
      text: "Add the sender, receiver and parcel details in a few minutes.",
    },
    {
      icon: Truck,
      title: "We pick it up",
      text: "A courier collects the parcel and it is scanned into the network.",
    },
    {
      icon: MapPin,
      title: "It moves, you watch",
      text: "Every hub it passes updates your tracking page automatically.",
    },
    {
      icon: PackageCheck,
      title: "It arrives",
      text: "Delivery is confirmed and the full history stays on your account.",
    },
  ];

  const promises = [
    {
      icon: Truck,
      title: "Fast delivery",
      text: "Quick, dependable delivery on every shipment, big or small.",
    },
    {
      icon: ShieldCheck,
      title: "Secure shipments",
      text: "Careful handling from the moment of pickup to the doorstep.",
    },
    {
      icon: Clock3,
      title: "Real-time tracking",
      text: "Know where your parcel is without calling anyone to ask.",
    },
    {
      icon: Users,
      title: "Helpful support",
      text: "A smooth experience for every customer, from first parcel onward.",
    },
  ];

  const stats = [
    {
      to: 10000,
      suffix: "+",
      label: "Shipments delivered",
    },
    {
      to: 5000,
      suffix: "+",
      label: "Customers served",
    },
    {
      to: 50,
      suffix: "+",
      label: "Locations covered",
    },
    {
      text: "24/7",
      label: "Service",
    },
  ];

  const waybill = [
    "Shipment created",
    "Picked up",
    "Reached sorting hub",
    "Out for delivery",
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <style>{`
        @keyframes drive {
          from {
            left: 0%;
          }
          to {
            left: 100%;
          }
        }

        @keyframes fill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes pop {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .anim-drive {
          animation: drive 4.5s cubic-bezier(.6,0,.3,1) .4s both;
        }

        .anim-fill {
          animation: fill 4.5s cubic-bezier(.6,0,.3,1) .4s both;
        }

        .anim-pop {
          animation: pop .5s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-drive,
          .anim-fill,
          .anim-pop {
            animation: none;
          }

          .anim-drive {
            left: 100%;
          }

          .anim-fill {
            width: 100%;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="bg-black px-6 pb-20 pt-16 text-white sm:pt-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Every parcel has a story.
              <span className="block text-gray-500">
                We make sure you can read it.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-gray-300">
              We are a courier and shipment management service. Create a
              shipment, hand it over, and follow it stop by stop until it
              arrives.
            </p>
          </div>

          {/* Live-style waybill */}
          <div className="rounded-[5px] bg-white p-6 text-black shadow-2xl sm:p-7">
            <div className="flex items-center justify-between border-b border-dashed border-gray-300 pb-4">
              <div>
                <p className="text-xs text-gray-500">
                  Sample shipment
                </p>

                <p className="font-mono text-lg font-bold">
                  CR48213907
                </p>
              </div>

              <span className="rounded-[5px] bg-black px-3 py-1 text-xs font-semibold text-white">
                In transit
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm font-semibold">
              <span>Sender</span>
              <span>Receiver</span>
            </div>

            <div className="relative mt-3 h-2 rounded-full bg-gray-200">
              <div className="anim-fill h-2 rounded-full bg-black" />

              <div className="anim-drive absolute -top-4 -ml-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow">
                <Truck size={18} />
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {waybill.map((s, i) => (
                <li
                  key={s}
                  className="anim-pop flex items-center gap-3 text-sm"
                  style={{
                    animationDelay: `${0.5 + i * 1.1}s`,
                  }}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <Check size={12} />
                  </span>

                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-white px-6 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                {s.text ? (
                  s.text
                ) : (
                  <CountUp
                    to={s.to}
                    suffix={s.suffix}
                  />
                )}
              </p>

              <p className="mt-1 text-sm font-medium text-gray-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            From your hands to theirs, in four steps.
          </h2>

          <p className="mt-3 max-w-lg text-gray-600">
            Everything happens in one place, so you never have to wonder
            what comes next.
          </p>

          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            <div className="absolute left-0 right-0 top-6 hidden border-t-2 border-dashed border-gray-300 md:block" />

            {journey.map((j, i) => {
              const Icon = j.icon;

              return (
                <li
                  key={j.title}
                  className="relative"
                >
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black text-white ring-8 ring-gray-50">
                    <Icon size={20} />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-gray-500">
                    Step {i + 1}
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {j.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {j.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Promises */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              What you can count on.
            </h2>

            <p className="mt-3 text-gray-600">
              Four things we focus on with every shipment we handle.
            </p>
          </div>

          <div className="divide-y divide-gray-200 border-y border-gray-200 lg:col-span-3">
            {promises.map((p) => {
              const Icon = p.icon;

              return (
                <div
                  key={p.title}
                  className="group flex items-start gap-5 py-6 transition hover:bg-gray-50 sm:px-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] border border-black bg-black text-white transition group-hover:bg-white group-hover:text-black">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">
                      {p.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {p.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your next parcel could be on its way today.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-gray-300">
            Create your shipment and follow it from pickup to delivery.
          </p>

          {/* Logged in -> Create Shipment
              Not logged in -> Signup */}
          <Link
            to={
              isAuthenticated
                ? "/create-shipment"
                : "/signup"
            }
            className="mt-8 inline-flex items-center gap-2 rounded-[5px] bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            {isAuthenticated
              ? "Create shipment"
              : "Create your account"}

            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
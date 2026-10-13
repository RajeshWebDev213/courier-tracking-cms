import { Link } from "react-router-dom";
import {
  Package,
  MapPin,
  LogOut,
  ArrowUpRight,
  Mail,
  Phone,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

const actions = [
  {
    to: "/shipments",
    icon: Package,
    title: "My shipments",
    text: "See everything you've sent and its current status.",
  },
  {
    to: "/track-parcel",
    icon: MapPin,
    title: "Track a parcel",
    text: "Enter a tracking number to see where it is.",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

const Account = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Hi, {user?.name}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your profile and keep track of your shipments.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">

          {/* Profile card */}
          <section className="flex flex-col rounded-[5px] bg-black p-6 text-white sm:p-8">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-semibold text-black">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              {user?.name}
            </h2>

            <dl className="mt-6 space-y-4 border-t border-white/15 pt-6 text-sm">

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="mt-0.5 shrink-0 text-gray-400"
                />

                <div className="min-w-0">
                  <dt className="text-xs text-gray-400">
                    Email
                  </dt>

                  <dd className="mt-0.5 break-words">
                    {user?.email}
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          {/* Actions */}
          <section className="flex flex-col gap-6">

            <div className="grid gap-4 sm:grid-cols-2">

              {actions.map(
                ({ to, icon: Icon, title, text }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`group flex min-h-[176px] flex-col justify-between rounded-[5px] border border-gray-200 bg-white p-6 transition hover:border-black ${focusRing}`}
                  >
                    <div className="flex items-start justify-between">

                      <div className="flex h-11 w-11 items-center justify-center rounded-[5px] bg-gray-100 transition group-hover:bg-black">
                        <Icon
                          size={20}
                          className="text-black transition group-hover:text-white"
                        />
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="text-gray-400 transition group-hover:text-black"
                      />
                    </div>

                    <div>
                      <p className="text-base font-semibold text-black">
                        {title}
                      </p>

                      <p className="mt-1 text-sm leading-relaxed text-gray-500">
                        {text}
                      </p>
                    </div>
                  </Link>
                )
              )}

            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`flex w-full items-center justify-between rounded-[5px] border border-gray-200 bg-white p-5 text-left transition hover:border-red-300 hover:bg-red-50 ${focusRing}`}
            >
              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-gray-100">
                  <LogOut
                    size={18}
                    className="text-red-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">
                    Log out
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Sign out on this device
                  </p>
                </div>

              </div>
            </button>

          </section>
        </div>
      </div>
    </main>
  );
};

export default Account;
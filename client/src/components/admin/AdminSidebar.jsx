import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Wrench,
  Images,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const AdminSidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Shipments",
      path: "/admin/shipments",
      icon: Package,
    },
    {
      name: "Tracking",
      path: "/admin/tracking",
      icon: MapPin,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: Wrench,
    },
    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: Images,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >

        {/* Logo / Header */}
            <div className="flex h-20 items-center justify-between border-b border-gray-200 px-5">
  <div className="flex flex-col items-start">
    <span
      className="whitespace-nowrap text-[14px] tracking-[0.08em] text-black"
      style={{ fontFamily: "Michroma, sans-serif" }}
    >
      PARCELFLOW
    </span>

    <span className="mt-1 whitespace-nowrap text-[6px] font-medium tracking-[0.12em] text-gray-500">
      COURIER TRACKING SYSTEM
    </span>
  </div>

  {/* Mobile Close Button */}
  <button
    onClick={onClose}
    className="rounded-[5px] p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
    aria-label="Close menu"
  >
    <X size={20} />
  </button>
</div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-[5px] px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-[5px] px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-black"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
import { Menu, CircleUserRound } from "lucide-react";
import useAuth from "../../hooks/useAuth"

const AdminHeader = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">

      {/* Left Section */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onMenuClick}
          className="mr-3 rounded-[5px] p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Admin Dashboard
          </h1>

          <p className="mt-1 hidden text-sm text-gray-500 sm:block">
            Manage your courier operations
          </p>
        </div>
      </div>

      {/* Admin User */}
      <div className="flex items-center gap-3">
        <CircleUserRound
          size={30}
          strokeWidth={1.8}
          className="text-gray-700"
        />

        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-gray-900">
            {user?.name || "Admin"}
          </p>

          <p className="text-xs capitalize text-gray-500">
            {user?.role || "Admin"}
          </p>
        </div>
      </div>

    </header>
  );
};

export default AdminHeader;
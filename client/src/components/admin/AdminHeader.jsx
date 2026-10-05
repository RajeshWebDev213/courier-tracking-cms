import { Menu } from "lucide-react";

const AdminHeader = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-gray-200 bg-white px-4 sm:px-6">
      
      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="mr-3 rounded-[5px] p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Header Title */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
          Admin Dashboard
        </h1>

        <p className="mt-1 hidden text-sm text-gray-500 sm:block">
          Manage your courier operations
        </p>
      </div>
    </header>
  );
};

export default AdminHeader;
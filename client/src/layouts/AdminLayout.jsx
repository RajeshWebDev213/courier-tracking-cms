import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

const AdminLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">

      {/* Sidebar */}
      <AdminSidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-64">

        {/* Header */}
        <AdminHeader
          onMenuClick={() => setIsMenuOpen(true)}
        />

        {/* Page */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
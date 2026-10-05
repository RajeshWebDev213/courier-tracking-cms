import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Home from "./pages/Home";
import TrackParcel from "./pages/TrackParcel";
import Shipment from "./pages/Shipment/Shipment";
import CreateShipment from "./pages/Shipment/CreateShipment";
import ShipmentDetails from "./pages/Shipment/ShipmentDetails";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Services from "./pages/Services";
import Account from "./pages/Account";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminShipments from "./pages/Admin/AdminShipments/AdminShipments";
import AdminShipmentDetails from "./pages/Admin/AdminShipments/AdminShipmentDetails";
import AdminEditShipment from "./pages/Admin/AdminShipments/AdminEditShipment";
import AdminUsers from "./pages/Admin/AdminUsers/AdminUsers";
import AdminUserDetails from "./pages/Admin/AdminUsers/AdminUserDetails";
import AdminEditUser from "./pages/Admin/AdminUsers/AdminEditUser";
import AdminTracking from "./pages/Admin/AdminTracking/AdminTracking";
import AdminServices from "./pages/Admin/AdminService/AdminServices";
import AdminGallery from "./pages/Admin/AdminGallery";
import AdminSettings from "./pages/Admin/AdminSettings";

const App = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const isAdminPage = location.pathname.startsWith("/admin");

  const showNavbar = !isAuthPage && !isAdminPage;

  return (
    <>
      {/* Public Navbar */}
      {showNavbar && <Navbar />}

      {isAuthPage ? (
        <AuthLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </AuthLayout>
      ) : (
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/track-parcel" element={<TrackParcel />} />
          <Route path="/shipments" element={<Shipment />} />
          <Route
            path="/create-shipment"
            element={<CreateShipment />}
          />
          <Route
            path="/shipments/:trackingNumber"
            element={<ShipmentDetails />}
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/me" element={<Account />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            <Route
              path="shipments"
              element={<AdminShipments />}
            />

            <Route
              path="shipments/:id"
              element={<AdminShipmentDetails />}
            />

            <Route
              path="shipments/:id/edit"
              element={<AdminEditShipment />}
            />

            <Route
              path="users"
              element={<AdminUsers />}
            />

            <Route
              path="users/:id"
              element={<AdminUserDetails />}
            />

            <Route
              path="users/:id/edit"
              element={<AdminEditUser />}
            />

            <Route
              path="tracking"
              element={<AdminTracking />}
            />

            <Route path="services" element={<AdminServices />}/>
            <Route path="gallery" element={<AdminGallery />}/>
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
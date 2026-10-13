import { Navigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null; // wait for getAccount() on refresh
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (String(user?.role).toLowerCase() !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
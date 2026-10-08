import { createContext, useContext, useEffect, useState } from "react";
import {
  register as registerUser,
  login as loginUser,
  getAccount,
} from "../services/AuthServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login when app starts
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchAccount = async () => {
      try {
        const data = await getAccount();

        setUser(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);


  // Register
  const register = async (data) => {
    const response = await registerUser(data);

    if (response.token) {
      sessionStorage.setItem("token", response.token);
    }

    if (response.user) {
      sessionStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
    }

    return response;
  };

  // Login
const login = async (data) => {
  console.log("AUTH LOGIN CALLED:", data);

  const response = await loginUser(data);

  console.log("LOGIN RESPONSE:", response);

  if (response.token) {
    sessionStorage.setItem("token", response.token);
  }

  if (response.user) {
    sessionStorage.setItem(
      "user",
      JSON.stringify(response.user)
    );

    setUser(response.user);
  }

  return response;
};

  // Logout
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
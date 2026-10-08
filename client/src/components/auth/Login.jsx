import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  const redirectTo = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Already logged in -> don't show the login form
  if (!authLoading && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const { password } = formData;

    if (!email || !password) {
      return setError("Please enter your email and password.");
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError("Please enter a valid email address.");
    }

    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(
        err.response?.data?.message || // raw axios error
          err.message || // error thrown by AuthServices / AuthContext
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-5 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-10">
          <span
            className="text-lg sm:text-xl tracking-[0.2em] text-black"
            style={{ fontFamily: "Michroma, sans-serif" }}
          >
            PARCELFLOW
          </span>
        </Link>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
            Welcome back
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-50"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-gray-500 hover:text-black"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Signup */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-black hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
import { useEffect, useState } from "react";
import {
  User,
  Lock,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  getAdminSettings,
  updateAdminProfile,
  changeAdminPassword,
} from "../../services/AdminSettingsService";

const AdminSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ==========================================
  // GET ADMIN SETTINGS
  // ==========================================
  useEffect(() => {
    const fetchAdminSettings = async () => {
      try {
        const data = await getAdminSettings();

        setProfile({
          name: data.admin.name || "",
          email: data.admin.email || "",
        });
      } catch (error) {
        console.error(
          "Failed to load admin settings:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Failed to load admin settings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminSettings();
  }, []);

  // ==========================================
  // PROFILE CHANGE
  // ==========================================
  const handleProfileChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // PASSWORD CHANGE
  // ==========================================
  const handlePasswordChange = (e) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // UPDATE PROFILE
  // ==========================================
  const handleProfileSubmit = async () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      alert("Name and email are required");
      return;
    }

    try {
      setProfileLoading(true);

      const data = await updateAdminProfile({
        name: profile.name,
        email: profile.email,
      });

      setProfile({
        name: data.admin.name,
        email: data.admin.email,
      });

      alert("Profile updated successfully");
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  // ==========================================
  // UPDATE PASSWORD
  // ==========================================
  const handlePasswordSubmit = async () => {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = password;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert(
        "New password must be at least 6 characters"
      );
      return;
    }

    try {
      setPasswordLoading(true);

      await changeAdminPassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      alert("Password updated successfully");
    } catch (error) {
      console.error(
        "Password update error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center bg-white">
        <p className="text-sm text-gray-500">
          Loading settings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 bg-white">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-black">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your admin account and system preferences.
        </p>
      </div>

      {/* ================= PROFILE SETTINGS ================= */}
      <div className="rounded-[5px] border border-gray-200 bg-white">

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4 sm:px-6">

          <div className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-gray-100 text-gray-600">
            <User size={18} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-black">
              Profile Settings
            </h2>

            <p className="text-sm text-gray-500">
              Update your administrator information.
            </p>
          </div>

        </div>

        {/* Form */}
        <div className="space-y-5 p-5 sm:p-6">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Enter your name"
              className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Enter your email"
              className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-black"
            />
          </div>

          {/* Save */}
          <div className="flex justify-end border-t border-gray-100 pt-5">

            <button
              type="button"
              onClick={handleProfileSubmit}
              disabled={profileLoading}
              className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Save size={17} />

              {profileLoading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>
        </div>
      </div>

      {/* ================= PASSWORD SETTINGS ================= */}
      <div className="rounded-[5px] border border-gray-200 bg-white">

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4 sm:px-6">

          <div className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-gray-100 text-gray-600">
            <Lock size={18} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-black">
              Change Password
            </h2>

            <p className="text-sm text-gray-500">
              Update your administrator account password.
            </p>
          </div>

        </div>

        {/* Password Form */}
        <div className="space-y-5 p-5 sm:p-6">

          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Current Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 pr-11 text-sm text-black outline-none transition focus:border-black"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[5px] p-2 text-gray-400 hover:bg-gray-100 hover:text-black"
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-black"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 pr-11 text-sm text-black outline-none transition focus:border-black"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[5px] p-2 text-gray-400 hover:bg-gray-100 hover:text-black"
              >
                {showConfirmPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>
          </div>

          {/* Update Password */}
          <div className="flex justify-end border-t border-gray-100 pt-5">

            <button
              type="button"
              onClick={handlePasswordSubmit}
              disabled={passwordLoading}
              className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Lock size={17} />

              {passwordLoading
                ? "Updating..."
                : "Update Password"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
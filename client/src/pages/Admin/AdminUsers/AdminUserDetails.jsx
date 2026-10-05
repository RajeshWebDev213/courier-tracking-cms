import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Calendar,
  Shield,
} from "lucide-react";

const AdminUserDetails = () => {
  const { id } = useParams();

  // Temporary data
  const user = {
    id,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "9876543210",
    role: "Customer",
    status: "Active",
    joined: "05 Oct 2026",
    address: "Hyderabad, Telangana",
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/users"
          className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            User Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View complete user information.
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="rounded-[5px] border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <User size={36} />
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">

              {/* Role */}
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  user.role === "Admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user.role}
              </span>

              {/* Status */}
              <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {user.status}
              </span>

            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="rounded-[5px] border border-gray-200 bg-white">

        {/* Section Header */}
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            Account Information
          </h2>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="rounded-[5px] bg-gray-100 p-2 text-gray-600">
              <Mail size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Email Address
              </p>

              <p className="mt-1 break-all text-sm font-medium text-gray-900">
                {user.email}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="rounded-[5px] bg-gray-100 p-2 text-gray-600">
              <Phone size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Phone Number
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {user.phone}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-start gap-3">
            <div className="rounded-[5px] bg-gray-100 p-2 text-gray-600">
              <Shield size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Account Role
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {user.role}
              </p>
            </div>
          </div>

          {/* Joined */}
          <div className="flex items-start gap-3">
            <div className="rounded-[5px] bg-gray-100 p-2 text-gray-600">
              <Calendar size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Joined Date
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {user.joined}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 md:col-span-2">
            <div className="rounded-[5px] bg-gray-100 p-2 text-gray-600">
              <User size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Address
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {user.address}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

        {/* Back */}
        <Link
          to="/admin/users"
          className="rounded-[5px] border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Back
        </Link>

        {/* Edit */}
        <Link
          to={`/admin/users/${id}/edit`}
          className="rounded-[5px] bg-black px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Edit User
        </Link>

      </div>

    </div>
  );
};

export default AdminUserDetails;
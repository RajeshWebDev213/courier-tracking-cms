import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "Customer",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated User:", id, formData);

    // PUT API will be added here

    navigate(`/admin/users/${id}`);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to={`/admin/users/${id}`}
          className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit User
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update user account permissions and status.
          </p>
        </div>
      </div>

      {/* User Information */}
      <div className="rounded-[5px] border border-gray-200 bg-white">

        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            User Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Personal information cannot be changed by the administrator.
          </p>
        </div>

        {/* Read Only Information */}
        <div className="grid grid-cols-1 gap-5 border-b border-gray-200 p-5 md:grid-cols-2">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="rounded-[5px] border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
              Rahul Kumar
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="rounded-[5px] border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
              rahul@gmail.com
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <div className="rounded-[5px] border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
              9876543210
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>

            <div className="rounded-[5px] border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
              Hyderabad, Telangana
            </div>
          </div>

        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-[5px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400"
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-[5px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end">

          <Link
            to={`/admin/users/${id}`}
            className="rounded-[5px] border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Update User
          </button>

        </div>

      </div>
    </div>
  );
};

export default AdminEditUser;
import { useState } from "react";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  X,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [deleteUser, setDeleteUser] = useState(null);

  // Temporary data
  const [users] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "9876543210",
      role: "Customer",
      joined: "05 Oct 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      phone: "9876543211",
      role: "Customer",
      joined: "04 Oct 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Arjun Reddy",
      email: "arjun@gmail.com",
      phone: "9876543212",
      role: "Customer",
      joined: "03 Oct 2026",
      status: "Active",
    },
    {
      id: 4,
      name: "Admin User",
      email: "admin@courier.com",
      phone: "9876543213",
      role: "Admin",
      joined: "01 Oct 2026",
      status: "Active",
    },
  ]);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Users
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage registered users and their accounts.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Total Users */}
        <div className="rounded-[5px] border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-[5px] bg-gray-100 p-3 text-gray-700">
              <Users size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {users.length}
              </p>
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="rounded-[5px] border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Customers
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {users.filter((user) => user.role === "Customer").length}
          </p>
        </div>

        {/* Active Users */}
        <div className="rounded-[5px] border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            Active Users
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {users.filter((user) => user.status === "Active").length}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="rounded-[5px] border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[5px] border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-400"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-[5px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400"
          >
            <option value="All">All Roles</option>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>

        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-[5px] border border-gray-200 bg-white">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">

            {/* Table Header */}
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  User
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Phone
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Role
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Joined
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>

              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-gray-50"
                  >

                    {/* User */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.phone}
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          user.role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.joined}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">

                        {/* View */}
                        <Link
                          to={`/admin/users/${user.id}`}
                          className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                          title="View"
                        >
                          <Eye size={17} />
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/admin/users/${user.id}/edit`}
                          className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                          title="Edit"
                        >
                          <Edit size={17} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteUser(user)}
                          className="rounded-[5px] p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-sm rounded-[5px] bg-white p-6">

            {/* Modal Header */}
            <div className="flex items-start justify-between">

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete User?
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Are you sure you want to delete this user?
                </p>
              </div>

              <button
                onClick={() => setDeleteUser(null)}
                className="rounded-[5px] p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>

            </div>

            {/* User Information */}
            <div className="mt-5 rounded-[5px] bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">
                {deleteUser.name}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {deleteUser.email}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() => setDeleteUser(null)}
                className="rounded-[5px] border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  console.log("Delete user:", deleteUser.id);

                  // DELETE API will be added here

                  setDeleteUser(null);
                }}
                className="rounded-[5px] bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsers;
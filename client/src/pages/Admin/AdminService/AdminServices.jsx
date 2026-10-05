import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Wrench,
} from "lucide-react";

const AdminServices = () => {
  const [search, setSearch] = useState("");
  const [deleteService, setDeleteService] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Express Delivery",
      description: "Fast and secure delivery service.",
      price: "150",
      deliveryTime: "1-2 Days",
      status: "Active",
    },
    {
      id: 2,
      name: "Standard Delivery",
      description: "Affordable delivery for regular shipments.",
      price: "80",
      deliveryTime: "3-5 Days",
      status: "Active",
    },
    {
      id: 3,
      name: "Same Day Delivery",
      description: "Priority delivery within the same day.",
      price: "250",
      deliveryTime: "Same Day",
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    deliveryTime: "",
    status: "Active",
  });

  // Filter services
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  // Open Add Service Form
  const handleAdd = () => {
    setEditingService(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      deliveryTime: "",
      status: "Active",
    });

    setShowForm(true);
  };

  // Open Edit Service Form
  const handleEdit = (service) => {
    setEditingService(service);

    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      deliveryTime: service.deliveryTime,
      status: service.status,
    });

    setShowForm(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create / Update Service
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingService) {
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === editingService.id
            ? {
                ...service,
                ...formData,
              }
            : service
        )
      );
    } else {
      const newService = {
        id: Date.now(),
        ...formData,
      };

      setServices((prevServices) => [
        ...prevServices,
        newService,
      ]);
    }

    setShowForm(false);
    setEditingService(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      deliveryTime: "",
      status: "Active",
    });
  };

  // Delete Service
  const handleDelete = () => {
    setServices((prevServices) =>
      prevServices.filter(
        (service) => service.id !== deleteService.id
      )
    );

    setDeleteService(null);
  };

  return (
    <div className="min-h-full space-y-6 bg-white">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">
            Services
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage courier services and delivery options.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="rounded-[5px] border border-gray-200 bg-white p-4">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[5px] border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-black outline-none transition focus:border-black"
          />
        </div>
      </div>

      {/* ================= SERVICE CARDS ================= */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-[5px] border border-gray-200 bg-white p-5 transition hover:border-gray-300 sm:p-6"
            >
              {/* Top Section */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[5px] bg-gray-100 text-black">
                  <Wrench size={21} />
                </div>

          <span
  className={`rounded-[5px] px-3 py-1 text-xs font-medium ${
    service.status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-600"
  }`}
>
  {service.status}
</span>
              </div>

              {/* Service Details */}
              <div className="mt-5">
                <h2 className="text-lg font-semibold text-black">
                  {service.name}
                </h2>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                  {service.description}
                </p>
              </div>

              {/* Price & Delivery */}
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                <div>
                  <p className="text-xs text-gray-500">
                    Price
                  </p>

                  <p className="mt-1 font-semibold text-black">
                    ₹{service.price}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Delivery
                  </p>

                  <p className="mt-1 font-semibold text-black">
                    {service.deliveryTime}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                  title="Edit Service"
                >
                  <Edit size={17} />
                </button>

                <button
                  onClick={() => setDeleteService(service)}
                  className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600"
                  title="Delete Service"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div className="rounded-[5px] border border-gray-200 bg-white py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[5px] bg-gray-100 text-gray-500">
            <Wrench size={22} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-black">
            No services found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try searching with a different service name.
          </p>
        </div>
      )}

      {/* ================= ADD / EDIT MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6">
          <div className="my-auto w-full max-w-lg rounded-[5px] bg-white">

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-black">
                  {editingService
                    ? "Edit Service"
                    : "Add Service"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingService
                    ? "Update the service information."
                    : "Create a new courier service."}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                }}
                className="rounded-[5px] p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 p-5 sm:p-6">

                {/* Service Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Service Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Express Delivery"
                    required
                    className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-black"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter service description"
                    rows="3"
                    required
                    className="w-full resize-none rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-black"
                  />
                </div>

                {/* Price & Delivery Time */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Price
                    </label>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="150"
                        min="0"
                        required
                        className="w-full rounded-[5px] border border-gray-200 py-2.5 pl-8 pr-4 text-sm text-black outline-none transition focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Delivery Time
                    </label>

                    <input
                      type="text"
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleChange}
                      placeholder="1-2 Days"
                      required
                      className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-black"
                    />
                  </div>
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
                    className="w-full rounded-[5px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition focus:border-black"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingService(null);
                  }}
                  className="w-full rounded-[5px] border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-[5px] bg-red px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
                >
                  {editingService
                    ? "Update Service"
                    : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-[5px] bg-white p-5 sm:p-6">

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-black">
                  Delete Service?
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>

              <button
                onClick={() => setDeleteService(null)}
                className="rounded-[5px] p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Selected Service */}
            <div className="mt-5 rounded-[5px] bg-gray-50 p-4">
              <p className="font-semibold text-black">
                {deleteService.name}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                ₹{deleteService.price} ·{" "}
                {deleteService.deliveryTime}
              </p>
            </div>

            {/* Delete Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                onClick={() => setDeleteService(null)}
                className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="w-full rounded-[5px] bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition sm:w-auto"
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

export default AdminServices;
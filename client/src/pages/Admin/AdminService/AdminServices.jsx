import { useState, useEffect, useMemo } from "react";
import { Search, Plus, Pencil, Trash2, X, Clock, PackageOpen } from "lucide-react";

import {
  getAllServices,
  createService,
  updateService,
  deleteService as deleteServiceApi,
} from "../../../services/ServiceServices";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  deliveryTime: "",
  status: "Active",
};

const toBackendStatus = (s) => (s === "Active" ? "active" : "inactive");

const inputCls =
  "w-full rounded-[5px] border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-4 focus:ring-black/10";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  // ================= FETCH =================

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getAllServices();
      const list = response.services || response.data || [];
      setServices(
        list.map((s) => ({
          ...s,
          status: s.status === "active" ? "Active" : "Inactive",
        }))
      );
    } catch (error) {
      console.error("Failed to fetch services:", error);
      console.error("Server response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= DERIVED =================

  const stats = useMemo(() => {
    const active = services.filter((s) => s.status === "Active").length;
    const prices = services.map((s) => Number(s.price) || 0);
    const avg = prices.length
      ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      : 0;
    return { total: services.length, active, inactive: services.length - active, avg };
  }, [services]);

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ================= HANDLERS =================

  const closeForm = () => {
    setShowForm(false);
    setEditingService(null);
    setFormData(EMPTY_FORM);
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData(EMPTY_FORM);
    setShowForm(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || "",
      description: service.description || "",
      price: service.price ?? "",
      deliveryTime: service.deliveryTime || "",
      status: service.status === "Active" ? "Active" : "Inactive",
    });
    setShowForm(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const data = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        deliveryTime: formData.deliveryTime,
        status: toBackendStatus(formData.status),
      };

      if (editingService) {
        await updateService(editingService._id, data);
      } else {
        await createService(data);
      }

      await fetchServices();
      closeForm();
    } catch (error) {
      console.error("Service save error:", error);
      console.error("Server response:", error.response?.data);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!id) {
        console.error("Service ID not found");
        return;
      }
      await deleteServiceApi(id);
      await fetchServices();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Delete service error:", error);
      console.error("Server response:", error.response?.data);
    }
  };

  // ================= UI =================

  const filters = [
    { key: "All", label: "All", count: stats.total },
    { key: "Active", label: "Active", count: stats.active },
    { key: "Inactive", label: "Inactive", count: stats.inactive },
  ];

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              Delivery services
            </h1>
            <p className="mt-1.5 max-w-md text-sm leading-6 text-gray-500">
              The shipping options customers can choose at checkout, with their
              price and delivery time.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Plus size={16} />
            Add service
          </button>
        </div>

        {/* Summary strip */}
        <dl className="mt-8 grid grid-cols-3 divide-x divide-gray-200 overflow-hidden rounded-[5px] border border-gray-200 bg-white">
          {[
            { label: "Services", value: stats.total },
            { label: "Live at checkout", value: stats.active },
            { label: "Average price", value: `₹${stats.avg}` },
          ].map((s) => (
            <div key={s.label} className="px-4 py-4 sm:px-6">
              <dt className="text-xs text-gray-500">{s.label}</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums text-gray-900 sm:text-2xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex self-start rounded-[5px] bg-gray-200/70 p-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                className={`rounded-[5px] px-3 py-1.5 text-sm font-medium transition ${
                  statusFilter === f.key
                    ? "bg-white text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {f.label}
                <span className="ml-1.5 tabular-nums text-gray-400">{f.count}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>

        {/* List */}
        <div className="mt-4 overflow-hidden rounded-[5px] border border-gray-200 bg-white">
          {loading ? (
            <ul className="divide-y divide-gray-100">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex animate-pulse items-center gap-4 p-5">
                  <div className="h-10 w-10 rounded-[5px] bg-gray-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-40 rounded-[5px] bg-gray-100" />
                    <div className="h-3 w-64 max-w-full rounded-[5px] bg-gray-100" />
                  </div>
                  <div className="h-6 w-16 rounded-[5px] bg-gray-100" />
                </li>
              ))}
            </ul>
          ) : filteredServices.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {filteredServices.map((service) => {
                const isActive = service.status === "Active";
                const confirming = confirmDeleteId === service._id;

                return (
                  <li key={service._id} className="p-4 sm:px-6 sm:py-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                      {/* Name + description */}
                      <div className="min-w-0 flex-1">
                        <h2
                            className={`truncate text-base font-medium text-gray-900`}
                          >
                            {service.name}
                          </h2>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-500">
                          {service.description}
                        </p>
                      </div>

                      {/* Delivery time */}
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 sm:w-28">
                        <Clock size={15} className="text-gray-400" />
                        {service.deliveryTime}
                      </div>

                      {/* Status */}
                      <div className="sm:w-24">
                        <span
                          className={`inline-flex items-center rounded-[5px] px-2.5 py-1 text-xs font-medium ${
                            isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {service.status}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="text-xl font-semibold tabular-nums text-gray-900 sm:w-20 sm:text-right">
                        ₹{service.price}
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-end gap-3 sm:pl-0">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleEdit(service)}
                            className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                            title="Edit service"
                            aria-label={`Edit ${service.name}`}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(service._id)}
                            className="rounded-[5px] p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete service"
                            aria-label={`Delete ${service.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Inline delete confirmation */}
                    {confirming && (
                      <div className="mt-4 flex flex-col gap-3 rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-red-800">
                          Delete <span className="font-medium">{service.name}</span>?
                          Customers will no longer see it, and this can't be undone.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-[5px] bg-white px-3 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50"
                          >
                            Keep
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="rounded-[5px] bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
                          >
                            Delete service
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[5px] bg-gray-100 text-gray-400">
                <PackageOpen size={22} />
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                {services.length === 0 ? "No services yet" : "No matching services"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {services.length === 0
                  ? "Add your first delivery option to show it at checkout."
                  : "Try a different name or switch the status filter."}
              </p>
              {services.length === 0 && (
                <button
                  onClick={handleAdd}
                  className="mt-5 inline-flex items-center gap-2 rounded-[5px] bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  <Plus size={16} />
                  Add service
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= SLIDE-OVER FORM ================= */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-gray-900/40"
            onClick={closeForm}
            aria-hidden="true"
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label={editingService ? "Edit service" : "Add service"}
            className="relative flex h-full w-full max-w-md flex-col bg-white"
          >
            <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingService ? "Edit service" : "Add service"}
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  {editingService
                    ? "Changes appear at checkout right away."
                    : "Set the price and delivery time customers will see."}
                </p>
              </div>
              <button
                onClick={closeForm}
                className="rounded-[5px] p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Express delivery"
                    required
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Parcels arrive the next business day"
                    rows="3"
                    required
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        ₹
                      </span>
                      <input
                        id="price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="150"
                        min="0"
                        required
                        className={`${inputCls} pl-8`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="deliveryTime" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Delivery time
                    </label>
                    <input
                      id="deliveryTime"
                      type="text"
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleChange}
                      placeholder="1-2 days"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-1.5 text-sm font-medium text-gray-700">
                    Availability
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "Active", hint: "Shown at checkout" },
                      { value: "Inactive", hint: "Hidden from customers" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`cursor-pointer rounded-[5px] border px-3.5 py-3 transition ${
                          formData.status === opt.value
                            ? "border-black bg-gray-100 ring-4 ring-black/10"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={opt.value}
                          checked={formData.status === opt.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="block text-sm font-medium text-gray-900">
                          {opt.value}
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-500">
                          {opt.hint}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="flex gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 rounded-[5px] bg-white px-4 py-2.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-[5px] bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingService
                    ? "Save changes"
                    : "Add service"}
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  User,
  Phone,
  MapPin,
  Calendar,
  Weight,
  CreditCard,
  Truck,
  Layers,
  FileText,
  CircleDot,
  XCircle,
  Check,
  ClipboardCheck,
  PackageCheck,
  Bike,
  BadgeCheck,
} from "lucide-react";

import { getShipmentByTrackingNumber } from "../../services/ShipmentServices";

// ==============================
// CONSTANTS
// ==============================

// Each stage has its own icon and icon color (the only color on the page)
const STAGES = [
  { key: "booked", label: "Booked", Icon: ClipboardCheck, color: "text-slate-500" },
  { key: "picked up", label: "Picked up", Icon: PackageCheck, color: "text-amber-500" },
  { key: "in transit", label: "In transit", Icon: Truck, color: "text-blue-500" },
  { key: "out for delivery", label: "Out for delivery", Icon: Bike, color: "text-purple-500" },
  { key: "delivered", label: "Delivered", Icon: BadgeCheck, color: "text-emerald-500" },
];

const STATUS_DOT = {
  booked: "text-slate-500",
  "picked up": "text-amber-500",
  "in transit": "text-blue-500",
  "out for delivery": "text-purple-500",
  delivered: "text-emerald-500",
  cancelled: "text-red-500",
};

const norm = (v) => v?.trim().toLowerCase();

// ==============================
// SMALL COMPONENTS
// ==============================

const Shell = ({ children }) => (
  <main className="min-h-screen bg-white px-4 py-10 sm:px-6">{children}</main>
);

const SectionHeader = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-gray-200 bg-white">
      {icon}
    </div>
    <div>
      <h2 className="font-semibold text-black">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  </div>
);

const Field = ({ icon, label, children }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <div className="mt-1 text-sm text-gray-800">{children}</div>
    </div>
  </div>
);

const PartyCard = ({ title, subtitle, data, iconColor }) => (
  <section className="overflow-hidden rounded-[5px] border border-gray-200 bg-white">
    <SectionHeader
      icon={<User size={20} className={iconColor} />}
      title={title}
      subtitle={subtitle}
    />

    <div className="space-y-5 p-6">
      <Field icon={<User size={16} className={iconColor} />} label="Name">
        <span className="text-base font-medium text-black">
          {data?.name || "-"}
        </span>
      </Field>

      <Field icon={<Phone size={16} className="text-green-500" />} label="Phone">
        {data?.phone || "-"}
      </Field>

      <Field icon={<MapPin size={16} className="text-red-500" />} label="Address">
        <span className="leading-6">
          {data?.address || "-"}, {data?.city || "-"}, {data?.state || "-"}{" "}
          {data?.pincode || ""}
        </span>
      </Field>
    </div>
  </section>
);

const Tile = ({ label, icon, children }) => (
  <div className="rounded-[5px] border border-gray-200 p-4">
    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
      {icon}
      {label}
    </div>
    <div className="mt-2.5">{children}</div>
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex rounded-[5px] border border-black px-2.5 py-1 text-xs font-semibold text-black">
    {children}
  </span>
);

// ==============================
// PAGE
// ==============================

const ShipmentDetails = () => {
  const { trackingNumber } = useParams();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH SHIPMENT
  useEffect(() => {
    const fetchShipment = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getShipmentByTrackingNumber(trackingNumber);

        setShipment(response.shipment);
      } catch (error) {
        console.error("Shipment details error:", error);

        setError(
          error.response?.data?.message || "Failed to fetch shipment details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (trackingNumber) {
      fetchShipment();
    } else {
      setLoading(false);
      setError("Tracking Number is missing");
    }
  }, [trackingNumber]);

  // LOADING
  if (loading) {
    return (
      <Shell>
        <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
          <p className="mt-4 text-sm text-gray-500">
            Loading shipment details...
          </p>
        </div>
      </Shell>
    );
  }

  // ERROR
  if (error) {
    return (
      <Shell>
        <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center">
          <XCircle size={40} className="text-red-500" />

          <p className="mt-4 text-sm text-gray-700">{error}</p>

          <Link
            to="/shipments"
            className="mt-5 rounded-[5px] bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Back to Shipments
          </Link>
        </div>
      </Shell>
    );
  }

  // NOT FOUND
  if (!shipment) {
    return (
      <Shell>
        <div className="mx-auto flex min-h-[70vh] items-center justify-center">
          <p className="text-sm text-gray-500">Shipment not found.</p>
        </div>
      </Shell>
    );
  }

  // DERIVED
  const statusKey = norm(shipment.status) || "booked";
  const cancelled = statusKey === "cancelled";
  const currentStage = STAGES.findIndex((s) => s.key === statusKey);
  const dotColor = STATUS_DOT[statusKey] || "text-slate-500";

  const createdDate = shipment.createdAt
    ? new Date(shipment.createdAt).toLocaleDateString()
    : "-";

  return (
    <Shell>
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <Link
          to="/shipments"
          className="mb-6 inline-flex w-fit items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} className="text-blue-500" />
          Back to Shipments
        </Link>

        {/* ==============================
            HERO
        ============================== */}
        <section className="rounded-[5px] bg-black p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Shipment details
              </p>

              <div className="mt-3 flex items-center gap-3">
                <Package size={30} className="shrink-0 text-white" />
                <h1 className="break-all text-2xl font-bold tracking-tight sm:text-3xl">
                  {shipment.trackingNumber}
                </h1>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-300">
                <MapPin size={15} className="text-white" />
                <span className="font-medium text-white">
                  {shipment.sender?.city || "-"}
                </span>
                <ArrowRight size={15} className="text-white" />
                <span className="font-medium text-white">
                  {shipment.receiver?.city || "-"}
                </span>
                <span className="text-gray-600">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={15} className="text-white" />
                  {createdDate}
                </span>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-[5px] bg-white px-4 py-2 text-sm font-semibold text-black">
              <CircleDot size={16} className={dotColor} />
              {shipment.status || "Booked"}
            </span>
          </div>
        </section>

       

        {/* ==============================
            SENDER & RECEIVER
        ============================== */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <PartyCard
            title="Sender"
            subtitle="Pickup details"
            data={shipment.sender}
            iconColor="text-blue-500"
          />
          <PartyCard
            title="Receiver"
            subtitle="Delivery details"
            data={shipment.receiver}
            iconColor="text-emerald-500"
          />
        </div>

        {/* ==============================
            PACKAGE DETAILS
        ============================== */}
        <section className="mt-6 overflow-hidden rounded-[5px] border border-gray-200 bg-white">
          <SectionHeader
            icon={<Package size={20} className="text-violet-500" />}
            title="Package details"
            subtitle="Shipment information"
          />

          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Tile
                label="Package type"
                icon={<Layers size={16} className="text-amber-500" />}
              >
                <p className="text-base font-semibold text-black">
                  {shipment.packageType || "-"}
                </p>
              </Tile>

              <Tile
                label="Weight"
                icon={<Weight size={16} className="text-sky-500" />}
              >
                <p className="text-base font-semibold text-black">
                  {shipment.weight || "-"} kg
                </p>
              </Tile>

              <Tile
                label="Created"
                icon={<Calendar size={16} className="text-pink-500" />}
              >
                <p className="text-base font-semibold text-black">
                  {createdDate}
                </p>
              </Tile>

              <Tile
                label="Service"
                icon={<Truck size={16} className="text-orange-500" />}
              >
                <Badge>{shipment.service?.type || "Standard"}</Badge>
                <p className="mt-2 text-base font-semibold text-black">
                  {shipment.service?.name || "-"}
                </p>
                {shipment.service?.price !== undefined && (
                  <p className="mt-0.5 text-sm text-gray-500">
                    ₹{shipment.service.price}
                  </p>
                )}
              </Tile>

              <Tile
                label="Payment"
                icon={<CreditCard size={16} className="text-teal-500" />}
              >
                <Badge>{shipment.paymentType || "Pending"}</Badge>
              </Tile>

              <Tile
                label="Status"
                icon={<CircleDot size={16} className={dotColor} />}
              >
                <Badge>{shipment.status || "Booked"}</Badge>
              </Tile>
            </div>

            {/* Description */}
            <div className="mt-6 rounded-[5px] border border-dashed border-gray-300 p-5">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                <FileText size={16} className="text-indigo-500" />
                Description
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {shipment.description || "No description provided."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Shell>
  );
};

export default ShipmentDetails;
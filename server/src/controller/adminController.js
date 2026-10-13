import User from "../models/User.js";
import Shipment from "../models/Shipment.js";
import Service from "../models/Service.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalShipments = await Shipment.countDocuments();

    const activeShipments = await Shipment.countDocuments({
      status: {
        $in: [
          "Booked",
          "Picked Up",
          "In Transit",
          "Out for Delivery",
        ],
      },
    });

    const pendingShipments = await Shipment.countDocuments({
      status: "Booked",
    });

    const inTransitShipments = await Shipment.countDocuments({
      status: "In Transit",
    });

    const deliveredShipments = await Shipment.countDocuments({
      status: "Delivered",
    });

    const cancelledShipments = await Shipment.countDocuments({
      status: "Cancelled",
    });

    const totalServices = await Service.countDocuments();

    const activeServices = await Service.countDocuments({
      status: "active",
    });

    // Get latest 5 shipments
    const recentShipments = await Shipment.find()
      .populate("customer", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      message: "Admin dashboard details fetched successfully",

      data: {
        totalUsers,
        totalShipments,
        activeShipments,
        pendingShipments,
        inTransitShipments,
        deliveredShipments,
        cancelledShipments,
        totalServices,
        activeServices,
        recentShipments,
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard details",
      error: error.message,
    });
  }
};
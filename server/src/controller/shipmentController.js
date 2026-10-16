import Shipment from "../models/Shipment.js";
import Service from "../models/Service.js";
import TrackingUpdate from "../models/TrackingUpdate.js";

// Generate tracking number
const generateTrackingNumber = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `CR${randomNumber}`;
};


export const createShipment = async (req, res) => {
  try {
    const {
      sender,
      receiver,
      packageType,
      weight,
      description,
      serviceId,
    } = req.body;

    const service = await Service.findOne({
      _id: serviceId,
      status: "active",
    });

    if (!service) {
      return res.status(400).json({
        success: false,
        message: "Selected service is not available",
      });
    }

    const shipment = await Shipment.create({
      trackingNumber: generateTrackingNumber(),

      customer: req.user._id,

      sender: {
        name: sender.name,
        phone: sender.phone,
        address: sender.address,
        city: sender.city,
        state: sender.state,
        pincode: sender.pincode,
      },

      receiver: {
        name: receiver.name,
        phone: receiver.phone,
        address: receiver.address,
        city: receiver.city,
        state: receiver.state,
        pincode: receiver.pincode,
      },

      packageType,
      weight,
      description,

      service: {
        serviceId: service._id,
        name: service.name,
        price: service.price,
      },

      status: "Booked",
    });

    await TrackingUpdate.create({
      shipment: shipment._id,
      status: "Booked",
      location: sender.city,
      remarks: "Shipment booked successfully",
    });

    res.status(201).json({
      success: true,
      message: "Shipment created successfully",
      shipment,
    });
  } catch (error) {
    console.error("Create shipment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create shipment",
      error: error.message,
    });
  }
};



export const getMyShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({
      customer: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Shipments fetched successfully",
      shipments,
    });

  } catch (error) {
    console.error("Get my shipments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch shipments",
      error: error.message,
    });
  }
};


export const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Shipments fetched successfully",
      shipments,
    });

  } catch (error) {
    console.error("Get all shipments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch shipments",
      error: error.message,
    });
  }
};



export const getShipmentByTrackingNumber = async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    const shipment = await Shipment.findOne({
      trackingNumber: trackingNumber,
    });

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    // Admin can view any shipment
    if (req.user.role === "admin") {
      return res.status(200).json({
        success: true,
        shipment,
      });
    }

    // Customer can only view their own shipment
    if (
      shipment.userId &&
      shipment.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this shipment",
      });
    }

    return res.status(200).json({
      success: true,
      shipment,
    });
  } catch (error) {
    console.error(
      "Get shipment by tracking number error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch shipment",
      error: error.message,
    });
  }
};



export const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findById(id)
      .populate("customer", "name email");

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shipment fetched successfully",
      shipment,
    });

  } catch (error) {
    console.error("Get shipment by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch shipment",
      error: error.message,
    });
  }
};

export const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shipment updated successfully",
      shipment,
    });

  } catch (error) {
    console.error("Update shipment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update shipment",
      error: error.message,
    });
  }
};


export const deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findByIdAndDelete(id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    // Delete related tracking updates
    await TrackingUpdate.deleteMany({
      shipment: id,
    });

    res.status(200).json({
      success: true,
      message: "Shipment deleted successfully",
      shipment,
    });

  } catch (error) {
    console.error("Delete shipment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete shipment",
      error: error.message,
    });
  }
};
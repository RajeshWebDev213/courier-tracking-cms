import Shipment from "../models/Shipment.js";
import TrackingUpdate from "../models/TrackingUpdate.js";

export const getTrackingByNumber = async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    const shipment = await Shipment.findOne({
      trackingNumber,
    })
      .populate("customer", "name email");

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    const trackingHistory = await TrackingUpdate.find({
      shipment: shipment._id,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: "Tracking details fetched successfully",
      shipment: {
        ...shipment.toObject(),
        trackingHistory,
      },
    });
  } catch (error) {
    console.error("Get tracking error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tracking details",
      error: error.message,
    });
  }
};
export const UpdateTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location, dateTime, remarks } = req.body;

    const shipment = await Shipment.findById(id);

    if (!shipment) {
      return res.status(404).json({
        message: "Shipment not found",
      });
    }

    const trackingUpdate = await TrackingUpdate.create({
      shipment: id,
      status,
      location,
      dateTime,
      remarks,
    });

    shipment.status = status;
    await shipment.save();

    res.status(201).json({
      message: "Tracking status added successfully",
      trackingUpdate,
      shipment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add tracking update",
      error: error.message,
    });
  }
};
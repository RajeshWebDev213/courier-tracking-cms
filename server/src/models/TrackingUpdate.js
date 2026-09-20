const mongoose = require("mongoose");

const trackingUpdateSchema = new mongoose.Schema(
  {
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Booked",
        "Picked Up",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    dateTime: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TrackingUpdate", trackingUpdateSchema);
import Shipment from "../models/Shipment.js";
import User from "../models/User.js";
import TrackingUpdate from "../models/TrackingUpdate.js";

const generateTrackingNumber = ()=>{
  const randomNumber = Math.floor(100000 + Math.random() * 900000)
  return `CR${randomNumber}`;
}

export const createShipment = async (req, res) => {
  try {
    const {
      senderName,
      senderPhone,
      senderAddress,
      senderCity,
      senderState,
      senderPincode,

      receiverName,
      receiverPhone,
      receiverAddress,
      receiverCity,
      receiverState,
      receiverPincode,

      packageType,
      weight,
      description,
    } = req.body;

    const shipment = await Shipment.create({
      trackingNumber: generateTrackingNumber(),

      customer: req.user._id,

      sender: {
        name: senderName,
        phone: senderPhone,
        address: senderAddress,
        city: senderCity,
        state: senderState,
        pincode: senderPincode,
      },

      receiver: {
        name: receiverName,
        phone: receiverPhone,
        address: receiverAddress,
        city: receiverCity,
        state: receiverState,
        pincode: receiverPincode,
      },

      packageType,
      weight,
      description,
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
      shipments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch shipments",
      error: error.message,
    });
  }
};

export const getAllShipments = async(req,res)=>{
  try{
     const shipments = await Shipment.find();

       res.status(200).json({
      message: "Shipments fetched successfully",
      shipments
    });
  }catch(error){
    res.status(500).json({success:false,message:"Internal server error for getAllShipments"})
  }
}

export const getShipmentById = async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    const shipment = await Shipment.findOne({
      trackingNumber,
      customer: req.user._id,
    });

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
    console.error("Get shipment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch shipment",
      error: error.message,
    });
  }
};

export const updateShipment = async (req,res)=>{
  try{
     const {id} = req.params;
    const shipment = await Shipment.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    if (!shipment) {
      return res.status(404).json({
        message: "Shipment not found"
      });
    }
     
    res.status(200).json({
    message: "Shipments updated successfully",
    shipment
    });
  }catch(error){
  res.status(500).json({
      message: "Failed to update shipment",
      error: error.message
    });
  }
}

export const deleteShipment = async (req,res)=>{
  try{
     const {id} = req.params;
    const shipment = await Shipment.findByIdAndDelete(id);
    if (!shipment) {
      return res.status(404).json({
        message: "Shipment not found"
      });
    }
     
    res.status(200).json({
    message: "Shipments deleted successfully",
    shipment
    });
  }catch(error){
  res.status(500).json({
      message: "Failed to delete shipment",
      error: error.message
    });
  }
}
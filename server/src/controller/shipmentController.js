import Shipment from "../models/Shipment.js";
import User from "../models/User.js";

export const createShipment = async(req,res)=>{
    try{
      const {
    trackingNumber,
    customer,
    sender,
    receiver,
    parcelDetails,
    weight,
    deliveryAddress
  } = req.body;

  const customerExists = await User.findById(customer);
  
  if(!customerExists){
    return res.status(404).json({message:"Customer not found"})
  }

  const shipment = await Shipment.create({
     trackingNumber,
    customer,
    sender,
    receiver,
    parcelDetails,
    weight,
    deliveryAddress
  })

  res.status(200).json({message:"Shipment created Successfully", shipment})
}catch(error){
    res.status(500).json({message:"Failed to create shipment",error:error.message})
}
}


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

export const getShipmentById = async(req,res)=>{
  try{
    const {id} = req.params;
    const shipments = await Shipment.findById(id);
    
    if (!shipments) {
      return res.status(404).json({
        message: "Shipment not found"
      });
    }
     
    res.status(200).json({
    message: "Shipments fetched successfully",
    shipments
    });
  }catch(error){
         res.status(500).json({
      message: "Failed to fetch shipment",
      error: error.message
    });
  }
}

export const updateShipment = async (req,res)=>{
  try{
     const {id} = req.params;
    const shipment = await Shipment.findByIdAndUpdate(id,req.body,{new:true,runValidtor:true});
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
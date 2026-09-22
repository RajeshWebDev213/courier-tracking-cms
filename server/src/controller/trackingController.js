import Shipment from "../models/Shipment.js";
import TrackingUpdate from "../models/TrackingUpdate.js";

export const getTrackingByNumber = async(req,res)=>{
    try{
      const {trackingNumber} = req.params;

      const shipment = await Shipment.findOne({trackingNumber});
      
      if(!shipment){
       return res.status(404).json({message:"shipment not found"});
      }

      const TrackingUpdates = await TrackingUpdate.find({
        shipment:shipment._id
    }).sort({dateTime: 1});

       res.status(200).json({
        message:"Tracking details fetched successfully",
        shipment,
        TrackingUpdates
       })

    }catch(error){
        res.status(500).json({
      message: "Failed to fetch tracking details",
      error: error.message,
    });
    }
}


export const UpdateTracking = async(req,res)=>{
    try{
        const{id} = req.params;
        const { status, location, dateTime, remarks } = req.body;

        const shipment = await Shipment.findById(id);

        if(!shipment){
           return res.status(404).json({message:"shipment not found at updateTracking"})
        }

        const trackingUpdate = await TrackingUpdate.create({
            shipment:id,
            status,
            location,
            dateTime,
            remarks,
        });
       
        shipment.status = status;
        await shipment.save();
        

        res.status(201).json({
            message:"Tracking status added successfully",
            trackingUpdate,
            shipment
        })
    }catch(error){
        res.status(500).json({
      message: "Failed to add tracking update",
      error: error.message,
    });
    }
}

export const updateShipmentStatus = async(req,res)=>{
    try{
        const{id} = req.params
        const { status} = req.body;

        const shipment = await Shipment.findById(id);

        if(!shipment){
           return res.status(404).json({message:"shipment not found"})
        }

       
        shipment.status = status;
        await shipment.save();
        

        res.status(201).json({
            message:"Shipment status updated successfully",
            shipment
        })
    }catch(error){
        res.status(500).json({
      message: "Failed update shipment status",
      error: error.message,
    });
    }
}



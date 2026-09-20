import Shipment from "../models/Shipment";
import User from "../models/User";
const createShipment = async(req,res)=>{
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

  const customerExists = User.findById(customer);

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
  const savedShipment = await shipment.save()

  res.status(200).json({message:"Shipment created Successfully", shipment})
}catch(error){
    res.status(500).json({message:"Failed to create shipment",error:error.message})
}
}
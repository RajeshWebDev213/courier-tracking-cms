import Service from "../models/Service.js";

export const getService = async(req,res)=>{
    try{
       const service = await Service.find().sort({createdAt : -1});
       res.status(200).json({
        message:"services fetched successfully",
       service,
       })   
    }catch(error){
      res.status(500).json({
        message:"Failed of fecth services",
        error: error.message
      })
    }
}

export const createService = async(req,res)=>{
    try{
      const{
        name,
        type,
        description,
        price,
        estimatedDelivery,
        status
      } = req.body;

      const service = await Service.create({
        name,type,description,price,estimatedDelivery,status
      })
      res.status(200).json({
        success:true,
        message: "service created successfully",
        service
    })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to create the service",
            error:error.message
        })
    }
}

export const updateService = async(req,res)=>{
    try{
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
             {
              new : true,
              runValidators:true    
             });

         if(!service){
            return res.json(404).json({message:"Server not found"})
         }
         res.status(200).json({message:"Service updated successfully",service})
    }catch(error){
         res.status(500).json({message:"Failed to updated service",error: error.message})
    }
}

export const deleteService = async(req,res)=>{
    try{
       const service = await Service.findByIdAndDelete(req.params.id);
       if(!service) return res.status(404).json({message:"Servie not found"});
       
       res.status(200).json({message:"Service deleted successfully",service})
    }catch(error){
      res.status(500).json({message:"Failed to delete service",error:error.message})
    }
}
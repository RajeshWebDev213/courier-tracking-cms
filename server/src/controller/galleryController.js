import Gallery from "../models/Gallery.js";

export const getGallery = async(req,res) => {
    try{
       const gallery = await Gallery.find();
       if(!gallery){
        return res.status(404).json({message:"Gallery not found"});
       }
       res.status(200).json({
        success:true,
        message:"Successfully Gallery fetch",
        gallery});
    }catch(error){
      res.status(500).json({
        success: false,
        message: "Failed to fetch Gallery",
        error:error.message,
      })
    }
}
export const createGallery = async(req,res)=>{

}
export const deleteGallery = async(req,res)=>{
    try{
       const gallery = await Gallery.findByIdAndDelete(req.params.id);

       if(!gallery){
          return res.status(404).json({message:"Gallery not found"})
       }
       res.status(200).json({
        success:true,
        message:"Gallery deleted successfully",
        gallery,
    })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to delete gallery",
            error:error.message,
        })
    }
}
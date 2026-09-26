import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js"
import sharp from "sharp"

export const getGallery = async(req,res) => {
    try{
       const gallery = await Gallery.find().sort({createdAt: -1});
       if(!gallery){
        return res.status(404).json({message:"Gallery not found"});
       }
       res.status(200).json({
        success:true,
        message:"Gallery fetched successfully",
        gallery});
    }catch(error){
      res.status(500).json({
        success: false,
        message: "Failed to fetch Gallery",
        error:error.message,
      })
    }
}
export const createGallery = async (req, res) => {
  try {

    const { title, section } = req.body;

    if (!title || !section) {
      return res.status(400).json({
        message: "Title and Section are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    // Convert image into WebP
    const webBuffer = await sharp(req.file.buffer)
      .resize(1200, 1200, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toBuffer();

    // Upload WebP image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "courier-website/gallery",
          resource_type: "image",
          format:"webp"
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(webBuffer);
    });

    // Save data in MongoDB
    const gallery = await Gallery.create({
      title,
      image: result.secure_url,
      section,
      cloudinaryPublicId: result.public_id,
    });

    res.status(201).json({
      message: "Gallery created successfully",
      gallery,
    });
  } catch (error) {
    console.error("Gallery Error:", error);

    res.status(500).json({
      message: "Failed to create gallery",
      error: error.message,
    });
  }
};
export const deleteGallery = async(req,res)=>{
    try{
       const {id} = req.params
       const gallery = await Gallery.findById(id);

       if(!gallery){
          return res.status(404).json({message:"Gallery not found"})
       }

       await cloudinary.uploader.destroy(gallery.cloudinaryPublicId);

       await Gallery.findByIdAndDelete(id)
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
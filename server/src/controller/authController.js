import bcrypt from "bcryptjs"
import User from "../models/User.js"
import generateToken from "../utils/generateToken.js";

export const register = async(req,res)=>{
    try{
      const {name,email,password,role} = req.body;
      if(!name || !email || !password || !role){
        return res.status(400).json({success:false,message:"All fileds are required"})
      }
      const exists = await User.findOne({email});
      if(exists){
        return res.status(400).json({success:false,message:"User already exists"})
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,

      });
      const token = generateToken(user._id);
      res.status(200).json({success:true,message:"User Created",token})
    }catch(error){
        res.status(401).json({success:false,message:error.message})
    }
}

// login
export const login = async(req,res)=>{
    try{
      const {email,password} = req.body;
      if(!email || !password){
        return res.status(400).json({success:false,message:"Email and password are requied"})
      }

      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({success:false,message:"User not found"})
      }
      // if(!user.isVerified){
      //   return   res.status(400).json({success:false,message:"First verify your email "})
      // }

      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
         return res.status(400).json({success:false,message:"Invalid credentials"})
      }

      const token = generateToken(user._id)
      res.status(200).json({success:true,message:"login successfull",token, user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },})

    }catch(error){
      res.status(500).json({success:false,message:error.message})
    }
}

export const logout =  async (req,res)=>{
       return res.status(200).json({success:true,message:"Logout successfull"})
}
export const getme = async(req,res)=>{
  try{
    res.status(200).json({
      success: true,
      user:req.user
    })
  }catch(error){
    res.status(500).json({success:false,message:"Internal server error"})
  }
}
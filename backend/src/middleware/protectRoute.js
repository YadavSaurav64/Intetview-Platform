import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req,res,next)=>{
    try {
      const clerckId = req.auth().userId;

      if(!clerckId) return res.status(401).json({message:"Unauthorized - Invalid Token"})

      //find user in db by clerk ID
      const user =await User.findOne({clerckId})

      if(!user) return res.status(401).json({message:"Unauthorized - User not found"})

      //attach user to req
      req.user=user
       
      next()
    } catch (error) {
      console.error("Error in protectRoute middleware:",error)
      res.status(500).json({message:"Internal Server Error"})
    }
  }
]
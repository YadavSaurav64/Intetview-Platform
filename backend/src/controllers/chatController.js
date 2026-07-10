import { chatClient } from "../lib/stream.js"

export const getStreamToken = async(req,res)=>{
  try {
    //use clerckId for Stream (not mongodb _id)=> it should match the id we have in the stream dashboard
    const token = chatClient.createToken(req.user.clerckId)

    res.status(200).json({
      token,
      userId:req.user.clerckId,
      userName:req.user.name,
      userImage:req.user.image
    })
  } catch (error) {
    console.log("Error in getStreamToken controller:",error.message)
    res.status(500).json({message:"Internal Server Error"})
  }
}
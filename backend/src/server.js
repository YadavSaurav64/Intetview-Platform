import express from 'express'
import path from 'path'
import { ENV } from './lib/env.js'
import { connectDB } from './lib/db.js'
import cors from "cors"
import {serve} from "inngest/express"
import { inngest,functions } from './lib/inngest.js'
import {clerkMiddleware} from "@clerk/express"
import { protectRoute } from './middleware/protectRoute.js'
import chatRoutes from './routes/chatRoutes.js'

const app=express()

const __dirname=path.resolve()


//middleware
app.use(express.json())
//creadentials:true allows cookies to be sent with requests from the client
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(clerkMiddleware()) // this ads auth field to req object: req.auth()

app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chat",chatRoutes)

app.get("/hello",(req,res)=>{
  res.status(200).json({msg:"Success"})
})

//make our app ready for deployment
if(ENV.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("/{*any}",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  });
}

const startServer = async ()=>{
  try {
    await connectDB();
    app.listen(ENV.PORT,()=>{
      console.log("Server is running on port:",ENV.PORT)
    })
  } catch (error) {
    console.log("Error starting server:",error)
  }
}

startServer()
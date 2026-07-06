import mongoose from "mongoose"

import {ENV} from "./env.js"

export const connectDB = async()=>{
  try {

    if(!ENV.DB_URL){
      throw new Error("Missing Database URL")
    }

    const conn = await mongoose.connect(ENV.DB_URL)
    console.log("connected to database:",conn.connection.host)
  } catch (error) {
    console.log("Error connecting to database:",error)
    process.exit(1)
  }
}
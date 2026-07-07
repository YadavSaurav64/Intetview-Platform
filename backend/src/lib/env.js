import dotenv from 'dotenv'

dotenv.config({quiet:true})

export const ENV = {
  PORT:process.env.PORT,
  DB_URL:process.env.DB_URL,
  NODE_ENV:process.env.NODE_ENV,
  INNGEST_SIGNING_KEY:process.env.INNGEST_SIGNING_KEY,
  INNGEST_EVENT_KEY:process.env.INNGEST_EVENT_KEY,
  STEAM_API_KEY:process.env.STEAM_API_KEY,
  STEAM_SECRET_KEY:process.env.STEAM_SECRET_KEY,
  CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
  CLIENT_URL :process.env.CLIENT_URL
}
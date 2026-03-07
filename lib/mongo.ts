import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "";
if (!MONGO_URL) throw new Error("Missing MONGO_URL in environment variables");

let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGO_URL);
    isConnected = true;
    console.log("MongoDB connected:", conn.connection.host);
    return conn.connection; 
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

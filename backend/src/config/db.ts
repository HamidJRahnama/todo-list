import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("process.env ====>" , process.env.MONGO_URI)
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not defined in .env");
  }
  try {
    await mongoose.connect(uri, {
      authSource: "admin",
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    } as mongoose.ConnectOptions);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27018/todolist";
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



import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
   
      throw new Error("MONGO_URL environment variable is not defined.");
    }

    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected successfully");
  } catch (error: any) { 
    console.error("An Error Occurred connecting to MongoDB:", error.message || error);
    process.exit(1); 
  }
};
import mongoose from "mongoose";
require('dotenv').config();
export const connectDB = async()=>{
   try {
      await mongoose.connect(process.env.MONGO_URL as string);
      console.log("mongoDB connected successfully");
   } catch (error) {
      console.log("An Error Occured",error);
      process.exit(1);
   }
}
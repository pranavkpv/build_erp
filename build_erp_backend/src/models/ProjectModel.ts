import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  project_name: string;
  user_id: string;
  description: string;
  status: "pending" | "processing" | "completed";
  sitemanager_id: string;
  start_date: Date;
  end_date: Date;
  expected_image: string;
  finalImage: string;
}

const ProjectSchema: Schema = new Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    address:{
      type:String
    },
    mobile_number:{
      type:String
    },
    email:{
      type:String,
      required:true
    },
    description: {
      type: String,
    },
    area:{
      type:Number,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed"],
      required: true,
    },
    sitemanager_id: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    expected_image: {
      type: String,
    },
    finalImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);

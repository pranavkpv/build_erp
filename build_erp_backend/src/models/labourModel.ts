import mongoose, { Schema, Document } from "mongoose";

export interface ILabour extends Document {
   labour_type:string,
   daily_wage:number
}

const LabourSchema: Schema = new Schema({
   labour_type:{
      type:String,
      required:true
   },
   daily_wage:{
      type:Number,
      required:true
   }
},{timestamps:true})

export default mongoose.model<ILabour>('Labour', LabourSchema)
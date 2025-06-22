import mongoose, { Schema, Document } from "mongoose";
import { Material } from "../domain/types/material";

export interface IMaterial  extends Material, Document {
  _id:string
}

const MaterialSchema: Schema = new Schema({
   material_name: {
      type: String,
      required: true
   },
   category_id: {
      type: String,
      required:true
   },
    brand_id: {
      type: String,
      required:true
   },
   unit_id:{
      type:String,
      required:true
   },
    unit_rate: {
      type: Number,
      required:true
   },
   stock: {
      type: Number,
      required:true
   }
},{timestamps:true})

const MaterialModel =  mongoose.model<IMaterial>('Material', MaterialSchema)
export default MaterialModel
import mongoose, { Schema, Document } from "mongoose";

export interface IMaterial extends Document {
   material_name:string,
   category_id : string,
   brand_id : string,
   unit_id : string,
   unit_rate : number,
   stock : number
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

export default mongoose.model<IMaterial>('Material', MaterialSchema)
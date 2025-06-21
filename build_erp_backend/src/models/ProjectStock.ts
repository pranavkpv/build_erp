import mongoose, { Schema, Document } from "mongoose";

export interface IStock extends Document {
   project_id:string,
   material_id : string,
   stock :number
}

const StockSchema: Schema = new Schema({
   project_id: {
      type: String
   },
   material_id: {
      type: String
   },
    stock: {
      type: String
   }
},{timestamps:true})

export default mongoose.model<IStock>('Stock', StockSchema)
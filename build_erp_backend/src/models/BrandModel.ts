import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
   brand_name: string,
}

const BrandSchema: Schema = new Schema({
   brand_name: {
      type: String,
      required: true
   }
})

export default mongoose.model<IBrand>('Brand', BrandSchema)
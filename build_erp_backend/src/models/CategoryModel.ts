import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
   category_name: string,
   description: string,
}

const CategorySchema: Schema = new Schema({
   category_name: {
      type: String,
      required: true
   },
   description: {
      type: String
   }
},{timestamps:true})

export default mongoose.model<ICategory>('Category', CategorySchema)
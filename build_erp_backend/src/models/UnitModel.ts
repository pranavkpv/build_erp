import mongoose, { Schema, Document } from "mongoose";

export interface IUnit extends Document {
   unit_name: string,
   short_name: string,
}

const UnitSchema: Schema = new Schema({
   unit_name: {
      type: String,
      required: true
   },
   short_name: {
      type: String
   }
},{timestamps:true})

export default mongoose.model<IUnit>('Unit', UnitSchema)
import mongoose, { Schema,Document } from "mongoose";
export interface IAdmin extends Document{
   username:string,
   password:string
}

const AdminSchema:Schema = new Schema({
   username:{
      type:String
   },
   password:{
      type:String
   }
})

export default mongoose.model<IAdmin>('Admin',AdminSchema)
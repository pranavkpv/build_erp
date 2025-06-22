import mongoose, { Schema, Document } from "mongoose";

export interface ISitemanager extends Document {
   username:string,
   email:string,
   password:string
}

const SitemanagerSchema: Schema = new Schema({
   username:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   }
},{timestamps:true})

export default mongoose.model<ISitemanager>('Sitemanager', SitemanagerSchema)
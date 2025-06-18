import mongoose, { Schema,Document } from "mongoose";

export interface ITempUser extends Document{
   username:string,
   email:string,
   phone:string,
   password:string,
   otp:String,
   createdAt:Date,
   otpCreatedAt:Date
}

const TempUserSchema:Schema = new Schema({
   username:{
      type:String
   },
   email:{
      type:String
   },
   phone:{
      type:String
   },
   password:{
      type:String
   },
   otp:{
      type:String
   },
   otpCreatedAt:{
      type:Date,
      default:Date.now()
   },
   createdAt:{
      type:Date,
      default:Date.now(),
      expires:300
   }
})

export default mongoose.model<ITempUser>('TempUser',TempUserSchema)
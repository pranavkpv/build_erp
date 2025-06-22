
import mongoose, { Schema, Document } from "mongoose"
import { User } from "../domain/types/user";

export interface IUser extends User, Document {
   _id: string;
}

const userSchema: Schema = new Schema({
   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   phone: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   profile_image: {
      type: String
   }

}, { timestamps: true })

const UserModal = mongoose.model<IUser>('user', userSchema)
export default UserModal
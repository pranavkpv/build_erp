import AdminModel from "../../models/AdminModel"
import { adminData } from "../../domain/types/admin"
export const loginCheck = async(data:adminData)=>{
   const {username,password} = data
   const ExistAdmin = await AdminModel.findOne({username,password})
   if(!ExistAdmin){
      return {success:false , message:"The username or password you entered is invalid."}
   }
   return {success:true,message:"login successfully"}  
}
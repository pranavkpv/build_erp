import { Request,Response } from "express";
import { signUp,OTPVerify } from "../services/signupUser";

//otp generate and stored tempUser controller
export const sign = async(req:Request,res:Response)=>{
   try {
      const result = await signUp(req.body)
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}


//verify OTP controller
export const verifyOTP = async(req:Request,res:Response)=>{
   try {
      const result = await OTPVerify(req.body) 
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}
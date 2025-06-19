import { Request,Response } from "express";
import { signUp,OTPVerify,resend,ValidLogin } from "../services/signupUser";

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
      res.status(201).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}

//resend OTP controller
export const resendOtp = async(req:Request,res:Response)=>{
   try {

      const result = await resend(req.body)
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}

//user login controller
export const login = async (req: Request,res: Response)=> {
   try {
      const result = await ValidLogin(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.error(error)
      res.status(400).json({ message: error.message })
   }
}
import { Request,Response } from "express";
import { loginCheck } from "../../../application/useCases/loginAdmin";


export const adminLogin = async(req:Request,res:Response)=>{
   try {
      const result = await loginCheck(req.body)
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}
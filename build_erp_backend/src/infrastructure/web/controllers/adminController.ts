import { NextFunction, Request,Response } from "express";
import { AdminLoginUseCase } from "../../../useCases/AdminLoginUseCase";


export class adminController{
   private adminLoginUsecase : AdminLoginUseCase
   constructor(adminLoginUsecase : AdminLoginUseCase){
      this.adminLoginUsecase = adminLoginUsecase
   }
   login = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
     try {
       const result = await this.adminLoginUsecase.execute(req.body)
       res.status(200).json(result)
     } catch (error) {
      console.log(error)
      next(error)
     }
   }
}

import { NextFunction, Request,Response } from "express";
import { SignupUserUseCase } from "../../../useCases/SignupUserUseCase";
import { VerifyOTPUseCases } from "../../../useCases/VerifyOTPuseCases";
import { UserLoginUseCase } from "../../../useCases/UserLoginUseCase";
import { ResendOTPUseCase } from "../../../useCases/ResendOTPUseCase";




export class AuthController{
   private signupUserUseCase :SignupUserUseCase
   private verifyOTPUseCase : VerifyOTPUseCases
   private resendOTPUseCase : ResendOTPUseCase
   private userLoginUseCase : UserLoginUseCase
   constructor(signupUserUseCase :SignupUserUseCase,verifyOTPUseCase : VerifyOTPUseCases,resendOTPUseCase : ResendOTPUseCase,userLoginUseCase : UserLoginUseCase){
      this.signupUserUseCase = signupUserUseCase
      this.verifyOTPUseCase = verifyOTPUseCase
      this.resendOTPUseCase = resendOTPUseCase
      this.userLoginUseCase = userLoginUseCase
   }
   signUp = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
      try {
         const result = await this.signupUserUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         next(error)
      }
   }
   verifyOTP = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
      try {
         const result = await this.verifyOTPUseCase.execute(req.body)
          res.status(201).json(result)
      } catch (error) {
          next(error)
      }
   }
   resendOtp = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
      try {
         const result = await this.resendOTPUseCase.execute(req.body)
          res.status(200).json(result)
      } catch (error) {
         next(error)
      }
   }
   login =  async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
      try {
         const result = await this.userLoginUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
          next(error)
      }
   }
}



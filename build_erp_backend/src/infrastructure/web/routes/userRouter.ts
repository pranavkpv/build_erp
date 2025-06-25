import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { JwtServiceImpl } from "../../../services/JwtService";
const createAuthRoute = (authcontroller:AuthController):Router=>{
   const router = Router()
   const jwtService = new JwtServiceImpl()
   router.post('/signup',authcontroller.signUp)
   router.post('/verifyOtp',authcontroller.verifyOTP)
   router.post('/resendOtp',authcontroller.resendOtp)
   router.post('/login',authcontroller.login)
   return router
}

export default createAuthRoute;

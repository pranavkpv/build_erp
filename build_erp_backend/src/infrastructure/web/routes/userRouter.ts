import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
const createAuthRoute = (authcontroller:AuthController):Router=>{
   const router = Router()
   router.post('/signup',authcontroller.signUp)
   router.post('/verifyOtp',authcontroller.verifyOTP)
   router.post('/resendOtp',authcontroller.resendOtp)
   router.post('/login',authcontroller.login)
   return router
}

export default createAuthRoute;

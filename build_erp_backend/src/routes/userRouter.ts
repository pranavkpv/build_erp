import { Router } from "express";
import { sign,verifyOTP,resendOtp,login } from "../controllers/userController"
const router = Router()


router.post('/signup',sign)
router.post('/verifyOtp',verifyOTP)
router.post('/resendOtp',resendOtp)

//login route
router.post('/login',login)

export default router;

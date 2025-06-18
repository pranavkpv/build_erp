import { Router } from "express";
import { sign,verifyOTP } from "../controllers/userController"
const router = Router()


router.post('/signup',sign)
router.post('/verifyOtp',verifyOTP)

export default router;

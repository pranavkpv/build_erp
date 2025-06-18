import Usermodel from "../models/Usermodel";
import { signupUser, OTP } from "../types/user"
import { hashedPassword } from "../utils/hash";
import TempUsermodel from "../models/TempUsermodel";
import { sendEmail } from "../utils/sendEmail";



export const signUp = async (data: signupUser) => {
   const { username, email, phone, password } = data

   const existUser = await Usermodel.findOne({ email })
   const existPhone = await Usermodel.findOne({ phone })
   if (existUser || existPhone) {
      return { success: false, message: "User already exists." }
   }

   const otp = Math.floor(100000 + Math.random() * 900000)
   const otpCreatedAt = new Date()

   const newTempUser = new TempUsermodel({
      username,
      email,
      phone,
      password,
      otp,
      otpCreatedAt
   })
   await newTempUser.save()

   const text = `Dear ${ username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`
   const emailSend = await sendEmail(email, "OTP verification", text)

   if (emailSend) {
      return {
         success: true,
         message: "An OTP has been sent to your email. Please check your inbox and enter the OTP for verification."
      }
   } else {
      return {
         success: false,
         message: "Failed to send OTP email. Please try again later.",
      }
   }
}


export const OTPVerify = async (data: { otp: string, email: string }) => {
   const { otp, email } = data

   const ExistUser = await TempUsermodel.findOne({ email, otp })


   if (!ExistUser) {
      return { success: false, message: "Invalid OTP entered." }
   }

   const exitOtp = new Date(ExistUser.otpCreatedAt).getTime();
   const now = Date.now();
   if ((now - exitOtp) > 30 * 1000) {

      return { success: false, message: "Your OTP has timed out. Kindly resend and try again." }
   }



   const hashedPass = await hashedPassword(ExistUser.password)

   const newUser = new Usermodel({
      username: ExistUser.username,
      email: ExistUser.email,
      phone: ExistUser.phone,
      password: hashedPass
   })

   await newUser.save()
   await TempUsermodel.deleteOne({ email })

   return {
      success: true,
      message: "OTP confirmed. User registration was successful."
   }
}



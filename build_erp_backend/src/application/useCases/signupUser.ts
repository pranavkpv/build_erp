import Usermodel from "../../models/Usermodel";
import { signupUser, OTP, Email,LoginData } from "../../domain/types/user"
import { hashedPassword,comparedPassword } from "../../infrastructure/utils/hash";
import TempUsermodel from "../../models/TempUsermodel";
import { sendEmail } from "../../infrastructure/utils/sendEmail";



//signup
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

//verify otp
export const OTPVerify = async (data: OTP) => {
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


// resend otp
export const resend = async (data: Email) => {

   const existEmail = await TempUsermodel.findOne({ email: data.otpEmail })
   if (existEmail) {
      const otp = Math.floor(100000 + Math.random() * 900000)
      const text = `Dear ${ existEmail.username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`
      const emailSend = await sendEmail(existEmail.email, "OTP verification", text)

      if (emailSend) {
  
         await TempUsermodel.findOneAndUpdate({email:data.otpEmail},{$set:{otp:otp,otpCreatedAt:Date.now()}})
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
}

//login user

export const ValidLogin = async(data:LoginData)=>{
   const {email,password} = data
   
   const existUser = await Usermodel.findOne({email});
   if(!existUser){
      return{
         success:false,
         message:"Invalid email address. Please try again."
      }
   }
   const passwordCheck = await comparedPassword(password,existUser.password)
   if(!passwordCheck){
      return{
         success:false,
         message:"Invalid password. Please try again."
      }
   }
   else{
      return{
         success:true,
         message:"Login successfully"
      }
   }
}



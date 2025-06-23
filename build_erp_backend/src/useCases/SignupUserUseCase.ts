import Usermodel from "../models/Usermodel";
import { hashedPassword, comparedPassword } from "../infrastructure/utils/hash";
import TempUsermodel from "../models/TempUsermodel";
import { sendEmail } from "../infrastructure/utils/sendEmail";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { AppError } from "../infrastructure/utils/AppError";
import { userSignupInput, userSignupOutput } from "../domain/types/user";


export class SignupUserUseCase {
   private UserRepository: IUserRepository
   constructor(UserRepository: IUserRepository) {
      this.UserRepository = UserRepository
   }
   async execute(input: userSignupInput): Promise<userSignupOutput> {
      const { username, email, phone, password } = input

      const existUser = await  this.UserRepository.findUserByEmail(email)
      const existPhone = await this.UserRepository.findUserByPhone(phone)
      if (!existUser) {
         throw new AppError(false, "User already Exist", 409)
      }
      if (!existPhone) {
         throw new AppError(false, "User already Exist", 409)
      }

      const otp = Math.floor(100000 + Math.random() * 900000)
      const otpCreatedAt = new Date()

      await this.UserRepository.otpSave({username,
         email, phone,
         password,
         otp,
         otpCreatedAt})

      const text = `Dear ${ username }, your One-Time Password (OTP) for signing up with BuildERP is ${ otp }. Do not share this code with anyone.`
      const emailSend = await sendEmail(email, "OTP verification", text)

      if (emailSend) {
         return {
            success: true,
            message: "An OTP has been sent to your email. Please check your inbox and enter the OTP for verification."
         }
      } else {
         throw new AppError(false,"Failed to send OTP email. Please try again later.",500)
      }
   }
}






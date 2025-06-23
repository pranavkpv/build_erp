import express from 'express';
import cors from 'cors';
import userRouter from './src/infrastructure/web/routes/userRouter'
import adminRouter from './src/infrastructure/web/routes/adminRouter'
import { connectDB } from './src/config/db';
import { UsermongooseRepository } from './src/infrastructure/persistence/UsermongooseRepository';
import { BcryptHasher } from './src/infrastructure/secuirity/BcryptHasher';
import { AuthController } from './src/infrastructure/web/controllers/authController';
import { SignupUserUseCase } from './src/useCases/SignupUserUseCase';
import { VerifyOTPUseCases } from './src/useCases/VerifyOTPuseCases';
import { ResendOTPUseCase } from './src/useCases/ResendOTPUseCase';
import { UserLoginUseCase } from './src/useCases/UserLoginUseCase';
import createAuthRoute from './src/infrastructure/web/routes/userRouter';
import createAdminRoute from './src/infrastructure/web/routes/adminRouter';
import { adminController } from './src/infrastructure/web/controllers/adminController';
import { AdminLoginUseCase } from './src/useCases/AdminLoginUseCase';
import { AdminmongooseRepository } from './src/infrastructure/persistence/AdminmongooseRepository';
require("dotenv").config();


const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

async function compositeRoot() {
   try {
      await connectDB();
      const UserRepository = new UsermongooseRepository()
      const hasher = new BcryptHasher()
      const signupUserUseCase = new SignupUserUseCase(UserRepository)
      const verifyOTPUseCase = new VerifyOTPUseCases(UserRepository,hasher)
      const resendOTPUseCase = new ResendOTPUseCase(UserRepository)
      const userLoginUseCase = new UserLoginUseCase(UserRepository,hasher)
      const authController = new AuthController(
         signupUserUseCase,
         verifyOTPUseCase,
         resendOTPUseCase,
         userLoginUseCase
      )
      app.use("/",createAuthRoute(authController))
     const adminRepository = new AdminmongooseRepository()

      const adminLoginUsecase = new AdminLoginUseCase(adminRepository)


      const adminController = new adminController(adminLoginUsecase)

      app.use("/admin",createAdminRoute(adminController,
         categoryController,unitController,brandController,materialController,
         projectController,labourController,sitemanagerController
      ))

   } catch (error) {
      console.log(error)
      process.exit(1)
   }
}

app.use('/admin',adminRouter)

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log("server connected successfully")
   })
})

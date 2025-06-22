import express from 'express';
import cors from 'cors';
import userRouter from './src/infrastructure/web/routes/userRouter'
import adminRouter from './src/infrastructure/web/routes/adminRouter'
import { connectDB } from './src/config/db';
require("dotenv").config();


const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use('/', userRouter)
app.use('/admin',adminRouter)

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log("server connected successfully")
   })
})

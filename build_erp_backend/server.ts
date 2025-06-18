import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRouter'
import { connectDB } from './src/config/db';
require("dotenv").config();

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use('/', userRouter)

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log("server connected successfully")
   })
})

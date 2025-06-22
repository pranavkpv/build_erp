import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

export const sendEmail = async (to:string, subject:string, text:string):Promise<boolean> => {
   try {
      const transporter = nodemailer.createTransport({
         service:"gmail",
         auth:{
            user:process.env.EMAIL_USER ,
            pass:process.env.EMAIL_PASS
         }
      })
      const mailOptions = {
         from :`"BuildERP Support" <${process.env.EMAIL_USER}>`,
         to,
         subject,
         text
      }
      await transporter.sendMail(mailOptions);
      return true
   } catch (error) {
      console.log("An error occured",error)
      return false
   }
}
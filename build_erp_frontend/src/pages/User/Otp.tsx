import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

function Otp() {
   const [otp, setOtp] = useState('')
   const [timer, setTimer] = useState(0)
   const [resend, setResend] = useState(false)
   const otpRef = useRef<HTMLParagraphElement>(null)
   const validRef = useRef<HTMLParagraphElement>(null)
   const navigate = useNavigate()

   const otpEmail = localStorage.getItem("otpEmail")

   useEffect(() => {
      const interval = setInterval(() => {
         setTimer(prev => {
            if (prev >= 30) {
               clearInterval(interval)
               setTimer(0)
               return prev
            }
            return prev + 1
         })
      }, 1000)

      return () => clearInterval(interval)
   }, [])


   useEffect(() => {
      if (timer >= 30) {
         setResend(true)
         if (validRef.current) validRef.current.innerText = "Time out"
      }
   }, [timer])

   const verifyOTP = async (e: React.FormEvent) => {
      e.preventDefault()

      if (otp.trim() === "") {
         if (otpRef.current) otpRef.current.innerText = "Please enter OTP"
         return
      }

      try {
         const response = await axios.post(`${ import.meta.env.VITE_BASE_URL }/verifyOtp`, {
            otp,
            email: otpEmail
         })

         if (response.data.success) {
            toast.success(response.data.message)
            localStorage.removeItem("otpEmail")
            setTimeout(() => {
               navigate('/login')
            }, 3000)
         } else {
            toast.error(response.data.message)
         }
      } catch (error: any) {
         toast.error(error.message)
      }
   }

   const resendOTP = async()=>{
      setTimer(0)
      const response = await axios.post(`${ import.meta.env.VITE_BASE_URL }/resendOtp`,{otpEmail})
      const interval = setInterval(() => {
         setTimer(prev => {
            if (prev > 30) {
               clearInterval(interval)
               return prev
            }
            return prev + 1
         })
      }, 1000)
      if(response.data.success){
         toast.success(response.data.message)
      }else{
         toast.error(response.data.message)
      }
   }

  

   return (
      <form onSubmit={verifyOTP}>
         <h1>OTP Verification</h1>
         <input type="text" placeholder="Enter your OTP" onChange={(e) => setOtp(e.target.value)} />
         <p ref={otpRef}></p>

         <p>{timer}</p>

         <p ref={validRef}></p>

         <button type="button"  disabled={!resend} onClick={resendOTP}>
            Resend OTP
         </button>
         <button type="submit">Verify OTP</button>

      </form>
   )
}

export default Otp

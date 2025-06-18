import React, { useRef, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signup() {
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')

   const emailRef = useRef<HTMLParagraphElement>(null)
   const phoneRef = useRef<HTMLParagraphElement>(null)
   const userRef = useRef<HTMLParagraphElement>(null)
   const passRef = useRef<HTMLParagraphElement>(null)
   const cpassRef = useRef<HTMLParagraphElement>(null)

   const navigate = useNavigate()

   const signupFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*^])[a-zA-Z\d!@#$%^&*]{8,}$/
      let count = 0

      if (!email.includes("@")) {
         emailRef.current!.innerText = "Please enter a valid email address."
         count = 1
      } else {
         emailRef.current!.innerText = ""
      }

      if (isNaN(Number(phone))) {
         phoneRef.current!.innerText = "Please enter a valid phone number."
         count = 1
      } else {
         phoneRef.current!.innerText = ""
      }

      if (password !== confirmPassword) {
         cpassRef.current!.innerText = "Passwords do not match."
         count = 1
      } else {
         cpassRef.current!.innerText = ""
      }

      if (!passCheck.test(password)) {
         passRef.current!.innerText = "Password must include uppercase, lowercase, number, special character and be 8+ characters long."
         count = 1
      } else {
         passRef.current!.innerText = ""
      }

      if (count === 1) return

      try {
         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, {
            username,
            email,
            phone,
            password
         })

         if (response.data.success) {
            localStorage.setItem("otpEmail", email)
            toast.success(response.data.message)
            setTimeout(() => {
               navigate('/otp')
            }, 3000)
         } else {
            toast.error(response.data.message)
         }
      } catch (error: any) {
         toast.error(error.message || "Something went wrong.")
      }
   }

   return (
      <form onSubmit={signupFormSubmit}>
         <h1>Signup Page</h1>
         <input type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} /><br />
         <p ref={userRef}></p>

         <input type="text" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} /><br />
         <p ref={emailRef}></p>

         <input type="text" placeholder="Enter phone" onChange={(e) => setPhone(e.target.value)} /><br />
         <p ref={phoneRef}></p>

         <input type="text" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} /><br />
         <p ref={passRef}></p>

         <input type="text" placeholder="Confirm your password" onChange={(e) => setConfirmPassword(e.target.value)} /><br />
         <p ref={cpassRef}></p>

         <button type="submit">Signup</button>
      </form>
   )
}

export default Signup

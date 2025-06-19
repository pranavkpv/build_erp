import { useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Login() {
   const [email, setEmail] = useState('')
   const emailRef = useRef<HTMLParagraphElement>(null)
   const [password, setPassword] = useState('')
   const passwordRef = useRef<HTMLParagraphElement>(null)
   const Navigate = useNavigate()
   const loginSubmit = async (e:React.FormEvent) => {
      e.preventDefault()
      if (email.trim() == "") {
         emailRef.current ? emailRef.current.innerText="Email is required. Please enter your email address." : ""
         return
      }else{
         emailRef.current ? emailRef.current.innerText="" : "Email is required. Please enter your email address."
      }
      if(password.trim() == ""){
         passwordRef.current ? passwordRef.current.innerText = "Password is required. Please enter your password." : ""
         return
      }else{
         passwordRef.current ? passwordRef.current.innerText = "" : "Password is required. Please enter your password."
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`,{email,password})
      if(response.data.success){
         toast.success(response.data.message)
         setTimeout(() => {
            Navigate('/')
         }, 6000);
      }else{
         toast.error(response.data.message)
      }
   }
   return (
      <>
         <form onSubmit={loginSubmit}>
            <h1>Login page</h1>
            <input type="text" placeholder="enter registered email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
            <p ref={emailRef}></p>
            <input type="text" placeholder="enter password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
            <p ref={passwordRef}></p>
            <button type="submit">login</button>
         </form>
      </>
   )
}

export default Login
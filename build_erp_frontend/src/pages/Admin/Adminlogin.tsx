import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Adminlogin() {
   const userRef = useRef<HTMLParagraphElement>(null)
   const passRef = useRef<HTMLParagraphElement>(null)
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const Navigate = useNavigate()
   const loginSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (username.trim() == "") {
         userRef.current ? userRef.current.innerText = "Username is required. Please enter your Username" : ""
         return
      } else {
         userRef.current ? userRef.current.innerText = "" : "Username is required. Please enter your Username"
      }
      if (password.trim() == "") {
         passRef.current ? passRef.current.innerText = "Password is required. Please enter password" : ""
         return
      } else {
         passRef.current ? passRef.current.innerText = "" : "Password is required. Please enter password"
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`,{
         username,password
      })
      if(response.data.success){
         toast.success(response.data.message)
         setTimeout(()=>{
            Navigate('/admin/dashboard')
         },6000)
      }else{
         toast.error(response.data.message)
      }


   }

   return (
      <>
         <form action="" onSubmit={loginSubmit}>
            <h1>Admin login</h1>
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} /> <br />
            <p ref={userRef}></p>
            <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} /> <br />
            <p ref={passRef}></p>
            <button type="submit">login</button>
         </form>
      </>
   )
}

export default Adminlogin;
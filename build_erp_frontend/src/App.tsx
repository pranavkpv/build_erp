import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/User/Signup"
import Otp from "./pages/User/Otp"
import { ToastContainer } from "react-toastify"


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
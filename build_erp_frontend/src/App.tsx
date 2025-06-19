import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/User/Signup"
import Otp from "./pages/User/Otp"
import Login from "./pages/User/Login"
import Home from "./pages/User/Home"
import { ToastContainer } from "react-toastify"
import Adminlogin from './pages/Admin/Adminlogin'
import Adminlayout from "./pages/Admin/Adminlayout"
import Category from "./components/Category/Category"
import Dashboard from "./components/Dashboard"



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Adminlogin />} />
          <Route path="/admin" element={<Adminlayout />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
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
import Unit from "./components/Unit/Unit"
import Brand from "./components/Brand/Brand"
import Project from "./components/ProjectRegister/Projectlist"
import Material from "./components/Material/Material"
import Labourlist from "./components/Labour/Labourlist"
import SitemanagerList from "./components/Sitemanager/SitemanagerList"
import ListSiteToProject from "./components/AddSiteToproject/ListSiteToproject"
import Backloginprotected from "./routes/protectedRoute/user/backloginprotected"
import AdminBackloginprotected from "./routes/protectedRoute/admin/backloginprotected"





function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<Backloginprotected><Login /></Backloginprotected>} />
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminBackloginprotected><Adminlogin /></AdminBackloginprotected>} />
          <Route path="/admin" element={<Adminlayout />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="project" element={<Project />} />
            <Route path="category" element={<Category />} />
            <Route path="unit" element={<Unit />} />
            <Route path = "brand" element ={<Brand />} />
            <Route path = "material" element ={<Material />} />
            <Route path = "Labour" element = {<Labourlist />} />
            <Route path ="Sitemanager" element = {< SitemanagerList />} />
            <Route path = "addToSite" element = {<ListSiteToProject />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
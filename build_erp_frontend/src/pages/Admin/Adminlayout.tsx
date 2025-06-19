import Header from "../../components/header";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
function Adminlayout() {
   return (
      <>
         <Header />
         <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4 bg-gray-100 min-h-screen">
               <Outlet />
            </div>

         </div>
      </>
   )
}

export default Adminlayout;
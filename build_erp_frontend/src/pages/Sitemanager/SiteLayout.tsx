
import SiteSidebar from "../../components/SitemanagerDash/siteSidebar"
import { Outlet } from "react-router-dom";
import SiteHeader from "../../components/SitemanagerDash/siteHeader"

function SiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="flex flex-1">
        <SiteSidebar /> 
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SiteLayout;
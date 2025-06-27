import { useState } from "react";
import { 
  BarChart3, 
  Calculator, 
  Users, 
  UserCheck, 
  Package, 
  HardHat,  
  FileText,
  Lock
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: BarChart3
  },{
    title: "Change Password",
    icon: Lock
  },
  {
    title: "Stage Updation",
    icon: Calculator
  },
  {
    title: "Purchase",
    icon: Package
  },
  {
    title: "Transfer",
    icon: Users
  },
  {
    title: "Receive",
    icon: UserCheck
  },
  {
    title: "Attendance",
    icon: HardHat
  },
  {
    title: "Chat",
    icon: FileText
  }
];

function SiteSidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl border-r border-slate-700 flex flex-col">

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeIndex === index;

            return (
              <li key={index}>
                <div
                  onClick={() => setActiveIndex(index)}
                  className={`
                    flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md' 
                      : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent 
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`} 
                    />
                    <span className="font-medium text-sm tracking-wide">{item.title}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default SiteSidebar;
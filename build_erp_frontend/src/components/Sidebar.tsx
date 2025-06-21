import { useState } from "react";
import { Link } from "react-router-dom";

const sidebarItems = [
  {
    title: "Dashboard",
    subs: []
  },
  {
    title: "Estimation",
    subs: [{head:"Specification Registration",to:"/admin/spec"}, {head:"Project Estimation",to:"/admin/estimation"}],
  },
  {
    title: "CRM",
    subs: [{head:"Project Registration",to:"/admin/project"}, {head:"Stage Setting",to:"/admin/stage"}, {head:"Status Updation",to:"/admin/status"}],
  },
  {
    title: "Sitemanager",
    subs: [{head:"Sitemanager Registration",to:"/admin/sitemanager"},{head:"AddSitemanager to project",to:"/admin/addsite"}],
  },
  {
    title: "Material Management",
    subs: [
      {head:"Category Registration",to:"/admin/category"},
      {head:"Unit Registration",to:"/admin/unit"},
      {head:"Brand Registration",to:"/admin/brand"},
      {head:"Material Registration",to:"/admin/material"}
    ],
  },
  {
    title: "Labour Management",
    subs: [{head:"Labour Type Registration",to:"/admin/labour"}],
  },
  {
    title: "Account Head",
    subs: [{head:"Account Head Registration",to:"/admin/account"}],
  },
  {
    title: "Report",
    subs: [{head:"Project Analysis Report",to:"/admin/report"}],
  },
];

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const toggleSubMenu = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
   <>
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4 space-y-2">
      <ul>
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <div
              className="cursor-pointer font-semibold hover:bg-gray-700 p-2 rounded"
              onClick={() => toggleSubMenu(index)}
            >
              {item.title}
            </div>
            {activeIndex === index && item.subs.length > 0 && (
              <ul className="ml-4 mt-1 space-y-1">
                {item.subs.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-sm hover:text-blue-400 cursor-pointer"
                  >
                    <Link to={sub.to}>{sub.head}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
   </>
  );
}

export default Sidebar;

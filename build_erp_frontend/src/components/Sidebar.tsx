import { useState } from "react";

const sidebarItems = [
  {
    title: "Dashboard",
    subs: [],
  },
  {
    title: "Estimation",
    subs: ["Specification Registration", "Project Estimation"],
  },
  {
    title: "CRM",
    subs: ["Project Registration", "Stage Setting", "Status Updation"],
  },
  {
    title: "Sitemanager",
    subs: ["Sitemanager Registration"],
  },
  {
    title: "Material Management",
    subs: [
      "Category Registration",
      "Unit Registration",
      "Brand Registration",
      "Material Registration",
    ],
  },
  {
    title: "Labour Management",
    subs: ["Labour Type Registration"],
  },
  {
    title: "Account Head",
    subs: ["Account Head Registration"],
  },
  {
    title: "Report",
    subs: ["Project Analysis Report"],
  },
];

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
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
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

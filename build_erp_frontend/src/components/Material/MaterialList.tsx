import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type materialType = {
  _id: string;
  material_name: string;
  unit_rate: number;
  categoryDetails: {
    _id: string;
    category_name: string;
  }[];
  unitDetails: {
    _id: string;
    unit_name: string;
  }[];
  brandDetails: {
    _id: string;
    brand_name: string;
  }[];
};

type MaterialListProps = {
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  enable: boolean;
  materialData: materialType[];
  setDeleteEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  refreshData:()=>void
};

function MaterialList({ setEnable, enable, materialData, setDeleteEnable, setDeleteId }: MaterialListProps) {
  const [search, setSearch] = useState("");

  const filteredMaterials = materialData.filter((item) =>
    item.material_name.toLowerCase().includes(search.toLowerCase())
  );

  if (enable) return null;

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="w-full sm:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search material
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search material..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
          </div>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            onClick={() => setEnable(true)}
          >
            + Add Material
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">SL No</th>
                <th className="px-6 py-4">Material Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Unit Rate</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredMaterials.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm font-medium">
                    No materials found.
                  </td>
                </tr>
              ) : (
                filteredMaterials.map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-200">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-200">{element.material_name}</td>
                    <td className="px-6 py-4 text-gray-200">{element.categoryDetails[0]?.category_name || "-"}</td>
                    <td className="px-6 py-4 text-gray-200">{element.brandDetails[0]?.brand_name || "-"}</td>
                    <td className="px-6 py-4 text-gray-200">{element.unitDetails[0]?.unit_name || "-"}</td>
                    <td className="px-6 py-4 text-gray-200">{element.unit_rate}</td>
                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        className="text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Edit material ${element.material_name}`}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteEnable(true);
                          setDeleteId(element._id);
                        }}
                        className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        aria-label={`Delete material ${element.material_name}`}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MaterialList;
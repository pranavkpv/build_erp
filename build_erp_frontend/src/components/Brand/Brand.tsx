import { useEffect, useState } from "react";
import AddBrand from "./AddBrand";
import EditBrand from "./EditBrand";
import DeleteBrand from "./DeleteBrand"; // Corrected import name
import axios from "axios";
import { toast } from "react-toastify";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; // Import icons

type BrandType = {
  _id: string;
  brand_name: string;
};

function Brand() {
  const [enableAdd, setEnableAdd] = useState(false);
  const [brandList, setBrandList] = useState<BrandType[]>([]); // Renamed for consistency
  const [searchBrand, setSearchBrand] = useState<string>("");

  const [enableEdit, setEnableEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editBrand, setEditBrand] = useState(""); // Renamed for consistency

  const [deleteId, setDeleteId] = useState("");
  const [enableDelete, setEnableDelete] = useState(false);

  // Function to fetch all brands
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/brand`);
      setBrandList(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handler for updating a brand after edit
  const handleUpdateBrand = (updated: BrandType) => {
    setBrandList((prev) =>
      prev.map((item) => (item._id === updated._id ? updated : item))
    );
  };

  // Filter brands based on search input
  const filteredBrands = brandList.filter((item) =>
    item.brand_name.toLowerCase().includes(searchBrand.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search brand..."
            className="w-1/2 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            onChange={(e) => setSearchBrand(e.target.value)}
            value={searchBrand}
          />
          {/* Add Brand Button */}
          <button
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold flex items-center gap-2"
            onClick={() => setEnableAdd(true)}
          >
            <PlusIcon className="h-5 w-5" /> Add Brand
          </button>
        </div>

        {/* Add Brand Modal (already styled) */}
        <AddBrand
          enable={enableAdd}
          setEnable={setEnableAdd}
          onAdd={(newBrand) => setBrandList((prev) => [...prev, newBrand])}
        />

        {/* Brands Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-gray-700">SL No</th>
                <th className="px-6 py-4 border-b border-gray-700">Brand Name</th>
                <th className="px-6 py-4 border-b border-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredBrands.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-400 font-medium">
                    No brands found.
                  </td>
                </tr>
              ) : (
                filteredBrands.map((brand, index) => (
                  <tr key={brand._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-300">{brand.brand_name}</td>
                    <td className="px-6 py-4 flex justify-center items-center gap-2">
                      <button
                        onClick={() => {
                          setEnableEdit(true);
                          setEditId(brand._id);
                          setEditBrand(brand.brand_name);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex items-center gap-1 shadow-sm"
                      >
                        <PencilIcon className="h-4 w-4" /> Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex items-center gap-1 shadow-sm"
                        onClick={() => {
                          setDeleteId(brand._id);
                          setEnableDelete(true);
                        }}
                      >
                        <TrashIcon className="h-4 w-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Brand Modal (already styled) */}
        <EditBrand
          enable={enableEdit}
          setEnable={setEnableEdit}
          editId={editId}
          editBrandname={editBrand}
          onUpdate={handleUpdateBrand}
        />

        {/* Delete Brand Modal (already styled) */}
        <DeleteBrand
          enable={enableDelete}
          deleteId={deleteId}
          setEnable={setEnableDelete}
          onDeleteSuccess={fetchData} // Re-fetch data to reflect deletion
        />
      </div>
    </div>
  );
}

export default Brand;
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"; // For modern add/delete row icons

type category = {
  _id: string;
  category_name: string;
};

type brand = {
  _id: string;
  brand_name: string;
};
type unit = {
  _id: string;
  unit_name: string;
};
type project = {
  _id: string;
  project_name: string;
};

type addRowData = {
  project: string;
  stock: number;
};
type AddMaterialProps = {
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  enable: boolean;
  refreshData: () => void;
};

function AddMaterial({ setEnable, enable, refreshData }: AddMaterialProps) {
  const [categoryList, selectCategoryList] = useState<category[]>([]);
  const [brandList, setBrandlist] = useState<brand[]>([]);
  const [unitList, setUnitList] = useState<unit[]>([]);
  const [projectList, setProjectlist] = useState<project[]>([]);
  const [materialName, setMaterial] = useState("");
  const [selectCategoryId, setSelectCategory] = useState("");
  const [selectUnitId, setSelectedUnit] = useState("");
  const [selectBrandId, setSelectedBrand] = useState("");
  const [totalOpeningStock, setTotalStock] = useState(0);
  const [unit_rate, setUnitRate] = useState(0);
  const [row, SetRow] = useState<addRowData[]>([]);

 
  const addRow = () => {
    SetRow([...row, { project: "", stock: 0 }]);
  };

  const deletRow = (index: number) => {
    let updateRow = row.filter((_, i) => i !== index);
    SetRow(updateRow);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/addmaterial`);
      selectCategoryList(response.data.categoryData);
      setBrandlist(response.data.brandData);
      setUnitList(response.data.unitData);
      setProjectlist(response.data.projectData || []);
    } catch (error) {
      console.error("Error fetching material add data:", error);
      toast.error("Failed to load necessary data for adding material.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const existproject = (project: string) => {
    for (let element of row) {
      if (element.project === project) {
        toast.warning("Project already assigned to a row.");
        return true;
      }
    }
    return false;
  };

  const stockCheck = (data: addRowData[]) => {
    let sum = data.reduce((acc, current) => acc + current.stock, 0);
    if (sum > totalOpeningStock) {
      toast.warning("Total allocated stock exceeds total opening stock.");
      return true;
    }
    return false;
  };

  const saveMaterial = async () => {
    let hasError = false;

    // Client-side validations (more explicit than just toast warnings)
    if (materialName.trim() === "") {
      toast.warning("Material name is required.");
      hasError = true;
    }
    if (selectUnitId === "") {
      toast.warning("Unit is required.");
      hasError = true;
    }
    if (selectCategoryId === "") {
      toast.warning("Category is required.");
      hasError = true;
    }
    if (selectBrandId === "") {
      toast.warning("Brand is required.");
      hasError = true;
    }
    if (totalOpeningStock <= 0) {
      toast.warning("Opening stock must be greater than 0.");
      hasError = true;
    }
    if (unit_rate <= 0) {
      toast.warning("Unit rate must be greater than 0.");
      hasError = true;
    }

    let sumStock = row.reduce((sum, num) => sum + num.stock, 0);
    if (sumStock !== totalOpeningStock) {
      toast.warning("The sum of project-wise stock does not match the total opening stock.");
      hasError = true;
    }
    if (row.length === 0) {
      toast.warning("At least one project row is required for stock distribution.");
      hasError = true;
    }
    if (row.some((element) => element.project === "")) {
      toast.warning("Please select a project for all added rows.");
      hasError = true;
    }
    if (row.some((element) => element.stock <= 0)) {
        toast.warning("Stock for each project must be greater than 0.");
        hasError = true;
    }


    if (hasError) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/material`, {
        material_name: materialName,
        category_id: selectCategoryId,
        brand_id: selectBrandId,
        unit_id: selectUnitId,
        unit_rate: unit_rate,
        stock: totalOpeningStock,
        projectWiseStock: row,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setEnable(false);
        refreshData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error("Failed to register material:", error);
      toast.error("Failed to register material. Please try again.");
    }
  };

  if (!enable) return null;

  return (
    <div className=" inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto border border-gray-700/50">
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
          Add New Material
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Material Name */}
          <div>
            <label htmlFor="materialName" className="block text-sm font-medium text-gray-200 mb-1">
              Material Name
            </label>
            <input
              id="materialName"
              type="text"
              placeholder="Enter material name"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
              onChange={(e) => setMaterial(e.target.value)}
              value={materialName} 
            />
            {/* <p ref={materialNameRef} className="text-sm text-red-400 mt-1.5"></p> */}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="categorySelect" className="block text-sm font-medium text-gray-200 mb-1">
              Category
            </label>
            <select
              id="categorySelect"
              aria-label="Select a category"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
              onChange={(e) => setSelectCategory(e.target.value)}
              value={selectCategoryId} // Added value prop
            >
              <option value="">Select Category</option>
              {categoryList.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            {/* <p ref={categoryRef} className="text-sm text-red-400 mt-1.5"></p> */}
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="brandSelect" className="block text-sm font-medium text-gray-200 mb-1">
              Brand
            </label>
            <select
              id="brandSelect"
              aria-label="Select a brand"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
              onChange={(e) => setSelectedBrand(e.target.value)}
              value={selectBrandId} // Added value prop
            >
              <option value="">Select Brand</option>
              {brandList.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.brand_name}
                </option>
              ))}
            </select>
            {/* <p ref={brandRef} className="text-sm text-red-400 mt-1.5"></p> */}
          </div>

          {/* Unit */}
          <div>
            <label htmlFor="unitSelect" className="block text-sm font-medium text-gray-200 mb-1">
              Unit
            </label>
            <select
              id="unitSelect"
              aria-label="Select a unit"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
              onChange={(e) => setSelectedUnit(e.target.value)}
              value={selectUnitId} // Added value prop
            >
              <option value="">Select Unit</option>
              {unitList.map((unit) => (
                <option key={unit._id} value={unit._id}>
                  {unit.unit_name}
                </option>
              ))}
            </select>
            {/* <p ref={unitRef} className="text-sm text-red-400 mt-1.5"></p> */}
          </div>

          {/* Unit Rate */}
          <div>
            <label htmlFor="unitRate" className="block text-sm font-medium text-gray-200 mb-1">
              Unit Rate
            </label>
            <input
              id="unitRate"
              type="number"
              placeholder="Enter unit rate"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
              onChange={(e) => setUnitRate(Number(e.target.value))}
              value={unit_rate === 0 ? "" : unit_rate} // Value prop, show empty string for 0
            />
            {/* <p ref={unitRateRef} className="text-sm text-red-400 mt-1.5"></p> */}
          </div>

          {/* Total Opening Stock */}
          <div>
            <label htmlFor="openingStock" className="block text-sm font-medium text-gray-200 mb-1">
              Total Opening Stock
            </label>
            <input
              id="openingStock"
              type="number"
              placeholder="Enter opening stock"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
              onChange={(e) => setTotalStock(Number(e.target.value))}
              value={totalOpeningStock === 0 ? "" : totalOpeningStock} // Value prop, show empty string for 0
            />
            {/* <p ref={totalStockRef} className="text-sm text-red-400 mt-1.5"></p> */}
          </div>
        </div>

        {/* Project Wise Stock Section */}
        <div className="mb-4 pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-100">Project-wise Stock Distribution</h3>
            <button
              onClick={addRow}
              type="button" // Important for buttons not in a form
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2"
            >
              <PlusCircleIcon className="h-5 w-5" /> Add Project Row
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-700/50">
            <table className="min-w-full text-sm text-left bg-gray-800/50">
              <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-4">SL NO</th>
                  <th className="px-6 py-4">Project Name</th>
                  <th className="px-6 py-4">Opening Stock</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {row.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-400 text-sm font-medium">
                      Click "Add Project Row" to distribute stock to projects.
                    </td>
                  </tr>
                ) : (
                  row.map((element, index) => (
                    <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-6 py-4 font-medium text-gray-200 text-center">{index + 1}</td>
                      <td className="px-6 py-4">
                        <select
                          aria-label="Select a project"
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                          value={element.project}
                          onChange={(e) => {
                            if (e.target.value && existproject(e.target.value)) return; // Only check if a value is selected
                            const updatedRow = [...row];
                            updatedRow[index].project = e.target.value;
                            SetRow(updatedRow);
                          }}
                        >
                          <option value="">Select project</option>
                          {projectList.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.project_name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
                          value={element.stock === 0 ? "" : element.stock} // Show empty string for 0
                          placeholder="Enter stock"
                          onChange={(e) => {
                            const updatedRow = [...row];
                            const newStock = Number(e.target.value);
                            updatedRow[index].stock = newStock;
                            
                            // Temporarily update to check stock, then revert if invalid
                            SetRow(updatedRow); // Update state first
                            if (stockCheck(updatedRow)) {
                                updatedRow[index].stock = 0; // Revert to 0 or previous valid if check fails
                                SetRow([...updatedRow]); // Force re-render with reverted value
                            }
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button aria-label="delete button"
                          onClick={() => deletRow(index)}
                          type="button" // Important for buttons not in a form
                          className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                        >
                          <MinusCircleIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-700">
          <button
            type="button"
            className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            onClick={() => setEnable(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveMaterial}
            className="bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
          >
            Save Material
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMaterial;
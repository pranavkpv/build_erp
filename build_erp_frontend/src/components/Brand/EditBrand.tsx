import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


type BrandType = {
  _id: string;
  brand_name:string;
};

type Unitprops = {
  editId: string;
  enable: boolean;
  editBrandname: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: (updated: BrandType) => void; // ✅ callback for updating local state
};

function EditBrand({
  enable,
  setEnable,
  editId,
  editBrandname,
  onUpdate,
}: Unitprops) {
  const [brand_name, setBrand_name] = useState(editBrandname);

  const brandRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setBrand_name(editBrandname);
  }, [editBrandname]);

  const editSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (brand_name.trim() === "") {
      brandRef.current!.innerText = "Unit is required.";
      return;
    } else {
      brandRef.current!.innerText = "";
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/brand`, {
        editId,
        brand_name
      });

      if (response.data.success) {
        toast.success(response.data.message);
   
        onUpdate({
          _id: editId,
          brand_name: brand_name,
        });
        setEnable(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update brand");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4"
        onSubmit={editSubmit}
      >
        <h2 className="text-xl font-bold text-gray-700 text-center">Edit brand</h2>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Brand Name</label>
          <input
            type="text"
            value={brand_name}
            placeholder="Enter unit name"
            onChange={(e) => setBrand_name(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p ref={brandRef} className="text-red-500 text-sm" />
        </div>


        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => setEnable(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBrand;

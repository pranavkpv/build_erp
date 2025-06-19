import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";



type Unitprops = {
  editId: string;
  enable: boolean;
  editUnit: string;
  editShortname: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditUnit({
  enable,
  setEnable,
  editId,
  editUnit,
  editShortname,
}: Unitprops) {
  const [unit, setUnit] = useState(editUnit);
  const [short_name, setShortname] = useState(editShortname);
  const unitRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setUnit(editUnit);
    setShortname(editShortname);
  }, [editUnit, editShortname]);

  const editSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (unit.trim() === "") {
      unitRef.current!.innerText = "Category is required. Please enter your unit.";
      return;
    } else {
      unitRef.current!.innerText = "";
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/unit`, {
        editId,
        unit,
        short_name,
      });

      if (response.data.success) {
        toast.success(response.data.message);
  
        setEnable(false); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4"
        onSubmit={editSubmit}
      >
        <h2 className="text-xl font-bold text-gray-700 text-center">Edit Unit</h2>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Unit Name</label>
          <input
            type="text"
            value={unit}
            placeholder="Enter unit name"
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p ref={unitRef} className="text-red-500 text-sm" />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Shortname</label>
          <input
            type="text"
            value={short_name}
            placeholder="Enter short name"
            onChange={(e) => setShortname(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

export default EditUnit;

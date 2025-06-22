import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type UnitType = {
  _id: string;
  unit_name: string;
  short_name: string;
};

type Unitprops = {
  editId: string;
  enable: boolean;
  editUnit: string;
  editShortname: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: (updated: UnitType) => void;
};

function EditUnit({
  enable,
  setEnable,
  editId,
  editUnit,
  editShortname,
  onUpdate,
}: Unitprops) {
  const [unit, setUnit] = useState(editUnit);
  const [short_name, setShortname] = useState(editShortname);
  const unitRef = useRef<HTMLParagraphElement>(null);
  const shortnameRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setUnit(editUnit);
    setShortname(editShortname);
  }, [editUnit, editShortname]);

  const editSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (unit.trim() === "") {
      if (unitRef.current) unitRef.current.innerText = "Unit name is required.";
      hasError = true;
    } else if (unitRef.current) {
      unitRef.current.innerText = "";
    }

    if (short_name.trim() === "") {
      if (shortnameRef.current) shortnameRef.current.innerText = "Short name is required.";
      hasError = true;
    } else if (shortnameRef.current) {
      shortnameRef.current.innerText = "";
    }

    if (hasError) return;

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/unit`, {
        editId,
        unit,
        short_name,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onUpdate({
          _id: editId,
          unit_name: unit,
          short_name,
        });
        setEnable(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update unit");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <form
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50 space-y-5"
        onSubmit={editSubmit}
      >
        <h2 className="text-xl font-semibold text-center text-gray-100 mb-6">Edit Unit</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-1.5">Unit Name</label>
          <input
            type="text"
            value={unit}
            placeholder="Enter unit name"
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
          />
          <p ref={unitRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-1.5">Short Name</label>
          <input
            type="text"
            value={short_name}
            placeholder="Enter short name"
            onChange={(e) => setShortname(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
          />
          <p ref={shortnameRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            onClick={() => setEnable(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUnit;
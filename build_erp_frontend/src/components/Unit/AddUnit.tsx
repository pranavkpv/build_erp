import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type Unitprops = {
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: (unit: { _id: string; unit_name: string,short_name:string }) => void;
};

function AddUnit({ enable, setEnable,onAdd }: Unitprops) {
  const [unit, setUnit] = useState("");
  const [shortname, setShortname] = useState("");
  const unitRef = useRef<HTMLParagraphElement>(null);

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (unit.trim() === "") {
      if (unitRef.current) {
        unitRef.current.innerText = "Unit is required. Please enter your Unit.";
      }
      return;
    } else {
      if (unitRef.current) unitRef.current.innerText = "";
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/unit`, {
        unit,
        shortname
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onAdd(response.data.data); 
        setEnable(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err)
      toast.error("Server error");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <form
        onSubmit={addCategory}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">Add unit</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">unit Name</label>
          <input
            type="text"
            placeholder="Enter unit name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUnit(e.target.value)}
          />
          <p ref={unitRef} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">shortname</label>
          <input
            type="text"
            placeholder="Enter shortname"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setShortname(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setEnable(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUnit;

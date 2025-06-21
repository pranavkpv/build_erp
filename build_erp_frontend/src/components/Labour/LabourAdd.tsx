import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type addLabourData = {
  addEnable: boolean;
  setAddEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onsuccessAdd: () => void;
};

function LabourAdd({ addEnable, setAddEnable, onsuccessAdd }: addLabourData) {
  const [labour, setLabour] = useState("");
  const [wage, setWage] = useState(0);
  const labourRef = useRef<HTMLParagraphElement>(null);

  const addLabour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (labour.trim() === "") {
      if (labourRef.current) labourRef.current.innerText = "Labour type is required";
      return;
    } else {
      if (labourRef.current) labourRef.current.innerText = "";
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/labour`, {
        labour,
        wage,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setAddEnable(false);
        onsuccessAdd();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to add labour");
    }
  };

  if (!addEnable) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-center text-blue-700 mb-4">Add Labour</h2>
        <form onSubmit={addLabour} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Labour Type</label>
            <input
              type="text"
              placeholder="Enter labour type"
              onChange={(e) => setLabour(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p ref={labourRef} className="text-red-500 text-sm mt-1"></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Wage</label>
            <input
              type="number"
              placeholder="Enter daily wage"
              onChange={(e) => setWage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => setAddEnable(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
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
    </div>
  );
}

export default LabourAdd;

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type labourProps = {
  labourId: string;
  lab_type: string;
  wage: number;
  editEnable: boolean;
  setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccessEdit: () => void;
};

function LabourEdit({
  editEnable,
  setEditEnable,
  labourId,
  lab_type,
  wage,
  onSuccessEdit,
}: labourProps) {
  const [labourData, setLabour] = useState(lab_type);
  const [wageData, setWage] = useState(wage);
  const labourRef = useRef<HTMLParagraphElement>(null);
  useEffect(()=>{
   setLabour(lab_type)
   setWage(wage)
  },[lab_type,wage])


  const editLabour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (labourData.trim() === "") {
      if (labourRef.current) labourRef.current.innerText = "Labour type is required";
      return;
    } else {
      if (labourRef.current) labourRef.current.innerText = "";
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/labour`, {
        labourId,
        labourData,
        wageData,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setEditEnable(false);
        onSuccessEdit();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to update labour");
    }
  };

  if (!editEnable) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-center text-blue-700 mb-4">Edit Labour</h2>
        <form onSubmit={editLabour} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Labour Type</label>
            <input
              type="text"
              placeholder="Enter labour type"
              value={labourData}
              onChange={(e) => setLabour(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p ref={labourRef} className="text-red-500 text-sm mt-1"></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Wage</label>
            <input
              type="number"
              value={wageData}
              placeholder="Enter daily wage"
              onChange={(e) => setWage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => setEditEnable(false)}
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

export default LabourEdit;

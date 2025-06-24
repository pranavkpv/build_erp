import axios from "axios";
import { toast } from "react-toastify";

type Unitprops = {
  enable: boolean;
  deleteId: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
};

function DeleteUnit({ enable, deleteId, setEnable, onDeleteSuccess }: Unitprops) {
  const deleteUnit = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/unit`, {
        data: { _id: deleteId }, 
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEnable(false);
        onDeleteSuccess();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to delete unit"); // Fixed error message
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50 text-center space-y-6">
        <h2 className="text-xl font-semibold text-gray-100">Delete Unit</h2>
        <p className="text-gray-200 text-sm font-medium">
          Are you sure you want to delete this unit?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setEnable(false)}
            className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={deleteUnit}
            className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUnit;
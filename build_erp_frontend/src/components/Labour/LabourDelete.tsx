import axios from "axios";
import { toast } from "react-toastify";

type deleteDataprop = {
  labourId: string;
  setdeleteEnable: React.Dispatch<React.SetStateAction<boolean>>;
  deleteEnable: boolean;
  onDeleteSuccess: () => void;
};

function DeleteLabour({
  deleteEnable,
  setdeleteEnable,
  labourId,
  onDeleteSuccess,
}: deleteDataprop) {
  const deleteLabour = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/admin/labour`,
        { data: { _id: labourId } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setdeleteEnable(false);
        onDeleteSuccess();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to delete labour.");
    }
  };

  if (!deleteEnable) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Confirm Deletion</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to delete this labour type?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setdeleteEnable(false)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={deleteLabour}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteLabour;

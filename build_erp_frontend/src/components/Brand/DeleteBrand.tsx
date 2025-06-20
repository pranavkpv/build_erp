import axios from "axios";
import { toast } from "react-toastify";

type BrandProps = {
  enable: boolean;
  deleteId: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
};

function DeletBrand({ enable, deleteId, setEnable, onDeleteSuccess }: BrandProps) {
  const deleteBrand = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/brand`, {
        data: { id: deleteId },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEnable(false);
        onDeleteSuccess(); 
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">Delete Confirmation</h2>
        <p className="text-gray-600">Are you sure you want to delete this brand?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setEnable(false)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={deleteBrand}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletBrand;

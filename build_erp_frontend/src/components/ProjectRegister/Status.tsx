import axios from "axios";
import { toast } from "react-toastify";

type Statusprop = {
  project_id: string;
  status: string;
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeSuccess: () => void;
};

function ChangeStatus({ project_id, status, enable, setEnable, onChangeSuccess }: Statusprop) {
  const statusChanged = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/status`, {
        _id:project_id,
        status,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEnable(false);
        onChangeSuccess();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to change status");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50 text-center space-y-6">
        <h2 className="text-xl font-semibold text-gray-100">Change Status</h2>
        <p className="text-gray-200 text-sm font-medium">
          Are you sure you want to change the status to {status}?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setEnable(false)}
            className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={statusChanged}
            className="bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeStatus;
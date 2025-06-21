import axios from "axios";
import { toast } from "react-toastify";

type Statusprop = {
  project_id:string,
  status:string,
  enable:boolean,
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeSuccess:()=>void
};

function ChangeStatus({ project_id,status,enable,setEnable,onChangeSuccess }: Statusprop) {

  const statusChanged = async () => {
    
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/status`,{
         project_id,status
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEnable(false);
        onChangeSuccess() ;
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete project");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">Change Status Confirmation</h2>
        <p className="text-gray-600">Are you sure you want to change the status into {status}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setEnable(false)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={statusChanged}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            change
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeStatus;

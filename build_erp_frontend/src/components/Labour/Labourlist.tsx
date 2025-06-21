import axios from "axios";
import { useEffect, useState } from "react";
import LabourAdd from "./LabourAdd";
import LabourEdit from "./LabourEdit";
import DeleteLabour from "./LabourDelete";

type labourData = {
  _id: string;
  labour_type: string;
  daily_wage: number;
};

function Labourlist() {
  const [labour, setLabour] = useState<labourData[]>([]);

  // Add
  const [addEnable, setAddEnable] = useState(false);

  // Edit
  const [editEnable, setEditEnable] = useState(false);
  const [labourId, setLabourId] = useState("");
  const [lab_type, setLabtype] = useState("");
  const [wage, setWage] = useState(0);

  // Delete
  const [deleteId, setDeleteId] = useState("");
  const [deleteEnable, setdeleteEnable] = useState(false);


  const [search ,setSearch] = useState("")

  const fetchData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/labour`);
    setLabour(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search labour type..."
            className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange = {(e)=>setSearch(e.target.value)}
          />
          <button
            onClick={() => setAddEnable(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            + Add Labour
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white text-sm text-left border border-gray-300">
            <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 border">SL No</th>
                <th className="px-6 py-3 border">Labour Type</th>
                <th className="px-6 py-3 border">Daily Wage</th>
                <th className="px-6 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {labour.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No labour types found.
                  </td>
                </tr>
              ) : (
                labour.map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border">{index + 1}</td>
                    <td className="px-6 py-4 border">{element.labour_type}</td>
                    <td className="px-6 py-4 border">{element.daily_wage}</td>
                    <td className="px-6 py-4 border flex gap-2">
                      <button
                        onClick={() => {
                          setEditEnable(true);
                          setLabourId(element._id);
                          setLabtype(element.labour_type);
                          setWage(element.daily_wage);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(element._id);
                          setdeleteEnable(true);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <LabourAdd addEnable={addEnable} setAddEnable={setAddEnable} onsuccessAdd={fetchData} />
      <LabourEdit
        editEnable={editEnable}
        setEditEnable={setEditEnable}
        labourId={labourId}
        lab_type={lab_type}
        wage={wage}
        onSuccessEdit={fetchData}
      />
      <DeleteLabour
        deleteEnable={deleteEnable}
        setdeleteEnable={setdeleteEnable}
        labourId={deleteId}
        onDeleteSuccess={fetchData}
      />
    </div>
  );
}

export default Labourlist;

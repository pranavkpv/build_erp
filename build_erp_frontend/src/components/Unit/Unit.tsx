import { useEffect, useState } from "react";
import AddUnit from "./AddUnit";
import EditUnit from "./EditUnit";
import DeleteUnit from "./DeleteUnit";
import axios from "axios";
import { toast } from "react-toastify";

type UnitType = {
  _id: string;
  unit_name: string;
  short_name: string;
};

function Unit() {
  const [enableAdd, setEnableAdd] = useState(false);
  const [unitList, setUnitList] = useState<UnitType[]>([]);
  const [searchUnit, setSearchUnit] = useState<string>("");
  const [enableEdit, setEnableEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editUnit, setEditUnit] = useState("");
  const [editShortUnit, setEditShortUnit] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [enableDelete, setEnableDelete] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/unit`);
      setUnitList(response.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching units.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search unit..."
            className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearchUnit(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
            onClick={() => setEnableAdd(true)}
          >
            + Add Unit
          </button>
        </div>

        <AddUnit enable={enableAdd} setEnable={setEnableAdd} />

        <div className="overflow-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-blue-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">SL No</th>
                <th className="px-6 py-3">Unit</th>
                <th className="px-6 py-3">Short Unit</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unitList
                .filter((item) =>
                  item.unit_name.toLowerCase().includes(searchUnit.toLowerCase())
                )
                .map((unit, index) => (
                  <tr key={unit._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">{unit.unit_name}</td>
                    <td className="px-6 py-4">{unit.short_name}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setEnableEdit(true);
                          setEditId(unit._id);
                          setEditUnit(unit.unit_name);
                          setEditShortUnit(unit.short_name);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                        onClick={() => {
                          setDeleteId(unit._id);
                          setEnableDelete(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <EditUnit
          enable={enableEdit}
          setEnable={setEnableEdit}
          editId={editId}
          editUnit={editUnit}
          editShortname={editShortUnit}
        
        />

        <DeleteUnit
          enable={enableDelete}
          deleteId={deleteId}
          setEnable={setEnableDelete}
          onDeleteSuccess={fetchData}
        />
      </div>
    </div>
  );
}

export default Unit;

import { useEffect, useState } from "react";
import AddUnit from "./AddUnit";
import EditUnit from "./EditUnit";
import DeleteUnit from "./DeleteUnit";
import axios from "axios";
import { toast } from "react-toastify";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

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
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="w-full sm:w-1/2">
            <label htmlFor="search" className="sr-only">
              Search unit
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search unit..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
              onChange={(e) => setSearchUnit(e.target.value)}
            />
          </div>
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
            onClick={() => setEnableAdd(true)}
          >
            + Add Unit
          </button>
        </div>

        <AddUnit
          enable={enableAdd}
          setEnable={setEnableAdd}
          onAdd={(newUnit) => setUnitList((prev) => [...prev, newUnit])}
        />

        <div className="overflow-x-auto rounded-xl border border-gray-700/50">
          <table className="min-w-full text-sm text-left bg-gray-800/50">
            <thead className="bg-gray-800/70 text-gray-200 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">SL No</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Short Unit</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {unitList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400 text-sm font-medium">
                    No Units Found.
                  </td>
                </tr>
              ) : (
                unitList
                  .filter((item) =>
                    item.unit_name.toLowerCase().includes(searchUnit.toLowerCase())
                  )
                  .map((unit, index) => (
                    <tr key={unit._id} className="hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-6 py-4 font-medium text-gray-200">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-200">{unit.unit_name}</td>
                      <td className="px-6 py-4 text-gray-200">{unit.short_name}</td>
                      <td className="px-6 py-4 text-center space-x-3">
                        <button
                          onClick={() => {
                            setEnableEdit(true);
                            setEditId(unit._id);
                            setEditUnit(unit.unit_name);
                            setEditShortUnit(unit.short_name);
                          }}
                          className="text-yellow-400 hover:text-yellow-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                          aria-label={`Edit unit ${unit.unit_name}`}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(unit._id);
                            setEnableDelete(true);
                          }}
                          className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-600/50 transition-all duration-200"
                          aria-label={`Delete unit ${unit.unit_name}`}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        <EditUnit
          enable={enableEdit}
          setEnable={setEnableEdit}
          editId={editId}
          editUnit={editUnit}
          editShortname={editShortUnit}
          onUpdate={(updatedUnit) => {
            setUnitList((prev) =>
              prev.map((u) => (u._id === updatedUnit._id ? updatedUnit : u))
            );
          }}
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
import { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import axios from "axios";
import { toast } from "react-toastify";

type CategoryType = {
  _id: string;
  category_name: string;
  description: string;
};

function Category() {
  const [enableAdd, setEnableAdd] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [searchCategory, setSearchCat] = useState<string>("");
  const [enableEdit, setEnableEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [enableDelete, setEnableDelete] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/category`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching categories.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateCategory = (updated: CategoryType) => {
    setCategories((prev) =>
      prev.map((item) => (item._id === updated._id ? updated : item))
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search category..."
            className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearchCat(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
            onClick={() => setEnableAdd(true)}
          >
            + Add Category
          </button>
        </div>

        <AddCategory enable={enableAdd} setEnable={setEnableAdd} />

        <div className="overflow-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-blue-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">SL No</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories
                .filter((item) =>
                  item.category_name.toLowerCase().includes(searchCategory.toLowerCase())
                )
                .map((cat, index) => (
                  <tr key={cat._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">{cat.category_name}</td>
                    <td className="px-6 py-4">{cat.description}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setEnableEdit(true);
                          setEditId(cat._id);
                          setEditCategory(cat.category_name);
                          setEditDescription(cat.description);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                        onClick={() => {
                          setDeleteId(cat._id);
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

        <EditCategory
          enable={enableEdit}
          setEnable={setEnableEdit}
          editId={editId}
          editCategory={editCategory}
          editDescription={editDescription}
          onUpdate={handleUpdateCategory}
        />

        <DeleteCategory
          enable={enableDelete}
          deleteId={deleteId}
          setEnable={setEnableDelete}
          onDeleteSuccess={fetchData}
        />
      </div>
    </div>
  );
}

export default Category;

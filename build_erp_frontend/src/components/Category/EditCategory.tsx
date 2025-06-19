import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type CategoryType = {
  _id: string;
  category_name: string;
  description: string;
};

type CategoryProps = {
  editId: string;
  enable: boolean;
  editCategory: string;
  editDescription: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: (updated: CategoryType) => void; // ✅ Add update handler
};

function EditCategory({
  enable,
  setEnable,
  editId,
  editCategory,
  editDescription,
  onUpdate,
}: CategoryProps) {
  const [category, setCategory] = useState(editCategory);
  const [description, setDescription] = useState(editDescription);
  const catRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setCategory(editCategory);
    setDescription(editDescription);
  }, [editCategory, editDescription]);

  const editSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (category.trim() === "") {
      catRef.current!.innerText = "Category is required. Please enter your Category.";
      return;
    } else {
      catRef.current!.innerText = "";
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/category`, {
        editId,
        category,
        description,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onUpdate(response.data.data); 
        setEnable(false); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4"
        onSubmit={editSubmit}
      >
        <h2 className="text-xl font-bold text-gray-700 text-center">Edit Category</h2>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Category Name</label>
          <input
            type="text"
            value={category}
            placeholder="Enter category name"
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p ref={catRef} className="text-red-500 text-sm" />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">Description</label>
          <input
            type="text"
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => setEnable(false)}
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
  );
}

export default EditCategory;

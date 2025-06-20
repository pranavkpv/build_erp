import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type CategoryProps = {
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd :(category:{_id:string,category_name:string,description:string})=>void
};

function AddCategory({ enable, setEnable,onAdd }: CategoryProps) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const categoryRef = useRef<HTMLParagraphElement>(null);

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (category.trim() === "") {
      if (categoryRef.current) {
        categoryRef.current.innerText = "Category is required. Please enter your Category.";
      }
      return;
    } else {
      if (categoryRef.current) categoryRef.current.innerText = "";
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/category`, {
        category,
        description,
      });

      if (response.data.success) {
        toast.success(response.data.message);
         onAdd(response.data.data); 
        setEnable(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <form
        onSubmit={addCategory}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">Add Category</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Category Name</label>
          <input
            type="text"
            placeholder="Enter category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCategory(e.target.value)}
          />
          <p ref={categoryRef} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setEnable(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;

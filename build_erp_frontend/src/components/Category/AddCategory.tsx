import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type CategoryProps = {
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: (category: { _id: string; category_name: string; description: string }) => void;
};

function AddCategory({ enable, setEnable, onAdd }: CategoryProps) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const categoryRef = useRef<HTMLParagraphElement>(null);

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (category.trim() === "") {
      if (categoryRef.current) {
        categoryRef.current.innerText = "Category name is required.";
      }
      return;
    } else {
      if (categoryRef.current) categoryRef.current.innerText = "";
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/category`, {
        category, // This will be sent as category_name in the backend
        description,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onAdd(response.data.data); // Pass the newly added category data to parent
        setEnable(false); // Close the modal
        setCategory(""); // Clear form fields after successful submission
        setDescription("");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error adding category:", err);
      toast.error("Failed to add category. Please try again.");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <form
        onSubmit={addCategory}
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-6 border border-gray-700/50"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
          Add New Category
        </h2>

        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-200 mb-1">
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            value={category} // Controlled component
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            onChange={(e) => setCategory(e.target.value)}
          />
          <p ref={categoryRef} className="text-red-400 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter description"
            value={description} // Controlled component
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setEnable(false);
              setCategory(""); // Clear fields on cancel
              setDescription("");
              if (categoryRef.current) categoryRef.current.innerText = ""; // Clear validation message
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
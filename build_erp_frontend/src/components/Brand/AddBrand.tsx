import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type BrandProps = {
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: (brand: { _id: string; brand_name: string }) => void;
};

function AddBrand({ enable, setEnable, onAdd }: BrandProps) {
  const [brand_name, setBrand] = useState("");
  const brandRef = useRef<HTMLParagraphElement>(null);

  const addBrand = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation for brand name
    if (brand_name.trim() === "") {
      if (brandRef.current) {
        brandRef.current.innerText = "Brand name is required.";
      }
      return;
    } else {
      if (brandRef.current) brandRef.current.innerText = "";
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/brand`, {
        brand_name,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onAdd(response.data.data); // Pass the newly added brand data to the parent
        setEnable(false); // Close the modal
        setBrand(""); // Clear the input field after successful submission
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error adding brand:", err); // Log the full error for debugging
      toast.error("Failed to add brand. Please try again.");
    }
  };

  // Render nothing if the modal is not enabled
  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <form
        onSubmit={addBrand}
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-6 border border-gray-700/50"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6 border-b border-gray-700 pb-4">
          Add New Brand
        </h2>

        <div>
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-200 mb-1">
            Brand Name
          </label>
          <input
            id="brandName"
            type="text"
            placeholder="Enter brand name"
            value={brand_name} // Controlled component
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
            onChange={(e) => setBrand(e.target.value)}
          />
          <p ref={brandRef} className="text-red-400 text-sm mt-1" />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setEnable(false);
              setBrand(""); // Clear input on cancel
              if (brandRef.current) brandRef.current.innerText = ""; // Clear validation message
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
          >
            Add Brand
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBrand;
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

    if (brand_name.trim() === "") {
      brandRef.current!.innerText = "Brand is required. Please enter your Brand.";
      return;
    } else {
      brandRef.current!.innerText = "";
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/brand`, {
        brand_name,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onAdd(response.data.data); 
        setEnable(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <form
        onSubmit={addBrand}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">Add Brand</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Brand Name</label>
          <input
            type="text"
            placeholder="Enter brand name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setBrand(e.target.value)}
          />
          <p ref={brandRef} className="text-red-500 text-sm mt-1" />
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

export default AddBrand;

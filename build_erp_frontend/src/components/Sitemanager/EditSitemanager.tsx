import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type EditSitemanagerProps = {
  editEnable: boolean;
  setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
  editId: string;
  editSitemanager: string;
  editEmail: string;
  onEditSuccess: () => void;
};

function EditSitemanager({
  editEnable,
  setEditEnable,
  editId,
  editSitemanager,
  editEmail,
  onEditSuccess,
}: EditSitemanagerProps) {
  const [sitemanager, setSitemanager] = useState(editSitemanager);
  const [email, setEmail] = useState(editEmail);
  const [password, setPassword] = useState("");

  const sitemanagerRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const passwordRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setSitemanager(editSitemanager);
    setEmail(editEmail);
  }, [editSitemanager, editEmail]);

  const sitemanagerEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (sitemanager.trim() === "") {
      if (sitemanagerRef.current) sitemanagerRef.current.innerText = "Site manager name is required";
      hasError = true;
    } else if (sitemanagerRef.current) {
      sitemanagerRef.current.innerText = "";
    }

    if (email.trim() === "") {
      if (emailRef.current) emailRef.current.innerText = "Email is required";
      hasError = true;
    } else if (emailRef.current) {
      emailRef.current.innerText = "";
    }

    if (password.trim() === "") {
      if (passwordRef.current) passwordRef.current.innerText = "Password is required";
      hasError = true;
    } else if (passwordRef.current) {
      passwordRef.current.innerText = "";
    }

    if (hasError) return;

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/sitemanager`, {
        editId,
        sitemanager,
        email,
        password,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEditEnable(false);
        onEditSuccess();
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to update site manager");
    }
  };

  if (!editEnable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-center text-gray-100 mb-6">Edit Site Manager</h2>
        <form onSubmit={sitemanagerEdit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1.5">Site Manager Name</label>
            <input
              type="text"
              value={sitemanager}
              placeholder="Enter site manager name"
              onChange={(e) => setSitemanager(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
            <p ref={sitemanagerRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
            <p ref={emailRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
            />
            <p ref={passwordRef} className="text-sm text-red-400 mt-1.5"></p>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setEditEnable(false)}
              className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSitemanager;
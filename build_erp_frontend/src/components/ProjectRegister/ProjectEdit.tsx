import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type UserType = {
  _id: string;
  username: string;
  phone: number;
  email: string;
};

type EditProjectProp = {
  editProject: string;
  editUserId: string;
  edituserName: string;
  editAddress: string;
  editEmail: string;
  editPhone: string;
  editDescription: string;
  editArea: number;
  editEnable: boolean;
  editProjectId: string;
  setEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onEditSuccess: () => void;
};

function EditProject({
  editProject,
  editUserId,
  editAddress,
  editEmail,
  editPhone,
  editDescription,
  editArea,
  editEnable,
  editProjectId,
  setEnableEdit,
  onEditSuccess,
}: EditProjectProp) {
  const [project_name, setProjectName] = useState(editProject);
  const [user_id, setUserId] = useState(editUserId);
  const [address, setAddress] = useState(editAddress);
  const [email, setEmail] = useState(editEmail);
  const [mobile_number, setMobile] = useState(editPhone);
  const [description, setDescription] = useState(editDescription);
  const [area, setArea] = useState<number>(editArea);
  const [userList, setUserList] = useState<UserType[]>([]);

  const projectRef = useRef<HTMLParagraphElement>(null);
  const userRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLParagraphElement>(null);
  const addressRef = useRef<HTMLParagraphElement>(null);
  const mobileRef = useRef<HTMLParagraphElement>(null);
  const areaRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setProjectName(editProject);
    setUserId(editUserId);
    setAddress(editAddress);
    setEmail(editEmail);
    setMobile(editPhone);
    setDescription(editDescription);
    setArea(editArea);
  }, [editProject, editUserId, editAddress, editEmail, editPhone, editDescription, editArea]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/addproject`);
        setUserList(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const editFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (project_name.trim() === "") {
      if (projectRef.current) projectRef.current.innerText = "Project name is required.";
      hasError = true;
    } else if (projectRef.current) {
      projectRef.current.innerText = "";
    }

    if (!user_id) {
      if (userRef.current) userRef.current.innerText = "Please select a user.";
      hasError = true;
    } else if (userRef.current) {
      userRef.current.innerText = "";
    }

    if (address.trim() === "") {
      if (addressRef.current) addressRef.current.innerText = "Address is required.";
      hasError = true;
    } else if (addressRef.current) {
      addressRef.current.innerText = "";
    }

    if (email.trim() === "") {
      if (emailRef.current) emailRef.current.innerText = "Email is required.";
      hasError = true;
    } else if (emailRef.current) {
      emailRef.current.innerText = "";
    }

    if (mobile_number.trim() === "") {
      if (mobileRef.current) mobileRef.current.innerText = "Mobile number is required.";
      hasError = true;
    } else if (mobileRef.current) {
      mobileRef.current.innerText = "";
    }

    if (area <= 0) {
      if (areaRef.current) areaRef.current.innerText = "Area must be greater than zero.";
      hasError = true;
    } else if (areaRef.current) {
      areaRef.current.innerText = "";
    }

    if (description.trim() === "") {
      if (descriptionRef.current) descriptionRef.current.innerText = "Description is required.";
      hasError = true;
    } else if (descriptionRef.current) {
      descriptionRef.current.innerText = "";
    }

    if (hasError) return;

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/project`, {
        editId: editProjectId,
        project_name,
        user_id,
        address,
        mobile_number,
        email,
        area,
        description,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEnableEdit(false);
        onEditSuccess();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit project");
    }
  };

  if (!editEnable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <form
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 border border-gray-700/50 space-y-5"
        onSubmit={editFormSubmit}
      >
        <h1 className="text-xl font-semibold text-center text-gray-100 mb-6">Edit Project</h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-1.5">Project Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            value={project_name}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
          />
          <p ref={projectRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-1.5">Client</label>
          <select
            aria-label="Select a client"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
          >
            <option value="">Select a client</option>
            {userList.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          <p ref={userRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-1.5">Address</label>
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
          />
          <p ref={addressRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-1.5">Mobile Number</label>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile_number}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
          />
          <p ref={mobileRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-1.5">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
          />
          <p ref={emailRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-1.5">Area (sqft)</label>
          <input
            type="number"
            placeholder="Enter area in square feet"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium"
          />
          <p ref={areaRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200 mb-1.5">Description</label>
          <textarea
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium min-h-[100px]"
          />
          <p ref={descriptionRef} className="text-sm text-red-400 mt-1.5"></p>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            onClick={() => setEnableEdit(false)}
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
  );
}

export default EditProject;
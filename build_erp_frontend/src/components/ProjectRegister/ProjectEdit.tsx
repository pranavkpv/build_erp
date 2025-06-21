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
  editProjectId:string
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
  onEditSuccess
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

    if (project_name.trim() === "") {
      projectRef.current!.innerText = "Project name is required.";
      return;
    } else {
      projectRef.current!.innerText = "";
    }

    if (!user_id) {
      userRef.current!.innerText = "Please select a user.";
      return;
    } else {
      userRef.current!.innerText = "";
    }

    if (email.trim() === "") {
      emailRef.current!.innerText = "Email is required.";
      return;
    } else {
      emailRef.current!.innerText = "";
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/project`, {
        editId: editProjectId,
        project_name,
        user_id,
        address,
        mobile_number,
        email,
        area,
        description
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEnableEdit(false);
        onEditSuccess();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit project");
    }
  };

  if (!editEnable) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
        onSubmit={editFormSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">Edit Project</h1>

        <div>
          <input
            type="text"
            placeholder="Enter project name"
            value={project_name}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <p ref={projectRef} className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <select
            aria-label="Select a user"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Select a user</option>
            {userList.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          <p ref={userRef} className="text-red-500 text-sm mt-1" />
        </div>

        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          placeholder="Enter mobile number"
          value={mobile_number}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <div>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <p ref={emailRef} className="text-red-500 text-sm mt-1" />
        </div>

        <input
          type="number"
          placeholder="Area (sqft)"
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setEnableEdit(false)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;

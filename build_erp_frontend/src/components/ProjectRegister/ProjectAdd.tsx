import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type UserType = {
   _id: string;
   username: string;
   phone: number;
   email: string;
};

type EditType = {
   enableAdd: boolean;
   setEnableAdd: React.Dispatch<React.SetStateAction<boolean>>;
   onAddSuccess:()=>void;
};

function ProjectAdd({ enableAdd, setEnableAdd,onAddSuccess }: EditType) {
   const [userList, setUserList] = useState<UserType[]>([]);
   const [user_id, setSelectedUserId] = useState("");
   const [project_name, setProjectName] = useState("");
   const [address, setAddress] = useState("");
   const [mobile_number, setMobile] = useState("");
   const [email, setEmail] = useState("");
   const [area, setArea] = useState<number>(0);
   const [description, setDescription] = useState("");

   const projectRef = useRef<HTMLParagraphElement>(null);
   const userRef = useRef<HTMLParagraphElement>(null);
   const emailRef = useRef<HTMLParagraphElement>(null);

   useEffect(() => {
      const fetchData = async () => {
         const response = await axios.get(`${ import.meta.env.VITE_BASE_URL }/admin/addproject`);
         setUserList(response.data);
      };
      fetchData();
   }, []);


   useEffect(() => {
      const selectedUser = userList.find((u) => u._id === user_id);
      if (selectedUser) {
         setEmail(selectedUser.email);
         setMobile(String(selectedUser.phone));
      } else {
         setEmail("");
         setMobile("");
      }
   }, [user_id, userList]);

   const addformSubmit = async (e: React.FormEvent) => {
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
         const response = await axios.post(`${ import.meta.env.VITE_BASE_URL }/admin/project`, {
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
            setEnableAdd(false); 
            onAddSuccess()
         } else {
            toast.error(response.data.message);
         }
      } catch (error: any) {
         console.error(error);
         toast.error("failed to add project");
      }
   };

   if (!enableAdd) return null;

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
         <form
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
            onSubmit={addformSubmit}
         >
            <h1 className="text-2xl font-bold text-center text-gray-700">+ Add Project</h1>

            <div>
               <input
                  type="text"
                  placeholder="Enter project name"
                  value={project_name}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               <p ref={projectRef} className="text-red-500 text-sm mt-1" />
            </div>

            <div>
               <select
                  aria-label="Select a user"
                  value={user_id}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  onClick={() => setEnableAdd(false)}
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

export default ProjectAdd;

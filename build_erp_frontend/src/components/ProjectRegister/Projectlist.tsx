import axios from "axios";
import { useEffect, useState } from "react";
import ProjectAdd from "./ProjectAdd";
import DeleteProject from "./ProjectDelete";
import EditProject from "./ProjectEdit";
import ChangeStatus from "./Status";

type ProjectType = {
  _id: string;
  project_name: string;
  address: string;
  mobile_number: string;
  email: string;
  description: string;
  area: number;
  userDetails: {
    _id: string;
    username: string;
    email?: string;
    phone?: number;
  }[];
  status: string;
};

function Project() {
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const [search, setSearch] = useState("");
  const [addEnable, setaddEnable] = useState(false);

  // delete
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [deleteId, setDeleteID] = useState("");

  // edit
  const [editProject, setEditProject] = useState("");
  const [editUserId, setEditUserId] = useState("");
  const [edituserName, setEditUsername] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editArea, setEditArea] = useState<number>(0);
  const [editEnable, setEnableEdit] = useState(false);
  const [editProjectId, setEditProjectId] = useState("")

  //change

  const [changeProjectId, setChangeProjectId] = useState("")
  const [varryStatus, setChangeStatus] = useState("")
  const [changeEnable, setChangeEnable] = useState(false)

  const fetchData = async () => {
    const response = await axios.get(`${ import.meta.env.VITE_BASE_URL }/admin/project`);
    setProjectList(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search with project name or client name"
            className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold"
            onClick={() => setaddEnable(true)}
          >
            + Add Project
          </button>
        </div>

        <ProjectAdd enableAdd={addEnable} setEnableAdd={setaddEnable} onAddSuccess={fetchData} />

        <div className="overflow-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3">SL NO</th>
                <th className="px-6 py-3">Project Name</th>
                <th className="px-6 py-3">Client Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projectList
                .filter(
                  (item) =>
                    item.project_name.toLowerCase().includes(search.toLowerCase()) ||
                    item.userDetails[0].username.toLowerCase().includes(search.toLowerCase())
                )
                .map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{element.project_name}</td>
                    <td className="px-6 py-4">{element.userDetails[0].username}</td>
                    <td className="px-6 py-4">
                      {element.status === "completed" ? (
                        <p className="text-gray-700 capitalize">{element.status}</p>
                      ) : (
                        <select
                         aria-label="Select status"
                          id={`status-${ element._id }`}
                          defaultValue={element.status}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                          onChange={(e) => {
                            setChangeProjectId(element._id);
                            setChangeStatus(e.target.value);
                            setChangeEnable(true);
                          }}
                        >
                          <option value={element.status}>{element.status}</option>

    
                          {element.status === "pending" &&
                            ["processing", "completed"].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}

                          {element.status === "processing" &&
                            ["completed"].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                        </select>
                      )}
                    </td>


                    <td className="px-6 py-4 text-center">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded mr-2"
                        onClick={() => {
                          setEditProject(element.project_name);
                          setEditUserId(element.userDetails[0]._id);
                          setEditUsername(element.userDetails[0].username);
                          setEditAddress(element.address);
                          setEditEmail(element.email);
                          setEditPhone(element.mobile_number);
                          setEditDescription(element.description);
                          setEditArea(element.area);
                          setEnableEdit(true);
                          setEditProjectId(element._id)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                        onClick={() => {
                          setDeleteEnable(true);
                          setDeleteID(element._id);
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
        <ChangeStatus project_id={changeProjectId} status={varryStatus} enable={changeEnable} setEnable={setChangeEnable} onChangeSuccess={fetchData} />

        <EditProject
          editProject={editProject}
          editUserId={editUserId}
          edituserName={edituserName}
          editAddress={editAddress}
          editEmail={editEmail}
          editPhone={editPhone}
          editDescription={editDescription}
          editArea={editArea}
          editEnable={editEnable}
          setEnableEdit={setEnableEdit}
          onEditSuccess={fetchData}
          editProjectId={editProjectId}
        />

        <DeleteProject
          enable={deleteEnable}
          deleteId={deleteId}
          setEnable={setDeleteEnable}
          onDeleteSuccess={fetchData}
        />
      </div>
    </div>
  );
}

export default Project;

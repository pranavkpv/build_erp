import { useState, useEffect } from "react";
import MaterialList from "./MaterialList"; 
import AddMaterial from "./AddMaterial";  
import axios from "axios";
import DeleteMaterial from "./Deletematerial"; 
import { toast } from "react-toastify"; 

function Material() {
  const [addMaterialEnable, setAddMaterialEnable] = useState(false); 
  const [materialData, setMaterialData] = useState([]);
  const [deleteId, setDeleteId] = useState("");

  // deletedata
  const [deleteEnable, setDeleteEnable] = useState(false);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/material`);
      setMaterialData(response.data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
      toast.error("An error occurred while fetching materials.");
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 max-w-7xl mx-auto border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">

          <h1 className="text-2xl font-bold text-gray-100">Material Management</h1>    
        </div>


        <MaterialList
          setEnable={setAddMaterialEnable} 
          enable={addMaterialEnable} 
          materialData={materialData}
          setDeleteEnable={setDeleteEnable}
          setDeleteId={setDeleteId}
          refreshData={fetchMaterials}
        />

        <AddMaterial
          setEnable={setAddMaterialEnable} 
          enable={addMaterialEnable} 
          refreshData={fetchMaterials}
        />
        
        <DeleteMaterial 
          enable={deleteEnable} 
          setEnable={setDeleteEnable} 
          deleteId={deleteId} 
          onDeleteSuccess={fetchMaterials} 
        />
      </div>
    </div>
  );
}

export default Material;
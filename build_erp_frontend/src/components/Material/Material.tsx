import { useState, useEffect } from "react"
import MaterialList from "./MaterialList"
import AddMaterial from "./AddMaterial"
import axios from "axios"
import DeleteMaterial from "./Deletematerial"

function Material() {
  const [enable, setEnable] = useState(false)
  const [materialData, setMaterialData] = useState([])
  const [deleteId,setDeleteId] = useState("")

  //deletedata
  const [deleteEnable,setDeleteEnable] = useState(false)

  const fetchMaterials = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/material`)
    setMaterialData(response.data)
  }

  useEffect(() => {
    fetchMaterials()
  }, [])

  return (
    <>
      <MaterialList
        setEnable={setEnable}
        enable={enable}
        materialData={materialData}
        setDeleteEnable={setDeleteEnable}
        setDeleteId={setDeleteId}
      />
      <AddMaterial
        setEnable={setEnable}
        enable={enable}
        refreshData={fetchMaterials} 
      />
      <DeleteMaterial enable={deleteEnable} setEnable={setDeleteEnable} deleteId={deleteId} onDeleteSuccess={fetchMaterials} />
    </>
  )
}

export default Material

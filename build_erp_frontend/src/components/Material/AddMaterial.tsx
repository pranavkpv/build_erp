import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

type category = {
   _id: string
   category_name: string
}

type brand = {
   _id: string
   brand_name: string
}
type unit = {
   _id: string
   unit_name: string
}
type project = {
   _id: string
   project_name: string
}


type addRowData = {
   project: string
   stock: number
}
type AddMaterialProps = {
   setEnable: React.Dispatch<React.SetStateAction<boolean>>,
   enable: boolean,
   refreshData: () => void
}


function AddMaterial({ setEnable, enable, refreshData }: AddMaterialProps) {
   const [categoryList, selectCategoryList] = useState<category[]>([])
   const [brandList, setBrandlist] = useState<brand[]>([])
   const [unitList, setUnitList] = useState<unit[]>([])
   const [projectList, setProjectlist] = useState<project[]>([])
   const [materialName, setMaterial] = useState("")
   const [selectCategoryId, setSelectCategory] = useState("")
   const [selectUnitId, setSelectedUnit] = useState("")
   const [selectBrandId, setSelectedBrand] = useState("")
   const [totalOpeningStock, setTotalStock] = useState(0)
   const [unit_rate, setUnitRate] = useState(0)
   const [row, SetRow] = useState<addRowData[]>([])

   const addRow = () => {
      SetRow([...row, { project: "", stock: 0 }])
   }

   const deletRow = (index: number) => {
      let updateRow = row.filter((_, i) => i !== index)
      SetRow(updateRow)
   }

   const fetchData = async () => {
      const response = await axios.get(`${ import.meta.env.VITE_BASE_URL }/admin/addmaterial`)
      selectCategoryList(response.data.categoryData)
      setBrandlist(response.data.brandData)
      setUnitList(response.data.unitData)
      setProjectlist(response.data.projectData || [])
   }

   useEffect(() => {
      fetchData()
   }, [])

   const existproject = (project: string) => {
      for (let element of row) {
         if (element.project === project) {
            toast.warning("Project already exists")
            return true
         }
      }
      return false
   }

   const stockCheck = (data: addRowData[]) => {
      let sum = 0
      for (let char of data) {
         sum += char.stock
      }
      if (sum > totalOpeningStock) {
         data[data.length - 1].stock = 0
         toast.warning("Total stock must be ≤ total opening stock")
         return true
      }
      return false
   }

   const saveMaterial = async () => {
      if (materialName.trim() === "") return toast.warning("Material name required")
      if (selectUnitId === "") return toast.warning("Unit is required")
      if (selectCategoryId === "") return toast.warning("Category is required")
      if (selectBrandId === "") return toast.warning("Brand is required")

      let sumStock = row.reduce((sum, num) => sum + num.stock, 0)
      if (sumStock !== totalOpeningStock) return toast.warning("Stock not matching")
      if (row.find((element) => element.project === "")) return toast.warning("Project name missing in a row")

      try {
         const response = await axios.post(`${ import.meta.env.VITE_BASE_URL }/admin/material`, {
            material_name: materialName,
            category_id: selectCategoryId,
            brand_id: selectBrandId,
            unit_id: selectUnitId,
            unit_rate: unit_rate,
            stock: totalOpeningStock,
            projectWiseStock: row,
         })
         if (response.data.success) {
            toast.success(response.data.message)
            setEnable(false)
            refreshData()
         } else {
            toast.error(response.data.message)
         }
      } catch (error: any) {
         toast.error("Failed to register material")
      }
   }

   if (!enable) return null



   return (
      <div className="p-6 bg-gray-100 min-h-screen">
         <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Add Material</h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
               <input
                  type="text"
                  placeholder="Enter material name"
                  className="input-field"
                  onChange={(e) => setMaterial(e.target.value)}
               />

               <select aria-label="Select a category" className="input-field" onChange={(e) => setSelectCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {categoryList.map((cat) => (
                     <option key={cat._id} value={cat._id}>
                        {cat.category_name}
                     </option>
                  ))}
               </select>

               <select aria-label="Select a brand" className="input-field" onChange={(e) => setSelectedBrand(e.target.value)}>
                  <option value="">Select Brand</option>
                  {brandList.map((brand) => (
                     <option key={brand._id} value={brand._id}>
                        {brand.brand_name}
                     </option>
                  ))}
               </select>

               <select aria-label="Select a unit" className="input-field" onChange={(e) => setSelectedUnit(e.target.value)}>
                  <option value="">Select Unit</option>
                  {unitList.map((unit) => (
                     <option key={unit._id} value={unit._id}>
                        {unit.unit_name}
                     </option>
                  ))}
               </select>

               <input
                  type="number"
                  placeholder="Enter unit rate"
                  className="input-field"
                  onChange={(e) => setUnitRate(Number(e.target.value))}
               />

               <input
                  type="number"
                  placeholder="Enter opening stock"
                  className="input-field"
                  onChange={(e) => setTotalStock(Number(e.target.value))}
               />
            </form>

            <div className="mb-4 text-right">
               <button onClick={addRow} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                  + Add Project
               </button>
            </div>

            <div className="overflow-x-auto">
               <table className="min-w-full border border-gray-300 text-sm">
                  <thead className="bg-blue-100">
                     <tr>
                        <th className="px-4 py-2 border">SL NO</th>
                        <th className="px-4 py-2 border">Project Name</th>
                        <th className="px-4 py-2 border">Opening Stock</th>
                        <th className="px-4 py-2 border">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {row.length === 0 ? (
                        <tr>
                           <td colSpan={4} className="text-center py-4 text-gray-500">
                              No project rows added
                           </td>
                        </tr>
                     ) : (
                        row.map((element, index) => (
                           <tr key={index}>
                              <td className="px-4 py-2 border text-center">{index + 1}</td>
                              <td className="px-4 py-2 border">
                                 <select aria-label="Select a project"
                                    className="w-full border rounded p-1"
                                    value={element.project}
                                    onChange={(e) => {
                                       if (existproject(e.target.value)) return
                                       const updatedRow = [...row]
                                       updatedRow[index].project = e.target.value
                                       SetRow(updatedRow)
                                    }}
                                 >
                                    <option value="">Select project</option>
                                    {projectList.map((item) => (
                                       <option key={item._id} value={item._id}>
                                          {item.project_name}
                                       </option>
                                    ))}
                                 </select>
                              </td>
                              <td className="px-4 py-2 border text-center">
                                 <input
                                    type="number"
                                    className="border rounded p-1 w-full"
                                    value={element.stock}
                                    placeholder="enter stock"
                                    onChange={(e) => {
                                       const updatedRow = [...row]
                                       updatedRow[index].stock = Number(e.target.value)
                                       if (stockCheck(updatedRow)) return
                                       SetRow(updatedRow)
                                    }}
                                 />
                              </td>
                              <td className="px-4 py-2 border text-center">
                                 <button
                                    onClick={() => deletRow(index)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                 >
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>

            <div className="flex justify-end gap-4 mt-6">
               <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setEnable(false)}>Cancel</button>
               <button
                  onClick={saveMaterial}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
               >
                  Save Material
               </button>
            </div>
         </div>
      </div>
   )
}

export default AddMaterial

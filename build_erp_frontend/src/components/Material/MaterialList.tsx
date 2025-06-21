import {  useState } from "react"


type materialType = {
   _id:string,
   material_name: string,
   unit_rate: number,
   categoryDetails: {
      _id: string;
      category_name: string;
   }[],
   unitDetails: {
      _id: string;
      unit_name: string;
   }[],
   brandDetails: {
      _id: string;
      brand_name: string;
   }[],
}

type MaterialListProps = {
  setEnable: React.Dispatch<React.SetStateAction<boolean>>,
  enable: boolean,
  materialData: materialType[],
  setDeleteEnable:React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteId:React.Dispatch<React.SetStateAction<string>>
}

function MaterialList({setEnable,enable,materialData ,setDeleteEnable,setDeleteId}:MaterialListProps) {

   const [search, setSearch] = useState("")


   const filteredMaterials = materialData.filter((item) =>
      item.material_name.toLowerCase().includes(search.toLowerCase())
   )
   if(enable) return null

   return (
      <div className="p-6 bg-gray-100 min-h-screen">
         <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
               <input
                  type="text"
                  placeholder="Search material..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
               />
               <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold"
                  onClick={()=>setEnable(true)}
               >
                  + Add Material
               </button>
            </div>




            <div className="overflow-auto rounded-lg shadow-md">
               <table className="min-w-full bg-white text-sm text-left">
                  <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
                     <tr>
                        <th className="px-6 py-3">SL NO</th>
                        <th className="px-6 py-3">Material Name</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Brand</th>
                        <th className="px-6 py-3">Unit</th>
                        <th className="px-6 py-3">Unit Rate</th>
                        <th className="px-6 py-3">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     {filteredMaterials.length === 0 ? (
                        <tr>
                           <td colSpan={7} className="text-center py-6 text-gray-500">
                              No materials found.
                           </td>
                        </tr>
                     ) : (
                        filteredMaterials.map((element, index) => (
                           <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4">{element.material_name}</td>
                              <td className="px-6 py-4">{element.categoryDetails[0]?.category_name || "-"}</td>
                              <td className="px-6 py-4">{element.brandDetails[0]?.brand_name || "-"}</td>
                              <td className="px-6 py-4">{element.unitDetails[0]?.unit_name || "-"}</td>
                              <td className="px-6 py-4">{element.unit_rate}</td>
                              <td className="px-6 py-4">
                                 <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 text-sm">
                                    Edit
                                 </button>
                                 <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm" onClick={()=>{
                                    setDeleteEnable(true)
                                    setDeleteId(element._id)
                                    }}>
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   )
}

export default MaterialList

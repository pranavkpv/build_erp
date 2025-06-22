export interface Material {
   _id: string,
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   createdAt: Date,
   updatedAt: Date
}

export interface ProjectStock {
   _id: string
   project_id: string,
   material_id: string,
   stock: number
   createdAt: Date,
   updatedAt: Date
}


//input of add material
export interface addMaterialInput {
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock: [{
      project_id: string,
      material_id: string,
      stock: number
   }]
}

//output of add material
export interface addMaterialOutput {
   success: boolean,
   message: string
}

//edit material data fetch
export interface getEditMaterialData {
   _id: string
}

//output of data fetch in edit
export interface outEditMaterialData {
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock: [{
      project_id: string,
      material_id: string,
      stock: number
   }]
}

//input of edit material
export interface editMaterialInput {
   _id: string
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock: [{
      _id: string,
      project_id: string,
      material_id: string,
      stock: number
   }]
}

//output of edit material
export interface editmaterialOutput {
   success: boolean,
   message: string
}

//input of delete material
export interface deleteMaterialInput {
   _id: string
}

//output of delete material
export interface deleteMaterialOutput {
   success: boolean,
   message: string
}

//general error
export interface generalError{
   code:string,
   message:string,
   statusCode:number
}

export interface adminData {
   username: string,
   password: string
}

export interface categoryData {
   category: string,
   description: string
}

export interface updateCategoryData {
   editId: string,
   category: string,
   description: string
}

export interface deleteCategoryData {
   id: string
}

export interface addUnitData {
   unit: string,
   shortname: string
}

export interface editUnitData {
   editId: string,
   unit: string,
   short_name: string
}

export interface deletUnitData {
   id: string
}

export interface addBrandData {
   brand_name: string
}

export interface editBrandData {
   editId: string,
   brand_name: string
}

export interface deleteBrandData {
   id: string
}

export interface addMaterialData {
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

export interface getEditMaterialData{
   editId : string
}

export interface editMaterialData {
   editMatId:string
   material_name: string,
   category_id: string,
   brand_id: string,
   unit_id: string,
   unit_rate: number,
   stock: number,
   projectWiseStock: [{
      editProjectStockId : string,
      project_id: string,
      material_id: string,
      stock: number
   }]
}

export interface deleteMaterialData {
   deleteId: string
}
export interface adminData {
   username: string,
   password: string
}

export interface categoryData {
   category: string,
   description: string
}

export interface updateCategoryData{
   editId:string,
   category:string,
   description:string
}

export interface deleteCategoryData{
   id:string
}

export interface addUnitData{
    unit:string,
    shortname:string
}

export interface editUnitData{
   editId:string,
   unit:string,
   short_name:string
}

export interface deletUnitData{
   id:string
}
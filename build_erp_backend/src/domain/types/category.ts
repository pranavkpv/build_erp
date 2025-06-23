export interface Category {
   _id: string
   category_name: string,
   description: string,
   createdAt: Date,
   updatedAt: Date
}

//input of add category
export interface addcategoryInput {
   category_name: string,
   description: string
}



//input of edit category
export interface editCategoryInput {
   _id: string,
   category_name: string,
   description: string
}



//input of delete category
export interface deleteCategoryInput {
   _id: string
}

//ooutput of delete category
export interface outputCategory{
   success:boolean,
   message:string
}


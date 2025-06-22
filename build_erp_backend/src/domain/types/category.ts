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

//output of add category
export interface addcategoryOutput{
   success:boolean,
   message:string
}

//input of edit category
export interface editCategoryInput {
   _id: string,
   category_name: string,
   description: string
}

//output of edit category
export interface editCategoryOutput{
   success:boolean,
   message:string
}

//input of delete category
export interface deleteCategoryInput {
   _id: string
}

//ooutput of delete category
export interface deleteCategoryOutput{
   success:boolean,
   message:string
}

//general error
export interface generalError{
   code:string,
   message:string,
   statusCode:number
}
export interface Brand {
   _id: string,
   brand_name: string,
   createdAt: Date,
   updatedAt: Date
}

// input of add brand
export interface addBrandInput {
   brand_name: string
}
// ouput of add brand
export interface addBrandOutput {
    success:boolean,
   message:string
}
//input of edit brand
export interface editBrandInput {
   _id: string,
   brand_name: string
}

//output of edit brand
export interface editBrandOutput {
   success:boolean,
   message:string
}
 
//input of delete brand
export interface deleteBrandInput {
   _id: string
}
//output of delete brand
export interface deleteBrandOutput{
    success:boolean,
   message:string
}

//general error
export interface generalError{
   code:string,
   message:string,
   statusCode:number
}
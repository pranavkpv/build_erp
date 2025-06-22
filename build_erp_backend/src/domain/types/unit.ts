export interface Unit{
   _id:string,
   unit_name: string,
   short_name: string,
   createdAt:Date,
   updatedAt:Date
}

//input of add unit
export interface addUnitInput {
   unit_name: string,
   short_name: string
}

//output of add unit
export interface addUnitOutpit{
   success:boolean,
   message:string
}

//input of edit unit

export interface editUnitInput {
   _id: string,
   unit_name: string,
   short_name: string
}

//edit unit output
export interface editUnitOutput{
   success:boolean,
   message:string
}

//delete Unit input
export interface deletUnitInput {
   _id: string
}
//delete Unit output
export interface deleteUnitOutput{
   success:boolean,
   message:string
}

//general error
export interface generalError{
   code:string,
   message:string,
   statusCode:number
}

export interface Admin {
   _id: string
   username: string,
   password: string,
   createdAt:Date,
   updatedAt:Date
}

//input of admin login 
export interface adminloginInput {
   username: string,
   password: string
}
//output of admin login
export interface adminloginOutput{
   success:boolean,
   message:string
}

//general error
export interface generalError{
   code:string,
   message:string,
   statusCode:number
}

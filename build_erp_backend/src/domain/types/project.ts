export interface Project {
   _id: string
   project_name: string
   user_id: string
   address:string
   mobile_number:number
   email:string
   description: string
   area:number
   status: string[]//"pending" | "processing" | "completed";
   sitemanager_id: string
   start_date : Date
   end_date : Date
   expected_image: string
   finalImage: string
   createdAt:Date
   updatedAt:Date
}

// input of add project
export interface addProjectInput {
   project_name: string,
   user_id: string,
   address: string,
   mobile_number: string,
   email: string,
   area: string,
   description: string
}

//output of add project
export interface addProjectOutput{
   success:boolean,
   message:string
}
//input of edit project
export interface editProjectInput {
   _id: string
   project_name: string,
   user_id: string,
   address: string,
   mobile_number: number,
   email: string,
   area: number,
   description: string
}

// output of edit project
export interface editProjectOutput{
   success:boolean,
   message:string
}

//delete project input
export interface deleteProjectInput {
   _id: string
}

//delete project output
export interface editProjectOutput{
   success:boolean,
   message:string
}

//status change input
export interface statusChangeInput {
   _id: string,
   status: string
}

//status change output
export interface statusChangeOutput{
   success:boolean,
   message:string
}

//general error
export interface generalError{
   code:string,
   message:string,
   statusCode:number
}
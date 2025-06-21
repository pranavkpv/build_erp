export interface addProjectData{
   project_name:string,
   user_id:string,
   address:string,
   mobile_number:string,
   email:string,
   area:string,
   description:string
}

export interface editProjectData{
   editId: string
   project_name:string,
   user_id:string,
   address:string,
   mobile_number:string,
   email:string,
   area:string,
   description:string
}

export interface deleteProjectData{
   id:string
}

export interface statusChange{
   project_id:string,
   status:string
}
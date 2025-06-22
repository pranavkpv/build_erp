export interface Sitemanager {
  _id: string,
  username: string,
  email: string,
  password: string,
  createdAt:Date,
  updatedAt:Date
}

//input of add sitemanager
export interface addsitemanagerInput {
  username: string,
  email: string,
  password: string
}

//output of add sitemanager
export interface addsitemanagerOutput{
  success:boolean,
  message:string
}

//input of editsiteamanager
export interface editSitemanagerInput {
  _id: string
  username: string,
  email: string,
  password: string
}

//output of edit sitemanager
export interface editSitemangerOutput{
  success:boolean,
  message:string
}

//input of delete sitemanager
export interface deleteSitemanagerInput {
  _id: string
}
//output of delete sitemanager
export interface deleteSitemenagerOutput{
  success:boolean,
  message:string
}

//general error
export interface generalError{
   code:string,
   message:string,
   statusCode:number
}
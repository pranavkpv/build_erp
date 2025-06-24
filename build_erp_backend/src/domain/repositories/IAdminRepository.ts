import { Admin } from "../types/admin";

export interface IAdminRepository{
   findAdminByUsernameAndPassword(username:string,password:string):Promise<Admin | null>
}
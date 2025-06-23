import { Admin } from "../types/admin";

export interface IAdminRepository{
   findAdminByUsernameAndPassword(email:string,password:string):Promise<Admin | null>
}
import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import { Admin } from "../../domain/types/admin";
import AdminModel from "../../models/AdminModel";

export class AdminmongooseRepository implements IAdminRepository{
      async findAdminByUsernameAndPassword(username:string,password:string):Promise<Admin | null>{
          const admin = await AdminModel.findOne({username,password})
          return admin ? (admin as Admin) : null
      }
}

import {  adminloginInput, adminloginOutput } from "../domain/types/admin"
import { IAdminRepository } from "../domain/repositories/IAdminRepository"

export class AdminLoginUseCase{
   private adminRepository : IAdminRepository
   constructor(adminRepository : IAdminRepository){
      this.adminRepository = adminRepository
   }
   async execute(input:adminloginInput):Promise<adminloginOutput>{
      const {username,password} = input
      const existAdmin = await this.adminRepository.findAdminByUsernameAndPassword(username,password)
      if(!existAdmin){
          return {success:false , message:"The username or password you entered is invalid."}
      }
      return {success:true,message:"login successfully"}  
   }
}

import { Mongoose } from "mongoose"
import ProjectModel from "../../models/ProjectModel"
import Usermodel from "../../models/Usermodel"
import { addProjectData, deleteProjectData, editProjectData, statusChange } from "../../domain/types/project"

export const projectList = async()=>{
   const projectData = await ProjectModel.aggregate([
       {
      $addFields: {
        userObjectId: { $toObjectId: "$user_id" }
      }
    },{
      $lookup:{
         from:"users",
         localField:"userObjectId",
         foreignField:"_id",
         as:"userDetails"
      }
   }])

   return projectData;
}

export const getAddproject = async()=>{
   const userData = await Usermodel.find();
   return userData;
}

export const addProject = async(data:addProjectData)=>{
   const {project_name,user_id,address,mobile_number,email,area,description} = data
   const existProject = await ProjectModel.findOne({project_name})
   if(existProject){
      return {
         success:false,
         message:"project name already exist"
      }
   }else{
      const newProject = new ProjectModel({
         project_name,
         user_id,
         address,
         mobile_number,
         email,
         area,
         description,
         status:"pending"
      })
      await newProject.save()
      return {
         success:true,
         message:"project registered successfully"
      }
   }
}

export const editProject = async(data:editProjectData)=>{
   const {editId,project_name,user_id,address,mobile_number,email,area,description} = data
   const existProject = await ProjectModel.findOne({_id:{$ne:editId},project_name})
   if(existProject){
     return {
         success:false,
         message:"project name already exist"
      }
   }else{
      await ProjectModel.findByIdAndUpdate(editId,{project_name,user_id,address,mobile_number,email,area,description})
       return {
         success:true,
         message:"project updated successfully"
      }
   }
}

export const deletProject = async(data:deleteProjectData)=>{
   const {id} = data
   await ProjectModel.findByIdAndDelete(id)
   return {
      success:true,
      message:"project deleted successfully"
   }
}

export const changeStatus = async(data:statusChange)=>{
   const {project_id,status} = data
   await ProjectModel.findByIdAndUpdate(project_id,{status})
   return   {
      success:true,
      message:"status changed successfully to " + status

   }
}
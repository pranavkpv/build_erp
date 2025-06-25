import { IprojectRepository } from "../../domain/repositories/IProjectRepository";
import { projectWithSitemanager } from "../../domain/types/addSite";
import { getProjectListData, Project } from "../../domain/types/project";
import ProjectModel from "../../models/ProjectModel";


export class ProjectmongooseRepository implements IprojectRepository {
   async findAllProjectWithUser(): Promise<getProjectListData[] | []> {
      const projectData = await ProjectModel.aggregate([
         {
            $addFields: {
               userObjectId: { $toObjectId: "$user_id" }
            }
         }, {
            $lookup: {
               from: "users",
               localField: "userObjectId",
               foreignField: "_id",
               as: "userDetails"
            }
         }])

      return projectData ? projectData : []
   }
   async findProjectByName(project_name: string): Promise<Project | null> {
      const existProject = await ProjectModel.findOne({ project_name })
      return existProject ? existProject : null
   }
   async saveProject(project_name: string, user_id: string, address: string, mobile_number: number, email: string, area: string, description: string, status: string): Promise<void> {
      const newProject = new ProjectModel({
         project_name,
         user_id,
         address,
         mobile_number,
         email,
         area,
         description,
         status: "pending"
      })
      await newProject.save()
   }
   async findProjectInEdit(_id: string, project_name: string): Promise<Project | null> {
      const existProject = await ProjectModel.findOne({ _id: { $ne: _id }, project_name })
      return existProject ? existProject : null
   }
   async UpdateProjectById(_id: string, project_name: string, user_id: string, address: string, mobile_number: number, email: string, area: number, description: string): Promise<void> {
      await ProjectModel.findByIdAndUpdate(_id, { project_name, user_id, address, mobile_number, email, area, description })
   }
   async DeleteProjectById(_id: string): Promise<void> {
      await ProjectModel.findByIdAndDelete(_id)
   }
   async changeProjectStatus(_id: string, status: string): Promise<void> {
      await ProjectModel.findByIdAndUpdate(_id, { status })
   }
   async addSitemanagerToProject(_id: string, siteManager_id: string): Promise<void> {
      await ProjectModel.findByIdAndUpdate(_id, {$set:{ sitemanager_id:siteManager_id }})
   }
   async findProjectWithSitemanager(): Promise<projectWithSitemanager[] | []> {
      const result = await ProjectModel.aggregate([{
         $addFields:{
            siteManagerObjectId :{$toObjectId:"$sitemanager_id"}
         }
      },
         {
         $lookup: {
            from: "sitemanagers",
            localField: "siteManagerObjectId",
            foreignField: "_id",
            as: "sitemanagerDetails"
         }
      }])
      return result ? result : []
   }
   async removeSitemanagerInProject(_id: string, sitemanager_id: string): Promise<void> {
         await ProjectModel.findByIdAndUpdate(_id, { sitemanager_id:null })
   }
}
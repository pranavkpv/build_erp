import { IProjectStockRepository } from "../../domain/repositories/IProjectStockRepository";
import { ProjectStock } from "../../domain/types/material";
import ProjectStockModel from "../../models/ProjectStockModel";

export class ProjectStockmongooseRepository implements IProjectStockRepository {
   async saveProjectStock(project_id: string, material_id: string, stock: number): Promise<void> {
      const newProjectWiseStock = new ProjectStockModel({
         project_id,
         material_id,
         stock
      })
      await newProjectWiseStock.save()
   }
   async findProjectStockByMaterialId(material_id: string): Promise<ProjectStock[] | []> {
       const projectStockData = await ProjectStockModel.find({material_id})
       return projectStockData ? (projectStockData as ProjectStock[]) : [] 
   }
   async findProjectStockById(_id: string): Promise<ProjectStock | null> {
      const existProductStock = await ProjectStockModel.findOne({_id})
      return existProductStock ? (existProductStock as ProjectStock) : null
   }
   async updateProjectStockById(_id: string, project_id: string, material_id: string, stock: number): Promise<void> {
        await ProjectStockModel.findByIdAndUpdate(_id,{project_id,material_id,stock})
   }
   async deleteProjectStockByMaterialId(material_id: string): Promise<void> {
        await ProjectStockModel.deleteMany({ material_id })
   }
}
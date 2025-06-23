import { IBrandRepository } from "../domain/repositories/IBrandRepository"
import { ICategoryRepository } from "../domain/repositories/ICategoryRepository"
import { IMaterialRepository } from "../domain/repositories/IMaterialRepository"
import { IProjectStockRepository } from "../domain/repositories/IProjectStockRepository"
import { IUnitRepository } from "../domain/repositories/IUnitRepository"
import { editMaterialInput, outputMaterial } from "../domain/types/material"

export class UpdateMaterialUseCase {
   private materialRepository: IMaterialRepository
   private categoryRepository: ICategoryRepository
   private brandRepository: IBrandRepository
   private unitRepository: IUnitRepository
   private projectStockRepository: IProjectStockRepository
   constructor(materialRepository: IMaterialRepository, categoryRepository: ICategoryRepository, brandRepository: IBrandRepository, unitRepository: IUnitRepository, projectStockRepository: IProjectStockRepository) {
      this.materialRepository = materialRepository
      this.categoryRepository = categoryRepository
      this.brandRepository = brandRepository
      this.unitRepository = unitRepository
      this.projectStockRepository = projectStockRepository
   }

   async execute(input: editMaterialInput): Promise<outputMaterial> {
      const { _id, material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = input
      const existMaterial = await this.materialRepository.findMaterialInEdit(_id, material_name, category_id, brand_id)
      if (existMaterial) {
         return {
            success: false,
            message: "material already exist"
         }
      }
      await this.materialRepository.updateMaterialById(_id, material_name, category_id, brand_id, unit_id, unit_rate, stock)
      for (let i = 0; i < projectWiseStock.length; i++) {
         const _id = projectWiseStock[i]._id
         const project_id = projectWiseStock[i].project_id
         const material_id = projectWiseStock[i].material_id
         const stock = projectWiseStock[i].stock
         const existProductStock = await this.projectStockRepository.findProjectStockById(_id)
         if (existProductStock) {
            await this.projectStockRepository.updateProjectStockById(_id, project_id, material_id, stock)
         } else {
            await this.projectStockRepository.saveProjectStock(project_id, material_id, stock)
         }
      }
      return {
         success: true,
         message: "material saved successfully"
      }
   }
}

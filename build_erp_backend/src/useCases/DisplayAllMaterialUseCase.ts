
import { IMaterialRepository } from "../domain/repositories/IMaterialRepository";
import { Material } from "../domain/types/material";



export class DisplayAllMaterialUseCase {
   private materialRepository: IMaterialRepository
   constructor(materialRepository: IMaterialRepository) {
      this.materialRepository = materialRepository
   }
   async execute(): Promise<Material[] | []> {
      const materialData = await this.materialRepository.findAllMaterial()
      return materialData ? (materialData as Material[]) : []
   }
}




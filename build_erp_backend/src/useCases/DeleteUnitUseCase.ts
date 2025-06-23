import { IUnitRepository } from "../domain/repositories/IUnitRepository"
import { deletUnitInput, outputUnit } from "../domain/types/unit"

export class deleteUnitUseCase {
   private UnitRepository: IUnitRepository
   constructor(UnitRepository: IUnitRepository) {
      this.UnitRepository = UnitRepository
   }
   async execute(input: deletUnitInput): Promise<outputUnit> {
      const { _id } = input
      await this.UnitRepository.deleteUnitById(_id)
      return {
         success: true,
         message: "unit deleted successfully"
      }
   }
}
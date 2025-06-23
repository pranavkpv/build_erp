
import { IUnitRepository } from "../domain/repositories/IUnitRepository"
import {  Unit } from "../domain/types/unit"


export class DisplayAllUnitUseCase {
   private UnitRepository: IUnitRepository
   constructor(UnitRepository: IUnitRepository) {
      this.UnitRepository = UnitRepository
   }
   async execute(): Promise<Unit[] | []> {
      const existUnit = await this.UnitRepository.findUnit()
      return existUnit ? (existUnit as Unit[]) : []
   }
}













import { ILabourRepository } from "../domain/repositories/ILabourRepository"
import {  Labour } from "../domain/types/labour"

export class DisplayAllLabourUseCase {
   private labourRepository: ILabourRepository
   constructor(labourRepository: ILabourRepository) {
      this.labourRepository = labourRepository
   }
   async execute(): Promise<Labour[] | []> {
      const result = await this.labourRepository.findAllLabour()
      return result ? (result as Labour[]) : []
   }
}




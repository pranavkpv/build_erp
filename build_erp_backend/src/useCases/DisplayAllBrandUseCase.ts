
import { IBrandRepository } from "../domain/repositories/IBrandRepository";
import { Brand } from "../domain/types/brand";


export class DisplayAllBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(): Promise<Brand[] | []> {
      const allBrandData = await this.brandRepository.findAllBrand()
      return allBrandData ? (allBrandData as Brand[]) : []
   }
}


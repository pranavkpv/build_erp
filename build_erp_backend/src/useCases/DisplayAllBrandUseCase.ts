
import { IBrandRepository } from "../domain/repositories/IBrandRepository";
import { Brand } from "../domain/types/brand";


export class DisplayAllBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(page:number,search:string): Promise<{getBrandData:any[];totalPage:number }> {
      const {getBrandData,totalPage} = await this.brandRepository.findAllListBrand(page,search)
      return {
         getBrandData,
         totalPage
      }
   }
}


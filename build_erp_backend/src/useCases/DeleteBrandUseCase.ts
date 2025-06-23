import { IBrandRepository } from "../domain/repositories/IBrandRepository"
import { deleteBrandInput, outputBrand } from "../domain/types/brand"

export class DeleteBrandUseCase {
   private brandRepository: IBrandRepository
   constructor(brandRepository: IBrandRepository) {
      this.brandRepository = brandRepository
   }
   async execute(input: deleteBrandInput): Promise<outputBrand> {
      const { _id } = input
      await this.brandRepository.deleteBrandById(_id)
      return {
         success: true,
         message: "Brand deleted successfuly"
      }

   }
}

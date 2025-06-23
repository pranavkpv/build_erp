import { ICategoryRepository } from "../domain/repositories/ICategoryRepository"
import { deleteCategoryInput, outputCategory } from "../domain/types/category"


export class DeleteCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(input:deleteCategoryInput): Promise<outputCategory> {
      const {_id} = input
      await this.categoryRepository.deleteCategoryById(_id)
       return { success: true, message: "category deleted successfully" }
   }
}
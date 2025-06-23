import CategoryModel from "../models/CategoryModel";
import { ICategoryRepository } from "../domain/repositories/ICategoryRepository";
import { addcategoryInput, Category, deleteCategoryInput, editCategoryInput, outputCategory } from "../domain/types/category";


export class DisplayAllCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(): Promise<Category[] | null> {
      const categoryData = await this.categoryRepository.findAllCategory()
      return categoryData ? (categoryData as Category[]) : null
   }
}



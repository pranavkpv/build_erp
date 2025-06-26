import CategoryModel from "../models/CategoryModel";
import { ICategoryRepository } from "../domain/repositories/ICategoryRepository";
import { addcategoryInput, Category, deleteCategoryInput, editCategoryInput, outputCategory } from "../domain/types/category";


export class DisplayAllCategoryUseCase {
   private categoryRepository: ICategoryRepository
   constructor(categoryRepository: ICategoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async execute(page:number,search:string): Promise<{getCategoryData:any[];totalPage:number }> {
      const {getCategoryData,totalPage} = await this.categoryRepository.findAllListCategory(page, search)
      return {
         getCategoryData ,
         totalPage
      }
   }
}



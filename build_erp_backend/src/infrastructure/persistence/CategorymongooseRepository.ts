import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { Category } from "../../domain/types/category";
import CategoryModel from "../../models/CategoryModel";

export class CategorymongooseRepository implements ICategoryRepository {
   async findAllCategory(): Promise<Category[] | []> {
      const list = await CategoryModel.find({})
      return list ? (list as Category[]) : []
   }
   async findByCategoryName(category_name: string): Promise<Category | null> {
      const ExistCategory = await CategoryModel.findOne({ category_name })
      return ExistCategory ? (ExistCategory as Category) : null
   }
   async saveCategory(category_name: string, description: string): Promise<void> {
        const newCategory = new CategoryModel({
         category_name,
         description
      })
      await newCategory.save()
   }
   async findCategoryInEdit(_id:string,category_name:string):Promise<Category | null>{
      const existData = await CategoryModel.findOne({_id:{$ne:_id},category_name})
      return existData ? (existData as Category) : null
   }
   async updateCategoryById(_id:string,category_name:string,description:string):Promise<void>{
       await CategoryModel.findByIdAndUpdate(_id,{category_name,description})
   }
   async deleteCategoryById(_id:string):Promise<void>{
      await CategoryModel.findByIdAndDelete(_id)
   }
}
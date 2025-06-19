import CategoryModel from "../models/CategoryModel";
import { categoryData, updateCategoryData,deleteCategoryData } from "../types/admin";




export const listCategory = async () => {
   const list = await CategoryModel.find()
   return list
}

export const saveCategory = async (data: categoryData) => {
   const { category, description } = data
   const ExistCategory = await CategoryModel.findOne({ category_name: category })
   if (ExistCategory) {
      return { success: false, message: "Category already exist" }
   } else {
      const newCategory = new CategoryModel({
         category_name: category,
         description
      })
      await newCategory.save()
      return { success: true, message: "category saved successfully" }
   }
}

export const updateCategory = async (data: updateCategoryData) => {
   const { editId, category, description } = data
   const existData = await CategoryModel.findOne({_id:{$ne:editId},category_name:category})
   if(existData){
      return {success:false,message:"category already exist" }
   }
   await CategoryModel.findByIdAndUpdate(editId,{category_name:category,description})
   return {success:true,message:"category updated successfully",data:{_id:editId,category_name:category,description:description}}
}


export const removeCategory = async(data:deleteCategoryData)=>{
    const {id} = data
    //here write the material condition

    await CategoryModel.findByIdAndDelete(id)
    return {success:true,message:"category deleted successfully"}
}
import BrandModel from "../models/BrandModel";
import CategoryModel from "../models/CategoryModel";
import MaterialModel from "../models/MaterialModel";
import ProjectModel from "../models/ProjectModel";
import ProjectStock from "../models/ProjectStock";
import UnitModel from "../models/UnitModel";
import { addMaterialData, deleteMaterialData, editMaterialData, getEditMaterialData } from "../types/admin";

export const getMaterial = async () => {
   const MaterialData = await MaterialModel.aggregate([
      {
         $addFields:{
            categoryObjectId:{$toObjectId:"$category_id"},
            unitObjectId:{$toObjectId:"$unit_id"},
            brandObjectId:{$toObjectId:"$brand_id"}
         }
      },
      {
      $lookup:{
         from:"categories",
         localField:"categoryObjectId",
         foreignField:"_id",
         as:"categoryDetails"
      }
   },
        {$lookup:{
         from:"units",
         localField:"unitObjectId",
         foreignField:"_id",
         as:"unitDetails"
      }},
        {$lookup:{
         from:"brands",
         localField:"brandObjectId",
         foreignField:"_id",
         as:"brandDetails"
      }
   }])
   return MaterialData;
}

export const getAddMaterial = async () => {
   const categoryData = await CategoryModel.find()
   const brandData = await BrandModel.find()
   const unitData = await UnitModel.find()
   const projectData = await ProjectModel.find()
   return { categoryData, brandData, unitData,projectData }
}

export const addMaterial = async (data: addMaterialData) => {
   const { material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = data
   const existMaterial = await MaterialModel.findOne({material_name,category_id,brand_id})
   if(existMaterial){
      return {
         success:false,
         message:"material already exist"
      }
   }
   const newMaterial = new MaterialModel({
      material_name,
      category_id,
      brand_id,
      unit_id,
      unit_rate,
      stock
   })
   const saveMaterial = await newMaterial.save()
   for(let i=0;i<projectWiseStock.length;i++){
      const newProjectWiseStock = new ProjectStock({
         project_id:projectWiseStock[i].project_id,
         material_id:saveMaterial._id,
         stock:projectWiseStock[i].stock
      })
      await newProjectWiseStock.save()
      return {
         success:true,
         message:"material saved successfully"
      }
   }

}

export const getEditMaterial = async(data:getEditMaterialData)=>{
   const categoryData = await CategoryModel.find()
   const brandData = await BrandModel.find()
   const unitData = await UnitModel.find()
   const materialData = await MaterialModel.findOne({_id:data.editId})
   const projectStockData = await ProjectStock.find({material_id:data.editId})
   return { categoryData, brandData, unitData,materialData,projectStockData }
}

export const editMaterial = async(data:editMaterialData)=>{
   const {editMatId, material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = data
   const existMaterial = await MaterialModel.find({_id:{$ne:editMatId},material_name,category_id,brand_id})
   if(existMaterial){
      return {
         success:false,
         message:"material already exist"
      }
   }else{
      await MaterialModel.findByIdAndUpdate(editMatId,{material_name,category_id,brand_id,unit_id,unit_rate,stock})
      for(let i=0;i<projectWiseStock.length;i++){
         const existProductStock = await ProjectStock.findOne({_id:projectWiseStock[i].editProjectStockId})
         if(existProductStock){
            await ProjectStock.findByIdAndUpdate(projectWiseStock[i],{project_id:projectWiseStock[i].project_id,material_id:projectWiseStock[i].material_id,stock:projectWiseStock[i].stock})
         }else{
            const newProjectStock = new ProjectStock({
               project_id : projectWiseStock[i].project_id,
               material_id : projectWiseStock[i].material_id,
               stock : projectWiseStock[i].stock
            })

            await newProjectStock.save()
         }
      }
      return {
         success:true,
         message:"material saved successfully"
      }
   }
}

export const deleteMaterial = async(data:deleteMaterialData)=>{
   const {deleteId} = data
   await MaterialModel.findByIdAndDelete(deleteId);
   await ProjectStock.deleteMany({material_id:deleteId})
   return  {
      success:true,
      message:"material deleted successfully"
   }
}
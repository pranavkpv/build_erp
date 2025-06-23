import { IMaterialRepository } from "../../domain/repositories/IMaterialRepository";
import { Brand } from "../../domain/types/brand";
import { Category } from "../../domain/types/category";
import { Material, MaterialList } from "../../domain/types/material";
import { Project } from "../../domain/types/project";
import { Unit } from "../../domain/types/unit";
import BrandModel from "../../models/BrandModel";
import CategoryModel from "../../models/CategoryModel";
import MaterialModel from "../../models/MaterialModel";
import ProjectModel from "../../models/ProjectModel";
import UnitModel from "../../models/UnitModel";

export class MaterialmongooseRepository implements IMaterialRepository {
   async findAllMaterial(): Promise<Material[] | []> {
      const MaterialData = await MaterialModel.aggregate([
         {
            $addFields: {
               categoryObjectId: { $toObjectId: "$category_id" },
               unitObjectId: { $toObjectId: "$unit_id" },
               brandObjectId: { $toObjectId: "$brand_id" }
            }
         },
         {
            $lookup: {
               from: "categories",
               localField: "categoryObjectId",
               foreignField: "_id",
               as: "categoryDetails"
            }
         },
         {
            $lookup: {
               from: "units",
               localField: "unitObjectId",
               foreignField: "_id",
               as: "unitDetails"
            }
         },
         {
            $lookup: {
               from: "brands",
               localField: "brandObjectId",
               foreignField: "_id",
               as: "brandDetails"
            }
         }])
      return MaterialData ? (MaterialData as Material[]) : []
   }
   async findAllProject(): Promise<Project[] | []> {
      const projectData = await ProjectModel.find()
      return projectData ? (projectData as Project[]) : []
   }
   async findMaterailWithNameCategoryBrand(material_name: string, category_id: string, brand_id: string): Promise<MaterialList | null> {
      const existMaterial = await MaterialModel.findOne({ material_name, category_id, brand_id })
      return existMaterial ? existMaterial : null
   }
   async saveMaterial(material_name: string, category_id: string, brand_id: string, unit_id: string, unit_rate: number, stock: number): Promise<MaterialList > {
      const newMaterial = new MaterialModel({
         material_name,
         category_id,
         brand_id,
         unit_id,
         unit_rate,
         stock
      })
      const savedMaterial =  await newMaterial.save()
      return savedMaterial 
   }
   async findMaterialById(_id: string): Promise<MaterialList | null> {
       const materialData = await MaterialModel.findOne({_id})
       return materialData ? (materialData as MaterialList) : null
   }
   async findMaterialInEdit(_id: string, material_name: string, brand_id: string, category_id: string): Promise<MaterialList | null> {
       const existMaterial = await MaterialModel.findOne({_id:{$ne:_id},material_name,category_id,brand_id})
       return existMaterial ? (existMaterial as MaterialList) : null
   }
   async updateMaterialById(_id: string, material_name: string, category_id: string, brand_id: string, unit_id: string, unit_rate: number, stock: number): Promise<void> {
      await MaterialModel.findByIdAndUpdate(_id,{material_name,category_id,brand_id,unit_id,unit_rate,stock})
   }
   async deleteMaterialById(_id: string): Promise<void> {
        await MaterialModel.findByIdAndDelete(_id);
   }
}
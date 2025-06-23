import { Brand } from "../types/brand";
import { Category } from "../types/category";
import { Material, MaterialList } from "../types/material";
import { Project } from "../types/project";
import { Unit } from "../types/unit";


export interface IMaterialRepository{
   //lookup in category_id,brand_id,unit_id
   findAllMaterial():Promise<Material[] | []>;
   findMaterialById(_id:string):Promise<MaterialList | null>
   findAllProject():Promise<Project[] | []>;
   findMaterailWithNameCategoryBrand(material_name:string,category_id:string,brand_id:string):Promise<MaterialList | null>;
   saveMaterial(material_name:string,category_id:string,brand_id:string,unit_id:string,unit_rate:number,stock:number):Promise<MaterialList>;
   findMaterialInEdit(_id:string,material_name:string,brand_id:string,category_id:string):Promise<MaterialList | null>;
   updateMaterialById(_id:string,material_name:string,category_id:string,brand_id:string,unit_id:string,unit_rate:number,stock:number):Promise<void>;
   deleteMaterialById(_id:string):Promise<void>;
}
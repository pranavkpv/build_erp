import BrandModel from "../../models/BrandModel";
import { addBrandData, deletUnitData, editBrandData } from "../../domain/types/admin";

export const getBrand = async()=>{
   const brandData = await BrandModel.find()
   return brandData
}

export const saveBrand = async(data:addBrandData)=>{
   const {brand_name} = data
   const existBrand = await BrandModel.findOne({brand_name})
   if(existBrand){
      return{
         success:false,
         message:"Brand already exist",
      }
   }else{
      const newBrand = new BrandModel({
         brand_name
      })
      await newBrand.save()
      const addedBrand = await BrandModel.findOne({brand_name})
      return{
         success:true,
         message:"Brand Registered successfuly",
         data:addedBrand
      }
   }
}

export const updateBrand=async(data:editBrandData)=>{
   const {editId,brand_name} = data
   const existBrand = await BrandModel.findOne({_id:{$ne:editId},brand_name})
   if(existBrand){
      return{
         success:false,
         message:"Brand already exist"
      }
   }else{
      await BrandModel.findByIdAndUpdate(editId,{brand_name})
       return{
         success:true,
         message:"Brand Updated successfuly"
      }
   }
}

export const deleteBrand = async(data:deletUnitData)=>{
   const {id} = data
   await BrandModel.findByIdAndDelete(id)
   return{
         success:true,
         message:"Brand deleted successfuly"
      }
}
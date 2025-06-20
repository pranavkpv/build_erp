import UnitModel from "../models/UnitModel"
import { addUnitData, deletUnitData, editUnitData } from "../types/admin"


export const unitList = async()=>{
   const existUnit = await UnitModel.find()
   return existUnit
}

export const saveUnit = async(data:addUnitData)=>{
   const {unit,shortname} = data
   const ExistData = await UnitModel.findOne({unit_name:unit})
   if(ExistData){
      return {
         success:false,
         message:"Unit already exist"
      }
   }else{
      const newUnit = new UnitModel({
         unit_name:unit,
         short_name:shortname
      })
      await newUnit.save()
      const addedUnit = await UnitModel.findOne({unit_name:unit})
       return {
         success:true,
         message:"Unit registerd successfully",
         addedUnit
      }
   }
}


export const updateUnit = async(data:editUnitData)=>{
   const {editId,unit,short_name} = data
   const existData = await UnitModel.findOne({_id:{$ne:editId},unit_name:unit})
   if(existData){
      return {
         success:false,
         message:"unit already exist"
      }
   }else{
      await UnitModel.findByIdAndUpdate(editId,{unit_name:unit,short_name})
      return {
         success:true,
         message:"unit updated successfully"
      }
   }

}

export const deleteUnit = async(data:deletUnitData)=>{
   const {id} = data
   await UnitModel.findByIdAndDelete(id)
   return {
      success:true,
      message:"unit deleted successfully"
   }
}
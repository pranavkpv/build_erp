import labourModel from "../models/labourModel"
import { addLabData, deleteLabourData, editlabourData } from "../types/admin"

export const labourDatalist = async () => {
   try {
      const result = await labourModel.find()
      return result
   } catch (error: any) {
      console.log(error)
      return {
         success: false,
         message: error.message
      }
   }
}


export const addLabourData = async (data: addLabData) => {
   try {
      const { labour, wage } = data
      const existLabour = await labourModel.findOne({ labour_type: labour })
      if (existLabour) {
         return {
            success: false,
            message: "labour already exist"
         }
      } else {
         const newLabour = new labourModel({
            labour_type: labour,
            daily_wage: wage
         })
         await newLabour.save()
         return {
            success: true,
            message: "labour type registered successfully"
         }
      }
   } catch (error: any) {
      console.log(error)
      return {
         success: false,
         message: error.message
      }
   }
}

export const deleteLabour = async (data: deleteLabourData) => {
   try {
      await labourModel.findByIdAndDelete(data._id)
      return {
         success: true,
         message: "labour type deleted successfully"
      }
   } catch (error: any) {
      console.log(error)
      return {
         success: false,
         message: error.message
      }
   }
}

export const editLabour = async (data: editlabourData) => {
   try {
      const { labourId, labourData, wageData } = data
      const existLabour = await labourModel.findOne({ _id: { $ne: labourId }, labour_type: labourData })
      if (existLabour) {
         return {
            success: false,
            message: "labour type already exist"
         }
      }else{
         await labourModel.findByIdAndUpdate(labourId,{
            labour_type:labourData,daily_wage:wageData
         })
         return {
            success:true,
            message:"labour type updated successfully"
         }
      }
   } catch (error: any) {
      console.log(error)
      return {
         success: false,
         message: error.message
      }
   }
}
import { Request,Response } from "express"
import { addLabourData, deleteLabour, editLabour, labourDatalist } from "../../../application/useCases/labour"
export const getLabour =async(req:Request,res:Response)=>{
   try {
      const result = await labourDatalist()
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const saveLabour =async(req:Request,res:Response)=>{
   try {
      const result = await addLabourData(req.body)
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const removeLabour =async(req:Request,res:Response)=>{
   try {
      const result = await deleteLabour(req.body)
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}


export const updateLabour =async(req:Request,res:Response)=>{
   try {
      const result = await editLabour(req.body)
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}
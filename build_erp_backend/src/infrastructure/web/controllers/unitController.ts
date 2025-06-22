import { Request,Response } from "express"
import { deleteUnit, saveUnit, unitList,updateUnit } from "../../../application/useCases/unit"


export const getUnit = async(req:Request,res:Response)=>{
   try {
      const result = await unitList()
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}


export const addUnit = async(req:Request,res:Response)=>{
   try {
      const result = await saveUnit(req.body)
      res.status(201).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}


export const editUnit = async(req:Request,res:Response)=>{
   try {
      const result = await updateUnit(req.body)
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}

export const removeUnit = async(req:Request,res:Response)=>{
   try {
      const result = await deleteUnit(req.body)
       res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}
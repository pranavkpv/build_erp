import { Request,Response } from "express"
import { saveCategory,listCategory,updateCategory,removeCategory } from "../services/category"

export const categoryList = async(req:Request,res:Response)=>{
   try {
      const result = await listCategory()
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}
export const addCategory =async(req:Request,res:Response)=>{
   try {
      const result = await saveCategory(req.body)
      res.status(201).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}

export const editCategory = async(req:Request,res:Response)=>{
   try {
      const result = await updateCategory(req.body)
      res.status(200).json(result)
   } catch (error:any) {
       console.log(error)
      res.status(400).json({message:error.message})
   }
}


export const deleteCategory = async(req:Request,res:Response) =>{
   try {
      const result = await removeCategory(req.body)
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}
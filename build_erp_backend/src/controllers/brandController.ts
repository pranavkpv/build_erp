import { Request, Response } from "express"
import { getBrand, deleteBrand, saveBrand, updateBrand } from "../services/brand"



export const brandList = async (req: Request, res: Response) => {
   try {
      const result = await getBrand()
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}
export const addBrand = async (req: Request, res: Response) => {
   try {
      const result = await saveBrand(req.body)
      res.status(201).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const editBrand = async (req: Request, res: Response) => {
   try {
      const result = await updateBrand(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const removeBrand = async (req: Request, res: Response) => {
   try {
      const result = await deleteBrand(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}
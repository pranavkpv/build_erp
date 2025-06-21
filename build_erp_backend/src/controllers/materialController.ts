import { Request, Response } from "express"
import { addMaterial, deleteMaterial, editMaterial, getAddMaterial, getEditMaterial, getMaterial } from "../services/material"

export const materialList = async (req: Request, res: Response) => {
   try {
      const result = await getMaterial()
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const addMaterialList = async (req: Request, res: Response) => {
   try {
      const result = await getAddMaterial()
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const saveMaterial = async (req: Request, res: Response) => {
   try {
      const result = await addMaterial(req.body)
      res.status(201).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}


export const editMaterialList = async (req: Request, res: Response) => {
   try {
      const result = await getEditMaterial(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}


export const updateMaterial = async (req: Request, res: Response) => {
   try {
      const result = await editMaterial(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const removeMaterial = async (req: Request, res: Response) => {
   try {
      const result = await deleteMaterial(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.error(error)
      res.status(400).json(error.message)
   }
}
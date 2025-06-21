import { Request, Response } from "express"
import { addProject, changeStatus, deletProject, editProject, getAddproject, projectList } from "../services/project"

export const projectData = async (req: Request, res: Response) => {
   try {
      const result = await projectList()
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const addProjectData = async (req: Request, res: Response) => {
   try {
      const result = await getAddproject()
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const saveProject = async (req: Request, res: Response) => {
   try {
      const result = await addProject(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const updateProject = async (req: Request, res: Response) => {
   try {
      const result = await editProject(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const removeProject = async (req: Request, res: Response) => {
   try {
      const result = await deletProject(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}

export const projectStatus = async (req: Request, res: Response) => {
   try {
      const result = await changeStatus(req.body)
      res.status(200).json(result)
   } catch (error: any) {
      console.log(error)
      res.status(400).json(error.message)
   }
}
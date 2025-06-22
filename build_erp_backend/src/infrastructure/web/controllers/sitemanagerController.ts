import { Request,Response } from "express"
import { listSitemanager,saveSitemanager,updateSitemanager,removeSitemanager } from "../../../application/useCases/sitemanager"


export const getSitemanager = async(req:Request,res:Response)=>{
   try {
      const result = await listSitemanager()
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}


export const addSitemanager = async(req:Request,res:Response)=>{
   try {
      const result = await saveSitemanager(req.body)
      res.status(201).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}


export const editSitemanaget = async(req:Request,res:Response)=>{
   try {
      const result = await updateSitemanager(req.body)
      res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}

export const deleteSitemanager = async(req:Request,res:Response)=>{
   try {
      const result = await removeSitemanager(req.body)
       res.status(200).json(result)
   } catch (error:any) {
      console.log(error)
      res.status(400).json({message:error.message})
   }
}
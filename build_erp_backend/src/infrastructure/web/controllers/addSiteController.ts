import { NextFunction, Request, Response } from "express";
import { AddSiteToProjectUseCase } from "../../../useCases/AddSiteToProjectUseCase";
import { ListSiteToProject } from "../../../useCases/ListSiteToProjectUseCase";
import { DeleteSiteToProjectUseCase } from "../../../useCases/DeleteSitemanagerInProjectUseCase";

export class AddSiteController {
   private addSiteToProjectUseCase: AddSiteToProjectUseCase
   private listSiteToProjectUseCase : ListSiteToProject
   private deleteSitetoprojectuseCase : DeleteSiteToProjectUseCase
   constructor(addSiteToProjectUseCase: AddSiteToProjectUseCase,listSiteToProjectUseCase : ListSiteToProject,deleteSitetoprojectuseCase : DeleteSiteToProjectUseCase) {
      this.addSiteToProjectUseCase = addSiteToProjectUseCase
      this.listSiteToProjectUseCase = listSiteToProjectUseCase
      this.deleteSitetoprojectuseCase = deleteSitetoprojectuseCase
   }
   saveData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addSiteToProjectUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   listSite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.listSiteToProjectUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
     deleteSite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteSitetoprojectuseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }

}

import { NextFunction, Request, Response } from "express"
import { DisplayAllSitemanagerUseCase } from "../../../useCases/sitemanager"
import { SaveSitemanagerUseCase } from "../../../useCases/SaveSitemanagerUseCase"
import { UpdateSitemanagerUseCase } from "../../../useCases/UpdateSitemanagerUseCase"
import { DeleteSitemanagerUseCase } from "../../../useCases/DeleteSitemanagerUseCase"


export class SitemanagerController {
   private displayAllSitemanagerUseCase: DisplayAllSitemanagerUseCase
   private addSitemanagerUseCase: SaveSitemanagerUseCase
   private editSitemanagerUsecase: UpdateSitemanagerUseCase
   private deleteSitemanagerUseCase: DeleteSitemanagerUseCase
   constructor(
      displayAllSitemanagerUseCase: DisplayAllSitemanagerUseCase,
      addSitemanagerUseCase: SaveSitemanagerUseCase,
      editSitemanagerUsecase: UpdateSitemanagerUseCase,
      deleteSitemanagerUseCase: DeleteSitemanagerUseCase
   ) {
      this.displayAllSitemanagerUseCase = displayAllSitemanagerUseCase
      this.addSitemanagerUseCase = addSitemanagerUseCase
      this.editSitemanagerUsecase = editSitemanagerUsecase
      this.deleteSitemanagerUseCase = deleteSitemanagerUseCase
   }
   getSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.displayAllSitemanagerUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addSitemanagerUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   editSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.editSitemanagerUsecase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   deleteSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteSitemanagerUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}




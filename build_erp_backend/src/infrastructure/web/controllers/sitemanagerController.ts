import { NextFunction, Request, Response } from "express"
import { DisplayAllSitemanagerUseCase } from "../../../useCases/sitemanager"
import { SaveSitemanagerUseCase } from "../../../useCases/SaveSitemanagerUseCase"
import { UpdateSitemanagerUseCase } from "../../../useCases/UpdateSitemanagerUseCase"
import { DeleteSitemanagerUseCase } from "../../../useCases/DeleteSitemanagerUseCase"
import { SitemanagerLoginUseCase } from "../../../useCases/SitemanagerLoginUseCase"


export class SitemanagerController {
   private displayAllSitemanagerUseCase: DisplayAllSitemanagerUseCase
   private addSitemanagerUseCase: SaveSitemanagerUseCase
   private editSitemanagerUsecase: UpdateSitemanagerUseCase
   private deleteSitemanagerUseCase: DeleteSitemanagerUseCase
   private sitemanagerLoginUseCase: SitemanagerLoginUseCase
   constructor(
      displayAllSitemanagerUseCase: DisplayAllSitemanagerUseCase,
      addSitemanagerUseCase: SaveSitemanagerUseCase,
      editSitemanagerUsecase: UpdateSitemanagerUseCase,
      deleteSitemanagerUseCase: DeleteSitemanagerUseCase,
      sitemanagerLoginUseCase: SitemanagerLoginUseCase
   ) {
      this.displayAllSitemanagerUseCase = displayAllSitemanagerUseCase
      this.addSitemanagerUseCase = addSitemanagerUseCase
      this.editSitemanagerUsecase = editSitemanagerUsecase
      this.deleteSitemanagerUseCase = deleteSitemanagerUseCase
      this.sitemanagerLoginUseCase = sitemanagerLoginUseCase
   }
   getSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { page, search } = req.query
         const result = await this.displayAllSitemanagerUseCase.execute(Number(page), String(search))
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
   loginSitemanager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const { email, password } = req.body
         const result = await this.sitemanagerLoginUseCase.execute(email, password)
         if (result.success && result.token?.refreshToken) {
            res.cookie('refreshToken', result.token.refreshToken, {
               httpOnly: false,
               secure: false,
               sameSite: 'lax',
               maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json(result)
         } else {
            res.status(200).json(result)
         }
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}




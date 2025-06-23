import { NextFunction, Request, Response } from "express"
import { DisplayAllLabourUseCase } from "../../../useCases/DisplayAllLabourUseCase"
import { AddLabourUseCase } from "../../../useCases/AddLabourUseCase"
import { UpdateLabourUseCase } from "../../../useCases/UpdateLabourUseCase"
import { DeleteLabourUseCase } from "../../../useCases/DeleteLabourUseCase"


export class LabourController {
   private displayAllLabourUseCase: DisplayAllLabourUseCase
   private addLabourUseCase: AddLabourUseCase
   private updateLabourUseCase: UpdateLabourUseCase
   private deleteLabourUseCase: DeleteLabourUseCase
   constructor(displayAllLabourUseCase: DisplayAllLabourUseCase, addLabourUseCase: AddLabourUseCase, updateLabourUseCase: UpdateLabourUseCase, deleteLabourUseCase: DeleteLabourUseCase) {
      this.addLabourUseCase = addLabourUseCase
      this.deleteLabourUseCase = deleteLabourUseCase
      this.displayAllLabourUseCase = displayAllLabourUseCase
      this.updateLabourUseCase = updateLabourUseCase
   }
   getLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.displayAllLabourUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   saveLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addLabourUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   removeLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteLabourUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   updateLabour = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.updateLabourUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }



}



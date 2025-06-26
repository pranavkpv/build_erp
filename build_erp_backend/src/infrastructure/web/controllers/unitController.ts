import { NextFunction, Request, Response } from "express"
import {  DisplayAllUnitUseCase } from "../../../useCases/DisplayAllUnitUseCase"
import { SaveUnitUseCase } from "../../../useCases/SaveUnitUseCase"
import { updateUnitUseCase } from "../../../useCases/updateUnitUseCase"
import { deleteUnitUseCase } from "../../../useCases/DeleteUnitUseCase"



export class UnitController {
   private displayUnitUseCase: DisplayAllUnitUseCase
   private addUnitUseCase: SaveUnitUseCase
   private editUnitUseCase: updateUnitUseCase
   private deleteUnitUseCase: deleteUnitUseCase
   constructor(
      displayUnitUseCase: DisplayAllUnitUseCase,
      addUnitUseCase: SaveUnitUseCase,
      editUnitUseCase: updateUnitUseCase,
      deleteUnitUseCase: deleteUnitUseCase
   ) {
      this.displayUnitUseCase = displayUnitUseCase
      this.addUnitUseCase = addUnitUseCase
      this.editUnitUseCase = editUnitUseCase
      this.deleteUnitUseCase = deleteUnitUseCase
   }
   getUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
          const {page,search} = req.query
         const result = await this.displayUnitUseCase.execute(Number(page),String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addUnitUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   editUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.editUnitUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   removeUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteUnitUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
}


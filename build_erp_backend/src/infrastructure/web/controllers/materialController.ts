import { NextFunction, Request, Response } from "express"
import { DisplayAllMaterialUseCase } from "../../../useCases/DisplayAllMaterialUseCase"
import { AddMaterialUseCase } from "../../../useCases/AddMaterialUseCase"
import { DisplayAddMaterialDataUseCase } from "../../../useCases/DisplayAddMaterialUseCase"
import { GetEditMaterialUseCase } from "../../../useCases/GetEditMaterialUseCase"
import { UpdateMaterialUseCase } from "../../../useCases/UpdateMaterialUseCase"
import { DeleteMaterialUseCase } from "../../../useCases/DeleteMaterialUseCase"


export class MaterialController {
   private displayAllMaterialUseCase: DisplayAllMaterialUseCase
   private getAddMaterialUseCase: DisplayAddMaterialDataUseCase
   private saveMaterialUseCase: AddMaterialUseCase
   private getEditMaterialUseCase: GetEditMaterialUseCase
   private updateMaterialUseCase: UpdateMaterialUseCase
   private deleteMaterialUseCase: DeleteMaterialUseCase
   constructor(
      displayAllMaterialUseCase: DisplayAllMaterialUseCase,
      getAddMaterialUseCase: DisplayAddMaterialDataUseCase,
      saveMaterialUseCase: AddMaterialUseCase,
      getEditMaterialUseCase: GetEditMaterialUseCase,
      updateMaterialUseCase: UpdateMaterialUseCase,
      deleteMaterialUseCase: DeleteMaterialUseCase
   ) {
      this.displayAllMaterialUseCase = displayAllMaterialUseCase
      this.getAddMaterialUseCase = getAddMaterialUseCase
      this.saveMaterialUseCase = saveMaterialUseCase
      this.getEditMaterialUseCase = getEditMaterialUseCase
      this.updateMaterialUseCase = updateMaterialUseCase
      this.deleteMaterialUseCase = deleteMaterialUseCase
   }

   materialList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const {page,search} = req.query
         const result = await this.displayAllMaterialUseCase.execute(Number(page),String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addMaterialList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.getAddMaterialUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   saveMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.saveMaterialUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   editMaterialList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.getEditMaterialUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   updateMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.updateMaterialUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   removeMaterial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteMaterialUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }

}







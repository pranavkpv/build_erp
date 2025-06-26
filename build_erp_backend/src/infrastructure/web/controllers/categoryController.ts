import { NextFunction, Request, Response } from "express"
import { DisplayAllCategoryUseCase } from "../../../useCases/DisplayAllCategoryUseCase"
import { SaveCategoryUseCase } from "../../../useCases/SaveCategoryUseCase"
import { UpdateCategoryUseCase } from "../../../useCases/UpdateCategoryUseCase"
import { DeleteCategoryUseCase } from "../../../useCases/DeleteCategoryUseCase"


export class CategoryController {
   private displayAllCategoryUseCase: DisplayAllCategoryUseCase
   private addCategoryUseCase: SaveCategoryUseCase
   private editcategoryUseCase: UpdateCategoryUseCase
   private deleteCategoryUseCase: DeleteCategoryUseCase
   constructor(displayAllCategoryUseCase: DisplayAllCategoryUseCase, addCategoryUseCase: SaveCategoryUseCase, editcategoryUseCase: UpdateCategoryUseCase, deleteCategoryUseCase: DeleteCategoryUseCase) {
      this.displayAllCategoryUseCase = displayAllCategoryUseCase
      this.addCategoryUseCase = addCategoryUseCase
      this.editcategoryUseCase = editcategoryUseCase
      this.deleteCategoryUseCase = deleteCategoryUseCase
   }
   categoryList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
          const {page,search} = req.query
         const result = await this.displayAllCategoryUseCase.execute(Number(page),String(search))
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addCategoryUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   editCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.editcategoryUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.deleteCategoryUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }

}







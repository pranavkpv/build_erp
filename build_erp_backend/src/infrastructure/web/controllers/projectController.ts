import { NextFunction, Request, Response } from "express"
import { DisplayAllProjectUseCase } from "../../../useCases/DisplayAllProjectUseCase"
import { DisplayAddProjectUseCase } from "../../../useCases/DisplayAddProjectUseCase"
import { AddProjectUseCase } from "../../../useCases/AddProjectUseCase"
import { EditProjectUseCase } from "../../../useCases/EditProjectUseCase"
import { DeleteProjectUseCase } from "../../../useCases/DeleteProjectUseCase"
import { ChangeStatusUseCase } from "../../../useCases/ChangeStatusUseCase"



export class ProjectController {
   private displayProjectUseCase: DisplayAllProjectUseCase
   private displayAddProjectUseCase: DisplayAddProjectUseCase
   private addProjectUseCase: AddProjectUseCase
   private editProjectUseCase: EditProjectUseCase
   private removeProjectUseCase: DeleteProjectUseCase
   private changeStatusUseCase: ChangeStatusUseCase
   constructor(
      displayProjectUseCase: DisplayAllProjectUseCase,
      displayAddProjectUseCase: DisplayAddProjectUseCase,
      addProjectUseCase: AddProjectUseCase,
      editProjectUseCase: EditProjectUseCase,
      removeProjectUseCase: DeleteProjectUseCase,
      changeStatusUseCase: ChangeStatusUseCase
   ) {
      this.displayProjectUseCase = displayProjectUseCase
      this.displayAddProjectUseCase = displayAddProjectUseCase
      this.addProjectUseCase = addProjectUseCase
      this.editProjectUseCase = editProjectUseCase
      this.removeProjectUseCase = removeProjectUseCase
      this.changeStatusUseCase = changeStatusUseCase
   }
   projectData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.displayProjectUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   addProjectdata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.displayAddProjectUseCase.execute()
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   saveProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.addProjectUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.editProjectUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   removeProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.removeProjectUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }
   projectStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
         const result = await this.changeStatusUseCase.execute(req.body)
         res.status(200).json(result)
      } catch (error) {
         console.log(error)
         next(error)
      }
   }



}



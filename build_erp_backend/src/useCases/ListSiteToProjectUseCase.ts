import { IprojectRepository } from "../domain/repositories/IProjectRepository"
import { projectWithSitemanager } from "../domain/types/addSite"

export class ListSiteToProject {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(): Promise<projectWithSitemanager[] | []> {
      const results = await this.projectRepository.findProjectWithSitemanager()
      return results ? results : []
   }
}
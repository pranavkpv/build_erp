import { IprojectRepository } from "../domain/repositories/IProjectRepository"
import { getProjectListData } from "../domain/types/project"


export class DisplayAllProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(): Promise<getProjectListData[] | []> {
      const projectData = await this.projectRepository.findAllProjectWithUser()
      return projectData ? projectData : []
   }
}

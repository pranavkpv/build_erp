import { ISitemanagerRepository } from "../domain/repositories/ISitemanagerRepository"
import { editSitemanagerInput, OutPutSitemanager } from "../domain/types/sitemanager"
import { hashedPassword } from "../infrastructure/utils/hash"

export class UpdateSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(input: editSitemanagerInput): Promise<OutPutSitemanager> {
      const { _id, username, email, password } = input
      const existData = await this.SitemanagerRepository.findSitemanagerInEdit(_id, email)
      if (existData) {
         return { success: false, message: "sitemanager already exist" }
      }
      const hashpassword = await hashedPassword(password)
      await this.SitemanagerRepository.updateSitemanager(_id, username, email, hashpassword)
      return { success: true, message: "Sitemanager updated successfully" }
   }
}


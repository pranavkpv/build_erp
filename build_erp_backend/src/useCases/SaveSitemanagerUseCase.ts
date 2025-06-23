import { ISitemanagerRepository } from "../domain/repositories/ISitemanagerRepository"
import { addsitemanagerInput, OutPutSitemanager } from "../domain/types/sitemanager"
import { hashedPassword } from "../infrastructure/utils/hash"

export class SaveSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(input: addsitemanagerInput): Promise<OutPutSitemanager> {
      const { username, email, password } = input
      const existSitemanager = await this.SitemanagerRepository.findSitemanagerByEmail(email)
      if (existSitemanager) {
         return { success: false, message: "Sitemanager already exist" }
      }
      const hashpassword = await hashedPassword(password)
      await this.SitemanagerRepository.saveSitemanager(username, email, hashpassword)
      return { success: true, message: "Sitemanager registered successfully" }
   }
}

import { ISitemanagerRepository } from "../domain/repositories/ISitemanagerRepository"
import { Sitemanager } from "../domain/types/sitemanager"


export class DisplayAllSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(): Promise<Sitemanager[] | []> {
      const sitemanagerData = await this.SitemanagerRepository.findAllSitemanager()
      return sitemanagerData ? sitemanagerData : []
   }
}


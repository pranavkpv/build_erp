import { ISitemanagerRepository } from "../../domain/repositories/ISitemanagerRepository";
import { Sitemanager } from "../../domain/types/sitemanager";
import SitemanagerModel from "../../models/SitemanagerModel";


export class SitemanagetmongooseRepository implements ISitemanagerRepository {
   async findAllSitemanager(): Promise<Sitemanager[] | []> {
      const list = await SitemanagerModel.find()
      return list ? list : []
   }
   async findSitemanagerByEmail(email: string): Promise<Sitemanager | null> {
      const ExistSitemanager = await SitemanagerModel.findOne({ email: email })
      return ExistSitemanager ? ExistSitemanager : null
   }
   async saveSitemanager(username: string, email: string, password: string): Promise<void> {
      const newSitemanager = new SitemanagerModel({
         username,
         email,
         password
      })
      await newSitemanager.save()
   }
   async findSitemanagerInEdit(_id: string, email: string): Promise<Sitemanager | null> {
      const existData = await SitemanagerModel.findOne({ _id: { $ne: _id }, email: email })
      return existData ? existData : null
   }
   async updateSitemanager(_id: string, username: string, email: string, password: string): Promise<void> {
      await SitemanagerModel.findByIdAndUpdate(_id, {
         username,
         email,
         password
      })
   }
   async deleteSitemanager(_id: string): Promise<void> {
      await SitemanagerModel.findByIdAndDelete(_id)
   }
}
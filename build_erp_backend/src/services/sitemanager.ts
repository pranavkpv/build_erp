import SitemanagerModel from "../models/SitemanagerModel";
import { deleteSitemanagerData, Sitemanagerdata, updateSitemanagerData } from "../types/sitemanager";
import { hashedPassword } from "../utils/hash";





export const listSitemanager = async () => {
   const list = await SitemanagerModel.find()
   return list
}

export const saveSitemanager = async (data: Sitemanagerdata) => {
   const { sitemanager, email, password } = data
   const ExistCategory = await SitemanagerModel.findOne({ email: email })
   if (ExistCategory) {
      return { success: false, message: "Sitemanager already exist" }
   } else {
      const hashpassword = await hashedPassword(password)
      const newSitemanager = new SitemanagerModel({
         username: sitemanager,
         email: email,
         password: hashpassword
      })
      await newSitemanager.save()

      return { success: true, message: "Sitemanager registered successfully" }
   }
}

export const updateSitemanager = async (data: updateSitemanagerData) => {
   const { editId, sitemanager, email, password } = data
   const existData = await SitemanagerModel.findOne({ _id: { $ne: editId }, email: email })
   if (existData) {
      return { success: false, message: "sitemanager already exist" }
   }
   const hashpassword = await hashedPassword(password)
   await SitemanagerModel.findByIdAndUpdate(editId, {
      username: sitemanager,
      email: email,
      password: hashpassword
   })
   return { success: true, message: "Sitemanager updated successfully" }
}


export const removeSitemanager = async (data: deleteSitemanagerData) => {
   const { _id } = data
   await SitemanagerModel.findByIdAndDelete(_id)
   return { success: true, message: "Sitemanager deleted successfully" }
}
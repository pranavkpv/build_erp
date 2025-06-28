import { Router } from "express";
import { SitemanagerController } from "../controllers/sitemanagerController";
import { changePasswordController } from "../controllers/changePasswordController";

const createSitemanagerRoute = (sitemanagerController:SitemanagerController,
   changepasswordcontroller:changePasswordController):Router=>{
   const router = Router()
    router.post("/login",sitemanagerController.loginSitemanager)
    router.post("/changepass",changepasswordcontroller.changedPassword)
   return router
}

export default createSitemanagerRoute;

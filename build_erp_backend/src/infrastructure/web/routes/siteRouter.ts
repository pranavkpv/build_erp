import { Router } from "express";
import { SitemanagerController } from "../controllers/sitemanagerController";

const createSitemanagerRoute = (sitemanagerController:SitemanagerController):Router=>{
   const router = Router()
    router.post("/login",sitemanagerController.loginSitemanager)
   return router
}

export default createSitemanagerRoute;

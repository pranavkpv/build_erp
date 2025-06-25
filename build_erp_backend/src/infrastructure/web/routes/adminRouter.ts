
import { Router } from "express";
import { adminController } from "../controllers/adminController";
import { brandController } from "../controllers/brandController";
import { CategoryController } from "../controllers/categoryController";
import { LabourController } from "../controllers/labourController";
import { MaterialController } from "../controllers/materialController";
import { ProjectController } from "../controllers/projectController";
import {  SitemanagerController } from "../controllers/sitemanagerController";
import { UnitController } from "../controllers/unitController";
import { AddSiteController } from "../controllers/addSiteController";



const createAdminRoute = (adminController: adminController,
   categoryController: CategoryController, unitController: UnitController,
   brandController: brandController, materialController: MaterialController,
   projectController: ProjectController, labourController: LabourController,
   sitemanagerController : SitemanagerController,addSiteController:AddSiteController

): Router => {
   const router = Router()
   router.post('/login', adminController.login)

   router.get('/category', categoryController.categoryList)
   router.post('/category', categoryController.addCategory)
   router.put('/category', categoryController.editCategory)
   router.delete('/category', categoryController.deleteCategory)

   router.get('/unit', unitController.getUnit)
   router.post('/unit', unitController.addUnit)
   router.put('/unit', unitController.editUnit)
   router.delete('/unit', unitController.removeUnit)

   router.get('/brand', brandController.brandList)
   router.post('/brand', brandController.addBrand)
   router.put('/brand', brandController.editBrand)
   router.delete('/brand', brandController.removeBrand)

   router.get('/material', materialController.materialList)
   router.get("/addmaterial", materialController.addMaterialList)
   router.post("/material", materialController.saveMaterial)
   router.get("/editmaterial", materialController.editMaterialList)
   router.put("/material", materialController.editMaterialList)
   router.delete("/material", materialController.removeMaterial)

   router.get("/project", projectController.projectData)
   router.get("/addproject", projectController.addProjectdata)
   router.post("/project", projectController.saveProject)
   router.put("/project", projectController.updateProject)
   router.delete("/project", projectController.removeProject)
   router.put("/status", projectController.projectStatus)

   router.get("/labour", labourController.getLabour)
   router.post("/labour", labourController.saveLabour)
   router.delete("/labour", labourController.removeLabour)
   router.put("/labour", labourController.updateLabour)

   router.get("/sitemanager",sitemanagerController.getSitemanager)
   router.post("/sitemanager",sitemanagerController.addSitemanager)
   router.put("/sitemanager",sitemanagerController.editSitemanager)
   router.delete("/sitemanager",sitemanagerController.deleteSitemanager)

   router.get("/addToSite",addSiteController.listSite)
   router.post("/addToSite",addSiteController.saveData)
   router.delete("/addToSite",addSiteController.deleteSite)

   return router
}


export default createAdminRoute

import { Router } from "express";
import { adminLogin } from "../controllers/adminController";
import { addCategory,categoryList,editCategory,deleteCategory } from "../controllers/categoryController";
import { addUnit,getUnit,editUnit, removeUnit } from "../controllers/unitController";
import { addBrand, brandList, editBrand, removeBrand } from "../controllers/brandController";
import { addMaterialList, editMaterialList, materialList, removeMaterial, saveMaterial, updateMaterial } from "../controllers/materialController";
import { addProjectData, projectData, projectStatus, removeProject, saveProject, updateProject } from "../controllers/projectController";
import { getLabour, removeLabour, saveLabour, updateLabour } from "../controllers/labourController";

const router = Router()
//login
router.post('/login',adminLogin)
//get category data
router.get('/category',categoryList)
//add category
router.post('/category',addCategory)
//edit category
router.put('/category',editCategory)
//delete category
router.delete('/category',deleteCategory)


//get unit data
router.get('/unit',getUnit)
//add unit
router.post('/unit',addUnit)
//edit unit
router.put('/unit',editUnit)
//delete unit
router.delete('/unit',removeUnit)


//brand list
router.get('/brand',brandList)
//add brand
router.post('/brand',addBrand)
//edit brand
router.put('/brand',editBrand)
//delete brand
router.delete('/brand',removeBrand)



//material list
router.get('/material',materialList)
//add material List
router.get("/addmaterial",addMaterialList)
//add material 
router.post("/material",saveMaterial)
//edit material List
router.get("/editmaterial",editMaterialList)
//edit material
router.put("/material",updateMaterial)
//delete material
router.delete("/material",removeMaterial)


//list project data
router.get("/project",projectData)
//add project Data list
router.get("/addproject",addProjectData)
//add project
router.post("/project",saveProject)
//edit project
router.put("/project",updateProject)
//delete project
router.delete("/project",removeProject)
//project status change
router.put("/status",projectStatus)


//list labour
router.get("/labour",getLabour)
//add labour
router.post("/labour",saveLabour)
//delete labour
router.delete("/labour",removeLabour)
//edit labour
router.put("/labour",updateLabour)



export default router

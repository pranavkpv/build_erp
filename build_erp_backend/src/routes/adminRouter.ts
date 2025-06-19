import { Router } from "express";
import { adminLogin } from "../controllers/adminController";
import { addCategory,categoryList,editCategory,deleteCategory } from "../controllers/categoryController";
import { addUnit,getUnit,editUnit, removeUnit } from "../controllers/unitController";

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


export default router

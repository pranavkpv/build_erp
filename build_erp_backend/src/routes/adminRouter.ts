import { Router } from "express";
import { adminLogin } from "../controllers/adminController";
import { addCategory,categoryList,editCategory,deleteCategory } from "../controllers/categoryController";

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


export default router

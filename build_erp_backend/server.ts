import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';



//mongoose repository
import { AdminmongooseRepository } from './src/infrastructure/persistence/AdminmongooseRepository';
import { BrandmongooseRepository } from './src/infrastructure/persistence/BrandmongooseRepository';
import { CategorymongooseRepository } from './src/infrastructure/persistence/CategorymongooseRepository';
import { LabourmongooseRepository } from './src/infrastructure/persistence/LabourmongooseRepository';
import { MaterialmongooseRepository } from './src/infrastructure/persistence/MaterialMongooseRepository';
import { ProjectmongooseRepository } from './src/infrastructure/persistence/ProjectmongooseRepository';
import { ProjectStockmongooseRepository } from './src/infrastructure/persistence/ProjectStockmongooseRepository';
import { SitemanagetmongooseRepository } from './src/infrastructure/persistence/SitemanagermongooseRepository';
import { UnitMongooseRepository } from './src/infrastructure/persistence/UnitmongooseRepository';
import { UsermongooseRepository } from './src/infrastructure/persistence/UsermongooseRepository';

// import Usecase
import { AddLabourUseCase } from './src/useCases/AddLabourUseCase';
import { AddMaterialUseCase } from './src/useCases/AddMaterialUseCase';
import { AddProjectUseCase } from './src/useCases/AddProjectUseCase';
import { AdminLoginUseCase } from './src/useCases/AdminLoginUseCase';
import { ChangeStatusUseCase } from './src/useCases/ChangeStatusUseCase';
import { DeleteBrandUseCase } from './src/useCases/DeleteBrandUseCase';
import { DeleteCategoryUseCase } from './src/useCases/DeleteCategoryUseCase';
import { DeleteLabourUseCase } from './src/useCases/DeleteLabourUseCase';
import { DeleteMaterialUseCase } from './src/useCases/DeleteMaterialUseCase';
import { DeleteProjectUseCase } from './src/useCases/DeleteProjectUseCase';
import { DeleteSitemanagerUseCase } from './src/useCases/DeleteSitemanagerUseCase';

import { DisplayAddMaterialDataUseCase } from './src/useCases/DisplayAddMaterialUseCase';
import { DisplayAddProjectUseCase } from './src/useCases/DisplayAddProjectUseCase';
import { DisplayAllBrandUseCase } from './src/useCases/DisplayAllBrandUseCase';
import { DisplayAllCategoryUseCase } from './src/useCases/DisplayAllCategoryUseCase';
import { DisplayAllMaterialUseCase } from './src/useCases/DisplayAllMaterialUseCase';
import { DisplayAllProjectUseCase } from './src/useCases/DisplayAllProjectUseCase';
import { DisplayAllUnitUseCase } from './src/useCases/DisplayAllUnitUseCase';
import { DisplayAllLabourUseCase } from './src/useCases/DisplayAllLabourUseCase';
import { DisplayAllSitemanagerUseCase } from './src/useCases/sitemanager';
import { EditProjectUseCase } from './src/useCases/EditProjectUseCase';
import { GetEditMaterialUseCase } from './src/useCases/GetEditMaterialUseCase';
import { ResendOTPUseCase } from './src/useCases/ResendOTPUseCase';
import { SaveBrandUseCase } from './src/useCases/SaveBrandUseCase';
import { SaveCategoryUseCase } from './src/useCases/SaveCategoryUseCase';
import { SaveSitemanagerUseCase } from './src/useCases/SaveSitemanagerUseCase';
import { SaveUnitUseCase } from './src/useCases/SaveUnitUseCase';
import { SignupUserUseCase } from './src/useCases/SignupUserUseCase';
import { UpdateBrandUseCase } from './src/useCases/UpdateBrandUseCase';
import { UpdateCategoryUseCase } from './src/useCases/UpdateCategoryUseCase';
import { UpdateLabourUseCase } from './src/useCases/UpdateLabourUseCase';
import { UpdateMaterialUseCase } from './src/useCases/UpdateMaterialUseCase';
import { UpdateSitemanagerUseCase } from './src/useCases/UpdateSitemanagerUseCase';
import { updateUnitUseCase } from './src/useCases/updateUnitUseCase';
import { UserLoginUseCase } from './src/useCases/UserLoginUseCase';
import { VerifyOTPUseCases } from './src/useCases/VerifyOTPuseCases';


//import controller 
import {  adminController } from './src/infrastructure/web/controllers/adminController';
import { AuthController } from './src/infrastructure/web/controllers/AuthController';
import { brandController } from './src/infrastructure/web/controllers/brandController';
import { CategoryController } from './src/infrastructure/web/controllers/categoryController';
import { LabourController } from './src/infrastructure/web/controllers/labourController';
import { MaterialController } from './src/infrastructure/web/controllers/materialController';
import { ProjectController } from './src/infrastructure/web/controllers/projectController';
import { SitemanagerController } from './src/infrastructure/web/controllers/sitemanagerController';
import { UnitController } from './src/infrastructure/web/controllers/unitController';


//import route
import createAdminRoute from './src/infrastructure/web/routes/adminRouter';
import createAuthRoute from './src/infrastructure/web/routes/userRouter';




import { connectDB } from './src/config/db';
import { BcryptHasher } from './src/infrastructure/secuirity/BcryptHasher';
import { deleteUnitUseCase } from './src/useCases/DeleteUnitUseCase';
import { AddSiteController } from './src/infrastructure/web/controllers/addSiteController';
import { AddSiteToProjectUseCase } from './src/useCases/AddSiteToProjectUseCase';
import { ListSiteToProject } from './src/useCases/ListSiteToProjectUseCase';
import { DeleteSiteToProjectUseCase } from './src/useCases/DeleteSitemanagerInProjectUseCase';
import { RefreshTokenUseCase } from './src/useCases/RefreshTokenUseCase';
import { JwtServiceImpl } from './src/services/JwtService';
import { AdminJwtServiceImpl } from './src/services/adminJwtService';
import { AddSiteToProjectmongooseRepository } from './src/infrastructure/persistence/AddSiteToProjectmongooseRepository';
import { AddSiteToprojectFetchProjectUseCase } from './src/useCases/AddSiteToprojectFetchProjectUseCase';
import { AddSiteToprojectFetchSitemanagerUseCase } from './src/useCases/AddSiteToprojectFetchSitemanagerUseCase';
import { SitemanagerLoginUseCase } from './src/useCases/SitemanagerLoginUseCase';
import createSitemanagerRoute from './src/infrastructure/web/routes/siteRouter';


require("dotenv").config();


const PORT = process.env.PORT || 3000
const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true              
}));

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());

async function compositeRoot() {
   try {
      await connectDB();
      const UserRepository = new UsermongooseRepository()
      const hasher = new BcryptHasher()
      const JwtService = new JwtServiceImpl()
      const AdminJwtService = new AdminJwtServiceImpl()
      const signupUserUseCase = new SignupUserUseCase(UserRepository)
      const verifyOTPUseCase = new VerifyOTPUseCases(UserRepository,hasher)
      const resendOTPUseCase = new ResendOTPUseCase(UserRepository)
      const refreshTokenUseCase = new RefreshTokenUseCase(UserRepository,JwtService)
      const userLoginUseCase = new UserLoginUseCase(UserRepository,hasher,JwtService)
      const authController = new AuthController(
         signupUserUseCase,
         verifyOTPUseCase,
         resendOTPUseCase,
         userLoginUseCase,
         refreshTokenUseCase
      )
      app.use("/",createAuthRoute(authController))
      //
     const adminRepository = new AdminmongooseRepository()
     const categoryRepository = new CategorymongooseRepository()
     const unitRepository = new UnitMongooseRepository()
     const brandRepository = new BrandmongooseRepository()
     const materialRepository = new MaterialmongooseRepository()
     const projectStockRepository = new ProjectStockmongooseRepository()
     const projectRepository = new ProjectmongooseRepository()
     const labourRepository = new LabourmongooseRepository()
     const sitemanagerRepository = new SitemanagetmongooseRepository()
     const addSiteToprojectRepoSitory  = new AddSiteToProjectmongooseRepository()

      const adminLoginUsecase = new AdminLoginUseCase(adminRepository,AdminJwtService)
      const displayAllCategoryUseCase = new DisplayAllCategoryUseCase(categoryRepository)
      const addCategoryUseCase = new SaveCategoryUseCase(categoryRepository)
      const editcategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
      const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository,materialRepository)
      const displayUnitUseCase = new DisplayAllUnitUseCase(unitRepository)
      const addUnitUseCase = new SaveUnitUseCase(unitRepository)
      const editUnitUseCase = new updateUnitUseCase(unitRepository)
      const newdeleteUnitUseCase = new deleteUnitUseCase(unitRepository,materialRepository)
      const displayBrandUseCase = new DisplayAllBrandUseCase(brandRepository)
      const addBrandUseCase = new SaveBrandUseCase(brandRepository)
      const editBrandUseCase = new UpdateBrandUseCase(brandRepository)
      const deleteBrandUseCase = new DeleteBrandUseCase(brandRepository,materialRepository)
      const displayAllMaterialUseCase = new DisplayAllMaterialUseCase(materialRepository)
      const getAddMaterialUseCase = new DisplayAddMaterialDataUseCase(materialRepository,categoryRepository,brandRepository,unitRepository)
      const saveMaterialUseCase = new AddMaterialUseCase(materialRepository, projectStockRepository)
      const getEditMaterialUseCase = new GetEditMaterialUseCase(materialRepository, categoryRepository, brandRepository, unitRepository, projectStockRepository)
      const updateMaterialUseCase = new UpdateMaterialUseCase(materialRepository, categoryRepository, brandRepository, unitRepository, projectStockRepository)
      const deleteMaterialUseCase = new DeleteMaterialUseCase(materialRepository, projectStockRepository)
      const displayProjectUseCase = new DisplayAllProjectUseCase(projectRepository)
      const displayAddProjectUseCase = new DisplayAddProjectUseCase(UserRepository)
      const addProjectUseCase = new AddProjectUseCase(projectRepository)
      const editProjectUseCase = new EditProjectUseCase(projectRepository)
      const removeProjectUseCase = new DeleteProjectUseCase(projectRepository)
      const changeStatusUseCase = new ChangeStatusUseCase(projectRepository)
      const displayAllLabourUseCase = new DisplayAllLabourUseCase(labourRepository)
      const addLabourUseCase = new AddLabourUseCase(labourRepository)
      const updateLabourUseCase = new UpdateLabourUseCase(labourRepository)
      const deleteLabourUseCase = new DeleteLabourUseCase(labourRepository)
      const displayAllSitemanagerUseCase = new DisplayAllSitemanagerUseCase(sitemanagerRepository)
      const addSitemanagerUseCase = new SaveSitemanagerUseCase(sitemanagerRepository)
      const editSitemanagerUsecase = new UpdateSitemanagerUseCase(sitemanagerRepository)
      const deleteSitemanagerUseCase = new DeleteSitemanagerUseCase(sitemanagerRepository)
      const addSiteToProjectUseCase = new AddSiteToProjectUseCase(projectRepository)
      const listSiteToProjectUseCase = new ListSiteToProject(addSiteToprojectRepoSitory)
      const deleteSitetoprojectuseCase = new DeleteSiteToProjectUseCase(projectRepository)
      const addSiteToprojectFetchProjectUseCase = new AddSiteToprojectFetchProjectUseCase(addSiteToprojectRepoSitory)
      const addSiteToprojectFetchSitemanagerUseCase = new AddSiteToprojectFetchSitemanagerUseCase(addSiteToprojectRepoSitory)
      const sitemanagerLoginUseCase = new SitemanagerLoginUseCase(sitemanagerRepository,JwtService,hasher)


      const newAdminController = new adminController(adminLoginUsecase)
      const newCategoryController = new CategoryController(displayAllCategoryUseCase, addCategoryUseCase, editcategoryUseCase, deleteCategoryUseCase)
      const newUnitController = new UnitController(displayUnitUseCase, addUnitUseCase, editUnitUseCase, newdeleteUnitUseCase)
      const newBrandController = new brandController(displayBrandUseCase, addBrandUseCase, editBrandUseCase, deleteBrandUseCase)
      const newMaterialController = new MaterialController(displayAllMaterialUseCase, getAddMaterialUseCase , saveMaterialUseCase, getEditMaterialUseCase, updateMaterialUseCase , deleteMaterialUseCase)
      const newProjectController = new ProjectController(displayProjectUseCase, displayAddProjectUseCase, addProjectUseCase, editProjectUseCase, removeProjectUseCase, changeStatusUseCase)
      const newLabourController = new LabourController(displayAllLabourUseCase, addLabourUseCase, updateLabourUseCase, deleteLabourUseCase)
      const newSitemanagerController = new SitemanagerController(displayAllSitemanagerUseCase, addSitemanagerUseCase, editSitemanagerUsecase, deleteSitemanagerUseCase,sitemanagerLoginUseCase)
      const newAddSiteController = new AddSiteController(addSiteToProjectUseCase, listSiteToProjectUseCase, deleteSitetoprojectuseCase,addSiteToprojectFetchProjectUseCase,addSiteToprojectFetchSitemanagerUseCase)

      app.use("/admin",createAdminRoute(newAdminController,
         newCategoryController,newUnitController,newBrandController,newMaterialController,
         newProjectController,newLabourController,newSitemanagerController,newAddSiteController

      ))

      app.use("/site",createSitemanagerRoute(newSitemanagerController))

   } catch (error) {
      console.log(error)
      process.exit(1)
   }
}

compositeRoot();

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log("server connected successfully")
   })
})

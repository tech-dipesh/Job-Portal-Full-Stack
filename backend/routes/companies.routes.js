import express from "express";
import bcrypt, { hash } from "bcryptjs";
import dataFetch from "../utils/tableDataFetch.js";
import { companyDashBoard, deleteCompanyController, getallApplicationsList, getAllEmployeesList, getAllJobsList, getCompanyController, postCompanyController, putCompanyController } from "../controllers/companies.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import connect from "../db.js"
import validateCorrectUid from "../Middleware/validateCorrectUid.js";

const router = express.Router();

router.get("/", async (req, res)=>{
  const data=await dataFetch('companies');
  res.status(200).json(data)
});

router.get("/:id/dashboard", isCompanyEmployee, companyDashBoard);


router.get("/:id/employees", getAllEmployeesList)
router.get("/:id/jobs", getAllJobsList)
router.get("/:id/applications", getallApplicationsList)


router.get("/:id", validateCorrectUid, getCompanyController);
router.post("/", postCompanyController);
router.delete("/:id", validateCorrectUid, deleteCompanyController);
router.put("/:id", validateCorrectUid, putCompanyController);


export default router;
import express from "express";
import bcrypt, { hash } from "bcryptjs";
import dataFetch from "../services/tableDataFetch.js";
import { deleteCompanyController, getCompanyController, postCompanyController, putCompanyController } from "../controllers/companies.controller.js";

const router = express.Router();

router.get("/", async (req, res)=>{
  const data=await dataFetch('companies');
  res.status(200).json(data)
});

router.get("/:id", getCompanyController);
router.post("/", postCompanyController);
router.delete("/:id", deleteCompanyController);
router.put("/:id", putCompanyController);


export default router;
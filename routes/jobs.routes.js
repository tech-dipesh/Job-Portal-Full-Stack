import express from "express"

import isAdminMIddleware  from "../Middleware/isAdmin.js";

import { deleteListingController, getAllListingController, getListingController, postListingController, putListingController } from "../controllers/jobs.controller.js";
import isOwnwerMiddleware from "../Middleware/isLoggedIn.js";
const router=express.Router();

router.get("/", isAdminMIddleware,  getAllListingController);

router.get("/:id", getListingController);
router.post("/", isAdminMIddleware, postListingController);

router.delete("/:id", isOwnwerMiddleware, isAdminMIddleware, deleteListingController);

router.put("/:id", isOwnwerMiddleware, isAdminMIddleware, putListingController);

export default router;
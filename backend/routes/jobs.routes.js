import express from "express"
import isAdminMIddleware  from "../Middleware/isAdmin.js";

import { deleteListingController, getAllListingController, getListingController, postListingController, putListingController, searchJobsListing } from "../controllers/jobs.controller.js";
import isOwnwerMiddleware from "../Middleware/isLoggedIn.js";
import authUserMiddleware from "../Middleware/isLoggedIn.js";
import { getallSaveJob, storeSaveJob, unsaveListJob } from "../controllers/saveJobs.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import validateCorrectUid from "../Middleware/validateCorrectUid.js";
const router=express.Router();

router.get("/saved_jobs/list", authUserMiddleware, getallSaveJob);
router.post("/:id/bookmark_job", authUserMiddleware,  storeSaveJob);
router.delete("/:id/remove_from_bookmark", authUserMiddleware, isOwnwerMiddleware, unsaveListJob);

router.get("/", getAllListingController);
router.get("/search", searchJobsListing);

router.get("/:id", validateCorrectUid, getListingController);
router.post("/", isCompanyEmployee, postListingController);

router.delete("/:id", validateCorrectUid, isOwnwerMiddleware, deleteListingController);

router.put("/:id", validateCorrectUid, isOwnwerMiddleware, putListingController);
export default router;
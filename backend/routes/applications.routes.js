import express from "express"
import isAdminMIddleware from "../Middleware/isAdmin.js"
import isLoggedInMiddleware from "../Middleware/isLoggedIn.js"
import tableDataFetch from "../utils/tableDataFetch.js"
import connect from "../db.js"
import applicationSchema from "../Models/applications.models.js";
import { applyJobApplicationController, withdrawJobApplicationController } from "../controllers/applications.controller.js";
import authUserMiddleware from "../Middleware/isLoggedIn.js";
import validateCorrectUid from "../Middleware/validateCorrectUid.js"
const router = express.Router();


router.get("/lists", isAdminMIddleware, async (req, res)=>{
  try {
    const data=await tableDataFetch('applications')
    res.json(data)
  } catch (error) {
    res.status(504).json({message:error.message})
  }
})

// router.get("/:id/lists", isLoggedInMiddleware, async (req, res)=>{
//   try {

//     const data=await tableDataFetch('applications')
//     res.json(data)
//   } catch (error) {
//     res.status(504).json({message:error.message})
//   }
// })


router.post("/:id/apply", validateCorrectUid, isLoggedInMiddleware,  applyJobApplicationController)



router.delete("/:id/withdraw", validateCorrectUid, isLoggedInMiddleware, withdrawJobApplicationController, )


export default router;
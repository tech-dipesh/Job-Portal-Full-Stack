import path from "path"

import express from "express";
import { addUserSkills, deleteUserController, getAllUserController, getloginUserController, getParticularUserController, patchUserController, postSignupUserController, putUserController, sendUserLoggedInStatus, userLoggedOutcontroller } from "../controllers/users.controller.js";
import {uploadResume, uploadProfilePicture} from "../controllers/uploadResume.controller.js";
import multer from "multer";
import authUserMiddleware from "../Middleware/isLoggedIn.js";
import verifyEmailConfirmation, { forgetEmailPassword, resendVerificationCode, verifyForgetPassword } from "../controllers/verifyCode.controller.js";
import rateLimit from "express-rate-limit";
import alreadyLoggedIn from "../Middleware/alreadyLoggedIn.js"
import isAdminMIddleware from "../Middleware/isAdmin.js";
import isUnverifiedUser from "../Middleware/isAuthButUnverified .js";
const limitUser=rateLimit({
  windowMs: 1000*60,
  limit: 5,
  message: {error:"You only can send resend request once per minute"}
})

const router = express.Router();

router.get("/", authUserMiddleware, sendUserLoggedInStatus)
router.get("/logout", userLoggedOutcontroller);

router.post("/login", alreadyLoggedIn, getloginUserController);
router.post("/signup", alreadyLoggedIn, postSignupUserController);
router.get("/", authUserMiddleware, isAdminMIddleware, getAllUserController)

router.get("/:id",  getParticularUserController);


router.post("/skills", authUserMiddleware,  addUserSkills);

router.delete("/:id", deleteUserController);
router.put("/:id", putUserController);


// const ALLOWED_BODY = ['fname', 'lname', 'education', 'email', 'password'];

router.patch("/:id", patchUserController)

router.post("/forget-password", authUserMiddleware, forgetEmailPassword)
router.post("/forget-password/verify", authUserMiddleware, verifyForgetPassword)
router.post("/verify", isUnverifiedUser, verifyEmailConfirmation)
router.post("/verify/resend", limitUser, isUnverifiedUser, resendVerificationCode)

const storage=multer.diskStorage({
  filename: (req, file, cb)=>{
    const ext=path.extname(file.originalname);
    cb(null, `${Date.now()}${file.originalname}${ext}`)
  },
  destination: (req, file, cb)=>{
    cb(null, './upload')
  }
})

const upload=multer({storage: multer.memoryStorage()})

router.post("/upload", upload.single('resume'), authUserMiddleware,  uploadResume)
router.post("/profilepicture", upload.single('profile'), authUserMiddleware,  uploadProfilePicture)
export default router;
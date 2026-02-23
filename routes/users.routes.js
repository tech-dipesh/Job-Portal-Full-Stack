import path from "path"

import express from "express";
import { deleteUserController, getAllUserController, getloginUserController, getParticularUserController, patchUserController, postSignupUserController, putUserController } from "../controllers/users.controller.js";
import uploadResume from "../controllers/uploadResume.controller.js";

import multer from "multer";
const router = express.Router();

router.get("/",  getAllUserController)

router.get("/login",  getloginUserController);

router.get("/:id",  getParticularUserController);


router.post("/signup", postSignupUserController);

router.delete("/:id", deleteUserController);
router.put("/:id", putUserController);


// const ALLOWED_BODY = ['fname', 'lname', 'education', 'email', 'password'];

router.patch("/:id", patchUserController)


const storage=multer.diskStorage({
  filename: (req, file, cb)=>{
    const ext=path.extname(file.originalname);
    cb(null, `${Date.now()}${file.originalname}${ext}`)
  },
  destination: (req, file, cb)=>{
    cb(null, './upload')
  }
})

// const upload=multer({dest: './upload'})
const upload=multer({storage})
// const uploadResume=  upload.single('resume')(req, res, next)=>{


router.post("/upload", upload.single('resume'), uploadResume)
export default router;
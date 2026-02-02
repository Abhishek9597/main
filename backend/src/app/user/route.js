import express from "express";
import userController from "../user/controller.js"
import { auth } from "../../middleware/auth.js";
import { createUserValidation, updateUserValidate, validate } from "../../middleware/validate.js";
import { upload } from "../../middleware/upload.js";
const userRouter = express.Router()

userRouter.post("/register",upload.single("image"),validate(createUserValidation),userController.signUp)
userRouter.post("/login",userController.login)
userRouter.get("/get", auth, userController.getUser)
userRouter.put("/update/:id",upload.single("image"),validate(updateUserValidate), auth, userController.updateUser)
userRouter.delete("/delete/:id", userController.delete)


export default userRouter;
import express from "express";
import { loginAdmin, registerUser, loginUser, googleLogin } from "../controllers/userController.js";
const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin",loginAdmin);
userRouter.post("/google-login", googleLogin);

export default userRouter;
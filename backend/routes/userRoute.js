import express from "express";
import { loginAdmin, registerUser, loginUser } from "../controllers/userControler.js";
const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin",loginAdmin);

export default userRouter;
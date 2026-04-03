import express from "express";
import { registerUser } from "../controllers/userControler.js";
import { loginUser } from "../controllers/userControler.js";
const userRouter=express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);

export default userRouter;
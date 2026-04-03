import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";
import validator from "validator";

//Create token helper function
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}

//login user
const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=createToken(user._id);
        res.status(200).json({message:"Login successful",token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occurred while logging in"})
    }
}

//register user
const registerUser=async(req,res)=>{
const{name,password,email}=req.body;
try {
     const existingUser=await userModel.findOne({email});
     if(existingUser){
        return res.status(400).json({message:"User already exist"})
     }
     //validate email format & strong password
     if(!validator.isEmail(email)){
        return res.json({success:false,message:"Invalid email,please provide a valid email address"})
     }
     if(password.length<8){
        return res.json({success:false,message:"Password must be at least 8 characters long"})
     }
     //hash password
     const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser= new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
     const user=await newUser.save();
     const token=createToken(user._id);
     res.status(200).json({message:"User registered successfully",token})
} catch (error) {
   console.log(error);
    res.status(500).json({message:"Error occurred while registering user"})
}



}



export {loginUser,registerUser}
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
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        const user = await userModel.findOne({ email });

        if (!user) {
            // Check if they are trying to log in as admin from the frontend
            if (email === adminEmail && password === adminPassword) {
                const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
                return res.status(200).json({ success: true, message: "Admin Login successful", token });
            }
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.status(200).json({ success: true, message: "Login successful", token });
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

//admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        
        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.status(200).json({ success: true, message: "Admin login successful", token });
        } else {
            res.status(400).json({ success: false, message: "Invalid admin credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error loggin in as admin" });
    }
}


export {loginUser, registerUser, loginAdmin}
import foodmodel from "../models/foodmodels.js";
import fs from "fs";
import path from "path";    



//add foodItem

const addFood=async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image not uploaded" });
        }

        let image_filename= `${req.file.filename}`;
        const food = new foodmodel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food item added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding food item" });
    }
}
//list food

const listFood=async(req,res)=>{
try {
    const foods=await foodmodel.find({});
    res.json({success:true,data:foods})
} catch (error) {
    res.status(500).json({ success: false, message: "Error fetching food items" });
}
}


export {addFood,listFood}
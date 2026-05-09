import foodmodel from "../models/foodModels.js";
import fs from "fs";
import path from "path";    



//add foodItem

const addFood=async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image not uploaded" });
        }

        const existingFood = await foodmodel.findOne({ name: req.body.name });
        if (existingFood) {
            return res.json({ success: false, message: "Food item with this name already exists" });
        }

        let image_filename= req.file.path; // Cloudinary returns the full URL in path
        if(!req.file.path.startsWith("http")) { // Fallback if using local disk storage
            image_filename = req.file.filename;
        }

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
const listFood = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalItems = await foodmodel.countDocuments({});
        const foods = await foodmodel.find({}).skip(skip).limit(limit);

        res.json({
            success: true,
            data: foods,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
                limit
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching food items" });
    }
}
//remove food item
const removeFood = async(req,res)=>{
    try {
   const food =await foodmodel.findById(req.body.id);
   
   if(!food.image.startsWith("http")) {
     fs.unlink(`uploads/${food.image}`,()=>{})
   }
   await foodmodel.findByIdAndDelete(req.body.id);
   res.json({success:true,message:"Food item removed successfully"})

    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
} 


export {addFood,listFood,removeFood}
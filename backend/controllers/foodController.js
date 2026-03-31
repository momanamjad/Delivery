import foodmodel from "../models/foodmodels.js";
import fs from "fs";
import path from "path";    



//add foodItem

const addFood=async(req,res)=>{
    let image_filename= `${req.file.filename}`;
    const food =new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })


}

export {addFood}

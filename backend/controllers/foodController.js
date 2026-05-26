import foodmodel from "../models/foodModels.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image not uploaded" });
    }

    const existingFood = await foodmodel.findOne({ name: req.body.name });
    if (existingFood) {
      return res.status(409).json({ success: false, message: "Food item with this name already exists" });
    }

    let image_filename = req.file.path; // Cloudinary returns the full URL in path
    if (!req.file.path.startsWith("http")) { // Fallback if using local disk storage
      image_filename = req.file.filename;
    }

    const food = new foodmodel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    console.error("[addFood]", error.message);
    res.status(500).json({ success: false, message: "Error adding food item" });
  }
};

// List food items (paginated)
const listFood = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    const totalItems = await foodmodel.countDocuments({});
    const foods      = await foodmodel.find({}).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      data: foods,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("[listFood]", error.message);
    res.status(500).json({ success: false, message: "Error fetching food items" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodmodel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    if (!food.image.startsWith("http")) {
      fs.unlink(`uploads/${food.image}`, () => {});
    }
    await foodmodel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Food item removed successfully" });
  } catch (error) {
    console.error("[removeFood]", error.message);
    res.status(500).json({ success: false, message: "Error removing food item" });
  }
};

// Edit food item (name, description, price, category — image optional)
const editFood = async (req, res) => {
  try {
    const { id, name, description, price, category } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Food item ID is required" });
    }

    const food = await foodmodel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Check for name collision (only if name changed)
    if (name && name !== food.name) {
      const duplicate = await foodmodel.findOne({ name });
      if (duplicate) {
        return res.status(409).json({ success: false, message: "Another food item with this name already exists" });
      }
    }

    // If a new image was uploaded, replace the old one
    if (req.file) {
      let newImage = req.file.path;
      if (!req.file.path.startsWith("http")) {
        // Delete old local image
        if (food.image && !food.image.startsWith("http")) {
          fs.unlink(`uploads/${food.image}`, () => {});
        }
        newImage = req.file.filename;
      }
      food.image = newImage;
    }

    if (name)        food.name        = name;
    if (description) food.description = description;
    if (price)       food.price       = price;
    if (category)    food.category    = category;

    await food.save();
    res.status(200).json({ success: true, message: "Food item updated successfully", data: food });
  } catch (error) {
    console.error("[editFood]", error.message);
    res.status(500).json({ success: false, message: "Error updating food item" });
  }
};

export { addFood, listFood, removeFood, editFood };
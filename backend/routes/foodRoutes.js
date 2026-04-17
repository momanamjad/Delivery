import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Ensure fallback to disk storage locally if Cloudinary secrets are missing
// although for this fix we'll assume Cloudinary is used in production.
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME;

const storage = useCloudinary 
  ? new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "delivery_app",
        allowedFormats: ["jpg", "png", "jpeg", "webp"],
      },
    })
  : multer.diskStorage({
      destination: "uploads",
      filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood)

export default foodRouter;

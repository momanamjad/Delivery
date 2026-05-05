import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config'
dotenv.config();


//app config
const app = express();
const port = 4000


//middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: "Invalid JSON in request body" })
  }
  next()
})



import mongoose from "mongoose";

// Detailed DB connection logging
mongoose.connection.on('error', err => {
  console.error("Mongoose Connection Error Detail:", err);
});

//db connection
connectDB();



//api endpoints
app.use("/api/food", foodRouter)
app.use("/images",express.static(process.env.VERCEL ? "/tmp" : "uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)




app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

export default app;


  
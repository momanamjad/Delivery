import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
dotenv.config();


//app config
const app = express();
const port = 4000


//middleware
app.use(express.json())
app.use(cors())



//db connection
connectDB();



//api endpoints
app.use("/api/food", foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)




app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})


  
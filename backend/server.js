import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";



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





app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})



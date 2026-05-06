import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        // On Vercel, a timeout usually means the IP is not whitelisted
        if (error.message.includes("timed out") || error.name === "MongooseServerSelectionError") {
            throw new Error("Database connection timed out. Please ensure 0.0.0.0/0 is whitelisted in MongoDB Atlas Network Access.");
        }
        throw error;
    }       
}   
export default connectDB;
import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://momanamjad07_db_user:ptQRdfQgtrsDFX9d@cluster0.mwhslon.mongodb.net/?appName=Cluster0' );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }       
}   
export default connectDB;   
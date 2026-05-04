import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,      
        required:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    
    },
    password:{
        type:String,
        required: function() {
            return !this.googleId; // Password is required only if googleId is not present
        }
    },
    googleId:{
        type:String,
        unique:true,
        sparse:true // Allows multiple users to have no googleId
    },
    image: {
        type: String,
        default: ""
    },
    cartData:{
    type:Object,
    default:{}
    }
},{minimize:false})

const usermodel=mongoose.models.user||mongoose.model("users",userSchema);

    export default usermodel;
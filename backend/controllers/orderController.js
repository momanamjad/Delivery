import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import 'dotenv/config'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";

    try {
        // Validate userId
        if (!req.body.userId) {
            return res.status(400).json({ error: "userId is required in the request body." });
        }
        // 1. Save the order in your database first
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // 2. Clear the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // 3. Prepare line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd", 
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,  
            },
            quantity: item.quantity
        }));

        // 4. Add Delivery Charges
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100, // $2.00 delivery fee
            },
            quantity: 1
        });

        // 5. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // 6. Send the session URL back to frontend
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
}
//the snipet below is used to verify the order, this is not the right way to to this the only good method is to use WebHooks for these 

const verifyOrder=async(req,res)=>{
 const {orderId,success}=req.body;
 try {
    if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true})
       res.json({success:true,message:"Paid"})
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not Paid"})
    }
 } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
 }

}
///Users order for frontend
const userOrders=async(req,res)=>{
try {
    const orders=await orderModel.find({userId:req.body.userid})
    res.json({success:true,data:orders})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
}
}
//listing orders for admin pannel
const listOrders=async(req,res)=>{
try {
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"eror"})
}
}
//text api  for updating order status
const updateStatus=async(req,res)=>{
try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"status updated"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})

}
}

export { placeOrder ,verifyOrder,userOrders,listOrders,updateStatus};

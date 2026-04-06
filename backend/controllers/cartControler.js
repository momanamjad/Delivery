import userModel from "../models/userModel.js";
  

//add Items to user carts
export const addToCart = async (req, res) => {
  try {
     let userData=await userModel.findOne({_id:req.body.userid});
     let cartDATA=await userData.cartdData;
  if(!cartData[req.body.itemId]){
   cartData[req.body.itemId]=1;
  }else{
    cartDATA[req.body.itemId]=cartDATA[req.body.itemId]+1;
  }
  await userModel.findByIdAndUpdate(req.body.userid, { cartData });
  res.status(200).json({success:true,message:"Item added to cart successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Internal server error"})
  }
};
//remove items from user carts
export const removeFromCart = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Internal server error"})
  }
};

//get user carts data
export const getCart = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Internal server error"})
  }
};


export {  addToCart, removeFromCart, getCart };
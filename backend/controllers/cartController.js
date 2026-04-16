import userModel from "../models/userModel.js";

//add Items to user carts
const addToCart = async (req, res) => {
  try {
    const { userid, itemId } = req.body;
    
    if (!userid || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userid or itemId" });
    }

    let userData = await userModel.findById(userid);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    
    await userModel.findByIdAndUpdate(userid, { cartData });
    res.status(200).json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//remove items from user carts
const removeFromCart = async (req, res) => {
  try {
    const { userid, itemId } = req.body;
    
    if (!userid || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userid or itemId" });
    }
    let userData = await userModel.findById(userid);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    
    await userModel.findByIdAndUpdate(userid, { cartData });
    res.status(200).json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get user carts data
const getCart = async (req, res) => {
  try {
    const { userid } = req.body;
    
    if (!userid) {
      return res.status(400).json({ success: false, message: "Missing userid" });
    }

    let userData = await userModel.findById(userid);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, removeFromCart, getCart };

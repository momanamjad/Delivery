import userModel from "../models/userModel.js";

//add Items to user carts
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    const MAX_QUANTITY = 20;
    
    if (cartData[itemId] >= MAX_QUANTITY) {
      return res.status(400).json({ success: false, message: `Maximum quantity of ${MAX_QUANTITY} reached for this item.` });
    }

    cartData[itemId] = (cartData[itemId] || 0) + 1;
    
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//remove items from user carts
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get user carts data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    let userData = await userModel.findById(userId);
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

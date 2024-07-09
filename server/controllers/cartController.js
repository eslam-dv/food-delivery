import userModel from "../models/userModel.js";

// add item to user cart
const addToCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Item Added To Cart" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error!" });
  }
};

// remove item from user cart
const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Item Removed From Cart" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Erro!" });
  }
};

// get user cart items
const getCart = async (req, res) => {
  const { userId } = req.body;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };

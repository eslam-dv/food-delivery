import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  let image_filename = req.file.filename;

  const food = new foodModel({
    name,
    description,
    price,
    image: image_filename,
    category,
  });
  try {
    await food.save();
    res.status(200);
    res.json({ success: true, message: "Food Added" });
  } catch (err) {
    console.error(err);
    res.status(400);
    res.json({ success: false, message: "Error" });
  }
};

// list all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200);
    res.json({ success: true, data: foods });
  } catch (err) {
    res.status(400);
    res.json({ success: false, message: "Error" });
    console.error(err);
  }
};

// remove food item
const removeFood = async (req, res) => {
  const { id } = req.body;
  try {
    const food = await foodModel.findById(id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(id);
    res.status(200);
    res.json({ success: true, message: "Food Removed" });
  } catch (err) {
    res.status(400);
    res.json({ success: false, message: "Error" });
    console.error(err);
  }
};

export { addFood, listFood, removeFood };

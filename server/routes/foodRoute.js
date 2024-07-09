import { Router } from "express";
import multer from "multer";

import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";

const foodRouter = Router();

// Image Storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

// add food item
foodRouter.post("/add", upload.single("image"), addFood);
// list all food items
foodRouter.get("/list", listFood);
// remove food item
foodRouter.post("/remove", removeFood);

export default foodRouter;

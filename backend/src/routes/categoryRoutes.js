import express from "express";
import {
  allCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { uploadCategoryImage } from "../middlewares/uploads.js";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";
const categoryRouter = express.Router();

categoryRouter.get("/get-all", allCategories);
categoryRouter.post(
  "/create",
  protect,
  adminOnly,
  uploadCategoryImage.single("image"),
  createCategory,
);
categoryRouter.put(
  "/update/:id",
  protect,
  adminOnly,
  uploadCategoryImage.single("image"),
  updateCategory,
);
categoryRouter.delete(
  "/delete/:id",
  protect,
  adminOnly,
  deleteCategory,
);

export default categoryRouter;

import express from "express";
import {
  allCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { uploadCategoryImage } from "../middlewares/uploads.js";
import { checkRole, protect } from "../middlewares/auth.middleware.js";
const categoryRouter = express.Router();

categoryRouter.get("/get-all", allCategories);
categoryRouter.post(
  "/create",
  protect,
  checkRole(["admin"]),
  uploadCategoryImage.single("image"),
  createCategory,
);
categoryRouter.put(
  "/update/:id",
  protect,
  checkRole(["admin"]),
  uploadCategoryImage.single("image"),
  updateCategory,
);
categoryRouter.delete(
  "/delete/:id",
  protect,
  checkRole(["admin"]),
  deleteCategory,
);

export default categoryRouter;

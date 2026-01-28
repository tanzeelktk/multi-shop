import express from "express";
import {
  allProducts,
  createProduct,
  deleteProduct,
  productByCategory,
  searchProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";
import { uploadProductImage } from "../middlewares/uploads.js";
const productRouter = express.Router();

productRouter.get("/all-products", allProducts);
productRouter.get("/single-product/:id", singleProduct);
productRouter.post(
  "/create",
  protect,
  adminOnly,
  uploadProductImage.array("images"),
  createProduct,
);
productRouter.put(
  "/update/:id",
  protect,
  adminOnly,
  uploadProductImage.array("images"),
  updateProduct,
);
productRouter.delete("/delete", protect, adminOnly, deleteProduct);
productRouter.get("/category/:id", productByCategory);
productRouter.get("/search", searchProduct); //url will be /search?q=mobile

export default productRouter;

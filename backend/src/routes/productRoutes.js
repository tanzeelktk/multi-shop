import express from "express";
import {
  allProducts,
  createProduct,
  deleteImage,
  deleteProduct,
  newImageAdd,
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
  uploadProductImage.array("images", 5),
  createProduct,
);
productRouter.put(
  "/update/:id",
  protect,
  adminOnly,
  uploadProductImage.array("images"),
  updateProduct,
);
productRouter.put(
  "/new-image/:id",
  protect,
  adminOnly,
  uploadProductImage.single("image"),
  newImageAdd,
);
productRouter.delete("/delete-image/:imageId/:pId", protect, adminOnly, deleteImage);
productRouter.delete("/delete/:id", protect, adminOnly, deleteProduct);
productRouter.get("/category/:id", productByCategory);
productRouter.get("/search", searchProduct); //url will be /search?q=mobile

export default productRouter;

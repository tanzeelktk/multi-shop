import express from "express";
import {
  addReview,
  deleteReview,
  productReviews,
  updateReview,
  userReviews,
} from "../controllers/revieweControllers.js";
import { protect } from "../middlewares/auth.middleware.js";
const reviewRouter = express.Router();

reviewRouter.post("/add/:id", protect, addReview); //product id
reviewRouter.put("/update/:id", protect, updateReview); //review id
reviewRouter.delete("/delete/:id", protect, deleteReview); //review id

reviewRouter.get("/get-all/:id", productReviews); //product id
reviewRouter.get("/user-review/:id", protect, userReviews); //user id

export default reviewRouter;

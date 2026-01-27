import express from 'express'
import { addReview, deleteReview, productReviews, updateReview, userReviews } from '../controllers/revieweControllers.js'
const reviewRouter = express.Router()

reviewRouter.post("/add/:id", addReview) //product id
reviewRouter.put("/update/:id", updateReview)
reviewRouter.delete("/delete/:id", deleteReview)

reviewRouter.get("/get-all/:id", productReviews) //product id
reviewRouter.get("/user-review/:id", userReviews) //user id

export default reviewRouter
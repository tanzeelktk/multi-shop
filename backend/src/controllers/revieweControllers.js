import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";
export const addReview = async (req, res) => {
  try {
    const { id } = req.params; //product id
    const userId = req.user._id;
    const { rating, comment } = req.body;
    const isExist = await Product.findById(id);
    if (!isExist) {
      return res.status(400).json({ message: "No product ID exist." });
    }
    const user = await User.findById(userId);
    const review = await Review.create({
      product: id,
      user: userId,
      name: user.name,
      image: user.image,
      rating,
      comment,
    });

    //update product rating and review
    updateProduct(id);

    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params; //review id
    const { comment, rating } = req.body;
    const userId = req.user._id;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review id not available." });
    }
    if (userId.toString() !== review.user.toString()) {
      return res
        .status(403)
        .json({ message: "User not authorized to update." });
    }
    if (comment !== undefined) review.comment = comment;
    if (rating !== undefined) review.rating = Number(rating);
    await review.save();
    updateProduct(review.product);
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params; //review id
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review id not exist. " });
    }
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "user id not matched" });
    }
    await Review.findByIdAndDelete(id);

    //updating product reviews and rating
    updateProduct(review.product);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const productReviews = async (req, res) => {
  try {
    const { id } = req.params; //product id
    const reviews = await Review.find({ product: id });
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No review available." });
    }
    res.status(200).json({ reviews: reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const userReviews = async (req, res) => {
  try {
    const id = req.user._id; //user id
    const reviews = await Review.find({ user: id }).sort({ createdAt: -1 });
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No review available." });
    }
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//updating product after add, delete or update reviews

async function updateProduct(id) {
  try {
    const product = await Product.findById(id);
    const reviews = await Review.find({ product: id });
    console.log(reviews);
    product.numReviews = reviews.length;
    product.rating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;
    await product.save();
  } catch (error) {}
}

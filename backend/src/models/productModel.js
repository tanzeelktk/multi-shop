import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      default:"Active",
      enum:["Active", "inActive"]
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [
      {
        filename: { type: String, required: true },
        main: { type: Boolean, default: false },
      },
    ],
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    recent: {
      type: Boolean,
      default: false,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default:1
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;

import Product from "../models/productModel.js";
import fs from "fs/promises";

export const allProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .populate("category", "title")
      .skip(skip)
      .limit(limit);

    if (productByCategory.length === 0) {
      return res.status(400).json({ message: "No product found." });
    }
    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while fetching products data.", error });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Please provide product id" });
    }
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return res
        .status(400)
        .json({ message: "Sorry product id is not available" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching product. ", error });
  }
};

export const createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const {
      title,
      description,
      longDescription,
      category,
      status,
      price,
      discountPercent,
      stock,
      featured,
      recent,
      mainImageIndex,
    } = req.body;
    if (
      !title ||
      !description ||
      !longDescription ||
      !category ||
      !price ||
      !stock
    ) {
      res.status(400).json({ message: "Missing mendatory fields." });
    }
    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock);

    let images;
    if (req.files && req.files.length > 0) {
      images = req.files.map((file, index) => {
        return {
          filename: file.path.replace(/\\/g, "/"), // Normalize path
          main: parseInt(mainImageIndex) === index,
        };
      });
    } else {
      return res.status(400).json({ message: "Please upload product images" });
    }

    const product = await Product.create({
      title,
      description,
      longDescription,
      category,
      images,
      status,
      price: priceNum,
      discountPercent,
      stock: stockNum,
      featured,
      recent,
    });

    res.status(201).json({ product: product });
  } catch (error) {
    res.status(400).json({ message: "Error while Creating Product. ", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      status,
      longDescription,
      category,
      price,
      discountPercent,
      stock,
      featured,
      recent,
      mainImageIndex,
    } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found." });
    }
    if (title !== undefined) product.title = title;
    if (status !== undefined) product.status = status;
    if (description !== undefined) product.description = description;
    if (longDescription !== undefined)
      product.longDescription = longDescription;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = parseFloat(price);
    if (discountPercent !== undefined)
      product.discountPercent = parseInt(discountPercent);
    if (stock !== undefined) product.stock = parseInt(stock);
    if (featured !== undefined) product.featured = featured;
    if (recent !== undefined) product.recent = recent;

    await product.save();
    const populatedProduct = await Product.findById(product._id).populate(
      "category",
      "title",
    );
    res.status(201).json({ product: populatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error while updating product. ", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product id not exist" });
    }
    for (const img of product.images) {
      await fs.unlink(img.filename).catch(() => {});
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting Product. ", error });
  }
};

export const productByCategory = async (req, res) => {
  try {
    const { id } = req.params; //category id that stored with product
    const products = await Product.find({ category: id }).populate("category");
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category." });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching products.", error });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required." });
    }
    const searchRegex = new RegExp(query, "i");
    const products = await Product.find(
      {
        title: { $regex: searchRegex },
      },
      { title: 1 },
    ).limit(10);

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error : ", error });
  }
};

export const newImageAdd = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No product id exist" });
    }
    const isFirstImage = !product.images || product.images.length === 0;
    const newImage = {
      filename: req.file.path.replace(/\\/g, "/"),
      main: isFirstImage,
    };
    product.images.push(newImage);
    await product.save();
    res.status(200).json({ message: "Image added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { imageId, pId } = req.params; //product id

    const product = await Product.findById(pId);
    if (!product) {
      return res.status(404).json({ message: "No product id exist" });
    }
    const deletedImage = product.images.find(
      (img) => img._id.toString() === imageId.toString(),
    );
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 🔥 delete image file
    await fs.unlink(deletedImage.filename).catch(() => {});

    const newImageArray = product.images.filter(
      (image) => image._id.toString() !== imageId.toString(),
    );
    if (deletedImage.main === true && newImageArray.length > 0) {
      newImageArray[0].main = true;
    }
    product.images = newImageArray;
    product.save();
    res.status(200).json({ message: "Image deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

import { read } from "fs";
import Category from "../models/categoryModel.js";
import fs from "fs/promises";

export const allCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "No category found." });
    }
    res.status(200).json({ status: "success", categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Category name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Category image is required" });
    }
    const isExist = await Category.findOne({
      title: { $regex: `^${title}$`, $options: "i" },
    });
    if (isExist) {
      return res.status(400).json({ message: "Category already exist" });
    }
    const image = req.file.path.replace(/\\/g, "/"); // Normalize path
    const newCategory = await Category.create({ title, description, image });
    res.status(201).json({ status: "success", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({ message: "Category not exist" });
    }
    if (title !== undefined) category.title = title;
    if (description !== undefined) category.description = description;
    if (req.file) {
      if (category.image) {
        await fs.unlink(category.image).catch(() => {});
      }
      category.image = req.file.path.replace(/\\/g, "/"); // Normalize path
    }
    await category.save();
    res.status(201).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({ message: "Category not exist" });
    }
    await fs.unlink(category.image).catch(() => {});
    await Category.findByIdAndDelete(id);
    res
      .status(200)
      .json({ status: "succeess", message: "Category deleted successfully." });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Server error while deleting category" });
  }
};

import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import bcrypt from "bcryptjs";
dotenv.config()

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    if (user.role !== "admin") {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );
    const responseData = {
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      image: user.image,
    };
    res.status(201).json({ user: responseData, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const dashboardStats = async (req, res) => {};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, isActive } = req.body;
    const allowedRoles = ["user", "admin"];
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User id not exist." });
    }
    if (req.user._id === id && role && role !== user.role) {
      return res
        .status(403)
        .json({ message: "You cannot change your own role." });
    }

    if (role !== undefined) {
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role request" });
      }
      user.role = role;
    }
    if (isActive !== undefined) user.isActive = isActive;
    await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user: { _id: user._id, role: user.role, isActive: user.isActive },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // prevent self-delete
    if (req.user._id.toString() === id) {
      return res
        .status(403)
        .json({ message: "You cannot delete your own account." });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User id not exist." });
    }
    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

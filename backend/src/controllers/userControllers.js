import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;    

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const responseData = {
      name: user.name,
      email: user.email,
      role: user.role,
      isACtive: user.isActive,
    };

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.status(201).json({ user: responseData, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

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

    if(!user.isActive){
      return res.status(400).json({message:"You are not Allowed please contact Admin"})
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
      isACtive: user.isActive,
      image: user.image,
    };
    res.status(201).json({ user: responseData, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(201).json({ user: user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const { name, email } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (req.file) {
      if (user.image) {
        await fs.unlink(user.image).catch(() => {});
      }
      user.image = `uploads/users/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {};

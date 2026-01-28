import User from "../models/userModel.js";

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

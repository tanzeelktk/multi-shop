import express from "express";
import {
  dashboardStats,
  deleteUser,
  getUsers,
  updateRole,
} from "../controllers/adminControllers.js";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";
const adminRouter = express.Router();

adminRouter.get("/dashboard-stats", protect, adminOnly, dashboardStats);
adminRouter.get("/users", protect, adminOnly, getUsers);
adminRouter.put("/user/role/:id", protect, adminOnly, updateRole);
adminRouter.delete("/user/:id", protect, adminOnly, deleteUser);
export default adminRouter;

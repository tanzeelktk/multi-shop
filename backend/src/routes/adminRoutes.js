import express from "express"
import { adminLogin, dashboardStats, deleteUser, getUsers, updateRole } from "../controllers/adminControllers.js"
import { protect } from "../middlewares/auth.middleware.js"
const adminRouter = express.Router()

adminRouter.post("/login", adminLogin)
adminRouter.get("/dashboard-stats", dashboardStats)
adminRouter.get("/users", getUsers)
adminRouter.put("/user/role/:id", updateRole)
adminRouter.delete("/user/:id", deleteUser)
export default adminRouter
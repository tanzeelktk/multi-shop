import express from "express"
import { register, login, profile, updateProfile, refreshToken} from "../controllers/userControllers.js"
import { protect } from "../middlewares/auth.middleware.js"
import { uploadUserProfile } from "../middlewares/uploads.js"
const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/profile", protect, profile)
userRouter.put("/profile",protect, uploadUserProfile.single("image"), updateProfile)
userRouter.get("/refresh-token", refreshToken)

export default userRouter
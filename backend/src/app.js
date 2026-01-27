import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import ordersRouter from "./routes/orderRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// __dirname fix for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/review", reviewRouter);

export default app;

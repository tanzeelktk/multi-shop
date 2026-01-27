import multer from "multer";
import fs from "fs";

// Helper: ensure folder exists
const ensureFolder = (folder) => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
};

// Multer storage factory
const createStorage = (folder) => {
  ensureFolder(folder);
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, folder),
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
};

// Multer instances
export const uploadProductImage = multer({ storage: createStorage("uploads/products") });
export const uploadCategoryImage = multer({ storage: createStorage("uploads/categories") });
export const uploadUserProfile = multer({ storage: createStorage("uploads/users") });

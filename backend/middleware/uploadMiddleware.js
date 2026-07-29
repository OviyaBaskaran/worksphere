import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "worksphere/employees",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname.split(".")[0]}`;
    },
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG and PNG images are allowed"), false);
  }
};

// Multer upload
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

export default upload;
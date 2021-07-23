import multer from "multer";
import path from "path";

// @desc File Upload product
// @route GET /api/v1/products
// @access  Private
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    // const fileName = file.originalname.split("  ").join("-");
    const fileExtension = path.extname(file.originalname).split(".")[1];
    cb(null, `newName-${Date.now()}.${fileExtension}`);
  },
});
const uploadOptions = multer({ storage: storage });

export { uploadOptions };

import multer from  "multer"

//set storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

//filter filetypes

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

export const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter,
})
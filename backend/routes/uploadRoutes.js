import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// First we need to decide what storage we'll be using, we are going with Disk Storage cuz it's gonna be on our server
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // cb is callback - first argument is for error, null because we don't expect error, second argument is where it will be uploaded
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;

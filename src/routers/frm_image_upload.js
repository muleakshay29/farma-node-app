const express = require("express");
const router = new express.Router();
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

// Mongo URI
const connURL =
  "mongodb+srv://muleakshay29:2CmHiqHX2DX3z8vt@cluster0-zkaxy.mongodb.net/farma-app?retryWrites=true&w=majority";

// Create mongo connection
const conn = mongoose.createConnection(connURL);

let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("frm_product_images");
});

// Create storage engine
const storage = new GridFsStorage({
  url: connURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return reject(err);
        }

        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "frm_product_images"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route POST /upload
// @desc  Uploads file to DB
router.post("/product-image-upload", upload.single("PRO_Image"), (req, res) => {
  res.status(201).send({ file: req.file });
});

// @route GET /files/:filename
// @desc  Display single file object
router.get("/product-image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});

module.exports = router;

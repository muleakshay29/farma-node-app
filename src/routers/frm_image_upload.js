const express = require("express");
const router = new express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const app = express();

// Middleware
app.use(bodyParser.json());

// Mongo URI
const connURL =
  "mongodb+srv://muleakshay29:2CmHiqHX2DX3z8vt@cluster0-zkaxy.mongodb.net/farma-app?retryWrites=true&w=majority";

// Create mongo connection
const conn = mongoose.createConnection(connURL);

let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
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
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(201).send({ file: req.file });
});

module.exports = router;

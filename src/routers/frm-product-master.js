const express = require("express");
const ProductMaster = require("../models/frm-product-master");
const router = new express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");

/* const upload = multer({
  dest: "images/product-images",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      callback(new Error("Sorry, only JPG, JPEG, PNG & GIF files are allowed"));
    }

    callback(undefined, true);
  }
});

router.post(
  "/product-image-upload",
  auth,
  upload.single("PRO_Image"),
  (req, res) => {
    // req.productMaster.PRO_Image = req.file.buffer;
    // req.ProductMaster.PRO
    console.log(req.file);
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
); */

/*----------------------File upload using grid fs------------------------ */

/*----------------------File upload using grid fs------------------------ */

router.post("/add-product", auth, (req, res) => {
  const pmaster = new ProductMaster(req.body);
  pmaster
    .save()
    .then(() => {
      res.status(201).send(pmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/products-count", auth, (req, res) => {
  try {
    ProductMaster.find().estimatedDocumentCount((err, count) => {
      if (err) {
        res.status(400).send(err);
      }
      const docCount = count;
      res.send({ count: docCount });
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/fetch-products-dropdown", auth, (req, res) => {
  ProductMaster.find({})
    // .select("PRO_code PRO_Name PRO_Manufraturer")
    .select("PRO_Name")
    .then(pmaster => {
      res.send(pmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-products", auth, (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex);
  var pageSize = parseInt(req.query.pageSize);
  var query = {};

  query.skip = pageIndex * pageSize;
  query.limit = pageSize;

  ProductMaster.find({}, {}, query)
    .select("PRO_code PRO_Name PRO_Manufraturer")
    .then(pmaster => {
      res.send(pmaster);
    });
});

router.post("/find-products", auth, (req, res) => {
  ProductMaster.find({ PRO_Name: { $regex: req.body.PRO_Name, $options: "i" } })
    .select("PRO_code PRO_Name PRO_Manufraturer")
    .then(pmaster => {
      res.send(pmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

/* router.post("/check-product-code", auth, (req, res) => {
  ProductMaster.find({ PRO_code: req.body.PRO_code })
    .then(pmaster => {
      res.send(pmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}); */

router.post("/check-product-code", (req, res) => {
  const proId = req.body.proId;

  ProductMaster.findOne({ PRO_code: req.body.PRO_code })
    .then(pmaster => {
      // No pmaster with the same pmaster code in the database
      if (!pmaster) {
        return res.json({
          alreadyExist: false
        });
      }

      // Validate the 'edit pmaster' form
      if (proId) {
        if (proId === pmaster._id.toString()) {
          return res.json({
            alreadyExist: false
          });
        } else {
          return res.json({
            alreadyExist: true
          });
        }
      }
      // Validate the 'create pmaster' form
      else {
        res.json({
          alreadyExist: true
        });
      }
    })
    .catch(e => {
      res.json({
        alreadyExist: false
      });
    });
});

router.get("/fetch-product-details/:id", auth, (req, res) => {
  const _id = req.params.id;

  ProductMaster.findById(_id)
    .then(pmaster => {
      console.log(pmaster);
      if (!pmaster) {
        return res.status(404).send();
      }

      res.status(200).send(pmaster);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

router.patch("/update-product/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "PRO_code",
    "PRO_Name",
    "PRO_Barcode",
    "PRO_Manufraturer",
    "PRO_SGST",
    "PRO_CGST",
    "PRO_IGST",
    "PRO_CESS",
    "PRO_HSN",
    "PRO_ScheduledUnder",
    "PRO_Content",
    "PRO_ReorderLevel",
    "PRO_Minimum_stock",
    "PRO_Type",
    "PRO_Image"
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const productMaster = await ProductMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!productMaster) {
      res.status(404).send();
    }

    res.send(productMaster);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/product-master/:id", auth, async (req, res) => {
  try {
    const productMaster = await ProductMaster.findByIdAndDelete(req.params.id);

    if (!productMaster) {
      return res.status(404).send();
    }

    res.send(productMaster);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

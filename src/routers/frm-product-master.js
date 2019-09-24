const express = require("express");
const ProductMaster = require("../models/frm-product-masters");
const router = new express.Router();

router.post("/add-product", (req, res) => {
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

router.get("/fetch-products", (req, res) => {
  ProductMaster.find({})
    .then(pmaster => {
      res.send(pmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/check-product-code", (req, res) => {
  ProductMaster.find({ PRO_code: req.body.PRO_code })
    .then(pmaster => {
      res.send(pmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-product-details/:id", (req, res) => {
  const _id = req.params.id;

  ProductMaster.findById(_id)
    .then(pmaster => {
      if (!pmaster) {
        return res.status(404).send();
      }

      res.status(200).send(pmaster);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

router.patch("/update-product/:id", async (req, res) => {
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

router.delete("/product-master/:id", async (req, res) => {
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

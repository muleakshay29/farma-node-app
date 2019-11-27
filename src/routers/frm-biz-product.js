const express = require("express");
const BizProduct = require("../models/frm-biz-product");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/add-biz-product", auth, (req, res) => {
  const pmaster = new BizProduct(req.body);
  pmaster
    .save()
    .then(() => {
      res.status(201).send(pmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

module.exports = router;

const express = require("express");
const Stock = require("../models/frm-stock-transactions");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/add-stock-trans", (req, res) => {
  const stock = new Stock(req.body);
  stock
    .save()
    .then(() => {
      res.status(201).send(stock);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-product-batch/:id", auth, (req, res) => {
  const PRO_ID = req.params.id;

  Stock.find({ PRO_ID: PRO_ID })
    .select("PRO_Batch PRO_Expiry")
    .then(stock => {
      if (!stock) {
        return res.status(404).send();
      }

      res.status(200).send(stock);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

module.exports = router;

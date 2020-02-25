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

module.exports = router;

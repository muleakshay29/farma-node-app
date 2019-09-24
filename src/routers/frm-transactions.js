const express = require("express");
const AccountTransaction = require("../models/frm-transactions");
const router = new express.Router();

router.post("/add-account-transaction", (req, res) => {
  const trans = new AccountTransaction(req.body);
  trans
    .save()
    .then(() => {
      res.status(201).send(trans);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

module.exports = router;

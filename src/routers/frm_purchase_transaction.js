const express = require("express");
const {
  PurchaseTrans,
  TransactionChild
} = require("../models/frm_purchase_transaction");
const router = new express.Router();
// const auth = require("../middleware/auth");

router.post("/add-purchase-transaction", (req, res) => {
  const trans = new PurchaseTrans(req.body);
  trans
    .save()
    .then(() => {
      res.status(201).send(trans);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/add-transaction-child", (req, res) => {
  const ptrans = new TransactionChild(req.body);
  ptrans
    .save()
    .then(() => {
      res.status(201).send(ptrans);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-sales-order_child", async (req, res) => {
  PurchaseTrans.find({})
    .then(orders => {
      res.send(orders);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-sales-order", async (req, res) => {
  try {
    const data = await TransactionChild.find()
      .populate({
        path: "PurchaseTransId",
        model: "frm_purchase_transaction",
        select: "_id InvoiceDate"
      })
      .populate({
        path: "Product_id",
        model: "frm_product_masters",
        select: "PRO_Name PRO_Barcode"
      })
      .populate({
        path: "Product_Scheme",
        model: "frm_schemes",
        select: "Quantity Free_Quantity"
      })
      .exec();
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/fetch-sales-details", async (req, res) => {
  try {
    const data = await TransactionChild.find({ _id: req.body.id })
      .populate({
        path: "Product_id",
        model: "frm_product_masters",
        select: "PRO_Name PRO_Barcode"
      })
      .populate({
        path: "Product_Scheme",
        model: "frm_schemes",
        select: "Quantity Free_Quantity"
      })
      .exec();
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

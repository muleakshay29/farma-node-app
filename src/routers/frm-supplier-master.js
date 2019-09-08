const express = require("express");
const Supplier = require("../models/frm-supplier-master");
const router = new express.Router();

router.post("/add-suppliers", (req, res) => {
  const supplier = new Supplier(req.body);
  supplier
    .save()
    .then(() => {
      res.status(201).send(supplier);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-suppliers", (req, res) => {
  Supplier.find({})
    .then(suppliers => {
      res.send(suppliers);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/check-supplier-code", (req, res) => {
  Supplier.find({ SUP_code: req.body.SUP_code })
    .then(supplier => {
      res.send(supplier);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/supplier-details/:id", (req, res) => {
  const _id = req.params.id;

  Supplier.findById(_id)
    .then(supplier => {
      if (!supplier) {
        return res.status(404).send();
      }

      res.status(200).send(supplier);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

module.exports = router;

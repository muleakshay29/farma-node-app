const express = require("express");
const Supplier = require("../models/frm-supplier-master");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/add-suppliers", auth, (req, res) => {
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

router.get("/fetch-suppliers", auth, (req, res) => {
  Supplier.find({})
    .then(suppliers => {
      res.send(suppliers);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

/* router.post("/check-supplier-code", (req, res) => {
  Supplier.find({ SUP_code: req.body.SUP_code })
    .then(supplier => {
      res.send(supplier);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}); */

router.post("/check-supplier-code", auth, (req, res) => {
  const supId = req.body.supId;

  Supplier.findOne({ SUP_code: req.body.SUP_code })
    .then(supplier => {
      if (!supplier) {
        return res.json({
          alreadyExist: false
        });
      }

      if (supId) {
        if (supId === supplier._id.toString()) {
          return res.json({
            alreadyExist: false
          });
        } else {
          return res.json({
            alreadyExist: true
          });
        }
      }
      // Validate the 'create supplier' form
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

router.get("/supplier-details/:id", auth, (req, res) => {
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

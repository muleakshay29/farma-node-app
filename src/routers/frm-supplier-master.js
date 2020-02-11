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

router.get("/supplier-count", auth, (req, res) => {
  try {
    Supplier.find().estimatedDocumentCount((err, count) => {
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

/* router.get("/fetch-suppliers", auth, (req, res) => {
  Supplier.find({})
    .then(suppliers => {
      res.send(suppliers);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}); */

router.get("/fetch-suppliers", auth, (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex);
  var pageSize = parseInt(req.query.pageSize);
  var query = {};
  query.skip = pageIndex * pageSize;
  query.limit = pageSize;

  Supplier.find({}, {}, query)
    .then(suppliers => {
      res.send(suppliers);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/find-supplier", auth, (req, res) => {
  Supplier.find({
    SUP_CompanyName: { $regex: req.body.SUP_CompanyName, $options: "i" }
  })
    .select("SUP_code SUP_CompanyName")
    .then(suppliers => {
      res.send(suppliers);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

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

router.patch("/update-supplier/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "SUP_code",
    "SUP_CompanyName",
    "SUP_Address",
    "SUP_ContactNumber1",
    "SUP_ContactNumber2",
    "SUP_OwnerName",
    "SUP_GSTNumber",
    "SUP_DrNo",
    "SUP_PanNo",
    "SUP_BizMailId",
    "SUP_WhatsappNumber",
    "SUP_Dist",
    "SUP_City",
    "SUP_Pin",
    "SUP_State"
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!supplier) {
      res.status(404).send();
    }

    res.send(supplier);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/supplier-master/:id", auth, async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(404).send();
    }

    res.send(supplier);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

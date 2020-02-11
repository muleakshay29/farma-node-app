const express = require("express");
const Scheme = require("../models/frm_scheme");
const router = new express.Router();
// const auth = require("../middleware/auth");

router.post("/add-scheme", (req, res) => {
  const scheme = new Scheme(req.body);
  scheme
    .save()
    .then(() => {
      res.status(201).send(scheme);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

/* router.get("/fetch-scheme", async (req, res) => {
  try {
    const data = await Scheme.find()
      .populate({
        path: "PRO_ID",
        model: "frm_product_masters",
        select: "PRO_Name"
      })
      .exec();
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
}); */

router.get("/scheme-count", auth, (req, res) => {
  try {
    Scheme.find().estimatedDocumentCount((err, count) => {
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

router.get("/fetch-scheme", auth, (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex);
  var pageSize = parseInt(req.query.pageSize);
  var query = {};
  query.skip = pageIndex * pageSize;
  query.limit = pageSize;

  Scheme.find({}, {}, query)
    .populate({
      path: "PRO_ID",
      model: "frm_product_masters",
      select: "PRO_Name"
    })
    .then(scheme => {
      res.send(scheme);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/find-scheme", auth, (req, res) => {
  Scheme.find({ PRO_Name: { $regex: req.body.PRO_Name, $options: "i" } })
    .populate({
      path: "PRO_ID",
      model: "frm_product_masters",
      select: "PRO_Name"
    })
    .then(scheme => {
      res.send(scheme);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-scheme-by-product/:id", async (req, res) => {
  const _id = req.params.id;

  Scheme.find({ PRO_ID: _id })
    .then(schme => {
      if (!schme) {
        return res.status(404).send();
      }

      res.status(200).send(schme);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

router.get("/fetch-scheme-details/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const data = await Scheme.findById(_id)
      .populate({
        path: "PRO_ID",
        model: "frm_product_masters",
        select: "PRO_Name"
      })
      .exec();
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

/* router.get("/fetch-scheme-details/:id", (req, res) => {
  const _id = req.params.id;

  Scheme.findById(_id)
    .then(sche => {
      if (!sche) {
        return res.status(404).send();
      }

      res.status(200).send(sche);
    })
    .catch(e => {
      res.status(500).send(e);
    });
}); */

router.patch("/update-scheme/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["PRO_ID", "Quantity", "Free_Quantity"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const schme = await Scheme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!schme) {
      res.status(404).send();
    }

    res.send(schme);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/scheme/:id", async (req, res) => {
  try {
    const schme = await Scheme.findByIdAndDelete(req.params.id);

    if (!schme) {
      return res.status(404).send();
    }

    res.send(schme);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

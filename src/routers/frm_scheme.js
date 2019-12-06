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

router.get("/fetch-scheme", async (req, res) => {
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

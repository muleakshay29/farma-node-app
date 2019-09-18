const express = require("express");
const CommonMaster = require("../models/frm-common-master");
const router = new express.Router();

router.post("/add-commonmaster", (req, res) => {
  const cmaster = new CommonMaster(req.body);
  cmaster
    .save()
    .then(() => {
      res.status(201).send(cmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-commonmaster", (req, res) => {
  CommonMaster.find({})
    .then(cmaster => {
      res.send(cmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/check-cmname", (req, res) => {
  CommonMaster.find({ CM_Name: req.body.CM_Name })
    .then(cmaster => {
      res.send(cmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-commonmaster-details/:id", (req, res) => {
  const _id = req.params.id;

  CommonMaster.findById(_id)
    .then(cmaster => {
      if (!cmaster) {
        return res.status(404).send();
      }

      res.status(200).send(cmaster);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

router.patch("/update-commonmaster/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["CM_Name"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const commonMaster = await CommonMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!commonMaster) {
      res.status(404).send();
    }

    res.send(commonMaster);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/commonmaster/:id", async (req, res) => {
  try {
    const commonMaster = await CommonMaster.findByIdAndDelete(req.params.id);

    if (!commonMaster) {
      return res.status(404).send();
    }

    res.send(commonMaster);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

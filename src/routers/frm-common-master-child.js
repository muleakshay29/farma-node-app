const express = require("express");
const CommonMasterChild = require("../models/frm-common-master-child");
const router = new express.Router();

router.post("/add-commonmaster-child", (req, res) => {
  const ccmaster = new CommonMasterChild(req.body);
  ccmaster
    .save()
    .then(() => {
      res.status(201).send(ccmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-commonmaster-child", (req, res) => {
  CommonMasterChild.find({})
    .then(ccmaster => {
      res.send(ccmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/check-cmcname", (req, res) => {
  CommonMasterChild.find({ CMC_Name: req.body.CMC_Name })
    .then(ccmaster => {
      res.send(ccmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-commonmasterchild-details/:id", (req, res) => {
  const _id = req.params.id;

  CommonMasterChild.findById(_id)
    .then(ccmaster => {
      if (!ccmaster) {
        return res.status(404).send();
      }

      res.status(200).send(ccmaster);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

router.patch("/update-commonmaster-child/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["CMC_Name"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const commonMasterChild = await CommonMasterChild.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!commonMasterChild) {
      res.status(404).send();
    }

    res.send(commonMasterChild);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/commonmasterchild/:id", async (req, res) => {
  try {
    const commonMasterChild = await CommonMasterChild.findByIdAndDelete(
      req.params.id
    );

    if (!commonMasterChild) {
      return res.status(404).send();
    }

    res.send(commonMasterChild);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

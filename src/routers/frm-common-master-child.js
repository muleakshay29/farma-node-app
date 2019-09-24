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

module.exports = router;

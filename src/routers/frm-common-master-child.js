const express = require("express");
const CommonMasterChild = require("../models/frm-common-master-child");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/add-commonmaster-child", auth, (req, res) => {
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

router.get("/cmc-item-count", auth, (req, res) => {
  try {
    CommonMasterChild.find().estimatedDocumentCount((err, count) => {
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

/* router.get("/fetch-commonmaster-child", auth, async (req, res) => {
  try {
    const data = await CommonMasterChild.find()
      .populate({
        path: "CM_id",
        model: "frm_common_master",
        select: "CM_Name"
      })
      .exec();
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
}); */

router.get("/fetch-commonmaster-child", auth, (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex);
  var pageSize = parseInt(req.query.pageSize);
  var query = {};

  query.skip = pageIndex * pageSize;
  query.limit = pageSize;

  CommonMasterChild.find({}, {}, query)
    .populate({
      path: "CM_id",
      model: "frm_common_master",
      select: "CM_Name"
    })
    .then(cmcmaster => {
      res.send(cmcmaster);
    });
});

router.post("/find-cmcname", auth, (req, res) => {
  CommonMasterChild.find({
    CMC_Name: { $regex: req.body.CMC_Name, $options: "i" }
  })
    .select("CMC_Name")
    .then(cmcmaster => {
      res.send(cmcmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/check-cmcname", auth, (req, res) => {
  const cmcId = req.body.cmcId;

  CommonMasterChild.findOne({ CMC_Name: req.body.CMC_Name })
    .then(ccmaster => {
      if (!ccmaster) {
        return res.json({
          alreadyExist: false
        });
      }

      if (cmcId) {
        if (cmcId === ccmaster._id.toString()) {
          return res.json({
            alreadyExist: false
          });
        } else {
          return res.json({
            alreadyExist: true
          });
        }
      }
      // Validate the 'create ccmaster' form
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

router.get("/fetch-commonmasterchild-details/:id", auth, (req, res) => {
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

router.get("/fetch-commonchild-fromCM/:id", (req, res) => {
  const CM_id = req.params.id;

  CommonMasterChild.find({ CM_id: CM_id })
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

router.patch("/update-commonmaster-child/:id", auth, async (req, res) => {
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

router.delete("/commonmasterchild/:id", auth, async (req, res) => {
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

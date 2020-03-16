const express = require("express");
const CommonMaster = require("../models/frm-common-master");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/add-commonmaster", auth, (req, res) => {
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

/* router.get("/fetch-commonmaster", auth, (req, res) => {
  CommonMaster.find({})
    .then(cmaster => {
      res.send(cmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}); */

router.get("/cm-item-count", auth, (req, res) => {
  try {
    CommonMaster.find().estimatedDocumentCount((err, count) => {
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

router.get("/fetch-commonmaster", auth, (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex);
  var pageSize = parseInt(req.query.pageSize);
  var query = {};
  query.skip = pageIndex * pageSize;
  query.limit = pageSize;

  CommonMaster.find({}, {}, query)
    .select("CM_Name")
    .then(cmaster => {
      res.send(cmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/find-cmname", auth, (req, res) => {
  CommonMaster.find({ CM_Name: { $regex: req.body.CM_Name, $options: "i" } })
    .select("CM_Name")
    .then(cmaster => {
      res.send(cmaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/check-cmname", auth, (req, res) => {
  const cmId = req.body.cmId;
  const proCode = req.body.CM_Name;

  CommonMaster.findOne(
    { CM_Name: proCode },
    { runValidators: true, context: "query" }
  )
    .then(cmaster => {
      if (!cmaster) {
        return res.json({
          alreadyExist: false
        });
      }

      if (cmId) {
        if (cmId === cmaster._id.toString()) {
          return res.json({
            alreadyExist: false
          });
        } else {
          return res.json({
            alreadyExist: true
          });
        }
      }
      // Validate the 'create cmaster' form
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

router.get("/fetch-commonmaster-details/:id", auth, (req, res) => {
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

router.patch("/update-commonmaster/:id", auth, async (req, res) => {
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

router.delete("/commonmaster/:id", auth, async (req, res) => {
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

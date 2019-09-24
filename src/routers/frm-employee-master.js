const express = require("express");
const EmployeeMaster = require("../models/frm-employee-master");
const router = new express.Router();

router.post("/add-employee", (req, res) => {
  const employeeMaster = new EmployeeMaster(req.body);
  employeeMaster
    .save()
    .then(() => {
      res.status(201).send(employeeMaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-employee", (req, res) => {
  EmployeeMaster.find({})
    .then(employeeMaster => {
      res.send(employeeMaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/check-employeecode", (req, res) => {
  EmployeeMaster.find({ Emp_code: req.body.Emp_code })
    .then(employeeMaster => {
      res.send(employeeMaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.get("/fetch-employee-details/:id", (req, res) => {
  const _id = req.params.id;

  EmployeeMaster.findById(_id)
    .then(employeeMaster => {
      if (!employeeMaster) {
        return res.status(404).send();
      }

      res.status(200).send(employeeMaster);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

router.patch("/update-employee/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["CM_Name"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const employeeMaster = await EmployeeMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employeeMaster) {
      res.status(404).send();
    }

    res.send(employeeMaster);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/employee-master/:id", async (req, res) => {
  try {
    const employeeMaster = await EmployeeMaster.findByIdAndDelete(
      req.params.id
    );

    if (!employeeMaster) {
      return res.status(404).send();
    }

    res.send(employeeMaster);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

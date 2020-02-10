const express = require("express");
const EmployeeMaster = require("../models/frm-employee-master");
const router = new express.Router();
const auth = require("../middleware/auth");

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

router.get("/employee-count", auth, (req, res) => {
  try {
    EmployeeMaster.find().estimatedDocumentCount((err, count) => {
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

router.get("/fetch-employee", auth, (req, res) => {
  var pageIndex = parseInt(req.query.pageIndex);
  var pageSize = parseInt(req.query.pageSize);
  var query = {};
  query.skip = pageIndex * pageSize;
  query.limit = pageSize;

  EmployeeMaster.find({}, {}, query)
    .populate({
      path: "Type_of_user",
      model: "frm_common_master_child",
      select: "CMC_Name"
    })
    .then(employeeMaster => {
      res.send(employeeMaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/find-employee", auth, (req, res) => {
  CommonMaster.find({ Emp_name: { $regex: req.body.Emp_name, $options: "i" } })
    .populate({
      path: "Type_of_user",
      model: "frm_common_master_child",
      select: "CMC_Name"
    })
    .select("Emp_name Email_id Mobile_no Type_of_user")
    .then(employeeMaster => {
      res.send(employeeMaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/check-employeecode", (req, res) => {
  const empId = req.body.empId;

  EmployeeMaster.findOne({ Emp_code: req.body.Emp_code })
    .then(employee => {
      // No employee with the same employee code in the database
      if (!employee) {
        return res.json({
          alreadyExist: false
        });
      }

      // Validate the 'edit employee' form
      if (empId) {
        if (empId === employee._id.toString()) {
          return res.json({
            alreadyExist: false
          });
        } else {
          return res.json({
            alreadyExist: true
          });
        }
      }
      // Validate the 'create employee' form
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
  const allowedUpdates = [
    "Emp_name",
    "Emp_address",
    "Emp_city",
    "Emp_state",
    "Emp_adhar",
    "Emp_pan",
    "User_name",
    "Password",
    "Email_id",
    "Mobile_no",
    "Type_of_user"
  ];
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

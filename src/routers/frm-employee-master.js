const express = require("express");
const EmployeeMaster = require("../models/frm-employee-master");
const router = new express.Router();
const multer = require("multer");

/* const upload = multer({
  dest: "images/employee-profile",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      callback(new Error("Sorry, only JPG, JPEG, PNG & GIF files are allowed"));
    }
    callback(undefined, true);
  }
});

router.post(
  "/employee-avatar-upload",
  upload.single("Emp_profile_img"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
); */

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

router.get("/fetch-employee", async (req, res) => {
  try {
    const data = await EmployeeMaster.find()
      .populate({
        path: "Type_of_user",
        model: "frm_common_master_child",
        select: "CMC_Name"
      })
      .exec();
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

/* router.get("/fetch-employee", (req, res) => {
  EmployeeMaster.find({})
    .then(employeeMaster => {
      res.send(employeeMaster);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}); */

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

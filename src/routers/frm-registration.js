const express = require("express");
const Registration = require("../models/frm-registration");
const router = new express.Router();

router.post("/registration", (req, res) => {
  const register = new Registration(req.body);
  register
    .save()
    .then(() => {
      res.status(201).send(register);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/login", async (req, res) => {
  try {
    const user = await Registration.findByCredentials(
      req.body.R_UserName,
      req.body.R_Password
    );
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;

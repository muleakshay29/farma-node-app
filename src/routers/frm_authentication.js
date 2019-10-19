const express = require("express");
const Authentication = require("../models/frm_authentication");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/registration", async (req, res) => {
  const user = new Authentication(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Authentication.findByCredentials(
      req.body.R_UserName,
      req.body.R_Password
    );

    const token = await user.generateAuthToken();
    // await req.user.save();
    // user.token = token;

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });

    // req.user.tokens = null;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

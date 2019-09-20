const express = require("express");
const cors = require("cors");
require("./src/db/mongoos");

// const Supplier = require("./src/models/frm-supplier-master");

const supplierRouter = require("./src/routers/frm-supplier-master");
const commonMasterRouter = require("./src/routers/frm-common-master");
const registration = require("./src/routers/frm-registration");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

/* app.post("/add-suppliers", (req, res) => {
  const supplier = new Supplier(req.body);
  supplier
    .save()
    .then(() => {
      res.status(201).send(supplier);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/fetch-suppliers", (req, res) => {
  Supplier.find({})
    .then(suppliers => {
      res.send(suppliers);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}); */

app.use(supplierRouter);
app.use(commonMasterRouter);
app.use(registration);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
